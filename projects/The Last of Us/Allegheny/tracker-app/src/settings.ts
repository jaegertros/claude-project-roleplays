// Settings persistence in localStorage.

const SETTINGS_KEY = "allegheny-tracker.settings.v2";

const MACHINE_DEFAULTS = {
  pythonPath: "C:\\Python313\\python.exe",
  narratorStateDir:
    "C:\\Users\\cwadd\\Documents\\GitHub\\narrator-state",
  cloudflaredPath: "C:\\Program Files (x86)\\cloudflared\\cloudflared.exe",
  cloudflaredConfig: "C:\\Users\\cwadd\\.cloudflared\\config.yml",
} as const;

export interface Settings {
  // Connection
  serverUrl: string;        // Where the tracker polls. Auto-set to http://127.0.0.1:8765 when managing services. Manual override otherwise.
  bearerToken: string;      // optional, matches NARRATOR_REST_TOKEN env on server
  project: string;          // narrator-state project name, default "allegheny"
  pollIntervalMs: number;   // tracker auto-refresh cadence; 0 disables
  alwaysOnTop: boolean;     // restored on app start

  // Service management (Tauri-only; ignored in browser dev)
  manageServices: boolean;          // master switch — if true the app spawns the MCP server + tunnel
  autoStartServices: boolean;       // if true, start them automatically on app launch
  pythonPath: string;
  narratorStateDir: string;
  cloudflaredPath: string;
  cloudflaredConfig: string;
  tunnelHostname: string;           // displayed in UI; not used for tracker polling
}

const DEFAULTS: Settings = {
  serverUrl: "http://127.0.0.1:8765",
  bearerToken: "",
  project: "allegheny",
  pollIntervalMs: 5000,
  alwaysOnTop: true,

  manageServices: true,
  autoStartServices: true,
  pythonPath: MACHINE_DEFAULTS.pythonPath,
  narratorStateDir: MACHINE_DEFAULTS.narratorStateDir,
  cloudflaredPath: MACHINE_DEFAULTS.cloudflaredPath,
  cloudflaredConfig: MACHINE_DEFAULTS.cloudflaredConfig,
  tunnelHostname: "",
};

function pickText(value: string | undefined, fallback: string): string {
  return value && value.trim() ? value : fallback;
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      ...DEFAULTS,
      ...parsed,
      serverUrl: pickText(parsed.serverUrl, DEFAULTS.serverUrl),
      project: pickText(parsed.project, DEFAULTS.project),
      pythonPath: pickText(parsed.pythonPath, DEFAULTS.pythonPath),
      narratorStateDir: pickText(parsed.narratorStateDir, DEFAULTS.narratorStateDir),
      cloudflaredPath: pickText(parsed.cloudflaredPath, DEFAULTS.cloudflaredPath),
      cloudflaredConfig: pickText(parsed.cloudflaredConfig, DEFAULTS.cloudflaredConfig),
      tunnelHostname: pickText(parsed.tunnelHostname, DEFAULTS.tunnelHostname),
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveSettings(s: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

export function defaultSettings(): Settings {
  return { ...DEFAULTS };
}
