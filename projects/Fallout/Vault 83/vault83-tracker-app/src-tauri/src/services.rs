//! Services manager: vault83-state MCP server.
//!
//! Spawns `python -m vault83_state.launch` as a child process when the user
//! clicks Start (or on app launch if auto-start is enabled), streams its
//! stdout/stderr as events to the frontend, and kills it on app exit.
//!
//! All paths are passed in from the frontend (auto-detected there with a
//! `detect_paths` command as the starting point). The Rust side just runs
//! what it's told.
//!
//! Adapted from Allegheny's tracker-app/services.rs — same shape, but with
//! the cloudflared tunnel stripped because Vault 83's tracker is paste-based
//! (no Claude-cloud → MCP traffic over a public hostname).

use std::collections::VecDeque;
use std::io::{BufRead, BufReader};
use std::path::PathBuf;
use std::process::{Child, Command, Stdio};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{SystemTime, UNIX_EPOCH};

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter, Manager};

#[cfg(windows)]
use std::os::windows::process::CommandExt;

// Windows process creation flag — no console window pops up.
#[cfg(windows)]
const CREATE_NO_WINDOW: u32 = 0x0800_0000;

const LOG_RING_CAPACITY: usize = 500;

// ---------------------------------------------------------------------------
// Types shared with the frontend
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize)]
pub struct ServiceState {
    pub running: bool,
    pub pid: Option<u32>,
    pub started_at: Option<u64>, // unix seconds
    pub last_error: Option<String>,
    pub last_exit_code: Option<i32>,
}

impl Default for ServiceState {
    fn default() -> Self {
        Self {
            running: false,
            pid: None,
            started_at: None,
            last_error: None,
            last_exit_code: None,
        }
    }
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct ServicesSnapshot {
    pub mcp: ServiceState,
}

#[derive(Debug, Clone, Serialize)]
pub struct LogLine {
    pub source: &'static str, // always "mcp" in the single-service shape
    pub stream: &'static str, // "stdout" | "stderr"
    pub line: String,
    pub ts: u64,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ServicesConfig {
    pub python_path: String,
    /// Directory containing pyproject.toml + src/vault83_state/.
    pub vault83_state_dir: String,
}

// ---------------------------------------------------------------------------
// Manager
// ---------------------------------------------------------------------------

pub struct ServicesManager {
    mcp_child: Mutex<Option<Child>>,
    state: Mutex<ServicesSnapshot>,
    logs: Mutex<VecDeque<LogLine>>,
}

impl ServicesManager {
    pub fn new() -> Self {
        Self {
            mcp_child: Mutex::new(None),
            state: Mutex::new(ServicesSnapshot::default()),
            logs: Mutex::new(VecDeque::with_capacity(LOG_RING_CAPACITY)),
        }
    }

    pub fn snapshot(&self) -> ServicesSnapshot {
        self.state.lock().unwrap().clone()
    }

    pub fn logs(&self, limit: usize) -> Vec<LogLine> {
        let logs = self.logs.lock().unwrap();
        let take = limit.min(logs.len());
        logs.iter().rev().take(take).rev().cloned().collect()
    }

    pub fn push_log(&self, line: LogLine) {
        let mut logs = self.logs.lock().unwrap();
        if logs.len() >= LOG_RING_CAPACITY {
            logs.pop_front();
        }
        logs.push_back(line);
    }
}

// ---------------------------------------------------------------------------
// Spawning
// ---------------------------------------------------------------------------

fn now_unix() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0)
}

fn emit_status(app: &AppHandle, mgr: &Arc<ServicesManager>) {
    let snap = mgr.snapshot();
    let _ = app.emit("services:status", snap);
}

fn emit_log(app: &AppHandle, mgr: &Arc<ServicesManager>, line: LogLine) {
    mgr.push_log(line.clone());
    let _ = app.emit("services:log", line);
}

/// Spawn the MCP child, capture its output, and watch for exit.
fn spawn_and_watch(
    app: AppHandle,
    mgr: Arc<ServicesManager>,
    mut command: Command,
) -> Result<u32, String> {
    command.stdout(Stdio::piped()).stderr(Stdio::piped()).stdin(Stdio::null());

    #[cfg(windows)]
    command.creation_flags(CREATE_NO_WINDOW);

    let child = command
        .spawn()
        .map_err(|e| format!("failed to spawn mcp: {e}"))?;
    let pid = child.id();

    // Replace any existing child. If somehow there's an old one, kill it
    // (defensive — caller should have stopped first).
    let prev = mgr.mcp_child.lock().unwrap().replace(child);
    if let Some(mut old) = prev {
        let _ = old.kill();
    }

    // Update state.
    {
        let mut s = mgr.state.lock().unwrap();
        s.mcp = ServiceState {
            running: true,
            pid: Some(pid),
            started_at: Some(now_unix()),
            last_error: None,
            last_exit_code: None,
        };
    }
    emit_status(&app, &mgr);

    // Take stdout/stderr out of the child for the reader threads.
    let (stdout, stderr) = {
        let mut guard = mgr.mcp_child.lock().unwrap();
        let child = guard.as_mut().expect("child slot just populated");
        (child.stdout.take(), child.stderr.take())
    };

    if let Some(stdout) = stdout {
        let app2 = app.clone();
        let mgr2 = Arc::clone(&mgr);
        thread::spawn(move || {
            let reader = BufReader::new(stdout);
            for line in reader.lines().flatten() {
                emit_log(
                    &app2,
                    &mgr2,
                    LogLine {
                        source: "mcp",
                        stream: "stdout",
                        line,
                        ts: now_unix(),
                    },
                );
            }
        });
    }
    if let Some(stderr) = stderr {
        let app2 = app.clone();
        let mgr2 = Arc::clone(&mgr);
        thread::spawn(move || {
            let reader = BufReader::new(stderr);
            for line in reader.lines().flatten() {
                emit_log(
                    &app2,
                    &mgr2,
                    LogLine {
                        source: "mcp",
                        stream: "stderr",
                        line,
                        ts: now_unix(),
                    },
                );
            }
        });
    }

    // Watcher: wait for the child to exit and update state.
    {
        let app2 = app.clone();
        let mgr2 = Arc::clone(&mgr);
        thread::spawn(move || {
            let exit_code = loop {
                let try_wait = {
                    let mut guard = mgr2.mcp_child.lock().unwrap();
                    match guard.as_mut() {
                        Some(child) => child.try_wait(),
                        None => break None,
                    }
                };
                match try_wait {
                    Ok(Some(status)) => {
                        let mut guard = mgr2.mcp_child.lock().unwrap();
                        *guard = None;
                        break status.code();
                    }
                    Ok(None) => {
                        thread::sleep(std::time::Duration::from_millis(500));
                    }
                    Err(e) => {
                        emit_log(
                            &app2,
                            &mgr2,
                            LogLine {
                                source: "mcp",
                                stream: "stderr",
                                line: format!("[watcher] try_wait error: {e}"),
                                ts: now_unix(),
                            },
                        );
                        break None;
                    }
                }
            };

            {
                let mut s = mgr2.state.lock().unwrap();
                s.mcp.running = false;
                s.mcp.pid = None;
                s.mcp.last_exit_code = exit_code;
            }
            emit_status(&app2, &mgr2);
        });
    }

    Ok(pid)
}

// ---------------------------------------------------------------------------
// Public API used by Tauri commands
// ---------------------------------------------------------------------------

pub fn start_mcp(
    app: AppHandle,
    mgr: Arc<ServicesManager>,
    config: &ServicesConfig,
) -> Result<u32, String> {
    let dir = PathBuf::from(&config.vault83_state_dir);
    if !dir.exists() {
        return Err(format!("vault83_state_dir not found: {}", dir.display()));
    }
    let src_dir = dir.join("src");
    if !src_dir.exists() {
        return Err(format!(
            "expected {}/src to exist (the vault83_state package lives there)",
            dir.display()
        ));
    }

    let mut cmd = Command::new(&config.python_path);
    cmd.args(["-m", "vault83_state.launch"])
        .env("PYTHONPATH", &src_dir)
        .env("PYTHONUNBUFFERED", "1") // make stdout line-buffered so we see logs promptly
        .current_dir(&dir);

    spawn_and_watch(app, mgr, cmd)
}

pub fn stop_mcp(mgr: &Arc<ServicesManager>) {
    let mut guard = mgr.mcp_child.lock().unwrap();
    if let Some(mut child) = guard.take() {
        let _ = child.kill();
        let _ = child.wait();
    }
}

pub fn stop_all(mgr: &Arc<ServicesManager>) {
    stop_mcp(mgr);
}

// ---------------------------------------------------------------------------
// Path detection — used by the frontend on first launch to fill Settings
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize)]
pub struct DetectedPaths {
    pub python: Option<String>,
    pub vault83_state_dir: Option<String>,
}

fn first_existing(candidates: &[PathBuf]) -> Option<String> {
    for c in candidates {
        if c.exists() {
            return Some(c.to_string_lossy().to_string());
        }
    }
    None
}

fn find_vault83_state_dir(app: &AppHandle) -> Option<String> {
    // Try, in order:
    //  1. Walk up from the current exe dir looking for vault83-state/pyproject.toml
    //  2. Sibling of the app's resource dir
    let mut candidates: Vec<PathBuf> = vec![];

    if let Ok(exe) = std::env::current_exe() {
        let mut dir = exe.parent().map(|p| p.to_path_buf());
        while let Some(d) = dir {
            candidates.push(d.join("vault83-state"));
            candidates.push(d.join("..").join("vault83-state"));
            dir = d.parent().map(|p| p.to_path_buf());
            if candidates.len() > 20 {
                break;
            }
        }
    }

    if let Ok(rd) = app.path().resource_dir() {
        candidates.push(rd.join("vault83-state"));
    }

    for c in &candidates {
        if c.join("pyproject.toml").exists() && c.join("src").join("vault83_state").exists() {
            return Some(
                c.canonicalize()
                    .unwrap_or_else(|_| c.clone())
                    .to_string_lossy()
                    .to_string(),
            );
        }
    }
    None
}

pub fn detect_paths(app: &AppHandle) -> DetectedPaths {
    let python_candidates: Vec<PathBuf> = vec![
        PathBuf::from(r"C:\Python313\python.exe"),
        PathBuf::from(r"C:\Python312\python.exe"),
        PathBuf::from(r"C:\Python311\python.exe"),
        PathBuf::from(r"C:\Windows\py.exe"),
        // Fallback: the `python` on PATH (Command::new resolves it).
        PathBuf::from("python.exe"),
    ];

    DetectedPaths {
        python: first_existing(&python_candidates),
        vault83_state_dir: find_vault83_state_dir(app),
    }
}
