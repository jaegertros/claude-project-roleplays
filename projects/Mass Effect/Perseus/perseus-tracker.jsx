import React, { useState, useEffect } from 'react';
import { Clock, MapPin, ShieldAlert, Target, FolderSearch, Activity, Wifi, ChevronRight, Terminal } from 'lucide-react';

const PerseusDatapad = () => {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [jump, setJump] = useState('1');
  const [time, setTime] = useState('09:00');
  const [location, setLocation] = useState('Deck 1 - Observation Lounge');
  const [clearance, setClearance] = useState('White');
  const [evidence, setEvidence] = useState([
    'Press Mandate'
  ]);
  const [quest, setQuest] = useState('Document the patrol');
  const [syncText, setSyncText] = useState('');
  const [syncStatus, setSyncStatus] = useState('QEC UPLINK STABLE');

  // Load from local storage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('perseus-datapad-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.jump) setJump(parsed.jump);
        if (parsed.time) setTime(parsed.time);
        if (parsed.location) setLocation(parsed.location);
        if (parsed.clearance) setClearance(parsed.clearance);
        if (parsed.evidence) setEvidence(parsed.evidence);
        if (parsed.quest) setQuest(parsed.quest);
      } catch (e) {
        console.error("Failed to load saved Datapad state.");
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    const state = { jump, time, location, clearance, evidence, quest };
    localStorage.setItem('perseus-datapad-state', JSON.stringify(state));
  }, [jump, time, location, clearance, evidence, quest]);

  // ---------------------------------------------------------------------------
  // Sync Logic
  // ---------------------------------------------------------------------------
  const handleSync = () => {
    if (!syncText.trim()) {
      setSyncStatus('ERROR: NO DATA DETECTED');
      setTimeout(() => setSyncStatus('QEC UPLINK STABLE'), 3000);
      return;
    }

    let synced = false;

    // 1. Try parsing the HTML Comment STATE block (Primary Method)
    const stateMatch = syncText.match(/<!--\s*STATE([\s\S]*?)-->/);
    if (stateMatch) {
      const block = stateMatch[1];

      const extractString = (key) => {
        const regex = new RegExp(`${key}:\\s*"?([^"\\n\r]+)"?`);
        const match = block.match(regex);
        return match ? match[1].trim() : null;
      };

      const extractNumber = (key) => {
        const regex = new RegExp(`${key}:\\s*(\\d+)`);
        const match = block.match(regex);
        return match ? match[1] : null;
      };

      const extractArray = (key) => {
        const regex = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`);
        const match = block.match(regex);
        if (match && match[1]) {
          return match[1].split(',').map(i => i.replace(/["']/g, '').trim()).filter(Boolean);
        }
        return null;
      };

      const j = extractNumber('jump');
      const t = extractString('time');
      const loc = extractString('location');
      const c = extractString('clearance');
      const ev = extractArray('evidence');
      const q = extractString('quest');

      if (j) setJump(j);
      if (t) setTime(t);
      if (loc) setLocation(loc.replace(/_/g, ' ').toUpperCase());
      if (c) setClearance(c);
      if (ev) setEvidence(ev.map(i => i.replace(/_/g, ' ').toUpperCase()));
      if (q) setQuest(q.replace(/_/g, ' ').toUpperCase());

      synced = true;
    }

    // 2. Fallback: Parse bracketed lines [Tracker: ...] and [Datapad: ...]
    if (!synced) {
      const trackerRegex = /\[Tracker:\s*Jump\s*(\d+).*?,\s*(\d{2}:\d{2})\s*\|/;
      const trackerMatch = syncText.match(trackerRegex);
      if (trackerMatch) {
        setJump(trackerMatch[1]);
        setTime(trackerMatch[2]);
        synced = true;
      }

      const datapadRegex = /\[Datapad:\s*(.*?)\s*Clearance\s*\|\s*Evidence:\s*(.*?)\s*\|\s*Quest:\s*(.*?)\s*\|\s*Location:\s*(.*?)\]/i;
      const datapadMatch = syncText.match(datapadRegex);
      if (datapadMatch) {
        setClearance(datapadMatch[1].trim());
        setEvidence(datapadMatch[2].split(',').map(i => i.trim()));
        setQuest(datapadMatch[3].trim());
        setLocation(datapadMatch[4].trim());
        synced = true;
      }
    }

    if (synced) {
      setSyncStatus('SYNC SUCCESSFUL');
      setSyncText(''); 
      setTimeout(() => setSyncStatus(jump >= 3 ? 'WARNING: QEC OFFLINE' : 'QEC UPLINK STABLE'), 3000);
    } else {
      setSyncStatus('ERROR: PARSE FAILED');
      setTimeout(() => setSyncStatus(jump >= 3 ? 'WARNING: QEC OFFLINE' : 'QEC UPLINK STABLE'), 3000);
    }
  };

  // ---------------------------------------------------------------------------
  // Clearance Styling Dynamics
  // ---------------------------------------------------------------------------
  const getClearanceColors = (level) => {
    switch(level.toUpperCase()) {
      case 'WHITE': return 'bg-slate-100 text-slate-900 border-slate-300 shadow-[0_0_15px_rgba(241,245,249,0.4)]';
      case 'GREEN': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
      case 'BLUE': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]';
      case 'BLACK': return 'bg-zinc-950 text-red-500 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)]';
      default: return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 font-sans text-slate-200 selection:bg-cyan-500/30 flex justify-center">
      
      {/* Main Device Container */}
      <div className="w-full max-w-4xl bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-700">
        
        {/* Device Screen Glare/Reflection */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-50 z-20 rounded-xl"></div>

        {/* Header - CNN Branding */}
        <div className="bg-slate-100 text-slate-900 px-6 py-3 flex justify-between items-center z-10 border-b-4 border-red-600">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white font-black italic px-2 py-0.5 tracking-tighter text-xl rounded-sm">
              CNN
            </div>
            <h1 className="font-semibold tracking-widest text-sm uppercase opacity-80 mt-1">
              Field Datapad // Alliance Press
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold tracking-wider opacity-60">
            <span>SSV HASTINGS</span>
            <Wifi className={`w-4 h-4 ${jump >= 3 ? 'text-red-500 animate-pulse' : 'text-slate-600'}`} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6 z-10 relative">
          
          {/* Top Grid: Jump/Time & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Time/Jump Panel */}
            <div className="border border-slate-700 bg-slate-800/50 p-5 rounded-lg flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 mb-1 uppercase text-xs tracking-widest font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Ship Time</span>
                </div>
                <div className="text-4xl font-light tracking-tight text-white">
                  {time}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1 font-semibold">Patrol Status</div>
                <div className="text-2xl font-bold text-cyan-400 tracking-wider">
                  JUMP {jump} <span className="text-sm text-slate-500 font-normal">/ 5</span>
                </div>
              </div>
            </div>

            {/* Location Panel */}
            <div className="border border-slate-700 bg-slate-800/50 p-5 rounded-lg flex flex-col justify-center">
              <div className="flex items-center gap-2 text-cyan-400 mb-2 uppercase text-xs tracking-widest font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Current Deck</span>
              </div>
              <div className="text-lg font-medium tracking-wide text-white uppercase truncate">
                {location}
              </div>
            </div>
          </div>

          {/* Middle Grid: Clearance & Quest */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Clearance Panel */}
            <div className={`p-5 rounded-lg border-2 flex flex-col justify-center items-center text-center transition-all duration-500 ${getClearanceColors(clearance)}`}>
              <div className="uppercase text-xs tracking-widest font-bold mb-1 opacity-80">
                Security Clearance
              </div>
              <div className="text-3xl font-black tracking-widest uppercase flex items-center gap-2">
                <ShieldAlert className="w-6 h-6" />
                {clearance}
              </div>
            </div>

            {/* Quest Panel */}
            <div className="col-span-1 md:col-span-2 border border-slate-700 bg-slate-800/50 p-5 rounded-lg">
              <div className="flex items-center gap-2 text-cyan-400 mb-3 uppercase text-xs tracking-widest font-semibold">
                <Target className="w-4 h-4" />
                <span>Active Directive</span>
              </div>
              <div className="text-lg font-medium text-white tracking-wide flex items-start gap-2 bg-slate-900/50 p-3 rounded border border-slate-700/50">
                <ChevronRight className="w-5 h-5 mt-0.5 text-cyan-500 shrink-0" />
                <span>{quest}</span>
              </div>
            </div>
          </div>

          {/* Evidence Log Panel */}
          <div className="border border-slate-700 bg-slate-800/50 p-5 rounded-lg">
            <div className="flex items-center gap-2 text-cyan-400 mb-4 uppercase text-xs tracking-widest font-semibold border-b border-slate-700 pb-3">
              <FolderSearch className="w-4 h-4" />
              <span>Evidence & Asset Log</span>
            </div>
            {evidence.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                {evidence.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm bg-slate-900/40 p-2 rounded border border-slate-700/30">
                    <Activity className="w-4 h-4 mt-0.5 text-cyan-500 shrink-0" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-slate-500 text-sm italic uppercase tracking-wider text-center py-4">
                Log empty. No evidence recorded.
              </div>
            )}
          </div>

          {/* Sync Input Section */}
          <div className="mt-2 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-500 uppercase text-xs tracking-widest font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Data Interface Link</span>
              </div>
              <div className={`text-xs font-bold tracking-widest uppercase ${
                syncStatus.includes('ERROR') || syncStatus.includes('WARNING') ? 'text-red-500' : 
                syncStatus.includes('SUCCESS') ? 'text-emerald-400' : 
                'text-slate-500'
              }`}>
                {syncStatus}
              </div>
            </div>
            
            <textarea
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-cyan-400/80 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all h-24 resize-y font-mono placeholder-slate-700"
              placeholder="PASTE NARRATOR DATA STREAM HERE..."
              value={syncText}
              onChange={(e) => setSyncText(e.target.value)}
            />
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSync}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-2.5 rounded text-sm font-bold tracking-widest uppercase transition-colors shadow-lg shadow-cyan-900/20 active:scale-95"
              >
                Sync Device
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PerseusDatapad;