import { useEffect, useState } from "react";
import type { Settings } from "../settings";
import { api, ApiError, health } from "../api";
import { detectPaths } from "../services";

interface SettingsModalProps {
  initial: Settings;
  onClose: () => void;
  onSave: (s: Settings) => void;
}

type ProbeState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; tools: string[] }
  | { kind: "err"; error: string };

export function SettingsModal({ initial, onClose, onSave }: SettingsModalProps) {
  const [draft, setDraft] = useState<Settings>(initial);
  const [probe, setProbe] = useState<ProbeState>({ kind: "idle" });
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    setDraft(initial);
  }, [initial]);

  async function testConnection() {
    setProbe({ kind: "loading" });
    try {
      const r = await health(draft);
      setProbe({ kind: "ok", tools: r.tools });
    } catch (e) {
      setProbe({ kind: "err", error: errMsg(e) });
    }
  }

  async function testGetState() {
    setProbe({ kind: "loading" });
    try {
      const r = await api.getState(draft);
      setProbe({ kind: "ok", tools: [`get_state ok · project=${r.state.project} · day=${r.state.clock.story_day}`] });
    } catch (e) {
      setProbe({ kind: "err", error: errMsg(e) });
    }
  }

  async function runDetect() {
    setDetecting(true);
    try {
      const d = await detectPaths();
      setDraft((prev) => ({
        ...prev,
        pythonPath: prev.pythonPath || d.python || "",
        narratorStateDir: prev.narratorStateDir || d.narrator_state_dir || "",
        cloudflaredPath: prev.cloudflaredPath || d.cloudflared || "",
        cloudflaredConfig: prev.cloudflaredConfig || d.cloudflared_config || "",
        tunnelHostname: prev.tunnelHostname || d.tunnel_hostname || "",
      }));
    } finally {
      setDetecting(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal wide" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>

        <fieldset>
          <legend>Service management</legend>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={draft.manageServices}
              onChange={(e) => setDraft({ ...draft, manageServices: e.target.checked })}
            />
            <span>This app manages the MCP server and Cloudflare tunnel</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={draft.autoStartServices}
              disabled={!draft.manageServices}
              onChange={(e) => setDraft({ ...draft, autoStartServices: e.target.checked })}
            />
            <span>Start services automatically when the app launches</span>
          </label>

          <div className="modal-row">
            <button onClick={runDetect} disabled={detecting}>
              {detecting ? "Detecting…" : "Auto-detect paths"}
            </button>
          </div>

          <label>
            <span>Python executable</span>
            <input
              type="text"
              value={draft.pythonPath}
              placeholder="C:\\Python313\\python.exe"
              disabled={!draft.manageServices}
              onChange={(e) => setDraft({ ...draft, pythonPath: e.target.value })}
            />
          </label>

          <label>
            <span>narrator-state directory</span>
            <input
              type="text"
              value={draft.narratorStateDir}
              placeholder="…\\Allegheny\\narrator-state"
              disabled={!draft.manageServices}
              onChange={(e) => setDraft({ ...draft, narratorStateDir: e.target.value })}
            />
            <small>The directory containing <code>pyproject.toml</code> and <code>src/narrator_state/</code>.</small>
          </label>

          <label>
            <span>cloudflared executable</span>
            <input
              type="text"
              value={draft.cloudflaredPath}
              placeholder="C:\\Program Files (x86)\\cloudflared\\cloudflared.exe"
              disabled={!draft.manageServices}
              onChange={(e) => setDraft({ ...draft, cloudflaredPath: e.target.value })}
            />
          </label>

          <label>
            <span>cloudflared config (config.yml)</span>
            <input
              type="text"
              value={draft.cloudflaredConfig}
              placeholder="C:\\Users\\…\\.cloudflared\\config.yml"
              disabled={!draft.manageServices}
              onChange={(e) => setDraft({ ...draft, cloudflaredConfig: e.target.value })}
            />
            <small>Tunnel UUID, credentials file, and ingress rules are read from this file.</small>
          </label>

          <label>
            <span>Public hostname (informational)</span>
            <input
              type="text"
              value={draft.tunnelHostname}
              placeholder="narrator.example.com"
              disabled={!draft.manageServices}
              onChange={(e) => setDraft({ ...draft, tunnelHostname: e.target.value })}
            />
            <small>Shown so you know what URL to give Claude. The tracker itself polls via localhost.</small>
          </label>
        </fieldset>

        <fieldset>
          <legend>Tracker connection</legend>

          <label>
            <span>Server URL</span>
            <input
              type="url"
              value={draft.serverUrl}
              onChange={(e) => setDraft({ ...draft, serverUrl: e.target.value })}
            />
            <small>
              Default <code>http://127.0.0.1:8765</code>. Override only if the server lives somewhere else.
            </small>
          </label>

          <label>
            <span>Bearer token (optional)</span>
            <input
              type="password"
              placeholder="Only if NARRATOR_REST_TOKEN is set on the server"
              value={draft.bearerToken}
              onChange={(e) => setDraft({ ...draft, bearerToken: e.target.value })}
            />
          </label>

          <label>
            <span>Project</span>
            <input
              type="text"
              value={draft.project}
              onChange={(e) => setDraft({ ...draft, project: e.target.value })}
            />
          </label>

          <label>
            <span>Poll interval (seconds, 0 = disable)</span>
            <input
              type="number"
              min={0}
              step={1}
              value={Math.round(draft.pollIntervalMs / 1000)}
              onChange={(e) =>
                setDraft({ ...draft, pollIntervalMs: Math.max(0, Number(e.target.value)) * 1000 })
              }
            />
          </label>

          <div className="modal-row">
            <button onClick={testConnection}>Test /health</button>
            <button onClick={testGetState}>Test get_state</button>
          </div>

          {probe.kind === "loading" && <div className="probe probe-loading">Testing…</div>}
          {probe.kind === "ok" && (
            <div className="probe probe-ok">
              ✓ {probe.tools.length === 1 ? probe.tools[0] : `${probe.tools.length} tools available`}
            </div>
          )}
          {probe.kind === "err" && <div className="probe probe-err">✗ {probe.error}</div>}
        </fieldset>

        <div className="modal-row modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={() => onSave(draft)}>Save</button>
        </div>
      </div>
    </div>
  );
}

function errMsg(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  if (e instanceof Error) return e.message;
  return String(e);
}
