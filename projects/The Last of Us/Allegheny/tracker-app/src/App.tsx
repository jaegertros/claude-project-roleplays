import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { loadSettings, saveSettings, type Settings } from "./settings";
import { useNarratorState } from "./useNarratorState";
import { useExtensionState } from "./useExtensionState";
import {
  configIsComplete,
  detectPaths,
  getServicesStatus,
  onServicesStatus,
  startServices,
  stopServices,
  type ServicesConfig,
  type ServicesSnapshot,
} from "./services";
import { TitleBar } from "./components/TitleBar";
import { SettingsModal } from "./components/SettingsModal";
import { LogViewer } from "./components/LogViewer";
import { ClockPanel } from "./components/ClockPanel";
import { PlayerPanel } from "./components/PlayerPanel";
import { CharactersPanel } from "./components/CharactersPanel";
import { MissionsPanel } from "./components/MissionsPanel";
import { FactionsPanel } from "./components/FactionsPanel";
import { FlagsPanel } from "./components/FlagsPanel";
import { MemoryBookPanel } from "./components/MemoryBookPanel";
import { LostPanel } from "./components/LostPanel";
import { StatusStrip } from "./components/StatusStrip";
import { PendingBeatsPanel } from "./components/PendingBeatsPanel";
import { AgreementsPanel } from "./components/AgreementsPanel";
import { ResidencyPanel } from "./components/ResidencyPanel";
import { CommitmentLogPanel } from "./components/CommitmentLogPanel";
import { CorrectionsPanel } from "./components/CorrectionsPanel";
import { BitsPanel } from "./components/BitsPanel";

function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

const EMPTY_SERVICES: ServicesSnapshot = {
  mcp: { running: false, pid: null, started_at: null, last_error: null, last_exit_code: null },
  tunnel: { running: false, pid: null, started_at: null, last_error: null, last_exit_code: null },
};

function settingsToServicesConfig(s: Settings): ServicesConfig | null {
  const partial = {
    python_path: s.pythonPath,
    narrator_state_dir: s.narratorStateDir,
    cloudflared_path: s.cloudflaredPath,
    cloudflared_config: s.cloudflaredConfig,
  };
  return configIsComplete(partial) ? partial : null;
}

export function App() {
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [showSettings, setShowSettings] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [services, setServices] = useState<ServicesSnapshot>(EMPTY_SERVICES);
  const [servicesErr, setServicesErr] = useState<string | null>(null);

  const store = useNarratorState(settings);
  const extStore = useExtensionState(settings);
  const didAutoDetect = useRef(false);
  const didAutoStart = useRef(false);

  // Restore always-on-top on startup.
  useEffect(() => {
    if (!isTauri()) return;
    void getCurrentWindow().setAlwaysOnTop(settings.alwaysOnTop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to live service status updates from the Rust side.
  useEffect(() => {
    if (!isTauri()) return;
    void getServicesStatus().then(setServices);
    const offPromise = onServicesStatus(setServices);
    return () => {
      void offPromise.then((off) => off());
    };
  }, []);

  // First-run path detection — only when settings are missing values.
  useEffect(() => {
    if (didAutoDetect.current) return;
    if (!isTauri()) return;
    const needs =
      !settings.pythonPath ||
      !settings.narratorStateDir ||
      !settings.cloudflaredPath ||
      !settings.cloudflaredConfig;
    if (!needs) return;
    didAutoDetect.current = true;
    void (async () => {
      const d = await detectPaths();
      const merged: Settings = {
        ...settings,
        pythonPath: settings.pythonPath || d.python || "",
        narratorStateDir: settings.narratorStateDir || d.narrator_state_dir || "",
        cloudflaredPath: settings.cloudflaredPath || d.cloudflared || "",
        cloudflaredConfig: settings.cloudflaredConfig || d.cloudflared_config || "",
        tunnelHostname: settings.tunnelHostname || d.tunnel_hostname || "",
      };
      setSettings(merged);
      saveSettings(merged);
    })();
  }, [settings]);

  // Auto-start services on first launch if configured.
  useEffect(() => {
    if (didAutoStart.current) return;
    if (!isTauri()) return;
    if (!settings.manageServices || !settings.autoStartServices) return;
    const cfg = settingsToServicesConfig(settings);
    if (!cfg) return; // wait until paths are filled in
    didAutoStart.current = true;
    void (async () => {
      try {
        await startServices(cfg);
        setServicesErr(null);
      } catch (e) {
        setServicesErr(e instanceof Error ? e.message : String(e));
      }
    })();
  }, [settings]);

  function applySettings(next: Settings) {
    setSettings(next);
    saveSettings(next);
    setShowSettings(false);
  }

  async function toggleAlwaysOnTop() {
    const next = { ...settings, alwaysOnTop: !settings.alwaysOnTop };
    setSettings(next);
    saveSettings(next);
    if (isTauri()) {
      await getCurrentWindow().setAlwaysOnTop(next.alwaysOnTop);
    }
  }

  async function startNow() {
    setServicesErr(null);
    const cfg = settingsToServicesConfig(settings);
    if (!cfg) {
      setShowSettings(true);
      setServicesErr("Fill in all service paths before starting.");
      return;
    }
    try {
      await startServices(cfg);
    } catch (e) {
      setServicesErr(e instanceof Error ? e.message : String(e));
    }
  }

  async function stopNow() {
    setServicesErr(null);
    try {
      await stopServices();
    } catch (e) {
      setServicesErr(e instanceof Error ? e.message : String(e));
    }
  }

  const { state, status, error, lastSyncAt, refresh } = store;
  const servicesActive = services.mcp.running || services.tunnel.running;
  const showStartHint =
    settings.manageServices && !servicesActive && status !== "ok" && state == null;

  return (
    <div className="app">
      <TitleBar
        alwaysOnTop={settings.alwaysOnTop}
        status={status}
        services={services}
        showServiceControls={settings.manageServices}
        onToggleAlwaysOnTop={toggleAlwaysOnTop}
        onOpenSettings={() => setShowSettings(true)}
        onOpenLogs={() => setShowLogs(true)}
        onRefresh={() => void refresh()}
        onStartServices={startNow}
        onStopServices={stopNow}
      />

      {servicesErr && (
        <div className="banner banner-err">
          Services: {servicesErr}
          <button className="banner-action" onClick={() => setShowSettings(true)}>Open settings</button>
        </div>
      )}

      {settings.manageServices && settings.tunnelHostname && services.tunnel.running && (
        <div className="banner banner-info">
          Claude reaches it at <code>https://{settings.tunnelHostname}</code>
        </div>
      )}

      <main className="app-body">
        {showStartHint && (
          <div className="empty">
            <p className="muted">Services aren't running yet.</p>
            <button className="primary" onClick={startNow}>Start MCP & tunnel</button>
            <button onClick={() => setShowSettings(true)}>Open Settings</button>
          </div>
        )}

        {!state && status === "loading" && !showStartHint && <div className="empty muted">Connecting…</div>}
        {!state && status === "error" && !showStartHint && (
          <div className="empty">
            <p className="probe-err">Can't reach server.</p>
            <p className="muted small">{error}</p>
            <div className="modal-row">
              {settings.manageServices ? (
                <button onClick={startNow}>Start services</button>
              ) : (
                <button onClick={() => setShowSettings(true)}>Open Settings</button>
              )}
            </div>
          </div>
        )}

        {state && (
          <>
            <ClockPanel clock={state.clock} />
            {extStore.ext && (
              <PendingBeatsPanel
                pending={extStore.ext.pending}
                overdue={extStore.ext.overdue}
              />
            )}
            <PlayerPanel player={state.player} />
            <CharactersPanel characters={state.characters} />
            <MissionsPanel missions={state.missions} />
            {extStore.ext && <AgreementsPanel agreements={extStore.ext.agreements} />}
            {extStore.ext && <ResidencyPanel residency={extStore.ext.residency} />}
            <FactionsPanel
              factionsKnown={state.factions_known}
              settings={settings}
              onAfterChange={() => void refresh()}
            />
            <FlagsPanel
              flags={state.flags}
              settings={settings}
              onAfterChange={() => void refresh()}
            />
            {extStore.ext && <CommitmentLogPanel commitments={extStore.ext.commitments} />}
            {extStore.ext && <CorrectionsPanel corrections={extStore.ext.corrections} />}
            {extStore.ext && <BitsPanel bits={extStore.ext.bits} />}
            <MemoryBookPanel entries={state.memory_book} />
            <LostPanel lost={state.lost} />
            {extStore.status === "error" && extStore.error && (
              <div className="ext-err small muted">
                Extension tables: {extStore.error}
              </div>
            )}
          </>
        )}
      </main>

      <StatusStrip
        status={status}
        error={error}
        lastSyncAt={lastSyncAt}
        state={state}
        settings={settings}
        onAfterUndo={() => {
          void refresh();
          void extStore.refresh();
        }}
        overdueBeats={extStore.ext?.overdue.length ?? 0}
      />

      {showSettings && (
        <SettingsModal
          initial={settings}
          onClose={() => setShowSettings(false)}
          onSave={applySettings}
        />
      )}

      {showLogs && <LogViewer onClose={() => setShowLogs(false)} />}
    </div>
  );
}
