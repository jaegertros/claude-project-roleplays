import type { ServicesSnapshot } from "../services";

interface TitleBarProps {
  alwaysOnTop: boolean;
  services: ServicesSnapshot;
  showServiceControls: boolean;
  onToggleAlwaysOnTop: () => void;
  onOpenSettings: () => void;
  onOpenLogs: () => void;
  onStartServices: () => void;
  onStopServices: () => void;
}

export function TitleBar({
  alwaysOnTop,
  services,
  showServiceControls,
  onToggleAlwaysOnTop,
  onOpenSettings,
  onOpenLogs,
  onStartServices,
  onStopServices,
}: TitleBarProps) {
  const running = services.mcp.running;

  return (
    <header className="titlebar" data-tauri-drag-region>
      <span className="titlebar-name" data-tauri-drag-region>Vault 83</span>

      {showServiceControls && (
        <span className="svc-dots" title="Service status">
          <ServiceDot label="MCP" state={services.mcp} />
        </span>
      )}

      <span className="titlebar-spacer" data-tauri-drag-region />

      {showServiceControls && (
        <>
          {running ? (
            <button
              className="titlebar-btn"
              onClick={onStopServices}
              title="Stop MCP server"
            >
              ■
            </button>
          ) : (
            <button
              className="titlebar-btn"
              onClick={onStartServices}
              title="Start MCP server"
            >
              ▶
            </button>
          )}
          <button className="titlebar-btn" onClick={onOpenLogs} title="MCP logs">
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
      <button className="titlebar-btn" onClick={onOpenSettings} title="Settings">⚙</button>
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
