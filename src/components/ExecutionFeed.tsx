import React, { useState } from 'react';
import { ExecutionLog } from '../types';
import { Terminal, Cpu, CheckCircle2, ChevronDown, ChevronUp, Wrench, ShieldAlert, Sparkles, Clock } from 'lucide-react';

interface ExecutionFeedProps {
  logs: ExecutionLog[];
  isOrchestrating: boolean;
  executionMode: 'gemini-1.5-pro-live' | 'autonomous-simulated';
  totalLatencyMs: number;
}

export const ExecutionFeed: React.FC<ExecutionFeedProps> = ({
  logs,
  isOrchestrating,
  executionMode,
  totalLatencyMs,
}) => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const getBadgeStyle = (type: ExecutionLog['type']) => {
    switch (type) {
      case 'system':
        return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30', label: 'CRISIS TRIGGER' };
      case 'thought':
        return { bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30', label: 'GEMINI 1.5 PRO REASONING' };
      case 'tool_call':
        return { bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse', label: 'FUNCTION CALL' };
      case 'tool_result':
        return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', label: 'TOOL EXECUTED' };
      case 'synthesis':
        return { bg: 'bg-purple-500/10 text-purple-300 border-purple-500/30', label: 'TIME-ZERO SYNTHESIS' };
    }
  };

  return (
    <div className="border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      
      {/* Feed Header */}
      <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
            Autonomous Orchestration Feed (Tool-Calling Loop)
          </h3>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Latency: <strong className="text-cyan-300">{totalLatencyMs > 0 ? `${totalLatencyMs}ms` : '---'}</strong></span>
          </div>

          <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
            executionMode === 'gemini-1.5-pro-live'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            {executionMode === 'gemini-1.5-pro-live' ? '⚡ Gemini 1.5 Pro Live' : '💡 Autonomous Sim Engine'}
          </div>
        </div>
      </div>

      {/* Feed Log Stream */}
      <div className="p-4 bg-black/90 font-mono text-xs overflow-y-auto max-h-[300px] flex flex-col gap-3">
        {logs.length === 0 && (
          <div className="text-slate-600 py-8 text-center flex flex-col items-center gap-2">
            <Cpu className="w-8 h-8 opacity-30 animate-pulse" />
            <p>Waiting for crisis trigger payload. Select a Sandbox Matrix scenario to begin...</p>
          </div>
        )}

        {logs.map((log, idx) => {
          const badge = getBadgeStyle(log.type);
          const isExpanded = expandedLogId === log.id;
          const hasPayload = log.toolParams || log.toolResult;

          return (
            <div
              key={log.id}
              className={`rounded-xl border p-3 transition-all ${
                log.type === 'tool_call'
                  ? 'border-cyan-500/40 bg-cyan-950/10'
                  : log.type === 'tool_result'
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-slate-800/80 bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${badge.bg}`}>
                    {badge.label}
                  </span>
                  {log.toolName && (
                    <span className="text-cyan-300 font-bold flex items-center gap-1 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                      <Wrench className="w-3 h-3" />
                      <span>{log.toolName}()</span>
                    </span>
                  )}
                </div>

                <span className="text-slate-600 font-bold text-[10px]">#{log.stepNumber}</span>
              </div>

              <div className="text-slate-200 font-sans text-xs font-semibold mb-1">
                {log.title}
              </div>
              <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                {log.content}
              </p>

              {/* Collapsible JSON payload inspect */}
              {hasPayload && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                    className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 uppercase tracking-widest font-bold cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Payload' : 'Inspect Tool Schema & I/O'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-2.5 rounded-lg bg-black/80 border border-slate-800 text-[11px] text-emerald-400/90 overflow-x-auto">
                      {log.toolParams && (
                        <div className="mb-2">
                          <div className="text-slate-500 uppercase text-[9px] tracking-widest mb-1">Function Args:</div>
                          <pre className="whitespace-pre-wrap">{JSON.stringify(log.toolParams, null, 2)}</pre>
                        </div>
                      )}
                      {log.toolResult && (
                        <div>
                          <div className="text-slate-500 uppercase text-[9px] tracking-widest mb-1">Function Execution Output:</div>
                          <pre className="whitespace-pre-wrap">{JSON.stringify(log.toolResult, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {isOrchestrating && (
          <div className="flex items-center gap-2 text-emerald-400 py-2 animate-pulse pl-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Gemini 1.5 Pro synthesizing next autonomous function step...</span>
          </div>
        )}
      </div>

    </div>
  );
};
