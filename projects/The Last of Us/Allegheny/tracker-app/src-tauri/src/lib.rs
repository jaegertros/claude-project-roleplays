use std::sync::Arc;

use tauri::RunEvent;

mod services;
use services::{ServicesConfig, ServicesManager, ServicesSnapshot, LogLine, DetectedPaths};

// ---------------------------------------------------------------------------
// Tauri commands
// ---------------------------------------------------------------------------

#[tauri::command]
fn detect_paths(app: tauri::AppHandle) -> DetectedPaths {
    services::detect_paths(&app)
}

#[tauri::command]
fn services_status(mgr: tauri::State<'_, Arc<ServicesManager>>) -> ServicesSnapshot {
    mgr.snapshot()
}

#[tauri::command]
fn services_logs(mgr: tauri::State<'_, Arc<ServicesManager>>, limit: Option<usize>) -> Vec<LogLine> {
    mgr.logs(limit.unwrap_or(200))
}

#[tauri::command]
fn start_services(
    app: tauri::AppHandle,
    mgr: tauri::State<'_, Arc<ServicesManager>>,
    config: ServicesConfig,
) -> Result<ServicesSnapshot, String> {
    let mgr = mgr.inner().clone();
    services::start_mcp(app.clone(), mgr.clone(), &config)?;
    services::start_tunnel(app.clone(), mgr.clone(), &config)?;
    Ok(mgr.snapshot())
}

#[tauri::command]
fn start_mcp_only(
    app: tauri::AppHandle,
    mgr: tauri::State<'_, Arc<ServicesManager>>,
    config: ServicesConfig,
) -> Result<ServicesSnapshot, String> {
    let mgr = mgr.inner().clone();
    services::start_mcp(app.clone(), mgr.clone(), &config)?;
    Ok(mgr.snapshot())
}

#[tauri::command]
fn start_tunnel_only(
    app: tauri::AppHandle,
    mgr: tauri::State<'_, Arc<ServicesManager>>,
    config: ServicesConfig,
) -> Result<ServicesSnapshot, String> {
    let mgr = mgr.inner().clone();
    services::start_tunnel(app.clone(), mgr.clone(), &config)?;
    Ok(mgr.snapshot())
}

#[tauri::command]
fn stop_services(mgr: tauri::State<'_, Arc<ServicesManager>>) -> ServicesSnapshot {
    let mgr = mgr.inner().clone();
    services::stop_all(&mgr);
    mgr.snapshot()
}

#[tauri::command]
fn stop_mcp(mgr: tauri::State<'_, Arc<ServicesManager>>) -> ServicesSnapshot {
    let mgr = mgr.inner().clone();
    services::stop_mcp(&mgr);
    mgr.snapshot()
}

#[tauri::command]
fn stop_tunnel(mgr: tauri::State<'_, Arc<ServicesManager>>) -> ServicesSnapshot {
    let mgr = mgr.inner().clone();
    services::stop_tunnel(&mgr);
    mgr.snapshot()
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mgr = Arc::new(ServicesManager::new());
    let mgr_for_exit = Arc::clone(&mgr);

    tauri::Builder::default()
        .manage(mgr)
        .invoke_handler(tauri::generate_handler![
            detect_paths,
            services_status,
            services_logs,
            start_services,
            start_mcp_only,
            start_tunnel_only,
            stop_services,
            stop_mcp,
            stop_tunnel,
        ])
        .setup(|_app| Ok(()))
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(move |_app, event| {
            // Reap child processes whenever the app is shutting down.
            if matches!(event, RunEvent::ExitRequested { .. } | RunEvent::Exit) {
                services::stop_all(&mgr_for_exit);
            }
        });
}
