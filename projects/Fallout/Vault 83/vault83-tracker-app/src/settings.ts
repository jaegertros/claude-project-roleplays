// Settings persistence in localStorage.

const SETTINGS_KEY = "vault83-tracker.settings.v1";

const MACHINE_DEFAULTS = {
  pythonPath: "C:\\Python313\\python.exe",
  vault83StateDir:
    "C:\\Users\\cwadd\\Documents\\GitHub\\llm-roleplay\\projects\\Fallout\\Vault 83\\vault83-state",
} as const;

export interface Settings {
  alwaysOnTop: boolean;             // restored on app start

  // Service management (Tauri-only; ignored in browser dev)
  manageServices: boolean;          // master switch — if true the app spawns the MCP server
  autoStartServices: boolean;       // if true, start it automatically on app launch
  pythonPath: string;
  vault83StateDir: string;
}

const DEFAULTS: Settings = {
  alwaysOnTop: true,

  manageServices: true,
  autoStartServices: true,
  pythonPath: MACHINE_DEFAULTS.pythonPath,
  vault83StateDir: MACHINE_DEFAULTS.vault83StateDir,
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
      pythonPath: pickText(parsed.pythonPath, DEFAULTS.pythonPath),
      vault83StateDir: pickText(parsed.vault83StateDir, DEFAULTS.vault83StateDir),
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
