//! Services manager: narrator-state MCP server + cloudflared tunnel.
//!
//! Spawns both as child processes when the user clicks Start (or on app
//! launch if auto-start is enabled), streams their stdout/stderr as events
//! to the frontend, and kills them on app exit.
//!
//! All paths are passed in from the frontend (auto-detected there with a
//! `detect_paths` command as the starting point). The Rust side just runs
//! what it's told.

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
    pub tunnel: ServiceState,
}

#[derive(Debug, Clone, Serialize)]
pub struct LogLine {
    pub source: &'static str, // "mcp" | "tunnel"
    pub stream: &'static str, // "stdout" | "stderr"
    pub line: String,
    pub ts: u64,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ServicesConfig {
    pub python_path: String,
    pub narrator_state_dir: String, // directory containing pyproject.toml + src/
    pub cloudflared_path: String,
    pub cloudflared_config: String, // path to ~/.cloudflared/config.yml
}

// ---------------------------------------------------------------------------
// Manager
// ---------------------------------------------------------------------------

pub struct ServicesManager {
    mcp_child: Mutex<Option<Child>>,
    tunnel_child: Mutex<Option<Child>>,
    state: Mutex<ServicesSnapshot>,
    logs: Mutex<VecDeque<LogLine>>,
}

impl ServicesManager {
    pub fn new() -> Self {
        Self {
            mcp_child: Mutex::new(None),
            tunnel_child: Mutex::new(None),
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

/// Spawn a child, capture its output, and watch for exit.
///
/// The watcher thread emits status updates when the child exits so the UI
/// can show "crashed" instead of staying green forever.
fn spawn_and_watch(
    app: AppHandle,
    mgr: Arc<ServicesManager>,
    source: &'static str,
    mut command: Command,
    slot: SlotKind,
) -> Result<u32, String> {
    command.stdout(Stdio::piped()).stderr(Stdio::piped()).stdin(Stdio::null());

    #[cfg(windows)]
    command.creation_flags(CREATE_NO_WINDOW);

    let mut child = command
        .spawn()
        .map_err(|e| format!("failed to spawn {source}: {e}"))?;
    let pid = child.id();

    // Replace any existing child in the slot. If somehow there's an old one,
    // kill it (defensive — caller should have stopped first).
    let prev = match slot {
        SlotKind::Mcp => mgr.mcp_child.lock().unwrap().replace(child),
        SlotKind::Tunnel => mgr.tunnel_child.lock().unwrap().replace(child),
    };
    if let Some(mut old) = prev {
        let _ = old.kill();
    }

    // Update state.
    {
        let mut s = mgr.state.lock().unwrap();
        let svc = match slot {
            SlotKind::Mcp => &mut s.mcp,
            SlotKind::Tunnel => &mut s.tunnel,
        };
        *svc = ServiceState {
            running: true,
            pid: Some(pid),
            started_at: Some(now_unix()),
            last_error: None,
            last_exit_code: None,
        };
    }
    emit_status(&app, &mgr);

    // Take stdout/stderr handles out of the child for the readers. We have
    // to re-acquire the child from the slot to do this because we already
    // moved it in.
    let (stdout, stderr) = {
        let mut guard = match slot {
            SlotKind::Mcp => mgr.mcp_child.lock().unwrap(),
            SlotKind::Tunnel => mgr.tunnel_child.lock().unwrap(),
        };
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
                        source,
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
                        source,
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
            // Loop because lock acquisitions need to be short.
            let exit_code = loop {
                let try_wait = {
                    let mut guard = match slot {
                        SlotKind::Mcp => mgr2.mcp_child.lock().unwrap(),
                        SlotKind::Tunnel => mgr2.tunnel_child.lock().unwrap(),
                    };
                    match guard.as_mut() {
                        Some(child) => child.try_wait(),
                        None => break None,
                    }
                };
                match try_wait {
                    Ok(Some(status)) => {
                        // Child exited. Clear the slot.
                        let mut guard = match slot {
                            SlotKind::Mcp => mgr2.mcp_child.lock().unwrap(),
                            SlotKind::Tunnel => mgr2.tunnel_child.lock().unwrap(),
                        };
                        *guard = None;
                        break status.code();
                    }
                    Ok(None) => {
                        // Still running. Brief sleep before re-checking.
                        thread::sleep(std::time::Duration::from_millis(500));
                    }
                    Err(e) => {
                        emit_log(
                            &app2,
                            &mgr2,
                            LogLine {
                                source,
                                stream: "stderr",
                                line: format!("[watcher] try_wait error: {e}"),
                                ts: now_unix(),
                            },
                        );
                        break None;
                    }
                }
            };

            // Update state to "not running".
            {
                let mut s = mgr2.state.lock().unwrap();
                let svc = match slot {
                    SlotKind::Mcp => &mut s.mcp,
                    SlotKind::Tunnel => &mut s.tunnel,
                };
                svc.running = false;
                svc.pid = None;
                svc.last_exit_code = exit_code;
            }
            emit_status(&app2, &mgr2);
        });
    }

    Ok(pid)
}

#[derive(Copy, Clone)]
enum SlotKind {
    Mcp,
    Tunnel,
}

// ---------------------------------------------------------------------------
// Public API used by Tauri commands
// ---------------------------------------------------------------------------

pub fn start_mcp(
    app: AppHandle,
    mgr: Arc<ServicesManager>,
    config: &ServicesConfig,
) -> Result<u32, String> {
    let dir = PathBuf::from(&config.narrator_state_dir);
    if !dir.exists() {
        return Err(format!("narrator_state_dir not found: {}", dir.display()));
    }
    let src_dir = dir.join("src");
    if !src_dir.exists() {
        return Err(format!(
            "expected {}/src to exist (the narrator_state package lives there)",
            dir.display()
        ));
    }

    let mut cmd = Command::new(&config.python_path);
    cmd.args(["-m", "narrator_state.launch"])
        .env("PYTHONPATH", &src_dir)
        .env("PYTHONUNBUFFERED", "1") // make stdout line-buffered so we see logs promptly
        .current_dir(&dir);

    spawn_and_watch(app, mgr, "mcp", cmd, SlotKind::Mcp)
}

pub fn start_tunnel(
    app: AppHandle,
    mgr: Arc<ServicesManager>,
    config: &ServicesConfig,
) -> Result<u32, String> {
    let exe = PathBuf::from(&config.cloudflared_path);
    if !exe.exists() {
        return Err(format!("cloudflared not found at {}", exe.display()));
    }
    let cfg = PathBuf::from(&config.cloudflared_config);
    if !cfg.exists() {
        return Err(format!("cloudflared config not found at {}", cfg.display()));
    }

    let mut cmd = Command::new(&exe);
    cmd.args(["--config", config.cloudflared_config.as_str(), "tunnel", "run"]);

    spawn_and_watch(app, mgr, "tunnel", cmd, SlotKind::Tunnel)
}

pub fn stop_one(mgr: &Arc<ServicesManager>, slot: SlotKind) {
    let mut guard = match slot {
        SlotKind::Mcp => mgr.mcp_child.lock().unwrap(),
        SlotKind::Tunnel => mgr.tunnel_child.lock().unwrap(),
    };
    if let Some(mut child) = guard.take() {
        let _ = child.kill();
        let _ = child.wait();
    }
}

pub fn stop_mcp(mgr: &Arc<ServicesManager>) {
    stop_one(mgr, SlotKind::Mcp);
}

pub fn stop_tunnel(mgr: &Arc<ServicesManager>) {
    stop_one(mgr, SlotKind::Tunnel);
}

pub fn stop_all(mgr: &Arc<ServicesManager>) {
    stop_one(mgr, SlotKind::Mcp);
    stop_one(mgr, SlotKind::Tunnel);
}

// ---------------------------------------------------------------------------
// Path detection — used by the frontend on first launch to fill Settings
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize)]
pub struct DetectedPaths {
    pub python: Option<String>,
    pub narrator_state_dir: Option<String>,
    pub cloudflared: Option<String>,
    pub cloudflared_config: Option<String>,
    /// Hostname extracted from cloudflared config's first ingress rule, if any.
    pub tunnel_hostname: Option<String>,
}

fn first_existing(candidates: &[PathBuf]) -> Option<String> {
    for c in candidates {
        if c.exists() {
            return Some(c.to_string_lossy().to_string());
        }
    }
    None
}

fn home_dir() -> Option<PathBuf> {
    std::env::var_os("USERPROFILE")
        .or_else(|| std::env::var_os("HOME"))
        .map(PathBuf::from)
}

fn find_narrator_state_dir(app: &AppHandle) -> Option<String> {
    // Try, in order:
    //  1. Sibling of the exe (deployment layout)
    //  2. Walk up from the current exe dir looking for narrator-state/pyproject.toml
    //  3. Sibling of the app's resource dir
    //  4. Known dev path (relative to project root)
    let mut candidates: Vec<PathBuf> = vec![];

    if let Ok(exe) = std::env::current_exe() {
        let mut dir = exe.parent().map(|p| p.to_path_buf());
        while let Some(d) = dir {
            candidates.push(d.join("narrator-state"));
            candidates.push(d.join("..").join("narrator-state"));
            dir = d.parent().map(|p| p.to_path_buf());
            if candidates.len() > 20 {
                break;
            }
        }
    }

    // Also try the path resolver if Tauri knows about resources.
    if let Ok(rd) = app.path().resource_dir() {
        candidates.push(rd.join("narrator-state"));
    }

    for c in &candidates {
        if c.join("pyproject.toml").exists() && c.join("src").join("narrator_state").exists() {
            return Some(c.canonicalize().unwrap_or_else(|_| c.clone()).to_string_lossy().to_string());
        }
    }
    None
}

fn read_first_hostname(config_path: &PathBuf) -> Option<String> {
    let text = std::fs::read_to_string(config_path).ok()?;
    for line in text.lines() {
        let trimmed = line.trim();
        if let Some(rest) = trimmed.strip_prefix("- hostname:") {
            return Some(rest.trim().to_string());
        }
        if let Some(rest) = trimmed.strip_prefix("hostname:") {
            return Some(rest.trim().to_string());
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
    let cloudflared_candidates: Vec<PathBuf> = vec![
        PathBuf::from(r"C:\Program Files (x86)\cloudflared\cloudflared.exe"),
        PathBuf::from(r"C:\Program Files\cloudflared\cloudflared.exe"),
        PathBuf::from("cloudflared.exe"),
    ];

    let cloudflared_config = home_dir().map(|h| h.join(".cloudflared").join("config.yml"));
    let cloudflared_config_str = cloudflared_config
        .as_ref()
        .filter(|p| p.exists())
        .map(|p| p.to_string_lossy().to_string());

    let tunnel_hostname = cloudflared_config
        .as_ref()
        .filter(|p| p.exists())
        .and_then(read_first_hostname);

    DetectedPaths {
        python: first_existing(&python_candidates),
        narrator_state_dir: find_narrator_state_dir(app),
        cloudflared: first_existing(&cloudflared_candidates),
        cloudflared_config: cloudflared_config_str,
        tunnel_hostname,
    }
}
