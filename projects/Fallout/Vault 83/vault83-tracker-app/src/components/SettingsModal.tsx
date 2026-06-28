import { useEffect, useState } from "react";
import type { Settings } from "../settings";
import { detectPaths } from "../services";

interface SettingsModalProps {
  initial: Settings;
  onClose: () => void;
  onSave: (s: Settings) => void;
}

export function SettingsModal({ initial, onClose, onSave }: SettingsModalProps) {
  const [draft, setDraft] = useState<Settings>(initial);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    setDraft(initial);
  }, [initial]);

  async function runDetect() {
    setDetecting(true);
    try {
      const d = await detectPaths();
      setDraft((prev) => ({
        ...prev,
        pythonPath: prev.pythonPath || d.python || "",
        vault83StateDir: prev.vault83StateDir || d.vault83_state_dir || "",
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
            <span>This app manages the vault83-state MCP server</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={draft.autoStartServices}
              disabled={!draft.manageServices}
              onChange={(e) => setDraft({ ...draft, autoStartServices: e.target.checked })}
            />
            <span>Start it automatically when the app launches</span>
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
              onChange={(e) => setDraft({ ...draft, pythonPath: e.target.value })}
              placeholder="C:\\Python313\\python.exe"
            />
          </label>

          <label>
            <span>vault83-state directory</span>
            <input
              type="text"
              value={draft.vault83StateDir}
              onChange={(e) => setDraft({ ...draft, vault83StateDir: e.target.value })}
              placeholder="…\\projects\\Fallout\\Vault 83\\vault83-state"
            />
            <small className="muted">
              The folder containing <code>pyproject.toml</code> and{" "}
              <code>src/vault83_state/</code>.
            </small>
          </label>
        </fieldset>

        <fieldset>
          <legend>Window</legend>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={draft.alwaysOnTop}
              onChange={(e) => setDraft({ ...draft, alwaysOnTop: e.target.checked })}
            />
            <span>Always on top</span>
          </label>
        </fieldset>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={() => onSave(draft)}>Save</button>
        </div>
      </div>
    </div>
  );
}
