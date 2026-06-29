import React from 'react';
import { UserProfile } from '../types';
import { Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onOpenProfile: () => void;
  geminiLive: boolean;
  isOrchestrating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onOpenProfile,
  isOrchestrating,
}) => {
  return (
    <header className="border-b border-slate-900 bg-slate-950 px-4 sm:px-6 py-3 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        
        {/* Sleek Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
            ⚡
          </div>
          <span className="text-sm font-black tracking-tight text-white">
            FinishLine
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-900 text-emerald-400 border border-slate-800">
            AI
          </span>
        </div>

        {/* Minimal Identity Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProfile}
            disabled={isOrchestrating}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer text-slate-300 hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold truncate max-w-[120px] sm:max-w-[200px]">{userProfile.name}</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400 truncate max-w-[100px] sm:max-w-[180px] text-[11px]">{userProfile.role}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
