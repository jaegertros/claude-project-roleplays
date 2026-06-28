import type { ConnStatus } from "../useNarratorState";
import type { ServicesSnapshot } from "../services";

interface TitleBarProps {
  alwaysOnTop: boolean;
  status: ConnStatus;
  services: ServicesSnapshot;
  showServiceControls: boolean;
  onToggleAlwaysOnTop: () => void;
  onOpenSettings: () => void;
  onOpenLogs: () => void;
  onRefresh: () => void;
  onStartServices: () => void;
  onStopServices: () => void;
}

export function TitleBar({
  alwaysOnTop,
  status,
  services,
  showServiceControls,
  onToggleAlwaysOnTop,
  onOpenSettings,
  onOpenLogs,
  onRefresh,
  onStartServices,
  onStopServices,
}: TitleBarProps) {
  const anyRunning = services.mcp.running || services.tunnel.running;

  return (
    <header className="titlebar" data-tauri-drag-region>
      <span className="titlebar-name" data-tauri-drag-region>Allegheny</span>

      {showServiceControls && (
        <span className="svc-dots" title="Service status">
          <ServiceDot label="MCP" state={services.mcp} />
          <ServiceDot label="Tunnel" state={services.tunnel} />
        </span>
      )}

      <span className="titlebar-spacer" data-tauri-drag-region />

      {showServiceControls && (
        <>
          {anyRunning ? (
            <button
              className="titlebar-btn"
              onClick={onStopServices}
              title="Stop services"
            >
              ■
            </button>
          ) : (
            <button
              className="titlebar-btn"
              onClick={onStartServices}
              title="Start services"
            >
              ▶
            </button>
          )}
          <button className="titlebar-btn" onClick={onOpenLogs} title="Service logs">
            ≡
          </button>
        </>
      )}

      <button
        className={`titlebar-btn ${alwaysOnTop ? "on" : ""}`}
        onClick={onToggleAlwaysOnTop}
        title={alwaysOnTop ? "Pinned on top — click to unpin" : "Click to pin on top"}
      >
        {alwaysOnTop ? "📌" : "📍"}
      </button>
      <button className="titlebar-btn" onClick={onRefresh} title="Refresh now">↻</button>
      <button className="titlebar-btn" onClick={onOpenSettings} title="Settings">⚙</button>
      <span className={`titlebar-dot dot-${status}`} title={`Tracker status: ${status}`} />
    </header>
  );
}

function ServiceDot({ label, state }: { label: string; state: ServicesSnapshot["mcp"] }) {
  const cls = state.running ? "on" : state.last_exit_code != null ? "crashed" : "off";
  const tip = state.running
    ? `${label} running (pid ${state.pid ?? "?"})`
    : state.last_exit_code != null
    ? `${label} exited with code ${state.last_exit_code}`
    : `${label} not started`;
  return (
    <span className={`svc-dot ${cls}`} title={tip}>
      <span className="svc-dot-pip" />
      <span className="svc-dot-lbl">{label}</span>
    </span>
  );
}
