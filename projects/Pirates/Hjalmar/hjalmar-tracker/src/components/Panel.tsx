import { useState, type ReactNode } from "react";

interface PanelProps {
  title: string;
  count?: number | string;
  defaultOpen?: boolean;
  children: ReactNode;
  right?: ReactNode;
}

export function Panel({
  title,
  count,
  defaultOpen = true,
  children,
  right,
}: PanelProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={`panel ${open ? "open" : "closed"}`}>
      <header className="panel-header" onClick={() => setOpen((o) => !o)}>
        <span className="panel-chevron">{open ? "▼" : "▶"}</span>
        <span className="panel-title">{title}</span>
        {count !== undefined && <span className="panel-count">{count}</span>}
        {right && (
          <span className="panel-right" onClick={(e) => e.stopPropagation()}>
            {right}
          </span>
        )}
      </header>
      {open && <div className="panel-body">{children}</div>}
    </section>
  );
}
