import React, { useState } from 'react';
import { CommunicationPayload } from '../types';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Mail, MessageSquare, ShieldAlert, Sparkles, User, Tag } from 'lucide-react';

interface OutboundEscalationProps {
  payload: CommunicationPayload;
  isOrchestrating: boolean;
  onDispatch: (recipient: string, subject: string) => Promise<void>;
}

export const OutboundEscalation: React.FC<OutboundEscalationProps> = ({
  payload,
  isOrchestrating,
  onDispatch,
}) => {
  const [dispatched, setDispatched] = useState(payload.dispatched || false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (dispatched || sending || isOrchestrating) return;
    setSending(true);

    try {
      await onDispatch(payload.recipient, payload.subject);
      setDispatched(true);

      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#34d399', '#22d3ee', '#a855f7'],
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  // Sync state if payload changes
  React.useEffect(() => {
    setDispatched(payload.dispatched || false);
  }, [payload]);

  return (
    <div className="border border-slate-800 bg-slate-950 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
      
      {/* Escalation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tool C: generate_communication_payload()</span>
          </div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Out-of-Band Escalation Script</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
              {payload.channel}
            </span>
          </h3>
        </div>

        {/* Tone Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {payload.toneMetadata.map((tone, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
              {tone}
            </span>
          ))}
        </div>
      </div>

      {/* Recipient Card */}
      <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-slate-500 mr-1">To:</span>
            <strong className="text-slate-100">{payload.recipient}</strong>
          </div>
        </div>
        <div className="text-slate-400 text-[11px] sm:text-right">
          {payload.recipientDesignation}
        </div>
      </div>

      {/* Subject */}
      <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-900 text-xs font-mono">
        <span className="text-slate-500 mr-2">Subject:</span>
        <strong className="text-emerald-300 font-sans">{payload.subject}</strong>
      </div>

      {/* Body Preview */}
      <div className="bg-black/80 rounded-xl p-4 border border-slate-800 font-sans text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[200px] overflow-y-auto font-mono">
        {payload.body}
      </div>

      {/* Footer / One-Click Dispatch */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
        <div className="text-xs font-mono text-slate-400">
          Status: {dispatched ? <strong className="text-emerald-400">✔ DISPATCHED TO SMTP OUTBOX</strong> : <strong className="text-amber-300">💡 STAGED FOR REVIEW</strong>}
        </div>

        <button
          onClick={handleSend}
          disabled={dispatched || sending || isOrchestrating}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
            dispatched
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 cursor-default'
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/10'
          } disabled:opacity-50`}
        >
          {dispatched ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Autonomously Dispatched</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 fill-current" />
              <span>{sending ? 'Dispatching...' : 'One-Click Autonomous Dispatch'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
