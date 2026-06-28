// Frontend wrapper around the Rust services manager.
// All real work happens in src-tauri/src/services.rs.
//
// Adapted from Allegheny's services.ts. Vault 83 only manages one service
// (the vault83-state MCP server) — no cloudflared tunnel because the tracker
// UI is paste-based and never reaches the MCP from Claude's cloud.

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
}

export interface LogLine {
  source: "mcp";
  stream: "stdout" | "stderr";
  line: string;
  ts: number;
}

export interface DetectedPaths {
  python: string | null;
  vault83_state_dir: string | null;
}

export interface ServicesConfig {
  python_path: string;
  vault83_state_dir: string;
}

function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

const EMPTY_SNAPSHOT: ServicesSnapshot = {
  mcp: { running: false, pid: null, started_at: null, last_error: null, last_exit_code: null },
};

export async function detectPaths(): Promise<DetectedPaths> {
  if (!isTauri()) {
    return { python: null, vault83_state_dir: null };
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

export function onServicesStatus(cb: (s: ServicesSnapshot) => void): Promise<UnlistenFn> {
  if (!isTauri()) return Promise.resolve(() => {});
  return listen<ServicesSnapshot>("services:status", (e) => cb(e.payload));
}

export function onServicesLog(cb: (line: LogLine) => void): Promise<UnlistenFn> {
  if (!isTauri()) return Promise.resolve(() => {});
  return listen<LogLine>("services:log", (e) => cb(e.payload));
}

export function configIsComplete(c: Partial<ServicesConfig>): c is ServicesConfig {
  return Boolean(c.python_path && c.vault83_state_dir);
}
