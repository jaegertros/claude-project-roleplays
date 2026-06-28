import { useEffect, useRef, useState } from "react";
import { getServicesLogs, onServicesLog, type LogLine } from "../services";

interface Props {
  onClose: () => void;
}

const MAX_LINES = 500;

export function LogViewer({ onClose }: Props) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [stick, setStick] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Seed with whatever the Rust ring buffer has, then subscribe to new lines.
  useEffect(() => {
    let alive = true;
    void getServicesLogs(MAX_LINES).then((seed) => {
      if (alive) setLines(seed);
    });
    const offPromise = onServicesLog((line) => {
      setLines((prev) => {
        const next = [...prev, line];
        return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
      });
    });
    return () => {
      alive = false;
      void offPromise.then((off) => off());
    };
  }, []);

  // Stick to bottom when new lines arrive.
  useEffect(() => {
    if (!stick) return;
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines, stick]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal wide tall log-modal" onClick={(e) => e.stopPropagation()}>
        <header className="log-header">
          <h2>MCP logs</h2>
          <div className="log-filter">
            <label className="checkbox-row">
              <input type="checkbox" checked={stick} onChange={(e) => setStick(e.target.checked)} />
              <span>follow</span>
            </label>
            <button onClick={onClose}>Close</button>
          </div>
        </header>

        <div
          className="log-body"
          onScroll={(e) => {
            const el = e.currentTarget;
            const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
            if (stick !== atBottom) setStick(atBottom);
          }}
        >
          {lines.length === 0 ? (
            <div className="muted small">No log lines yet.</div>
          ) : (
            lines.map((l, i) => (
              <div key={i} className={`log-line src-${l.source} stream-${l.stream}`}>
                <span className="log-src">{l.source}</span>
                <span className="log-stream">{l.stream}</span>
                <span className="log-text">{l.line}</span>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
