// Polls the six Supabase-backed extension tools in parallel.
// Separate from useNarratorState (core local-JSON state) because the
// extension tables can be unreachable independently — e.g. when Supabase
// is down, the core state still works.

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "./api";
import type { Settings } from "./settings";
import type { ExtensionState } from "./types";

export type ExtStatus = "idle" | "ok" | "loading" | "error" | "unconfigured";

export interface ExtensionStore {
  ext: ExtensionState | null;
  status: ExtStatus;
  error: string | null;
  lastSyncAt: number | null;
  refresh: () => Promise<void>;
}

const EMPTY: ExtensionState = {
  commitments: [],
  agreements: [],
  corrections: [],
  bits: [],
  residency: [],
  pending: [],
  overdue: [],
};

export function useExtensionState(settings: Settings): ExtensionStore {
  const [ext, setExt] = useState<ExtensionState | null>(null);
  const [status, setStatus] = useState<ExtStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<number | null>(null);

  const inflight = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    if (!settings.serverUrl) {
      setStatus("unconfigured");
      setError(null);
      return;
    }
    inflight.current?.abort();
    const ctrl = new AbortController();
    inflight.current = ctrl;
    setStatus((prev) => (prev === "ok" ? "ok" : "loading"));
    try {
      const [commits, agreements, corrections, bits, residency, beats] = await Promise.all([
        api.listCommitments(settings, ctrl.signal),
        api.listActiveAgreements(settings, ctrl.signal),
        api.listActiveCorrections(settings, ctrl.signal),
        api.listActiveBits(settings, ctrl.signal),
        api.listLocationResidents(settings, ctrl.signal),
        api.listPendingBeats(settings, ctrl.signal),
      ]);
      if (ctrl.signal.aborted) return;
      setExt({
        commitments: commits.commitments,
        agreements: agreements.agreements,
        corrections: corrections.corrections,
        bits: bits.bits,
        residency: residency.residents,
        pending: beats.pending,
        overdue: beats.overdue,
      });
      setStatus("ok");
      setError(null);
      setLastSyncAt(Date.now());
    } catch (e) {
      if (ctrl.signal.aborted) return;
      // If Supabase isn't reachable, every endpoint returns the same setup-hint
      // string. Show it once, render empty panels.
      if (e instanceof ApiError) setError(e.message);
      else setError(e instanceof Error ? e.message : String(e));
      setExt(EMPTY);
      setStatus("error");
    }
  }, [settings]);

  useEffect(() => {
    void refresh();
    if (settings.pollIntervalMs > 0) {
      const id = window.setInterval(() => void refresh(), settings.pollIntervalMs);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [refresh, settings.pollIntervalMs]);

  return { ext, status, error, lastSyncAt, refresh };
}
