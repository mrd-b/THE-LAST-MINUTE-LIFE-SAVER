import React, { useState } from 'react';
import { CrisisScenario, PersonaId, CorpusFile } from '../types';
import { PREBAKED_SCENARIOS, CORPUS_FILES, PERSONA_METADATA } from '../data/mockCorpus';
import { Play, Zap, FileText, Database, Code, ShieldAlert, Sparkles, FolderOpen, ChevronRight } from 'lucide-react';

interface ControlConsoleProps {
  activePersona: PersonaId;
  onTriggerScenario: (scenarioId: string, customPrompt?: string) => void;
  isOrchestrating: boolean;
  activeScenarioId?: string;
}

export const ControlConsole: React.FC<ControlConsoleProps> = ({
  activePersona,
  onTriggerScenario,
  isOrchestrating,
  activeScenarioId,
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedCorpus, setSelectedCorpus] = useState<CorpusFile | null>(null);

  const personaScenarios = PREBAKED_SCENARIOS.filter(s => s.personaId === activePersona);
  const corpusList = CORPUS_FILES[activePersona] || [];
  const meta = PERSONA_METADATA[activePersona];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim() || isOrchestrating) return;
    onTriggerScenario('custom-override', customPrompt);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('PDF')) return <FileText className="w-4 h-4 text-rose-400 shrink-0" />;
    if (type.includes('Telemetry') || type.includes('Spreadsheet') || type.includes('Database')) return <Database className="w-4 h-4 text-cyan-400 shrink-0" />;
    return <Code className="w-4 h-4 text-emerald-400 shrink-0" />;
  };

  return (
    <aside className="w-full lg:w-80 border-r border-slate-800 bg-slate-950/60 p-5 flex flex-col gap-6 shrink-0 h-full overflow-y-auto">
      
      {/* Persona Profile Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
            {meta.avatarText}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">{meta.name}</h3>
            <p className="text-[11px] text-emerald-400 font-mono">{meta.role}</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mt-2 border-t border-slate-800/80 pt-2">
          {meta.tagline}
        </p>
      </div>

      {/* NEW EXPERIENCE MODES FROM CHALLENGE */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Rescue Experience Modes</span>
          </h2>
          <span className="text-[10px] text-slate-500 font-mono">Step-by-Step</span>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {[
            'Assignment Rescue Mode',
            'Exam Rescue Mode',
            'Presentation Rescue Mode',
            'Interview Rescue Mode',
            'Deadline Rescue Mode'
          ].map((mode, i) => (
            <button
              key={i}
              onClick={() => onTriggerScenario(personaScenarios[0]?.id || 'student-crisis-1')}
              disabled={isOrchestrating}
              className="w-full text-left px-3 py-2 rounded-lg bg-slate-900/80 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
            >
              <span>{mode}</span>
              <span className="text-[10px] font-mono text-rose-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          ))}
        </div>
      </div>

      {/* QUICK ONE-TAP VERBAL CRISIS PROMPTS */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-mono uppercase text-slate-400">Verbal Crisis One-Taps:</span>
        <div className="flex flex-col gap-1.5">
          {[
            "I have an assignment due tonight.",
            "I have an exam in 2 days.",
            "I forgot my presentation.",
            "I have too many deadlines."
          ].map((txt, i) => (
            <button
              key={i}
              onClick={() => onTriggerScenario('custom-override', txt)}
              disabled={isOrchestrating}
              className="w-full text-left p-2.5 rounded-lg bg-slate-950/90 hover:bg-slate-900 border border-slate-800/80 text-xs font-mono text-slate-300 transition-colors flex items-center gap-2 cursor-pointer italic"
            >
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <span>"{txt}"</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature 1: Underlying Test Scenarios */}
      <div className="flex flex-col gap-3 border-t border-slate-800/80 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Underlying Judge Scenarios</span>
          </h2>
          <span className="text-[10px] text-slate-500 font-mono">Demo Telemetry</span>
        </div>
        <p className="text-xs text-slate-400">
          Click any crisis simulation below to trigger time-zero autonomous action:
        </p>

        <div className="flex flex-col gap-2.5">
          {personaScenarios.map(sc => {
            const isActive = activeScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => onTriggerScenario(sc.id)}
                disabled={isOrchestrating}
                className={`w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden cursor-pointer ${
                  isActive
                    ? 'border-emerald-500/60 bg-emerald-500/10 shadow-md shadow-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700'
                } disabled:opacity-50`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-100 line-clamp-1">{sc.title}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                    {sc.shortBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal mb-2.5">
                  {sc.description}
                </p>
                
                <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500 truncate max-w-[160px]">vs. {sc.conflictingEventTitle}</span>
                  <span className={`flex items-center gap-1 font-bold ${isActive ? 'text-emerald-400' : 'text-emerald-400/80'}`}>
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isOrchestrating && isActive ? 'Executing...' : 'Simulate'}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Override Input */}
      <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2.5 border-t border-slate-800/80 pt-5">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Custom Crisis Trigger</span>
          </span>
          <span className="text-[9px] text-cyan-400 uppercase font-mono">Judge Input</span>
        </label>
        <textarea
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder={activePersona === 'student' 
            ? "e.g., It's 11:30 PM. My Dynamics Homework 4 is due in 30 mins and I'm stuck on problem 2..." 
            : "e.g., AWS East is down, v2 rollout is blocked, and investors are demanding a call in 15 mins..."}
          rows={3}
          disabled={isOrchestrating}
          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-sans resize-none"
        />
        <button
          type="submit"
          disabled={!customPrompt.trim() || isOrchestrating}
          className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{isOrchestrating ? 'Orchestrating...' : 'Trigger Shadow Executive'}</span>
        </button>
      </form>

      {/* Background Corpus Ingestion HUD */}
      <div className="flex flex-col gap-2.5 border-t border-slate-800/80 pt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Ingested Corpus ({corpusList.length})</span>
          </h3>
          <span className="text-[9px] text-slate-500 font-mono">Gemini 1.5 Pro</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Background files scanned for zero-friction draft compilation:
        </p>

        <div className="flex flex-col gap-1.5">
          {corpusList.map(cf => (
            <div
              key={cf.id}
              onClick={() => setSelectedCorpus(cf)}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-colors cursor-pointer text-left group"
            >
              <div className="flex items-center gap-2 min-w-0">
                {getFileIcon(cf.type)}
                <div className="min-w-0">
                  <div className="text-xs font-mono text-slate-300 truncate group-hover:text-emerald-300 transition-colors">
                    {cf.name}
                  </div>
                  <div className="text-[9px] text-slate-500 truncate">{cf.description}</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Corpus Preview */}
      {selectedCorpus && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                {getFileIcon(selectedCorpus.type)}
                <div>
                  <h4 className="text-sm font-bold font-mono text-slate-100">{selectedCorpus.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{selectedCorpus.type} | {selectedCorpus.size}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCorpus(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-900 rounded-lg border border-slate-800"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-3">{selectedCorpus.description}</p>
            <div className="bg-black/90 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400/90 overflow-x-auto max-h-60 whitespace-pre-wrap">
              {selectedCorpus.snippet}
            </div>
          </div>
        </div>
      )}

    </aside>
  );
};
