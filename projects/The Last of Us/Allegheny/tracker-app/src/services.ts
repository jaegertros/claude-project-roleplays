// Frontend wrapper around the Rust services manager.
// All real work happens in src-tauri/src/services.rs.

import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

export interface ServiceState {
  running: boolean;
  pid: number | null;
  started_at: number | null;
  last_error: string | null;
  last_exit_code: number | null;
}

export interface ServicesSnapshot {
  mcp: ServiceState;
  tunnel: ServiceState;
}

export interface LogLine {
  source: "mcp" | "tunnel";
  stream: "stdout" | "stderr";
  line: string;
  ts: number;
}

export interface DetectedPaths {
  python: string | null;
  narrator_state_dir: string | null;
  cloudflared: string | null;
  cloudflared_config: string | null;
  tunnel_hostname: string | null;
}

export interface ServicesConfig {
  python_path: string;
  narrator_state_dir: string;
  cloudflared_path: string;
  cloudflared_config: string;
}

function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

const EMPTY_SNAPSHOT: ServicesSnapshot = {
  mcp: { running: false, pid: null, started_at: null, last_error: null, last_exit_code: null },
  tunnel: { running: false, pid: null, started_at: null, last_error: null, last_exit_code: null },
};

export async function detectPaths(): Promise<DetectedPaths> {
  if (!isTauri()) {
    return {
      python: null,
      narrator_state_dir: null,
      cloudflared: null,
      cloudflared_config: null,
      tunnel_hostname: null,
    };
  }
  return invoke<DetectedPaths>("detect_paths");
}

export async function getServicesStatus(): Promise<ServicesSnapshot> {
  if (!isTauri()) return EMPTY_SNAPSHOT;
  return invoke<ServicesSnapshot>("services_status");
}

export async function getServicesLogs(limit = 200): Promise<LogLine[]> {
  if (!isTauri()) return [];
  return invoke<LogLine[]>("services_logs", { limit });
}

export async function startServices(config: ServicesConfig): Promise<ServicesSnapshot> {
  if (!isTauri()) throw new Error("Services can only be started inside the desktop app.");
  return invoke<ServicesSnapshot>("start_services", { config });
}

export async function stopServices(): Promise<ServicesSnapshot> {
  if (!isTauri()) return EMPTY_SNAPSHOT;
  return invoke<ServicesSnapshot>("stop_services");
}

export async function startMcpOnly(config: ServicesConfig): Promise<ServicesSnapshot> {
  if (!isTauri()) throw new Error("desktop-only");
  return invoke<ServicesSnapshot>("start_mcp_only", { config });
}

export async function startTunnelOnly(config: ServicesConfig): Promise<ServicesSnapshot> {
  if (!isTauri()) throw new Error("desktop-only");
  return invoke<ServicesSnapshot>("start_tunnel_only", { config });
}

export async function stopMcp(): Promise<ServicesSnapshot> {
  if (!isTauri()) return EMPTY_SNAPSHOT;
  return invoke<ServicesSnapshot>("stop_mcp");
}

export async function stopTunnel(): Promise<ServicesSnapshot> {
  if (!isTauri()) return EMPTY_SNAPSHOT;
  return invoke<ServicesSnapshot>("stop_tunnel");
}

export function onServicesStatus(cb: (s: ServicesSnapshot) => void): Promise<UnlistenFn> {
  if (!isTauri()) return Promise.resolve(() => {});
  return listen<ServicesSnapshot>("services:status", (e) => cb(e.payload));
}

export function onServicesLog(cb: (line: LogLine) => void): Promise<UnlistenFn> {
  if (!isTauri()) return Promise.resolve(() => {});
  return listen<LogLine>("services:log", (e) => cb(e.payload));
}

export function configIsComplete(c: Partial<ServicesConfig>): c is ServicesConfig {
  return Boolean(c.python_path && c.narrator_state_dir && c.cloudflared_path && c.cloudflared_config);
}
