import { useState } from "react";
import { useHjalmarState } from "./state";
import { TitleBar } from "./components/TitleBar";
import { StatusStrip } from "./components/StatusStrip";
import { SettingsModal } from "./components/SettingsModal";
import { TrackingBlockPanel } from "./components/TrackingBlockPanel";
import { KnowledgeWallPanel } from "./components/KnowledgeWallPanel";
import { CalendarPanel } from "./components/CalendarPanel";
import { StatusPanel } from "./components/StatusPanel";
import { DepthPanel } from "./components/DepthPanel";
import { CurrencyPanel } from "./components/CurrencyPanel";
import { ThreeMarksPanel } from "./components/ThreeMarksPanel";
import { IdentityLedgerPanel } from "./components/IdentityLedgerPanel";
import { NPCsPanel } from "./components/NPCsPanel";
import { CrewPanel } from "./components/CrewPanel";
import { FactionsPanel } from "./components/FactionsPanel";
import { TheoriesPanel } from "./components/TheoriesPanel";
import { JournalPanel } from "./components/JournalPanel";
import { InventoryPanel } from "./components/InventoryPanel";

export function App() {
  const store = useHjalmarState();
  const { state } = store;
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="app">
      <TitleBar onOpenSettings={() => setShowSettings(true)} />

      <main className="app-body">
        {/* Row 1 — canonical tracking block, full width */}
        <TrackingBlockPanel state={state} />

        {/* Row 2 — knowledge wall, full width */}
        <KnowledgeWallPanel state={state} store={store} />

        {/* Row 3 — calendar / status / depth */}
        <div className="grid-3">
          <CalendarPanel state={state} store={store} />
          <StatusPanel state={state} store={store} />
          <DepthPanel state={state} store={store} />
        </div>

        {/* Row 4 — currency / marks / identity */}
        <div className="grid-3">
          <CurrencyPanel state={state} store={store} />
          <ThreeMarksPanel state={state} store={store} />
          <IdentityLedgerPanel state={state} store={store} />
        </div>

        {/* Row 4.5 — inventory under the tracking block (small helper) */}
        <InventoryPanel state={state} store={store} />

        {/* Row 5 — NPCs / crew */}
        <div className="grid-2-3">
          <NPCsPanel state={state} store={store} />
          <CrewPanel state={state} store={store} />
        </div>

        {/* Row 6 — eight factions, full width */}
        <FactionsPanel state={state} store={store} />

        {/* Row 7 — theories / journal */}
        <div className="grid-2">
          <TheoriesPanel state={state} store={store} />
          <JournalPanel state={state} store={store} />
        </div>

        <div className="ornament">∽ ⚓ ∽</div>
      </main>

      <StatusStrip state={state} />

      {showSettings && (
        <SettingsModal
          store={store}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
