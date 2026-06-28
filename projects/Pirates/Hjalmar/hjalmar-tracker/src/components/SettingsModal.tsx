import { useRef, useState } from "react";
import type { UseHjalmarState } from "../state";

interface Props {
  store: UseHjalmarState;
  onClose: () => void;
}

export function SettingsModal({ store, onClose }: Props) {
  const [importText, setImportText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function exportNow() {
    const json = store.exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hjalmar-logbook-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyToClipboard() {
    const json = store.exportJSON();
    void navigator.clipboard.writeText(json);
  }

  function doImport() {
    setError(null);
    const r = store.importJSON(importText);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    onClose();
  }

  function onFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      setImportText(text);
    };
    reader.readAsText(file);
  }

  function doReset() {
    store.reset();
    setConfirmReset(false);
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Logbook Settings</h2>

        <h3>Export</h3>
        <div className="modal-row">
          <button onClick={exportNow}>Download JSON</button>
          <button onClick={copyToClipboard}>Copy to clipboard</button>
        </div>

        <h3>Import</h3>
        <p className="small muted">
          Paste a previously exported logbook below, or upload a file.
        </p>
        <div style={{ marginBottom: 6 }}>
          <input
            type="file"
            accept="application/json,.json"
            ref={fileRef}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
        </div>
        <textarea
          placeholder="{ ... }"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          rows={6}
        />
        {error && (
          <div className="small" style={{ color: "var(--blood)", marginTop: 4 }}>
            {error}
          </div>
        )}
        <div className="modal-row">
          <button onClick={doImport} disabled={!importText.trim()}>
            Replace state with import
          </button>
        </div>

        <h3>Reset</h3>
        {confirmReset ? (
          <div className="modal-row">
            <button className="danger" onClick={doReset}>
              Yes, wipe and re-seed
            </button>
            <button onClick={() => setConfirmReset(false)}>Cancel</button>
          </div>
        ) : (
          <div className="modal-row">
            <button onClick={() => setConfirmReset(true)}>
              Reset to defaults
            </button>
          </div>
        )}

        <div className="ornament" style={{ marginTop: 14 }}>
          ∽ ⚓ ∽
        </div>

        <div className="modal-row modal-actions">
          <button className="primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
