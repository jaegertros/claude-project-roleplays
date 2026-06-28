import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus, X, Edit3, Save, ChevronDown, ChevronRight,
  Upload, Download, RotateCcw, AlertCircle, Skull,
  MapPin, Eye, Package, Users, Target, Bookmark, Flag,
  Wifi, WifiOff, RefreshCw, Settings as SettingsIcon, Check,
} from "lucide-react";

const STORAGE_KEY = "allegheny-tracker";
const SETTINGS_KEY = "allegheny-tracker-settings";
const SCHEMA_VERSION = "1.0";

// -----------------------------------------------------------------------
// Connected mode — call the narrator-state MCP server via the Anthropic API
// -----------------------------------------------------------------------
//
// In "Connected" mode the tracker invokes MCP tools by spawning a Claude
// API call from inside the artifact with mcp_servers configured. The
// artifact runtime handles authentication; no API key is needed here.
//
// This works for ANY remote MCP server reachable from Anthropic's
// infrastructure. For narrator-state specifically, the user needs to:
//   1. Run the server with HTTP/SSE transport (not stdio)
//   2. Expose it publicly via Cloudflare Tunnel, ngrok, a VPS, etc.
//   3. Paste the URL into Settings below
//
// In "Manual" mode the tracker uses window.storage only and the user
// syncs by copy/paste import/export. Default is Manual.
// -----------------------------------------------------------------------

/**
 * Call a tool on a remote MCP server via the Anthropic API.
 *
 * The artifact runtime authenticates as the logged-in user. We ask Claude
 * to invoke a specific tool with specific args, then parse the tool result
 * from the response's content blocks.
 *
 * Returns { ok: true, result } on success or { ok: false, error } on failure.
 */
async function callMcpTool({ serverUrl, serverName, toolName, args, log }) {
  const logEntry = {
    ts: new Date().toISOString(),
    toolName,
    args,
    serverUrl,
    serverName,
  };
  const pushLog = (extra) => {
    if (typeof log === "function") log({ ...logEntry, ...extra });
  };

  if (!serverUrl || !serverName || !toolName) {
    const err = "Missing serverUrl, serverName, or toolName.";
    pushLog({ phase: "precheck-fail", error: err });
    return { ok: false, error: err };
  }

  // Build a clear, minimal prompt that asks Claude to call exactly one tool
  // and return only the raw result. We instruct it to respond with JSON only.
  const argsJson = JSON.stringify(args || {}, null, 2);
  const prompt =
    `Call the tool \`${toolName}\` from the \`${serverName}\` MCP server with these arguments:\n\n` +
    `\`\`\`json\n${argsJson}\n\`\`\`\n\n` +
    `Do not explain. Do not summarize. The tool will return a JSON object — ` +
    `your only job is to invoke the tool. The user will read the result directly ` +
    `from the tool output blocks. Reply with just "done" after invoking.`;

  pushLog({ phase: "request", prompt: prompt.slice(0, 300) });

  let response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
        mcp_servers: [
          { type: "url", url: serverUrl, name: serverName },
        ],
      }),
    });
  } catch (e) {
    const err = `Network error before HTTP response: ${e.name}: ${e.message}`;
    pushLog({ phase: "network-throw", error: err, errorName: e.name });
    return { ok: false, error: err };
  }

  if (!response.ok) {
    let text = "";
    try {
      text = await response.text();
    } catch (e) {
      text = `(could not read body: ${e.message})`;
    }
    pushLog({
      phase: "http-error",
      status: response.status,
      statusText: response.statusText,
      bodyPreview: text.slice(0, 500),
    });
    return { ok: false, error: `HTTP ${response.status}: ${text.slice(0, 200)}` };
  }

  let data;
  try {
    data = await response.json();
  } catch (e) {
    pushLog({ phase: "json-parse-fail", error: e.message });
    return { ok: false, error: `Failed to parse JSON response: ${e.message}` };
  }

  pushLog({
    phase: "raw-response",
    rawData: data,
    contentBlockTypes: (data.content || []).map((b) => b.type),
  });

  // Find the mcp_tool_result block(s). We don't know the exact block type
  // string used by the API yet — try the common shapes.
  const toolResultBlocks = (data.content || []).filter(
    (b) =>
      b.type === "mcp_tool_result" ||
      b.type === "tool_result"
  );

  if (toolResultBlocks.length === 0) {
    // No tool result — model may have refused or had an error.
    // Try to pull any text blocks for a useful error message.
    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    pushLog({
      phase: "no-tool-result",
      error: text.slice(0, 500) || "(no text)",
    });
    return {
      ok: false,
      error: `No tool result in response. Text: ${text.slice(0, 200) || "(none)"}`,
    };
  }

  // The result content can be in different shapes. Take the first usable one.
  const block = toolResultBlocks[0];
  let resultPayload = null;

  if (block.content && Array.isArray(block.content)) {
    // Anthropic-shaped tool result: content is an array of {type: "text", text: ...}
    const innerText = block.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("");
    try {
      resultPayload = JSON.parse(innerText);
    } catch {
      resultPayload = innerText;
    }
  } else if (typeof block.content === "string") {
    try {
      resultPayload = JSON.parse(block.content);
    } catch {
      resultPayload = block.content;
    }
  } else {
    resultPayload = block;
  }

  pushLog({ phase: "success", result: resultPayload });
  return { ok: true, result: resultPayload };
}

/**
 * Direct REST call to the narrator-state server's /rest/{tool_name} endpoint.
 *
 * This bypasses the Anthropic API entirely. The artifact's fetch lands at
 * the user's exposed HTTPS endpoint (Cloudflare Tunnel → local FastMCP).
 * The server must have the `server_rest_patch` module loaded so the route
 * exists; without it you'll get a 404.
 *
 * Returns the same shape as callMcpTool: { ok, result } or { ok: false, error }.
 */
async function callRestTool({ baseUrl, toolName, args, token, log }) {
  const logEntry = {
    ts: new Date().toISOString(),
    toolName,
    args,
    transport: "direct-http",
    baseUrl,
  };
  const pushLog = (extra) => {
    if (typeof log === "function") log({ ...logEntry, ...extra });
  };

  if (!baseUrl || !toolName) {
    const err = "Missing baseUrl or toolName.";
    pushLog({ phase: "precheck-fail", error: err });
    return { ok: false, error: err };
  }

  // Normalize: strip trailing slash, build URL.
  const trimmedBase = baseUrl.replace(/\/+$/, "");
  const url = `${trimmedBase}/rest/${encodeURIComponent(toolName)}`;

  pushLog({ phase: "request", url, args });

  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(args || {}),
    });
  } catch (e) {
    const err = `Network error before HTTP response: ${e.name}: ${e.message}`;
    pushLog({ phase: "network-throw", error: err, errorName: e.name });
    return { ok: false, error: err };
  }

  let body;
  try {
    body = await response.text();
  } catch (e) {
    pushLog({ phase: "body-read-fail", error: e.message, status: response.status });
    return { ok: false, error: `Could not read response body: ${e.message}` };
  }

  if (!response.ok) {
    pushLog({
      phase: "http-error",
      status: response.status,
      statusText: response.statusText,
      bodyPreview: body.slice(0, 500),
    });
    return { ok: false, error: `HTTP ${response.status}: ${body.slice(0, 200)}` };
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch (e) {
    pushLog({ phase: "json-parse-fail", error: e.message, bodyPreview: body.slice(0, 300) });
    return { ok: false, error: `Failed to parse JSON: ${e.message}` };
  }

  pushLog({ phase: "success", result: payload });
  return { ok: true, result: payload };
}

// -----------------------------------------------------------------------
// Constants — mirror what the MCP server holds canonical
// -----------------------------------------------------------------------

const KNOWN_FLAGS = [
  "best_friend_mortal_after_week_1",
  "player_mortal_after_explicit_commit",
  "cordyceps_word_unlocked",
  "fireflies_revealed",
  "cause_explained",
  "jackson_named",
  "news_cdc_briefing_seen",
  "news_fedra_announced",
  "news_qz_named",
  "news_fireflies_named",
  "news_cordyceps_named",
];

const KNOWN_FACTIONS = ["FEDRA", "Fireflies", "Hunters", "WLF", "Seraphites", "Jackson", "Rattlers"];

const STORY_PHASES = [
  { id: "pre_outbreak", label: "Pre-outbreak", accent: "amber" },
  { id: "outbreak_week", label: "Outbreak Week", accent: "orange" },
  { id: "qz_era", label: "QZ Era", accent: "blue" },
  { id: "road", label: "The Road", accent: "slate" },
  { id: "year_one_plus", label: "Year 1+", accent: "stone" },
];

const AWARENESS_LABELS = [
  "0 — Before",
  "1 — Something is wrong",
  "2 — Outbreak named",
  "3 — Cordyceps named",
  "4 — Living inside it",
  "5 — Long after",
];

const RELATIONSHIP_OPTIONS = [
  "acquaintance", "friend", "trusted", "close", "romance", "estranged",
];

/**
 * Server may store an arbitrary descriptor in `relationship`
 * (e.g. "romance — partnered Day 1", "best friend (platonic, foundational)").
 * The artifact's dropdown only knows the six canonical values, so on pull
 * we split: pick the canonical word if present, stash the rest as a note.
 *
 * Returns { canonical, note }. If the input is already canonical, note is "".
 * If no canonical word can be found, canonical falls back to "" and the full
 * string lives in note.
 */
function splitRelationship(raw) {
  if (!raw) return { canonical: "", note: "" };
  const lower = raw.toLowerCase();
  for (const opt of RELATIONSHIP_OPTIONS) {
    if (lower === opt) return { canonical: opt, note: "" };
    if (lower.startsWith(opt + " ") || lower.startsWith(opt + "—") || lower.startsWith(opt + " —") || lower.includes(" " + opt + " ") || lower.includes(opt + " —")) {
      const note = raw
        .replace(new RegExp(opt, "i"), "")
        .replace(/^[\s\-—:|,]+/, "")
        .trim();
      return { canonical: opt, note };
    }
  }
  // No canonical word matched — keep the raw string as a note, leave canonical blank
  return { canonical: "", note: raw };
}

const TIER_OPTIONS = [
  "anchor", "romanceable", "non_romance_male", "antagonist", "named_minor",
];

const INITIAL_STATE = {
  schema_version: SCHEMA_VERSION,
  project: "allegheny",
  title: "Project Allegheny",
  clock: {
    story_day: 1,
    story_day_label: "Day 1 (Saturday)",
    story_time: "09:47",
    story_phase: "pre_outbreak",
    location: "PIT Airport",
    awareness: 0,
  },
  player: {
    name: "Caleb",
    age: 32,
    profession: "microbiology postdoc",
    pronouns: "he/him",
    condition: "rested",
    active_injuries: [],
    inventory: [],
  },
  characters: {},
  lost: [],
  factions_known: Object.fromEntries(KNOWN_FACTIONS.map((f) => [f, false])),
  missions: { active: [], completed: [], deferred: [] },
  memory_book: [],
  flags: Object.fromEntries(KNOWN_FLAGS.map((f) => [f, false])),
};

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------

const uid = (prefix = "x") => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

const awarenessAccent = (a) => {
  if (a <= 1) return "border-amber-400/60 bg-amber-400/5";
  if (a === 2) return "border-orange-400/60 bg-orange-400/5";
  if (a === 3) return "border-rose-400/60 bg-rose-400/5";
  if (a === 4) return "border-blue-400/60 bg-blue-400/5";
  return "border-slate-400/60 bg-slate-400/5";
};

const awarenessDotColor = (a) => {
  if (a <= 1) return "bg-amber-400";
  if (a === 2) return "bg-orange-400";
  if (a === 3) return "bg-rose-400";
  if (a === 4) return "bg-blue-400";
  return "bg-slate-400";
};

const phaseLabel = (id) => STORY_PHASES.find((p) => p.id === id)?.label || id;

// -----------------------------------------------------------------------
// Reusable bits
// -----------------------------------------------------------------------

function Section({ title, icon: Icon, children, collapsible = false, defaultOpen = true, count = null }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-stone-900/60 border border-stone-700/60 rounded-lg overflow-hidden">
      <div
        className={`px-4 py-3 flex items-center gap-2 border-b border-stone-700/60 ${
          collapsible ? "cursor-pointer hover:bg-stone-800/60" : ""
        }`}
        onClick={() => collapsible && setOpen(!open)}
      >
        {collapsible && (open ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
        {Icon && <Icon size={14} className="text-stone-400" />}
        <h2 className="text-sm font-semibold tracking-wide text-stone-200 uppercase">
          {title}
          {count !== null && <span className="ml-2 text-stone-500 text-xs font-normal">({count})</span>}
        </h2>
      </div>
      {(!collapsible || open) && <div className="p-4 space-y-3">{children}</div>}
    </div>
  );
}

function EditableField({ value, onChange, placeholder = "", className = "", multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");

  useEffect(() => {
    setDraft(value || "");
  }, [value]);

  const commit = () => {
    onChange(draft);
    setEditing(false);
  };

  if (editing) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className={`bg-stone-800 border border-stone-600 rounded px-2 py-1 text-sm text-stone-200 w-full resize-y min-h-[60px] ${className}`}
        />
      );
    }
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        placeholder={placeholder}
        className={`bg-stone-800 border border-stone-600 rounded px-2 py-1 text-sm text-stone-200 ${className}`}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-text hover:bg-stone-800/60 px-1 -mx-1 rounded ${
        !value ? "text-stone-500 italic" : "text-stone-200"
      } ${className}`}
    >
      {value || placeholder || "—"}
    </span>
  );
}

function SelectField({ value, onChange, options, className = "" }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-stone-800 border border-stone-600 rounded px-2 py-1 text-xs text-stone-200 ${className}`}
    >
      <option value="">—</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Pill({ children, color = "stone", className = "" }) {
  const colorMap = {
    stone: "bg-stone-700/60 text-stone-300",
    amber: "bg-amber-600/30 text-amber-200",
    rose: "bg-rose-600/30 text-rose-200",
    emerald: "bg-emerald-600/30 text-emerald-200",
    blue: "bg-blue-600/30 text-blue-200",
    slate: "bg-slate-600/30 text-slate-200",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colorMap[color] || colorMap.stone} ${className}`}>
      {children}
    </span>
  );
}

// -----------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------

export default function AllegenyTracker() {
  const [state, setState] = useState(INITIAL_STATE);
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importError, setImportError] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  // Connected-mode settings (persisted separately so we can load them before state)
  const [settings, setSettings] = useState({
    mode: "manual", // "manual" | "connected_api" | "connected_http"
    serverUrl: "",         // for connected_api: MCP endpoint URL. for connected_http: REST base URL (no trailing slash)
    serverName: "narrator-state",
    projectName: "allegheny",
    restToken: "",         // optional bearer token for connected_http (matches NARRATOR_REST_TOKEN env var on the server)
  });
  const [showSettings, setShowSettings] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("idle"); // idle | testing | connected | error
  const [connectionError, setConnectionError] = useState("");
  const [syncStatus, setSyncStatus] = useState({ active: 0, lastError: null });

  // Debug log — captures every Connected-mode MCP call lifecycle.
  // Each entry is { ts, toolName, args, phase, ... } pushed by callMcpTool.
  const [debugLog, setDebugLog] = useState([]);
  const [showDebug, setShowDebug] = useState(false);
  const debugLogRef = useRef(debugLog);
  useEffect(() => { debugLogRef.current = debugLog; }, [debugLog]);
  const appendDebug = useCallback((entry) => {
    // Also log to browser console so it's recoverable even if UI is wonky
    try { console.log("[tracker debug]", entry); } catch (e) {}
    setDebugLog((prev) => {
      const next = [...prev, entry];
      // cap at 200 entries to avoid runaway memory
      return next.length > 200 ? next.slice(next.length - 200) : next;
    });
  }, []);
  const clearDebug = useCallback(() => setDebugLog([]), []);

  // Pull-flash — when pullFromServer succeeds, briefly highlight the clock so
  // the user sees the pull landed even if local state happened to match.
  const [pullFlash, setPullFlash] = useState(0);
  useEffect(() => {
    if (!pullFlash) return;
    const t = setTimeout(() => setPullFlash(0), 1500);
    return () => clearTimeout(t);
  }, [pullFlash]);

  // Ref to avoid stale-closure issues in async sync calls
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Load from storage on mount — state and settings independently
  useEffect(() => {
    const load = async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) {
          const parsed = JSON.parse(result.value);
          setState({ ...INITIAL_STATE, ...parsed });
        }
      } catch (e) {
        // no saved state yet
      }
      try {
        const settingsResult = await window.storage.get(SETTINGS_KEY);
        if (settingsResult && settingsResult.value) {
          const parsed = JSON.parse(settingsResult.value);
          setSettings((s) => ({ ...s, ...parsed }));
        }
      } catch (e) {
        // no saved settings
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  // Persist state on change
  const persist = useCallback(async (next) => {
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Save failed:", e);
    }
  }, []);

  useEffect(() => {
    if (loaded) persist(state);
  }, [state, loaded, persist]);

  // Persist settings on change
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set(SETTINGS_KEY, JSON.stringify(settings));
      } catch (e) {
        console.error("Settings save failed:", e);
      }
    })();
  }, [settings, loaded]);

  // -----------------------------------------------------------------------
  // Server sync helpers — dispatch by mode (Anthropic API or direct HTTP)
  // -----------------------------------------------------------------------

  /**
   * Single entry point for invoking a tool on the configured backend.
   * Dispatches by mode:
   *   - "connected_api"  -> Anthropic Messages API + MCP server (server-side)
   *   - "connected_http" -> direct POST to {serverUrl}/rest/{toolName}
   *   - anything else    -> returns { ok: false, error: "..." } and does nothing
   */
  const callTool = useCallback(
    async (toolName, args) => {
      const s = settingsRef.current;
      const fullArgs = { project: s.projectName, ...args };
      if (s.mode === "connected_api") {
        return callMcpTool({
          serverUrl: s.serverUrl,
          serverName: s.serverName,
          toolName,
          args: fullArgs,
          log: appendDebug,
        });
      }
      if (s.mode === "connected_http") {
        return callRestTool({
          baseUrl: s.serverUrl,
          toolName,
          args: fullArgs,
          token: s.restToken,
          log: appendDebug,
        });
      }
      return { ok: false, error: `mode '${s.mode}' is not a connected mode` };
    },
    [appendDebug]
  );

  /**
   * Fire-and-forget tool call used by all the mutator helpers. Returns the
   * parsed result on success or null on failure. Updates syncStatus.
   */
  const syncToServer = useCallback(
    async (toolName, args, { silent = false } = {}) => {
      const s = settingsRef.current;
      // Either connected mode means we're syncing; manual means we are not.
      if (s.mode !== "connected_api" && s.mode !== "connected_http") return null;
      if (!s.serverUrl) return null;

      if (!silent) setSyncStatus((p) => ({ ...p, active: p.active + 1 }));

      const out = await callTool(toolName, args);

      if (!silent) {
        setSyncStatus((p) => ({
          active: Math.max(0, p.active - 1),
          lastError: out.ok ? null : `${toolName}: ${out.error}`,
        }));
      }

      if (!out.ok) {
        console.warn(`MCP ${toolName} failed:`, out.error);
        return null;
      }
      return out.result;
    },
    [appendDebug, callTool]
  );

  /**
   * Test the connection to the configured backend by calling get_state.
   * Dispatches by mode so the same button tests whichever path is active.
   */
  const testConnection = useCallback(async () => {
    setConnectionStatus("testing");
    setConnectionError("");
    const s = settings;
    let result;
    if (s.mode === "connected_http") {
      result = await callRestTool({
        baseUrl: s.serverUrl,
        toolName: "get_state",
        args: { project: s.projectName },
        token: s.restToken,
        log: appendDebug,
      });
    } else {
      result = await callMcpTool({
        serverUrl: s.serverUrl,
        serverName: s.serverName,
        toolName: "get_state",
        args: { project: s.projectName },
        log: appendDebug,
      });
    }
    if (result.ok) {
      setConnectionStatus("connected");
      setConnectionError("");
    } else {
      setConnectionStatus("error");
      setConnectionError(result.error);
    }
  }, [settings, appendDebug]);

  /**
   * Pull full state from the server and overwrite local. Used when first
   * enabling connected mode, or via an explicit refresh button.
   */
  const pullFromServer = useCallback(async () => {
    setSyncStatus((p) => ({ ...p, active: p.active + 1 }));
    const args = {
      project: settings.projectName,
      include_history: false,
      memory_book_entries: 50,
      tier_filter: ["all"],
    };
    let result;
    if (settings.mode === "connected_http") {
      result = await callRestTool({
        baseUrl: settings.serverUrl,
        toolName: "get_state",
        args,
        token: settings.restToken,
        log: appendDebug,
      });
    } else {
      result = await callMcpTool({
        serverUrl: settings.serverUrl,
        serverName: settings.serverName,
        toolName: "get_state",
        args,
        log: appendDebug,
      });
    }
    setSyncStatus((p) => ({
      active: Math.max(0, p.active - 1),
      lastError: result.ok ? null : `get_state: ${result.error}`,
    }));
    if (!result.ok) {
      alert(`Failed to pull from server: ${result.error}`);
      return;
    }
    // Server returns { ok: true, state: {...} } — extract the state.
    const serverState = result.result?.state || result.result;
    if (!serverState) {
      alert("Server returned no state.");
      return;
    }
    // Strip server-internal fields and merge.
    const { _audit_log, _counters, _meta, ...clean } = serverState;
    const flags = {
      ...Object.fromEntries(KNOWN_FLAGS.map((f) => [f, false])),
      ...(clean.flags || {}),
    };
    const factions_known = {
      ...Object.fromEntries(KNOWN_FACTIONS.map((f) => [f, false])),
      ...(clean.factions_known || {}),
    };
    // Normalize character relationships — server may store descriptive strings
    // ("romance — partnered Day 1") while the local dropdown is canonical-only.
    const characters = Object.fromEntries(
      Object.entries(clean.characters || {}).map(([cid, char]) => {
        const { canonical, note } = splitRelationship(char.relationship);
        return [cid, { ...char, relationship: canonical, relationship_note: note }];
      })
    );
    // Preserve local player identity (name/age/profession/condition/pronouns)
    // across a pull. Server has no update_player tool, so those are local-only.
    // Inventory and active_injuries DO sync via add_inventory/log_injury tools,
    // so those should come from the server.
    setState((prev) => {
      const serverPlayer = clean.player || {};
      const mergedPlayer = {
        // local-authored identity fields — keep prev unless server actually has them
        name: serverPlayer.name || prev.player?.name || "",
        age: serverPlayer.age ?? prev.player?.age ?? null,
        profession: serverPlayer.profession || prev.player?.profession || "",
        pronouns: serverPlayer.pronouns || prev.player?.pronouns || "",
        condition: serverPlayer.condition || prev.player?.condition || "",
        // server-authoritative collections
        inventory: serverPlayer.inventory || [],
        active_injuries: serverPlayer.active_injuries || [],
      };
      return { ...INITIAL_STATE, ...clean, characters, player: mergedPlayer, flags, factions_known };
    });
    setPullFlash(Date.now());
  }, [settings, appendDebug]);

  // -----------------------------------------------------------------------
  // Mutators
  // -----------------------------------------------------------------------

  const updateClock = (patch) => {
    setState((s) => ({ ...s, clock: { ...s.clock, ...patch } }));
    // Awareness gets its own tool (monotonic, requires reason)
    if (patch.awareness !== undefined && patch.awareness > state.clock.awareness) {
      syncToServer("advance_awareness", {
        new_tier: patch.awareness,
        reason: "tracker UI update",
      });
    }
    // Other clock fields go through advance_clock
    const clockFields = ["story_day", "story_time", "location", "story_phase", "story_day_label"];
    const hasClockUpdate = clockFields.some((f) => patch[f] !== undefined);
    if (hasClockUpdate) {
      const next = { ...state.clock, ...patch };
      syncToServer("advance_clock", {
        story_day: next.story_day,
        story_time: next.story_time,
        location: next.location,
        story_phase: next.story_phase,
        story_day_label: next.story_day_label,
      });
    }
  };

  const updatePlayer = (patch) => setState((s) => ({ ...s, player: { ...s.player, ...patch } }));

  const updateCharacter = (cid, patch) => {
    setState((s) => ({
      ...s,
      characters: { ...s.characters, [cid]: { ...s.characters[cid], ...patch } },
    }));
    // Only sync fields the server understands
    const serverArgs = { character_id: cid };
    if (patch.relationship !== undefined) serverArgs.relationship = patch.relationship;
    if (patch.condition !== undefined) serverArgs.condition = patch.condition;
    if (patch.present !== undefined) serverArgs.present = patch.present;
    if (patch.name !== undefined) serverArgs.name = patch.name;
    if (patch.tier !== undefined) serverArgs.tier = patch.tier;
    if (Object.keys(serverArgs).length > 1) {
      serverArgs.notes = "tracker UI update";
      syncToServer("update_character", serverArgs);
    }
  };

  const addCharacter = () => {
    const cid = prompt("Character ID (uppercase token, e.g. MAYA):");
    if (!cid) return;
    const id = cid.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
    if (state.characters[id]) {
      alert(`Character ${id} already exists.`);
      return;
    }
    const defaultName = id.charAt(0) + id.slice(1).toLowerCase();
    setState((s) => ({
      ...s,
      characters: {
        ...s.characters,
        [id]: {
          name: defaultName,
          tier: "named_minor",
          relationship: "acquaintance",
          condition: "unscathed",
          alive: true,
          present: false,
          active_injuries: [],
        },
      },
    }));
    syncToServer("update_character", {
      character_id: id,
      name: defaultName,
      tier: "named_minor",
      relationship: "acquaintance",
      present: false,
      notes: "created via tracker",
    });
  };

  const removeCharacter = (cid) => {
    if (!confirm(`Remove ${cid} from the cast? (Use mark-as-lost instead if they died.)`)) return;
    setState((s) => {
      const { [cid]: _, ...rest } = s.characters;
      return { ...s, characters: rest };
    });
    // Server has no "delete character" tool — they persist until they die.
    // We mark them not-present so they fade from get_state's default view.
    syncToServer("update_character", {
      character_id: cid,
      present: false,
      notes: "removed via tracker",
    });
  };

  const markCharacterLost = (cid) => {
    const char = state.characters[cid];
    if (!char) return;
    const dayLabel = prompt("Day of death (e.g., 'Day 7 (Friday) — 23:18'):", state.clock.story_day_label);
    if (!dayLabel) return;
    const cause = prompt("Cause:", "");
    if (cause === null) return;
    const obit = prompt("One-line obit:", "");
    if (obit === null) return;
    setState((s) => {
      const { [cid]: removed, ...rest } = s.characters;
      return {
        ...s,
        characters: rest,
        lost: [
          ...s.lost,
          {
            character_id: cid,
            name: char.name || cid,
            tier: char.tier || "named_minor",
            story_day_label: dayLabel,
            cause,
            obit,
          },
        ],
      };
    });
    syncToServer("record_loss", {
      character_id: cid,
      story_day_label: dayLabel,
      cause,
      one_line_obit: obit,
    });
  };

  const restoreFromLost = (cid) => {
    const lostEntry = state.lost.find((l) => l.character_id === cid);
    if (!lostEntry) return;
    if (!confirm(`Restore ${cid} from the lost list?`)) return;
    setState((s) => ({
      ...s,
      characters: {
        ...s.characters,
        [cid]: {
          name: lostEntry.name,
          tier: lostEntry.tier,
          relationship: "acquaintance",
          condition: "unscathed",
          alive: true,
          present: false,
          active_injuries: [],
        },
      },
      lost: s.lost.filter((l) => l.character_id !== cid),
    }));
  };

  const addInventoryItem = () => {
    const name = prompt("Item name:");
    if (!name) return;
    const notes = prompt("Notes (optional):") || "";
    setState((s) => ({
      ...s,
      player: {
        ...s.player,
        inventory: [...s.player.inventory, { id: uid("item"), name, qty: 1, notes }],
      },
    }));
    syncToServer("add_inventory", { item_name: name, qty: 1, notes });
  };

  const updateInventoryItem = (id, patch) => {
    setState((s) => ({
      ...s,
      player: {
        ...s.player,
        inventory: s.player.inventory.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      },
    }));
    // No clean server-side update for individual items — name/notes/qty changes
    // would require remove+add. Skip sync for in-place edits; user can refresh.
  };

  const removeInventoryItem = (id) => {
    const item = state.player.inventory.find((i) => i.id === id);
    setState((s) => ({
      ...s,
      player: { ...s.player, inventory: s.player.inventory.filter((i) => i.id !== id) },
    }));
    if (item) {
      syncToServer("remove_inventory", { item_name: item.name, qty: item.qty });
    }
  };

  const addInjury = (target) => {
    const bodyPart = prompt("Body part (e.g., left_forearm, foot, neck):");
    if (!bodyPart) return;
    const severity = prompt("Severity (scratch / shallow_cut / cut / deep_wound / bite / spore_exposure):");
    if (!severity) return;
    const source = prompt("Source (one line):") || "";
    const injury = {
      id: uid("inj"),
      body_part: bodyPart,
      severity,
      source,
      clean: true,
      logged_at_story_time: `${state.clock.story_day_label}, ${state.clock.story_time}`,
    };
    if (target === "PLAYER") {
      setState((s) => ({
        ...s,
        player: { ...s.player, active_injuries: [...s.player.active_injuries, injury] },
      }));
    } else {
      setState((s) => ({
        ...s,
        characters: {
          ...s.characters,
          [target]: {
            ...s.characters[target],
            active_injuries: [...(s.characters[target].active_injuries || []), injury],
          },
        },
      }));
    }
    syncToServer("log_injury", {
      character_id: target,
      body_part: bodyPart,
      severity,
      source,
      clean: true,
      clock_bias: "median",
    });
  };

  const removeInjury = (target, injuryId) => {
    if (target === "PLAYER") {
      setState((s) => ({
        ...s,
        player: {
          ...s.player,
          active_injuries: s.player.active_injuries.filter((i) => i.id !== injuryId),
        },
      }));
    } else {
      setState((s) => ({
        ...s,
        characters: {
          ...s.characters,
          [target]: {
            ...s.characters[target],
            active_injuries: (s.characters[target].active_injuries || []).filter(
              (i) => i.id !== injuryId
            ),
          },
        },
      }));
    }
    // The local injury_id won't match the server's. heal_injury requires
    // the server-side id. Skip sync; user can refresh state from server
    // if needed. Healing properly is best done by the narrator.
  };

  const addMission = () => {
    const id = prompt("Mission ID (e.g., M-05):");
    if (!id) return;
    const title = prompt("Title:") || "";
    setState((s) => ({
      ...s,
      missions: {
        ...s.missions,
        active: [
          ...s.missions.active,
          {
            id,
            title,
            sub_state: "started",
            started_at: `${s.clock.story_day_label}, ${s.clock.story_time}`,
          },
        ],
      },
    }));
    syncToServer("start_mission", { mission_id: id, title, notes: "started via tracker" });
  };

  const updateMission = (id, patch) => {
    setState((s) => ({
      ...s,
      missions: {
        ...s.missions,
        active: s.missions.active.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      },
    }));
    if (patch.sub_state !== undefined) {
      syncToServer("update_mission", {
        mission_id: id,
        sub_state: patch.sub_state,
        notes: patch.notes || "",
      });
    }
  };

  const completeMission = (id) => {
    const outcome = prompt("Outcome (one line):") || "";
    setState((s) => {
      const mission = s.missions.active.find((m) => m.id === id);
      if (!mission) return s;
      return {
        ...s,
        missions: {
          ...s.missions,
          active: s.missions.active.filter((m) => m.id !== id),
          completed: [
            ...s.missions.completed,
            {
              ...mission,
              outcome,
              completed_at: `${s.clock.story_day_label}, ${s.clock.story_time}`,
            },
          ],
        },
      };
    });
    syncToServer("complete_mission", { mission_id: id, outcome });
  };

  const removeMission = (id, from) => {
    setState((s) => ({
      ...s,
      missions: { ...s.missions, [from]: s.missions[from].filter((m) => m.id !== id) },
    }));
    // Server has no "remove mission" tool — missions persist. Skip sync.
  };

  const toggleFlag = (flagName) => {
    const nextValue = !state.flags[flagName];
    setState((s) => ({ ...s, flags: { ...s.flags, [flagName]: nextValue } }));
    syncToServer("set_flag", {
      flag_name: flagName,
      value: nextValue,
      notes: "toggled via tracker",
    });
  };

  const toggleFaction = (faction) => {
    const nextValue = !state.factions_known[faction];
    setState((s) => ({
      ...s,
      factions_known: { ...s.factions_known, [faction]: nextValue },
    }));
    syncToServer("set_faction_known", { faction, value: nextValue });
  };

  const addMemoryEntry = () => {
    const summary = prompt("Memory book entry (3-5 sentences summarizing the day):");
    if (!summary) return;
    const inScene = prompt("Characters in scene (comma-separated IDs):") || "";
    const characters = inScene
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);
    setState((s) => ({
      ...s,
      memory_book: [
        ...s.memory_book,
        {
          id: uid("mb"),
          story_day_range: s.clock.story_day_label,
          summary,
          characters_in_scene: characters,
          ended_at: { story_day: s.clock.story_day, story_time: s.clock.story_time },
          awareness_at_end: s.clock.awareness,
        },
      ],
    }));
    syncToServer("finalize_story_day", {
      summary,
      characters_in_scene: characters,
      awareness_at_end: state.clock.awareness,
    });
  };

  const removeMemoryEntry = (id) => {
    setState((s) => ({ ...s, memory_book: s.memory_book.filter((m) => m.id !== id) }));
  };

  // -----------------------------------------------------------------------
  // Import / export / reset
  // -----------------------------------------------------------------------

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.project}-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = () => {
    try {
      const parsed = JSON.parse(importText);
      // Strip internal fields the server uses but artifact doesn't need to display
      const { _audit_log, _counters, ...clean } = parsed;
      // Make sure factions_known and flags have all known keys (in case import is from older state)
      const flags = { ...Object.fromEntries(KNOWN_FLAGS.map((f) => [f, false])), ...(clean.flags || {}) };
      const factions_known = {
        ...Object.fromEntries(KNOWN_FACTIONS.map((f) => [f, false])),
        ...(clean.factions_known || {}),
      };
      setState({ ...INITIAL_STATE, ...clean, flags, factions_known });
      setImportText("");
      setShowImport(false);
      setImportError("");
    } catch (e) {
      setImportError(`Parse error: ${e.message}`);
    }
  };

  const resetAll = () => {
    setState(INITIAL_STATE);
    setConfirmReset(false);
  };

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  if (!loaded) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-stone-400 text-sm">Loading tracker…</div>
      </div>
    );
  }

  const presentCharacters = Object.entries(state.characters).filter(([_, c]) => c.present);
  const otherCharacters = Object.entries(state.characters).filter(([_, c]) => !c.present);
  const accentClass = awarenessAccent(state.clock.awareness);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className={`border-2 rounded-lg p-4 ${accentClass}`}>
          <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-stone-100">
                {state.title}
              </h1>
              <div className="text-xs text-stone-500 mt-0.5">
                Schema {state.schema_version} · Project "{state.project}"
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  editMode
                    ? "bg-amber-600/30 border-amber-500/60 text-amber-100"
                    : "bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {editMode ? <Save size={12} className="inline mr-1" /> : <Edit3 size={12} className="inline mr-1" />}
                {editMode ? "Done" : "Edit"}
              </button>
              <button
                onClick={exportJson}
                className="text-xs px-2.5 py-1 rounded bg-stone-800 border border-stone-600 text-stone-300 hover:bg-stone-700"
                title="Export JSON"
              >
                <Download size={12} />
              </button>
              <button
                onClick={() => setShowImport(!showImport)}
                className="text-xs px-2.5 py-1 rounded bg-stone-800 border border-stone-600 text-stone-300 hover:bg-stone-700"
                title="Import JSON"
              >
                <Upload size={12} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  showSettings
                    ? "bg-stone-700 border-stone-500 text-stone-100"
                    : "bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700"
                }`}
                title="Settings (connect to MCP server)"
              >
                <SettingsIcon size={12} />
              </button>
              <button
                onClick={() => setShowDebug(!showDebug)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors flex items-center gap-1 ${
                  showDebug
                    ? "bg-rose-800/60 border-rose-600 text-rose-100"
                    : "bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700"
                } ${debugLog.some(e => e.phase && e.phase !== "request" && e.phase !== "success" && e.phase !== "raw-response") ? "ring-1 ring-rose-500/60" : ""}`}
                title="Debug log (connected-mode call traces)"
              >
                <AlertCircle size={12} />
                {debugLog.length > 0 && (
                  <span className="text-[10px] tabular-nums">{debugLog.length}</span>
                )}
              </button>
            </div>
          </div>

          {/* Connection status indicator */}
          {(settings.mode === "connected_api" || settings.mode === "connected_http") && (
            <div className="flex items-center gap-2 mb-3 text-xs">
              {syncStatus.active > 0 ? (
                <>
                  <RefreshCw size={11} className="text-blue-400 animate-spin" />
                  <span className="text-blue-300">Syncing… ({syncStatus.active})</span>
                </>
              ) : syncStatus.lastError ? (
                <>
                  <AlertCircle size={11} className="text-rose-400" />
                  <span className="text-rose-300 truncate">Sync error: {syncStatus.lastError}</span>
                  <button
                    onClick={() => setSyncStatus({ active: 0, lastError: null })}
                    className="text-stone-500 hover:text-stone-300 ml-1"
                  >
                    <X size={10} />
                  </button>
                </>
              ) : (
                <>
                  <Wifi size={11} className="text-emerald-400" />
                  <span className="text-emerald-300/80">
                    Connected ({settings.mode === "connected_http" ? "direct HTTP" : "API"})
                  </span>
                  <button
                    onClick={pullFromServer}
                    className="ml-2 text-stone-400 hover:text-stone-200 underline underline-offset-2"
                    title="Pull state from server"
                  >
                    refresh
                  </button>
                </>
              )}
            </div>
          )}

          {/* Clock */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm transition-all duration-700 ${pullFlash ? "ring-2 ring-emerald-500/70 rounded-lg p-2 -m-2 bg-emerald-950/20" : ""}`}>
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wide mb-0.5">Day</div>
              <EditableField
                value={state.clock.story_day_label}
                onChange={(v) => updateClock({ story_day_label: v })}
                placeholder="Day 1 (Saturday)"
                className="text-stone-100 font-medium"
              />
            </div>
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wide mb-0.5">Time</div>
              <EditableField
                value={state.clock.story_time}
                onChange={(v) => updateClock({ story_time: v })}
                placeholder="HH:MM"
                className="text-stone-100 font-mono"
              />
            </div>
            <div className="col-span-2">
              <div className="text-xs text-stone-500 uppercase tracking-wide mb-0.5 flex items-center gap-1">
                <MapPin size={10} /> Location
              </div>
              <EditableField
                value={state.clock.location}
                onChange={(v) => updateClock({ location: v })}
                placeholder="Pittsburgh"
                className="text-stone-100"
              />
            </div>
          </div>

          {/* AWARENESS bar */}
          <div className="mt-4">
            <div className="text-xs text-stone-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <Eye size={10} /> Awareness — {AWARENESS_LABELS[state.clock.awareness]}
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((tier) => (
                <button
                  key={tier}
                  onClick={() => editMode && updateClock({ awareness: tier })}
                  disabled={!editMode}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    tier <= state.clock.awareness ? awarenessDotColor(state.clock.awareness) : "bg-stone-800"
                  } ${editMode ? "hover:scale-105 cursor-pointer" : "cursor-default"}`}
                  title={AWARENESS_LABELS[tier]}
                />
              ))}
            </div>
            <div className="flex gap-1.5 mt-1 text-[10px] text-stone-500">
              {[0, 1, 2, 3, 4, 5].map((tier) => (
                <div key={tier} className="flex-1 text-center">{tier}</div>
              ))}
            </div>
          </div>

          {/* Phase */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-stone-500 uppercase tracking-wide">Phase:</span>
            {editMode ? (
              <SelectField
                value={state.clock.story_phase}
                onChange={(v) => updateClock({ story_phase: v })}
                options={STORY_PHASES.map((p) => p.id)}
              />
            ) : (
              <Pill color={STORY_PHASES.find((p) => p.id === state.clock.story_phase)?.accent || "stone"}>
                {phaseLabel(state.clock.story_phase)}
              </Pill>
            )}
          </div>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SettingsIcon size={14} className="text-stone-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-200">
                  Sync Mode
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-stone-500 hover:text-stone-300"
              >
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSettings((s) => ({ ...s, mode: "manual" }));
                  setConnectionStatus("idle");
                  setConnectionError("");
                }}
                className={`text-xs px-2 py-2 rounded border ${
                  settings.mode === "manual"
                    ? "bg-stone-700 border-stone-500 text-stone-100"
                    : "bg-stone-800 border-stone-600 text-stone-400 hover:bg-stone-700"
                }`}
              >
                <WifiOff size={11} className="inline mr-1" />
                Manual
              </button>
              <button
                onClick={() => setSettings((s) => ({ ...s, mode: "connected_api" }))}
                className={`text-xs px-2 py-2 rounded border ${
                  settings.mode === "connected_api"
                    ? "bg-emerald-800/60 border-emerald-600/60 text-emerald-100"
                    : "bg-stone-800 border-stone-600 text-stone-400 hover:bg-stone-700"
                }`}
                title="Connected via the Anthropic Messages API"
              >
                <Wifi size={11} className="inline mr-1" />
                Connected (API)
              </button>
              <button
                onClick={() => setSettings((s) => ({ ...s, mode: "connected_http" }))}
                className={`text-xs px-2 py-2 rounded border ${
                  settings.mode === "connected_http"
                    ? "bg-blue-800/60 border-blue-600/60 text-blue-100"
                    : "bg-stone-800 border-stone-600 text-stone-400 hover:bg-stone-700"
                }`}
                title="Direct HTTP fetch to your REST-wrapped narrator-state server (path 2)"
              >
                <Wifi size={11} className="inline mr-1" />
                Connected (direct HTTP)
              </button>
            </div>

            {settings.mode === "manual" && (
              <div className="text-xs text-stone-500 leading-relaxed">
                Manual mode uses <code className="bg-stone-800 px-1 rounded">window.storage</code> only.
                Sync to the narrator's state by copying <code className="bg-stone-800 px-1 rounded">~/.narrator-state/{settings.projectName}.json</code> into the Import panel above, or by exporting from here and pasting back into the server's state file.
              </div>
            )}

            {(settings.mode === "connected_api" || settings.mode === "connected_http") && (
              <div className="space-y-3">
                {settings.mode === "connected_api" && (
                  <div className="text-xs text-stone-500 leading-relaxed">
                    <strong className="text-stone-400">Connected (API):</strong> the tracker calls
                    the narrator-state MCP server through the Anthropic Messages API.
                    Your server must be reachable from Anthropic's infrastructure (Cloudflare
                    Tunnel works). Each call costs API tokens. Slower (2–5s/call) but works without
                    CORS.
                  </div>
                )}
                {settings.mode === "connected_http" && (
                  <div className="text-xs text-stone-500 leading-relaxed">
                    <strong className="text-stone-400">Connected (direct HTTP):</strong> the tracker
                    fetches your tunnel URL directly at <code className="bg-stone-800 px-1 rounded">/rest/&lt;tool&gt;</code>.
                    Requires the <code className="bg-stone-800 px-1 rounded">server_rest_patch</code>
                    {" "}module loaded server-side. No API cost, &lt;100ms typical.
                    Server URL should be the <em>base URL</em> (no /mcp suffix).
                  </div>
                )}

                <div>
                  <label className="block text-xs text-stone-400 uppercase tracking-wide mb-1">
                    {settings.mode === "connected_http" ? "Server base URL" : "MCP server URL"}
                  </label>
                  <input
                    type="url"
                    value={settings.serverUrl}
                    onChange={(e) => setSettings((s) => ({ ...s, serverUrl: e.target.value }))}
                    placeholder={
                      settings.mode === "connected_http"
                        ? "https://your-tunnel.trycloudflare.com"
                        : "https://your-tunnel.trycloudflare.com/mcp"
                    }
                    className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-xs font-mono text-stone-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {settings.mode === "connected_api" && (
                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wide mb-1">
                        Server name (API mode)
                      </label>
                      <input
                        type="text"
                        value={settings.serverName}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, serverName: e.target.value }))
                        }
                        placeholder="narrator-state"
                        className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-xs font-mono text-stone-200"
                      />
                    </div>
                  )}
                  {settings.mode === "connected_http" && (
                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wide mb-1">
                        Bearer token (optional)
                      </label>
                      <input
                        type="text"
                        value={settings.restToken}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, restToken: e.target.value }))
                        }
                        placeholder="(matches NARRATOR_REST_TOKEN env var)"
                        className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-xs font-mono text-stone-200"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-stone-400 uppercase tracking-wide mb-1">
                      Project name
                    </label>
                    <input
                      type="text"
                      value={settings.projectName}
                      onChange={(e) =>
                        setSettings((s) => ({ ...s, projectName: e.target.value }))
                      }
                      placeholder="allegheny"
                      className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-xs font-mono text-stone-200"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={testConnection}
                    disabled={!settings.serverUrl || connectionStatus === "testing"}
                    className="text-xs px-3 py-1.5 rounded bg-stone-800 border border-stone-600 text-stone-200 hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    {connectionStatus === "testing" ? (
                      <RefreshCw size={11} className="animate-spin" />
                    ) : connectionStatus === "connected" ? (
                      <Check size={11} className="text-emerald-400" />
                    ) : (
                      <Wifi size={11} />
                    )}
                    Test connection
                  </button>

                  <button
                    onClick={pullFromServer}
                    disabled={!settings.serverUrl}
                    className="text-xs px-3 py-1.5 rounded bg-stone-800 border border-stone-600 text-stone-200 hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                    title="Replace local state with server state"
                  >
                    <Download size={11} />
                    Pull state from server
                  </button>

                  {connectionStatus === "connected" && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check size={11} /> Reachable
                    </span>
                  )}
                  {connectionStatus === "error" && (
                    <span className="text-xs text-rose-400 flex items-center gap-1 max-w-md truncate">
                      <AlertCircle size={11} /> {connectionError}
                    </span>
                  )}
                </div>

                {settings.mode === "connected_http" && (
                  <details className="text-xs text-stone-500">
                    <summary className="cursor-pointer hover:text-stone-400">
                      Setup help (direct HTTP mode)
                    </summary>
                    <div className="mt-2 space-y-2 pl-2 border-l-2 border-stone-700">
                      <p>
                        <strong className="text-stone-400">1.</strong> Drop{" "}
                        <code className="bg-stone-800 px-1 rounded">server_rest_patch.py</code>
                        {" "}into the same package as your <code className="bg-stone-800 px-1 rounded">server.py</code>.
                      </p>
                      <p>
                        <strong className="text-stone-400">2.</strong> Import it from your launcher
                        before calling <code className="bg-stone-800 px-1 rounded">mcp.run(...)</code>:
                      </p>
                      <pre className="bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto">
{`from narrator_state import server
from narrator_state import server_rest_patch  # noqa: F401
server.main()`}
                      </pre>
                      <p>
                        <strong className="text-stone-400">3.</strong> Your existing Cloudflare
                        Tunnel keeps working — the patch adds routes to the same Starlette app.
                        Paste the tunnel base URL above (no <code className="bg-stone-800 px-1 rounded">/mcp</code>).
                      </p>
                      <p>
                        <strong className="text-stone-400">4.</strong> Optional: set{" "}
                        <code className="bg-stone-800 px-1 rounded">NARRATOR_REST_TOKEN</code> in
                        the server's env to require a bearer token, then paste that same token above.
                      </p>
                      <p>
                        <strong className="text-stone-400">5.</strong> Click <em>Test connection</em>.
                        Then <em>Pull state from server</em>. Should be near-instant.
                      </p>
                      <p className="text-stone-600 italic">
                        Note: the narrator (Claude) still uses Anthropic-side MCP, not this REST
                        endpoint, so the connector in Claude settings should still point to the
                        <code className="bg-stone-800 px-1 rounded mx-1">/mcp</code> URL as before.
                        Only the tracker uses direct HTTP.
                      </p>
                    </div>
                  </details>
                )}

                {settings.mode === "connected_api" && (
                <details className="text-xs text-stone-500">
                  <summary className="cursor-pointer hover:text-stone-400">
                    Setup help (Cloudflare Tunnel, ngrok, etc.)
                  </summary>
                  <div className="mt-2 space-y-2 pl-2 border-l-2 border-stone-700">
                    <p>
                      <strong className="text-stone-400">1.</strong> Run the narrator-state server
                      with HTTP transport. In <code className="bg-stone-800 px-1 rounded">server.py</code>,
                      change <code className="bg-stone-800 px-1 rounded">mcp.run()</code> to:
                    </p>
                    <pre className="bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto">
{`mcp.run(transport="streamable-http",
        host="0.0.0.0", port=8000)`}
                    </pre>
                    <p>
                      <strong className="text-stone-400">2.</strong> Expose port 8000 over HTTPS.
                      Easiest: <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" className="underline text-stone-400 hover:text-stone-300" target="_blank" rel="noreferrer">Cloudflare Tunnel</a> (free, no time limit):
                    </p>
                    <pre className="bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto">
{`cloudflared tunnel --url http://localhost:8000`}
                    </pre>
                    <p>
                      Or <a href="https://ngrok.com/" className="underline text-stone-400 hover:text-stone-300" target="_blank" rel="noreferrer">ngrok</a>
                      {" "}(2-hour limit on free tier):
                    </p>
                    <pre className="bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto">
{`ngrok http 8000`}
                    </pre>
                    <p>
                      Or Colab (URL rotates per session, runtime dies after 90 min idle).
                      Or a VPS.
                    </p>
                    <p>
                      <strong className="text-stone-400">3.</strong> Paste the HTTPS URL into the
                      field above (typically ending in <code className="bg-stone-800 px-1 rounded">/mcp</code>)
                      and click <em>Test connection</em>.
                    </p>
                    <p>
                      The narrator (this Claude) also needs to know about the server — add it
                      as a custom connector at{" "}
                      <a
                        href="https://claude.ai/customize/connectors"
                        className="underline text-stone-400 hover:text-stone-300"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Customize → Connectors
                      </a>{" "}
                      using the same URL.
                    </p>
                  </div>
                </details>
                )}
              </div>
            )}
          </div>
        )}

        {/* Debug log panel — toggleable; shows full lifecycle of every Connected-mode MCP call */}
        {showDebug && (
          <div className="bg-stone-900 border border-rose-700/40 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-rose-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-200">
                  Debug log — Connected-mode call lifecycle
                </h3>
                <span className="text-xs text-stone-500">({debugLog.length} entries)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearDebug}
                  className="text-xs px-2 py-1 rounded bg-stone-800 border border-stone-600 text-stone-300 hover:bg-stone-700"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowDebug(false)}
                  className="text-stone-500 hover:text-stone-300"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="text-xs text-stone-500 leading-relaxed">
              Every Connected-mode tool call writes a multi-phase trace here:
              <code className="bg-stone-800 px-1 rounded mx-1">request</code> →
              (<code className="bg-stone-800 px-1 rounded mx-1">network-throw</code> |
              <code className="bg-stone-800 px-1 rounded mx-1">http-error</code> |
              <code className="bg-stone-800 px-1 rounded mx-1">raw-response</code>) →
              (<code className="bg-stone-800 px-1 rounded mx-1">no-tool-result</code> |
              <code className="bg-stone-800 px-1 rounded mx-1">success</code>).
              If you don't see <code className="bg-stone-800 px-1 rounded mx-1">success</code>,
              the call failed — the prior phase shows where. Entries are also logged to the
              browser console with prefix <code className="bg-stone-800 px-1 rounded mx-1">[tracker debug]</code>.
            </div>

            {/* Raw JSON for reliable copy/paste — click the textarea, Ctrl/Cmd+A, then Ctrl/Cmd+C */}
            <div>
              <div className="text-xs text-stone-400 uppercase tracking-wide mb-1 flex items-center justify-between">
                <span>Full log JSON (click in textarea, select all, copy)</span>
                <span className="text-stone-600 text-[10px] normal-case tracking-normal">{debugLog.length} entries</span>
              </div>
              <textarea
                readOnly
                onFocus={(e) => e.target.select()}
                value={JSON.stringify(debugLog, null, 2)}
                className="w-full h-32 bg-stone-950 border border-stone-700 rounded p-2 text-[10px] font-mono text-stone-200"
                placeholder="(no entries yet — click Test connection or Pull state from server in Settings)"
              />
            </div>

            {debugLog.length === 0 ? (
              <div className="text-xs text-stone-600 italic p-3 text-center border border-dashed border-stone-700 rounded">
                No calls logged yet. Click <em>Test connection</em> or <em>Pull state from server</em> in Settings.
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {debugLog.slice().reverse().map((entry, i) => {
                  const phaseColor =
                    entry.phase === "success" ? "border-emerald-700/40 bg-emerald-950/20"
                    : entry.phase === "request" ? "border-stone-700 bg-stone-950"
                    : entry.phase === "raw-response" ? "border-blue-700/40 bg-blue-950/20"
                    : "border-rose-700/40 bg-rose-950/20";
                  return (
                    <div key={`${entry.ts}-${i}`} className={`border ${phaseColor} rounded p-2 text-xs font-mono`}>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-stone-500">{entry.ts?.split("T")[1]?.replace("Z", "") || entry.ts}</span>
                        <span className="text-stone-300 font-semibold">{entry.toolName}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide ${
                          entry.phase === "success" ? "bg-emerald-900/60 text-emerald-200"
                          : entry.phase === "request" ? "bg-stone-700 text-stone-300"
                          : entry.phase === "raw-response" ? "bg-blue-900/60 text-blue-200"
                          : "bg-rose-900/60 text-rose-200"
                        }`}>
                          {entry.phase}
                        </span>
                        {entry.status && (
                          <span className="text-rose-300">HTTP {entry.status}</span>
                        )}
                      </div>
                      {entry.error && (
                        <div className="text-rose-300 text-xs mb-1 break-all">
                          {entry.error}
                        </div>
                      )}
                      {entry.errorName && (
                        <div className="text-rose-400 text-[10px] mb-1">
                          ({entry.errorName})
                        </div>
                      )}
                      {entry.statusText && (
                        <div className="text-stone-400 text-xs mb-1">{entry.statusText}</div>
                      )}
                      {entry.contentBlockTypes && (
                        <div className="text-stone-400 text-xs mb-1">
                          content block types: [{entry.contentBlockTypes.join(", ") || "(empty)"}]
                        </div>
                      )}
                      {entry.bodyPreview && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-stone-400 hover:text-stone-200 text-[10px]">
                            response body
                          </summary>
                          <pre className="mt-1 bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto text-[10px] max-h-40">
                            {entry.bodyPreview}
                          </pre>
                        </details>
                      )}
                      {entry.rawData && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-stone-400 hover:text-stone-200 text-[10px]">
                            raw data (full)
                          </summary>
                          <pre className="mt-1 bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto text-[10px] max-h-60">
                            {JSON.stringify(entry.rawData, null, 2)}
                          </pre>
                        </details>
                      )}
                      {entry.result && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-stone-400 hover:text-stone-200 text-[10px]">
                            parsed result
                          </summary>
                          <pre className="mt-1 bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto text-[10px] max-h-60">
                            {JSON.stringify(entry.result, null, 2)}
                          </pre>
                        </details>
                      )}
                      {entry.args && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-stone-400 hover:text-stone-200 text-[10px]">
                            args
                          </summary>
                          <pre className="mt-1 bg-stone-950 p-2 rounded text-stone-300 overflow-x-auto text-[10px] max-h-40">
                            {JSON.stringify(entry.args, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Import panel */}
        {showImport && (
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-4">
            <div className="text-xs text-stone-400 mb-2">
              Paste JSON from <code className="bg-stone-800 px-1 rounded">~/.narrator-state/allegheny.json</code> or an export:
            </div>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full h-32 bg-stone-950 border border-stone-700 rounded p-2 text-xs font-mono text-stone-200"
              placeholder='{"schema_version": "1.0", ...}'
            />
            {importError && (
              <div className="text-rose-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> {importError}
              </div>
            )}
            <div className="mt-2 flex gap-2">
              <button
                onClick={importJson}
                className="text-xs px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-stone-100"
              >
                Import (overwrites current)
              </button>
              <button
                onClick={() => {
                  setShowImport(false);
                  setImportText("");
                  setImportError("");
                }}
                className="text-xs px-3 py-1 rounded bg-stone-700 hover:bg-stone-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Player + Characters */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Player */}
          <Section title="Player" icon={Users}>
            <div className="space-y-2 text-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-stone-500 text-xs w-16 shrink-0">Name</span>
                <EditableField
                  value={state.player.name}
                  onChange={(v) => updatePlayer({ name: v })}
                  className="font-medium"
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-stone-500 text-xs w-16 shrink-0">Age</span>
                <EditableField
                  value={String(state.player.age || "")}
                  onChange={(v) => updatePlayer({ age: parseInt(v, 10) || null })}
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-stone-500 text-xs w-16 shrink-0">Role</span>
                <EditableField
                  value={state.player.profession}
                  onChange={(v) => updatePlayer({ profession: v })}
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-stone-500 text-xs w-16 shrink-0">Condition</span>
                <EditableField
                  value={state.player.condition}
                  onChange={(v) => updatePlayer({ condition: v })}
                />
              </div>
            </div>

            {state.player.active_injuries.length > 0 && (
              <div className="border-t border-stone-700 pt-3">
                <div className="text-xs text-stone-500 uppercase mb-2 flex items-center justify-between">
                  <span>Active Injuries</span>
                  {editMode && (
                    <button
                      onClick={() => addInjury("PLAYER")}
                      className="text-stone-400 hover:text-stone-200"
                    >
                      <Plus size={12} />
                    </button>
                  )}
                </div>
                <ul className="space-y-1">
                  {state.player.active_injuries.map((inj) => (
                    <li key={inj.id} className="text-xs text-stone-300 flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span className="flex-1">
                        <span className="font-medium">{inj.body_part}</span> — {inj.severity}
                        {inj.source && <span className="text-stone-500"> ({inj.source})</span>}
                        {inj.infection_clock_minutes && (
                          <span className="text-rose-400 ml-2">⏱ {inj.infection_clock_minutes} min</span>
                        )}
                      </span>
                      {editMode && (
                        <button
                          onClick={() => removeInjury("PLAYER", inj.id)}
                          className="text-stone-500 hover:text-rose-400"
                        >
                          <X size={11} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {editMode && state.player.active_injuries.length === 0 && (
              <button
                onClick={() => addInjury("PLAYER")}
                className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1"
              >
                <Plus size={11} /> Add injury
              </button>
            )}
          </Section>

          {/* Inventory */}
          <Section title="Inventory" icon={Package} count={state.player.inventory.length}>
            {state.player.inventory.length === 0 && (
              <div className="text-xs text-stone-500 italic">empty</div>
            )}
            <ul className="space-y-1.5 text-sm">
              {state.player.inventory.map((item) => (
                <li key={item.id} className="flex items-start gap-2">
                  {item.qty > 1 && (
                    <span className="text-stone-500 text-xs font-mono shrink-0 w-6">×{item.qty}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-stone-200">
                      <EditableField
                        value={item.name}
                        onChange={(v) => updateInventoryItem(item.id, { name: v })}
                      />
                    </div>
                    {(item.notes || editMode) && (
                      <div className="text-xs text-stone-500">
                        <EditableField
                          value={item.notes}
                          onChange={(v) => updateInventoryItem(item.id, { notes: v })}
                          placeholder="(notes)"
                        />
                      </div>
                    )}
                  </div>
                  {editMode && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => updateInventoryItem(item.id, { qty: Math.max(1, item.qty - 1) })}
                        className="text-stone-500 hover:text-stone-300 text-xs"
                      >
                        −
                      </button>
                      <button
                        onClick={() => updateInventoryItem(item.id, { qty: item.qty + 1 })}
                        className="text-stone-500 hover:text-stone-300 text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeInventoryItem(item.id)}
                        className="text-stone-500 hover:text-rose-400 ml-1"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {editMode && (
              <button
                onClick={addInventoryItem}
                className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 mt-2"
              >
                <Plus size={11} /> Add item
              </button>
            )}
          </Section>
        </div>

        {/* Characters present */}
        <Section
          title="Characters Present"
          icon={Users}
          count={presentCharacters.length}
        >
          {presentCharacters.length === 0 && (
            <div className="text-xs text-stone-500 italic">none</div>
          )}
          <div className="space-y-3">
            {presentCharacters.map(([cid, char]) => (
              <CharacterCard
                key={cid}
                cid={cid}
                char={char}
                editMode={editMode}
                onUpdate={(patch) => updateCharacter(cid, patch)}
                onRemove={() => removeCharacter(cid)}
                onMarkLost={() => markCharacterLost(cid)}
                onAddInjury={() => addInjury(cid)}
                onRemoveInjury={(injId) => removeInjury(cid, injId)}
              />
            ))}
          </div>
          {editMode && (
            <button
              onClick={addCharacter}
              className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 mt-3"
            >
              <Plus size={11} /> Add character
            </button>
          )}
        </Section>

        {/* Off-screen characters */}
        {otherCharacters.length > 0 && (
          <Section
            title="Off-screen"
            icon={Users}
            count={otherCharacters.length}
            collapsible
            defaultOpen={false}
          >
            <div className="space-y-2">
              {otherCharacters.map(([cid, char]) => (
                <div key={cid} className="text-sm flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-stone-300">{char.name || cid}</span>
                  <span className="text-xs text-stone-500">({cid})</span>
                  <Pill color="stone">{char.relationship || "—"}</Pill>
                  <Pill color="stone">{char.tier || "—"}</Pill>
                  {editMode && (
                    <div className="ml-auto flex gap-1">
                      <button
                        onClick={() => updateCharacter(cid, { present: true })}
                        className="text-xs text-emerald-400 hover:text-emerald-300"
                      >
                        bring on
                      </button>
                      <button
                        onClick={() => markCharacterLost(cid)}
                        className="text-xs text-rose-400 hover:text-rose-300"
                        title="Mark as lost"
                      >
                        <Skull size={11} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Missions */}
        <Section
          title="Missions"
          icon={Target}
          count={state.missions.active.length + state.missions.completed.length}
        >
          {state.missions.active.length > 0 && (
            <div className="space-y-2 mb-3">
              <div className="text-xs text-stone-500 uppercase tracking-wide">Active</div>
              {state.missions.active.map((m) => (
                <div key={m.id} className="bg-stone-800/60 rounded p-2.5 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs text-stone-400">{m.id}</span>
                    <span className="font-medium flex-1">{m.title || "(untitled)"}</span>
                    {editMode && (
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => completeMission(m.id)}
                          className="text-xs text-emerald-400 hover:text-emerald-300"
                        >
                          complete
                        </button>
                        <button
                          onClick={() => removeMission(m.id, "active")}
                          className="text-stone-500 hover:text-rose-400"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    <EditableField
                      value={m.sub_state}
                      onChange={(v) => updateMission(m.id, { sub_state: v })}
                      placeholder="sub-state"
                    />
                  </div>
                  {m.notes && (
                    <div className="text-xs text-stone-400 mt-1 italic">{m.notes}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {state.missions.completed.length > 0 && (
            <details className="text-sm">
              <summary className="text-xs text-stone-500 uppercase tracking-wide cursor-pointer hover:text-stone-400">
                Completed ({state.missions.completed.length})
              </summary>
              <ul className="mt-2 space-y-1">
                {state.missions.completed.slice().reverse().map((m) => (
                  <li key={m.id} className="text-xs flex items-baseline gap-2 group">
                    <span className="font-mono text-stone-500">{m.id}</span>
                    <span className="text-stone-300">{m.title}</span>
                    <span className="text-stone-500">— {m.outcome || "completed"}</span>
                    {editMode && (
                      <button
                        onClick={() => removeMission(m.id, "completed")}
                        className="text-stone-600 hover:text-rose-400 opacity-0 group-hover:opacity-100"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          )}

          {state.missions.active.length === 0 && state.missions.completed.length === 0 && (
            <div className="text-xs text-stone-500 italic">none</div>
          )}

          {editMode && (
            <button
              onClick={addMission}
              className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 mt-2"
            >
              <Plus size={11} /> Start mission
            </button>
          )}
        </Section>

        {/* Lost */}
        {state.lost.length > 0 && (
          <Section title="Lost" icon={Skull} count={state.lost.length}>
            <ul className="space-y-2.5">
              {state.lost.map((l) => (
                <li key={l.character_id} className="text-sm border-l-2 border-rose-900 pl-3 py-0.5 group">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-medium text-stone-200">{l.name}</span>
                    <span className="text-xs text-stone-500">({l.character_id})</span>
                    <span className="text-xs text-stone-400">— {l.story_day_label}</span>
                    {editMode && (
                      <button
                        onClick={() => restoreFromLost(l.character_id)}
                        className="text-xs text-stone-500 hover:text-emerald-400 ml-auto opacity-0 group-hover:opacity-100"
                      >
                        restore
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">{l.cause}</div>
                  {l.obit && (
                    <div className="text-xs text-stone-500 italic mt-0.5">"{l.obit}"</div>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Flags + Factions */}
        <Section title="Flags & Factions" icon={Flag} collapsible defaultOpen={false}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wide mb-2">Flags</div>
              <div className="space-y-1">
                {KNOWN_FLAGS.map((f) => (
                  <label
                    key={f}
                    className="flex items-center gap-2 text-xs hover:bg-stone-800/40 rounded px-1 py-0.5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={state.flags[f] || false}
                      onChange={() => toggleFlag(f)}
                      className="accent-amber-500"
                    />
                    <span
                      className={state.flags[f] ? "text-stone-200" : "text-stone-500"}
                    >
                      {f}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wide mb-2">Factions known</div>
              <div className="space-y-1">
                {KNOWN_FACTIONS.map((f) => (
                  <label
                    key={f}
                    className="flex items-center gap-2 text-xs hover:bg-stone-800/40 rounded px-1 py-0.5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={state.factions_known[f] || false}
                      onChange={() => toggleFaction(f)}
                      className="accent-amber-500"
                    />
                    <span
                      className={state.factions_known[f] ? "text-stone-200" : "text-stone-500"}
                    >
                      {f}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Memory book */}
        <Section
          title="Memory Book"
          icon={Bookmark}
          count={state.memory_book.length}
          collapsible
          defaultOpen={false}
        >
          {state.memory_book.length === 0 && (
            <div className="text-xs text-stone-500 italic">no entries yet</div>
          )}
          <ul className="space-y-3">
            {state.memory_book.slice().reverse().map((mb) => (
              <li key={mb.id} className="border-l-2 border-stone-700 pl-3 group">
                <div className="flex items-baseline gap-2 text-xs text-stone-400 mb-1">
                  <span className="font-medium">{mb.story_day_range}</span>
                  {mb.awareness_at_end !== undefined && (
                    <Pill color="stone">A{mb.awareness_at_end}</Pill>
                  )}
                  {editMode && (
                    <button
                      onClick={() => removeMemoryEntry(mb.id)}
                      className="ml-auto text-stone-500 hover:text-rose-400 opacity-0 group-hover:opacity-100"
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>
                <div className="text-sm text-stone-300 leading-relaxed">{mb.summary}</div>
                {mb.characters_in_scene && mb.characters_in_scene.length > 0 && (
                  <div className="text-xs text-stone-500 mt-1 flex gap-1 flex-wrap">
                    {mb.characters_in_scene.map((c) => (
                      <Pill key={c} color="stone">{c}</Pill>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {editMode && (
            <button
              onClick={addMemoryEntry}
              className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 mt-2"
            >
              <Plus size={11} /> Add entry
            </button>
          )}
        </Section>

        {/* Footer / reset */}
        <div className="text-xs text-stone-500 text-center py-4 border-t border-stone-800">
          <div className="mb-2">
            {settings.mode === "connected_api" ? (
              <>
                Source of truth: <code className="bg-stone-800 px-1 rounded">{settings.serverUrl || "(no URL set)"}</code> · live MCP sync via Anthropic API · local cache via window.storage
              </>
            ) : settings.mode === "connected_http" ? (
              <>
                Source of truth: <code className="bg-stone-800 px-1 rounded">{settings.serverUrl || "(no URL set)"}</code>/rest/* · direct HTTP sync · local cache via window.storage
              </>
            ) : (
              <>
                Source of truth: <code className="bg-stone-800 px-1 rounded">~/.narrator-state/{state.project}.json</code> via MCP. This tracker mirrors via window.storage; sync via import/export.
              </>
            )}
          </div>
          {confirmReset ? (
            <div className="flex items-center justify-center gap-2 text-stone-400">
              Wipe all tracker state?
              <button
                onClick={resetAll}
                className="text-xs px-2 py-0.5 rounded bg-rose-700 hover:bg-rose-600 text-stone-100"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="text-xs px-2 py-0.5 rounded bg-stone-700 hover:bg-stone-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="text-stone-600 hover:text-rose-400 flex items-center gap-1 mx-auto"
            >
              <RotateCcw size={11} /> Reset tracker
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Character card subcomponent
// -----------------------------------------------------------------------

function CharacterCard({ cid, char, editMode, onUpdate, onRemove, onMarkLost, onAddInjury, onRemoveInjury }) {
  const relationshipColor = (r) => {
    if (r === "close" || r === "romance") return "emerald";
    if (r === "trusted") return "blue";
    if (r === "estranged") return "rose";
    return "stone";
  };

  return (
    <div className="bg-stone-800/40 rounded-lg p-3 border border-stone-700/40">
      <div className="flex items-start gap-2 flex-wrap mb-2">
        <span className="font-medium text-stone-100">{char.name || cid}</span>
        <span className="text-xs text-stone-500">({cid})</span>
        <Pill color={relationshipColor(char.relationship)}>
          {char.relationship || "—"}
        </Pill>
        {char.relationship_note && (
          <span className="text-xs text-stone-400 italic">{char.relationship_note}</span>
        )}
        <Pill color="stone">{char.tier || "named_minor"}</Pill>
        {editMode && (
          <div className="ml-auto flex gap-1">
            <button
              onClick={() => onUpdate({ present: false })}
              className="text-xs text-stone-400 hover:text-stone-200"
              title="Leave scene"
            >
              off-screen
            </button>
            <button
              onClick={onMarkLost}
              className="text-stone-500 hover:text-rose-400"
              title="Mark as lost"
            >
              <Skull size={12} />
            </button>
            <button
              onClick={onRemove}
              className="text-stone-500 hover:text-rose-400"
              title="Remove (not death)"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <div className="flex items-baseline gap-2">
          <span className="text-stone-500 w-16 shrink-0">Condition</span>
          <EditableField
            value={char.condition}
            onChange={(v) => onUpdate({ condition: v })}
            placeholder="unscathed"
            className="text-xs"
          />
        </div>
        {editMode && (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-500 w-16 shrink-0">Name</span>
              <EditableField
                value={char.name}
                onChange={(v) => onUpdate({ name: v })}
                className="text-xs"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-500 w-16 shrink-0">Rel.</span>
              <SelectField
                value={char.relationship}
                onChange={(v) => onUpdate({ relationship: v })}
                options={RELATIONSHIP_OPTIONS}
              />
            </div>
            <div className="flex items-baseline gap-2 col-span-2">
              <span className="text-stone-500 w-16 shrink-0">Note</span>
              <EditableField
                value={char.relationship_note || ""}
                onChange={(v) => onUpdate({ relationship_note: v })}
                placeholder="(descriptor — e.g. 'partnered Day 1')"
                className="text-xs italic"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-500 w-16 shrink-0">Tier</span>
              <SelectField
                value={char.tier}
                onChange={(v) => onUpdate({ tier: v })}
                options={TIER_OPTIONS}
              />
            </div>
          </>
        )}
      </div>

      {char.active_injuries && char.active_injuries.length > 0 && (
        <div className="mt-2 pt-2 border-t border-stone-700/40">
          <div className="text-xs text-stone-500 uppercase mb-1 flex items-center justify-between">
            <span>Injuries</span>
          </div>
          <ul className="space-y-1">
            {char.active_injuries.map((inj) => (
              <li key={inj.id} className="text-xs text-stone-300 flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span className="flex-1">
                  <span className="font-medium">{inj.body_part}</span> — {inj.severity}
                  {inj.infection_clock_minutes && (
                    <span className="text-rose-400 ml-1">⏱{inj.infection_clock_minutes}m</span>
                  )}
                </span>
                {editMode && (
                  <button
                    onClick={() => onRemoveInjury(inj.id)}
                    className="text-stone-500 hover:text-rose-400"
                  >
                    <X size={10} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {editMode && (
        <button
          onClick={onAddInjury}
          className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 mt-2"
        >
          <Plus size={10} /> injury
        </button>
      )}
    </div>
  );
}
