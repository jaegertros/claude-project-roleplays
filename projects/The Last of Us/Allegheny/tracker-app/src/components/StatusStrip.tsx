import { useState } from "react";
import { api, ApiError } from "../api";
import type { Settings } from "../settings";
import type { ConnStatus } from "../useNarratorState";
import type { AuditEntry, State } from "../types";

interface Props {
  status: ConnStatus;
  error: string | null;
  lastSyncAt: number | null;
  state: State | null;
  settings: Settings;
  onAfterUndo: () => void;
  overdueBeats?: number;
}

function timeAgo(ts: number | null): string {
  if (ts == null) return "never";
  const sec = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (sec < 5) return "just now";
  if (sec < 60) return `${sec}s ago`;
  return `${Math.round(sec / 60)}m ago`;
}

export function StatusStrip({
  status,
  error,
  lastSyncAt,
  state,
  settings,
  onAfterUndo,
  overdueBeats = 0,
}: Props) {
  const [confirming, setConfirming] = useState<AuditEntry | null>(null);
  const [undoErr, setUndoErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function startUndo() {
    setUndoErr(null);
    setBusy(true);
    try {
      const r = await api.previewUndo(settings);
      setConfirming(r.preview);
    } catch (e) {
      setUndoErr(e instanceof ApiError ? e.message : e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function confirmUndo() {
    if (!confirming) return;
    setBusy(true);
    try {
      await api.confirmUndo(settings);
      setConfirming(null);
      onAfterUndo();
    } catch (e) {
      setUndoErr(e instanceof ApiError ? e.message : e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const sid = state?.session.current_session_id ?? null;
  const turns = sid
    ? state?.session.sessions.find((s) => s.id === sid)?.turns
    : undefined;

  return (
    <>
      <footer className="statusbar">
        <button className="strip-btn" disabled={busy || !state} onClick={startUndo}>
          ↺ Undo
        </button>
        {overdueBeats > 0 && (
          <span className="strip-badge overdue-badge" title="Overdue pending beats">
            ⚠ {overdueBeats} overdue
          </span>
        )}
        <span className="strip-spacer" />
        {sid ? (
          <span className="muted small">
            {sid} · turn {turns ?? 0}
          </span>
        ) : (
          <span className="muted small">no session</span>
        )}
        <span className="strip-spacer" />
        <span className={`strip-status status-${status}`}>
          {status === "ok" && `synced ${timeAgo(lastSyncAt)}`}
          {status === "loading" && "syncing…"}
          {status === "error" && "error"}
          {status === "idle" && "idle"}
          {status === "unconfigured" && "not configured"}
        </span>
      </footer>

      {error && status === "error" && <div className="statusbar-err">{error}</div>}
      {undoErr && <div className="statusbar-err">{undoErr}</div>}

      {confirming && (
        <div className="modal-backdrop" onClick={() => setConfirming(null)}>
          <div className="modal small" onClick={(e) => e.stopPropagation()}>
            <h2>Undo last event?</h2>
            <p className="muted small">This will reverse the most recent state change.</p>
            <pre className="audit-preview">{JSON.stringify(confirming, null, 2)}</pre>
            <div className="modal-row modal-actions">
              <button onClick={() => setConfirming(null)} disabled={busy}>Cancel</button>
              <button className="primary danger" onClick={confirmUndo} disabled={busy}>
                {busy ? "Undoing…" : "Confirm undo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
