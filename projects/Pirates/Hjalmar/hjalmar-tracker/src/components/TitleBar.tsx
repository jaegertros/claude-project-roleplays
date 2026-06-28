interface TitleBarProps {
  onOpenSettings: () => void;
}

export function TitleBar({ onOpenSettings }: TitleBarProps) {
  return (
    <header className="titlebar">
      <span className="titlebar-anchor" aria-hidden="true">
        ⚓
      </span>
      <div>
        <h1>SANKT HJALMAR</h1>
        <div className="titlebar-sub">
          ── Logbook · Anno Domini MDCCXV ──
        </div>
      </div>
      <span className="titlebar-spacer" />
      <button className="brass" onClick={onOpenSettings} title="Settings">
        Settings
      </button>
    </header>
  );
}
