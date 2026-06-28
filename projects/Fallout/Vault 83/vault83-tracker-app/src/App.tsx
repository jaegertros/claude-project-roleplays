import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { loadSettings, saveSettings, type Settings } from "./settings";
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
import PipBoyTracker from "./components/PipBoyTracker";

function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

const EMPTY_SERVICES: ServicesSnapshot = {
  mcp: { running: false, pid: null, started_at: null, last_error: null, last_exit_code: null },
};

function settingsToServicesConfig(s: Settings): ServicesConfig | null {
  const partial = {
    python_path: s.pythonPath,
    vault83_state_dir: s.vault83StateDir,
  };
  return configIsComplete(partial) ? partial : null;
}

export function App() {
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [showSettings, setShowSettings] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [services, setServices] = useState<ServicesSnapshot>(EMPTY_SERVICES);
  const [servicesErr, setServicesErr] = useState<string | null>(null);

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
    const needs = !settings.pythonPath || !settings.vault83StateDir;
    if (!needs) return;
    didAutoDetect.current = true;
    void (async () => {
      const d = await detectPaths();
      const merged: Settings = {
        ...settings,
        pythonPath: settings.pythonPath || d.python || "",
        vault83StateDir: settings.vault83StateDir || d.vault83_state_dir || "",
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
      setServicesErr("Fill in the Python and vault83-state paths before starting.");
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

  return (
    <div className="app">
      <TitleBar
        alwaysOnTop={settings.alwaysOnTop}
        services={services}
        showServiceControls={settings.manageServices}
        onToggleAlwaysOnTop={toggleAlwaysOnTop}
        onOpenSettings={() => setShowSettings(true)}
        onOpenLogs={() => setShowLogs(true)}
        onStartServices={startNow}
        onStopServices={stopNow}
      />

      {servicesErr && (
        <div className="banner banner-err">
          Services: {servicesErr}
          <button className="banner-action" onClick={() => setShowSettings(true)}>Open settings</button>
        </div>
      )}

      <main className="app-body">
        <PipBoyTracker />
      </main>

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
