import React from 'react';
import { PersonaId } from '../types';
import { PERSONA_METADATA } from '../data/mockCorpus';
import { ShieldAlert, Zap, RefreshCw, UserCheck, Terminal } from 'lucide-react';

interface HeaderProps {
  activePersona: PersonaId;
  onSelectPersona: (p: PersonaId) => void;
  geminiLive: boolean;
  onReset: () => void;
  isOrchestrating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activePersona,
  onSelectPersona,
  geminiLive,
  onReset,
  isOrchestrating,
}) => {
  const current = PERSONA_METADATA[activePersona];

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 px-6 py-4 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black tracking-tighter">
            SE
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-slate-100 flex items-center gap-2">
                THE LAST-MINUTE LIFE SAVER
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
                AI Rescue Companion
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium italic mt-0.5">
              "Give me the problem and I will get you across the finish line."
            </p>
          </div>
        </div>

        {/* Center: Persona Toggle */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => onSelectPersona('student')}
            disabled={isOrchestrating}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activePersona === 'student'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
              AS
            </span>
            <span>Aarav (Student)</span>
          </button>

          <button
            onClick={() => onSelectPersona('entrepreneur')}
            disabled={isOrchestrating}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activePersona === 'entrepreneur'
                ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
              ER
            </span>
            <span>Elena (Founder)</span>
          </button>
        </div>

        {/* Right: Status & Reset */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border ${
              geminiLive
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
            title={geminiLive ? 'Using live Gemini API key from AI Studio secrets' : 'Using high-speed simulated execution mode. Add API key in AI Studio Secrets for live LLM responses.'}
          >
            {geminiLive ? <Zap className="w-3.5 h-3.5 fill-current animate-pulse" /> : <Terminal className="w-3.5 h-3.5" />}
            <span>{geminiLive ? 'Gemini 2.5 Live' : 'Simulation Fast-Mode'}</span>
          </div>

          <button
            onClick={onReset}
            disabled={isOrchestrating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
            title="Reset simulation workspace"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isOrchestrating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Matrix</span>
          </button>
        </div>

      </div>
    </header>
  );
};
