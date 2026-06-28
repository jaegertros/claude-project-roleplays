// Thin client for narrator-state /rest/{tool_name}.
// All tools return { ok: true, ...fields } or { ok: false, error: string }.

import type {
  AgreementEntry,
  AuditEntry,
  BitEntry,
  CommitmentEntry,
  CorrectionEntry,
  FactionName,
  FlagName,
  PendingBeatEntry,
  ResidencyEntry,
  RestResponse,
  State,
} from "./types";
import type { Settings } from "./settings";

export class ApiError extends Error {
  status?: number;
  available?: string[];
  constructor(message: string, opts?: { status?: number; available?: string[] }) {
    super(message);
    this.name = "ApiError";
    this.status = opts?.status;
    this.available = opts?.available;
  }
}

function trimSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

async function call<T = unknown>(
  settings: Settings,
  toolName: string,
  args: Record<string, unknown> = {},
  signal?: AbortSignal,
): Promise<T> {
  if (!settings.serverUrl) {
    throw new ApiError("Server URL not configured. Open Settings.");
  }
  const url = `${trimSlash(settings.serverUrl)}/rest/${toolName}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (settings.bearerToken) {
    headers["Authorization"] = `Bearer ${settings.bearerToken}`;
  }
  const body = JSON.stringify({ project: settings.project, ...args });

  let response: Response;
  try {
    response = await fetch(url, { method: "POST", headers, body, signal });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new ApiError(`Network error: ${msg}`);
  }

  let json: RestResponse<T>;
  try {
    json = (await response.json()) as RestResponse<T>;
  } catch (e) {
    throw new ApiError(
      `Bad JSON from server (HTTP ${response.status}): ${e instanceof Error ? e.message : e}`,
      { status: response.status },
    );
  }

  if (!json.ok) {
    throw new ApiError(json.error, { status: response.status, available: json.available });
  }
  // Strip the ok flag; return the payload fields.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ok: _ok, ...rest } = json as { ok: true } & Record<string, unknown>;
  return rest as T;
}

// ---------- Health ----------

export interface HealthResponse {
  ok: true;
  tools: string[];
}

export async function health(settings: Settings, signal?: AbortSignal): Promise<HealthResponse> {
  if (!settings.serverUrl) throw new ApiError("Server URL not configured.");
  const headers: Record<string, string> = {};
  if (settings.bearerToken) headers["Authorization"] = `Bearer ${settings.bearerToken}`;
  const r = await fetch(`${trimSlash(settings.serverUrl)}/health`, { headers, signal });
  if (!r.ok) throw new ApiError(`HTTP ${r.status}`);
  return (await r.json()) as HealthResponse;
}

// ---------- Tool wrappers ----------
// Names and shapes match narrator_state/server.py.

export const api = {
  getState(settings: Settings, signal?: AbortSignal) {
    return call<{ state: State }>(settings, "get_state", { include_history: false, memory_book_entries: 5 }, signal);
  },

  startSession(settings: Settings, note = "") {
    return call<{ state: State; session_id: string }>(settings, "start_session", { session_note: note });
  },

  endSession(settings: Settings, note = "") {
    return call<{ session_id: string }>(settings, "end_session", { final_note: note });
  },

  setFlag(settings: Settings, flag_name: FlagName, value: boolean, notes = "") {
    return call<{ flag: FlagName; value: boolean; prev: boolean }>(settings, "set_flag", {
      flag_name,
      value,
      notes,
    });
  },

  setFactionKnown(settings: Settings, faction: FactionName, value: boolean) {
    return call<{ faction: FactionName; value: boolean; prev: boolean }>(settings, "set_faction_known", {
      faction,
      value,
    });
  },

  previewUndo(settings: Settings) {
    return call<{ preview: AuditEntry; message: string }>(settings, "undo_last_event", { confirm: false });
  },

  confirmUndo(settings: Settings) {
    return call<{ reverted: AuditEntry }>(settings, "undo_last_event", { confirm: true });
  },

  // --- Extension tables (Supabase-backed, v1.2) ----------------------------

  listCommitments(settings: Settings, signal?: AbortSignal, limit = 50) {
    return call<{ commitments: CommitmentEntry[] }>(settings, "list_commitments", { limit }, signal);
  },

  listActiveAgreements(settings: Settings, signal?: AbortSignal) {
    return call<{ agreements: AgreementEntry[] }>(settings, "list_active_agreements", {}, signal);
  },

  listActiveCorrections(settings: Settings, signal?: AbortSignal) {
    return call<{ corrections: CorrectionEntry[]; count: number }>(settings, "list_active_corrections", {}, signal);
  },

  listActiveBits(settings: Settings, signal?: AbortSignal) {
    return call<{ bits: BitEntry[] }>(settings, "list_active_bits", {}, signal);
  },

  listLocationResidents(settings: Settings, signal?: AbortSignal) {
    return call<{ residents: ResidencyEntry[] }>(settings, "list_location_residents", {}, signal);
  },

  listPendingBeats(settings: Settings, signal?: AbortSignal) {
    return call<{ pending: PendingBeatEntry[]; overdue: PendingBeatEntry[] }>(
      settings,
      "list_pending_beats",
      { include_overdue: true },
      signal,
    );
  },
};
