import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "./api";
import type { Settings } from "./settings";
import type { State } from "./types";

export type ConnStatus = "idle" | "ok" | "loading" | "error" | "unconfigured";

export interface NarratorStore {
  state: State | null;
  status: ConnStatus;
  error: string | null;
  lastSyncAt: number | null;
  refresh: () => Promise<void>;
}

export function useNarratorState(settings: Settings): NarratorStore {
  const [state, setState] = useState<State | null>(null);
  const [status, setStatus] = useState<ConnStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<number | null>(null);

  // Latest-only — abort any in-flight fetch when a newer one starts.
  const inflight = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    if (!settings.serverUrl) {
      setStatus("unconfigured");
      setError("Open Settings and enter your Cloudflare tunnel URL.");
      return;
    }
    inflight.current?.abort();
    const ctrl = new AbortController();
    inflight.current = ctrl;
    setStatus((prev) => (prev === "ok" ? "ok" : "loading"));
    try {
      const { state } = await api.getState(settings, ctrl.signal);
      if (ctrl.signal.aborted) return;
      setState(state);
      setStatus("ok");
      setError(null);
      setLastSyncAt(Date.now());
    } catch (e) {
      if (ctrl.signal.aborted) return;
      if (e instanceof ApiError) setError(e.message);
      else setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    }
  }, [settings]);

  // Initial fetch + polling.
  useEffect(() => {
    void refresh();
    if (settings.pollIntervalMs > 0) {
      const id = window.setInterval(() => void refresh(), settings.pollIntervalMs);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [refresh, settings.pollIntervalMs]);

  return { state, status, error, lastSyncAt, refresh };
}
