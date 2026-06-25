import React from 'react';
import { CalendarEvent } from '../types';
import { Calendar, ArrowRight, ShieldCheck, AlertTriangle, Clock, Lock } from 'lucide-react';

interface CalendarHUDProps {
  before: CalendarEvent[];
  after: CalendarEvent[];
  isOrchestrating: boolean;
}

export const CalendarHUD: React.FC<CalendarHUDProps> = ({
  before,
  after,
  isOrchestrating,
}) => {
  return (
    <div className="border border-slate-800 bg-slate-950 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      
      {/* HUD Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Tool A: adjust_calendar_schedule() — Autonomous Timeline Shift
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          Roadblock Negotiated
        </span>
      </div>

      {/* Split Comparator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* Center Divider Arrow on Desktop */}
        <div className="hidden md:flex absolute inset-y-0 left-1/2 items-center justify-center -ml-4 z-10 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-xl">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Column 1: Before Intercept */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-900 bg-slate-950/80 p-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 pb-2 border-b border-slate-900">
            <span>1. PASSIVE MIRROR STATE (BEFORE)</span>
            <span className="text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Collision Risk</span>
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            {before.map(ev => {
              const isCrisis = ev.category === 'crisis';
              const isMeeting = ev.category === 'meeting';

              return (
                <div
                  key={ev.id}
                  className={`p-3 rounded-xl border flex flex-col gap-1 text-xs font-mono ${
                    isCrisis
                      ? 'bg-rose-950/30 border-rose-500/50 text-rose-200 animate-pulse'
                      : isMeeting
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>{ev.startTime} - {ev.endTime}</span>
                    <span className="text-[10px] uppercase opacity-80">{ev.priority}</span>
                  </div>
                  <div className="font-sans font-semibold text-slate-100">{ev.title}</div>
                  {isMeeting && (
                    <div className="text-[10px] text-amber-400/90 mt-1 flex items-center gap-1">
                      <span>⚠ Clashing directly against impending deadline</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: After Mitigation */}
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-300 pb-2 border-b border-emerald-500/20">
            <span>2. AUTONOMOUS MITIGATION (AFTER)</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Protected Runway</span>
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            {after.map(ev => {
              const isCreated = ev.status === 'created';
              const isShifted = ev.status === 'shifted';

              return (
                <div
                  key={ev.id}
                  className={`p-3 rounded-xl border flex flex-col gap-1 text-xs font-mono transition-all ${
                    isCreated
                      ? 'bg-gradient-to-r from-emerald-900/60 to-cyan-900/50 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                      : isShifted
                      ? 'bg-slate-900/80 border-cyan-500/40 text-cyan-200 border-dashed'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      {isCreated && <Lock className="w-3 h-3 text-emerald-400" />}
                      <span>{ev.startTime} - {ev.endTime}</span>
                    </span>
                    {isShifted && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Shifted Downstream
                      </span>
                    )}
                    {isCreated && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500 text-slate-950 font-black animate-pulse">
                        TIME-ZERO SHIELD
                      </span>
                    )}
                  </div>

                  <div className="font-sans font-bold text-slate-100">{ev.title}</div>
                  
                  {ev.notes && (
                    <div className="text-[10px] text-emerald-300/80 mt-1">
                      {ev.notes}
                    </div>
                  )}
                  {ev.originalTime && (
                    <div className="text-[10px] text-cyan-400/80 mt-0.5">
                      (Originally: {ev.originalTime})
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
