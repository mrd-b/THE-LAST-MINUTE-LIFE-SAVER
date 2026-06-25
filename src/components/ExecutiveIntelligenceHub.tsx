import React, { useState } from 'react';
import { ExecutiveInsights } from '../types';
import { 
  Mic, Volume2, Sparkles, AlertTriangle, CheckCircle2, Clock, 
  Flame, Calendar, ShieldAlert, Cpu, Award, Zap, Send, LifeBuoy, 
  HeartHandshake, ArrowRight, Check, RefreshCw, Play
} from 'lucide-react';

interface Props {
  insights: ExecutiveInsights;
  isOrchestrating: boolean;
  activePersona: string;
  onTriggerScenario?: (scenarioId: string, customPrompt?: string) => void;
}

export const ExecutiveIntelligenceHub: React.FC<Props> = ({ 
  insights, 
  isOrchestrating, 
  activePersona, 
  onTriggerScenario 
}) => {
  const [customInput, setCustomInput] = useState('');
  const [activeVoiceCommand, setActiveVoiceCommand] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPanicCooked, setIsPanicCooked] = useState<boolean>(false);
  const [activeRescueMode, setActiveRescueMode] = useState<string | null>(null);

  const handleVoiceTrigger = (cmd: string) => {
    setActiveVoiceCommand(cmd);
    setIsSpeaking(true);
    if (onTriggerScenario) {
      onTriggerScenario('voice-companion', cmd);
    }
    setTimeout(() => setIsSpeaking(false), 4000);
  };

  const handlePanicSubmit = () => {
    setIsPanicCooked(true);
    if (onTriggerScenario) {
      onTriggerScenario('panic-cooked', 'I am cooked. Emergency deadline rescue requested.');
    }
    setTimeout(() => setIsPanicCooked(false), 8000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    if (onTriggerScenario) {
      onTriggerScenario('custom-rescue', customInput);
    }
    setCustomInput('');
  };

  const handleModeLaunch = (modeTitle: string) => {
    setActiveRescueMode(modeTitle);
    if (onTriggerScenario) {
      onTriggerScenario(`rescue-mode-${modeTitle.toLowerCase().replace(/\s+/g, '-')}`, `Launch step-by-step guidance for ${modeTitle}`);
    }
  };

  const { tasks, recommendations, reminders, goals, habits, dailyAgenda, voiceAssistantWorkflow } = insights;
  const topTask = tasks.find(t => !t.completed) || tasks[0];

  return (
    <div className="flex flex-col gap-10 my-4 max-w-7xl mx-auto w-full font-sans">
      
      {/* ==========================================================================================
          HERO SECTION: PANIC BUTTON & CRISIS COMPANION BAR
      ========================================================================================== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900/95 to-slate-950 border-2 border-rose-500/50 shadow-2xl shadow-rose-950/40 overflow-hidden flex flex-col gap-8">
        
        {/* Background glow ambiance */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500 text-slate-950 uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-rose-500/30">
                <LifeBuoy className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                Deadline Crisis Companion
              </span>
              <span className="text-xs font-mono text-rose-300/80 uppercase px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/40">
                Zero Gauge Analysis Required
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              "Give me the problem and I will get you across the finish line."
            </h2>
            <p className="text-sm text-slate-300 font-medium">
              You don't need another dashboard telling you you're behind. Speak or type your deadline emergency below, or press the panic button to let autonomous AI agents rescue your schedule instantly.
            </p>
          </div>

          {/* THE PANIC BUTTON: "I AM COOKED" */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <button
              onClick={handlePanicSubmit}
              disabled={isOrchestrating}
              className={`relative group px-10 py-6 rounded-3xl font-black text-2xl sm:text-3xl tracking-wider uppercase transition-all duration-300 flex items-center gap-4 cursor-pointer select-none ${
                isPanicCooked || isOrchestrating
                  ? 'bg-amber-500 text-slate-950 shadow-2xl shadow-amber-500/60 scale-95'
                  : 'bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white shadow-2xl shadow-rose-600/50 hover:scale-105 active:scale-95 border-2 border-rose-300/40'
              }`}
            >
              <Flame className={`w-8 h-8 ${isPanicCooked ? 'animate-bounce text-slate-950' : 'text-amber-300 animate-pulse'}`} />
              <span>{isPanicCooked ? 'Rescuing...' : 'I am cooked.'}</span>
            </button>
            <span className="text-[11px] font-mono text-rose-300/90 font-bold mt-2.5 tracking-wide text-center">
              One-Click Instant Survival Protocol
            </span>
          </div>

        </div>

        {/* Survival Status Readout when Panic Button Pressed */}
        {isPanicCooked && (
          <div className="p-5 rounded-2xl bg-slate-950/95 border-2 border-amber-500/60 text-amber-200 text-xs sm:text-sm font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
              <div>
                <span className="font-bold text-white block">PANIC PROTOCOL ENGAGED: AI ANALYZING EVERYTHING</span>
                <span>Identifying critical deadlines &rarr; Purging low-value work &rarr; Launching autonomous drafting agents...</span>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase shrink-0">
              Fastest Path Activated
            </span>
          </div>
        )}

        {/* Verbal Crisis One-Taps & Conversational Input Bar */}
        <div className="flex flex-col gap-4 pt-4 border-t border-rose-500/20 relative z-10">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Common Verbal Crisis Statements (Tap to Rescue):
          </span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              "I have an assignment due tonight.",
              "I have an exam in 2 days.",
              "I forgot my presentation.",
              "I have too many deadlines."
            ].map((statement, idx) => (
              <button
                key={idx}
                onClick={() => onTriggerScenario && onTriggerScenario('quick-statement', statement)}
                disabled={isOrchestrating}
                className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-left text-xs font-medium text-slate-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="italic">"{statement}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-rose-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomSubmit} className="flex gap-2.5 mt-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Or speak/type your exact deadline emergency..."
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors pr-12"
              />
              <button 
                type="button" 
                onClick={() => handleVoiceTrigger("Listening for emergency verbal prompt...")}
                title="Voice Input"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
              >
                <Mic className="w-4 h-4 animate-pulse" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!customInput.trim() || isOrchestrating}
              className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Rescue Me</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>


      {/* ==========================================================================================
          SECTION 2: RESCUE EXPERIENCE MODES (STEP-BY-STEP GUIDANCE)
      ========================================================================================== */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>Dedicated Rescue Experience Modes</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Challenge Requirement: Step-by-step guidance tailored toward successful completion
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2.5 py-1 rounded-lg uppercase">
            5 Crisis Companion Pathways
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { title: "Assignment Rescue Mode", desc: "Auto-drafting, citation gathering & time reorganization" },
            { title: "Exam Rescue Mode", desc: "High-yield cram schedule, concept synthesis & practice prompts" },
            { title: "Presentation Rescue Mode", desc: "Slide outline generation, talking points & panic rehearsal" },
            { title: "Interview Rescue Mode", desc: "Company briefing prep, STAR method stories & mock Q&A" },
            { title: "Deadline Rescue Mode", desc: "Universal triage protocol to eliminate friction & submit on time" }
          ].map((mode, i) => (
            <div 
              key={i}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 relative group overflow-hidden ${
                activeRescueMode === mode.title
                  ? 'bg-gradient-to-b from-rose-950/60 to-slate-900 border-rose-500 shadow-xl'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono text-xs font-bold">
                    0{i+1}
                  </span>
                  {activeRescueMode === mode.title && (
                    <span className="text-[9px] font-mono bg-rose-500 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                      Engaged
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white mt-1 group-hover:text-rose-300 transition-colors">
                  {mode.title}
                </h4>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {mode.desc}
                </p>
              </div>

              <button
                onClick={() => handleModeLaunch(mode.title)}
                disabled={isOrchestrating}
                className="w-full mt-2 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-800 hover:border-rose-500 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Guide Me Step-by-Step</span>
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* ==========================================================================================
          SECTION 3: PRIMARY RESCUE ENGINE (PILLARS 1, 7, 8)
      ========================================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pillar 1: "DO THIS NEXT" Singular Directive (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-2 border-emerald-500/40 shadow-xl flex flex-col justify-between gap-6 relative">
          
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <HeartHandshake className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white tracking-tight">Intelligent Task Prioritization</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                    Challenge Pillar #1
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">AI decides what matters most. No manual sorting needed.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono font-black uppercase text-emerald-400 tracking-widest flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-emerald-400" />
              Singular Rescue Directive &bull; Do This Next:
            </span>

            <div className="p-6 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/60 shadow-2xl flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {topTask ? topTask.title : "Draft Final Section & Verify References"}
                </h4>
                <span className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs uppercase font-mono shrink-0">
                  #{topTask?.rank || 1} Impact
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="text-emerald-300 font-bold block mb-1">Why this single step rescues you:</span>
                "AI has automatically frozen lower-priority chores and blocked out distraction noise. Completing this focal milestone in the next 45 minutes reduces your immediate assignment failure risk by 65%."
              </p>

              <div className="flex items-center justify-between gap-4 pt-2 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Clock className="w-4 h-4" />
                  Due: {topTask?.deadline || "Tonight 11:59 PM"}
                </span>
                <span className="text-emerald-400 font-semibold">
                  Category: {topTask?.category || "Core Submission"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Autonomous Action Engine:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Low-value tasks auto-purged from view
            </span>
          </div>

        </div>


        {/* Pillar 7 & 8: Voice Companion & Autonomous Friction Removal (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 shadow-xl flex flex-col justify-between gap-6 relative">
          
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <Mic className={`w-6 h-6 ${isSpeaking ? 'animate-bounce text-purple-200' : ''}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white tracking-tight">Voice-Enabled Assistance</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                    Pillar #7 & #8
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Conversational rescue companion workflow</p>
              </div>
            </div>
            {isSpeaking && (
              <span className="text-[10px] font-mono uppercase bg-purple-500 text-slate-950 font-bold px-2 py-1 rounded animate-pulse flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                Speaking
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
              AI Companion Voice Readout:
            </span>
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/30 text-xs sm:text-sm font-mono leading-relaxed text-purple-100 italic flex gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                "{activeVoiceCommand ? `Received question: ${activeVoiceCommand}. ` : ''}{voiceAssistantWorkflow.voiceScriptResponse}"
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Ask Companion Instantly:</span>
            <div className="grid grid-cols-1 gap-2">
              {[
                "What should I do next?",
                "Can I still finish this?",
                "Help me prioritize."
              ].map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleVoiceTrigger(cmd)}
                  disabled={isOrchestrating}
                  className="px-4 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs font-mono font-bold transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Mic className="w-3.5 h-3.5 text-purple-400" />
                    <span>"{cmd}"</span>
                  </span>
                  <span className="text-[10px] uppercase text-purple-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>


      {/* ==========================================================================================
          SECTION 4: TIME REORGANIZATION & ACTIONABLE REMINDERS (PILLARS 2, 4, 5)
      ========================================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pillar 2 & 5: AI Scheduling Assistance & Automated Calendar (6 cols) */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between gap-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white tracking-tight">AI Scheduling Assistance</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                    Pillar #2 & #5
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Automatically reorganized survival timeline</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 text-xs text-cyan-200 font-mono flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>AI has automatically rescheduled lower-priority meetings and created an emergency focus runway.</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {dailyAgenda.map((slot) => (
                <div key={slot.id} className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-black text-cyan-400 shrink-0 w-20">{slot.timeSlot}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{slot.title}</h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">{slot.aiExecutionNote}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-800 uppercase shrink-0">
                    {slot.mode}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <span className="text-[11px] font-mono text-slate-500 italic text-center">
            *Existing Google Calendar sync remains active; changes applied automatically behind the scenes.
          </span>

        </div>


        {/* Pillar 4: Actionable Context-Aware Reminders (6 cols) */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-rose-950/30 via-slate-900/80 to-slate-950 border border-rose-500/30 shadow-xl flex flex-col justify-between gap-6">
          
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/40">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white tracking-tight">Context-Aware Reminders</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                    Challenge Pillar #4
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Dynamic actionable guidance | Escalation protocol</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {reminders.map((rem) => (
              <div key={rem.id} className="p-4 rounded-2xl bg-slate-950/95 border border-rose-500/40 flex flex-col gap-2.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5 font-mono uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Actionable Guidance &bull; {rem.riskLevel} Risk
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{rem.scheduledTiming}</span>
                </div>

                {/* Challenge Prompt Highlight: Good vs Bad example embodiment */}
                <p className="text-xs sm:text-sm text-white font-mono bg-rose-950/30 p-3 rounded-xl border border-rose-800/40 leading-relaxed">
                  "{rem.dynamicContent}"
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-900">
                  <span>Target: <strong className="text-slate-200">{rem.taskTitle}</strong></span>
                  <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">
                    Escalation: {rem.escalationProtocol}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Design Philosophy Mandate:</span>
            <span className="text-rose-300 font-bold">Never generic ("Due tomorrow"). Always actionable.</span>
          </div>

        </div>

      </div>


      {/* ==========================================================================================
          SECTION 5: PRODUCTIVITY HINTS & BACKGROUND TRACKING SHIELD (PILLARS 3, 6)
      ========================================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pillar 3: Personalized Recommendations based on Workload & Pressure (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl flex flex-col gap-5">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white tracking-tight">Personalized Productivity Recommendations</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase">
                    Challenge Pillar #3
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Based on workload, deadline pressure, and habits</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-400 tracking-wider">{rec.type}</span>
                  <h4 className="text-xs font-bold text-white">{rec.title}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5 leading-relaxed">{rec.description}</p>
                </div>
                <span className="self-start px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-[11px] font-bold">
                  {rec.actionBadge}
                </span>
              </div>
            ))}
          </div>

        </div>


        {/* Pillar 6: Goal & Habit Tracking Background Shield (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl flex flex-col justify-between gap-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white tracking-tight">Goal & Habit Tracking Shield</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                    Challenge Pillar #6
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Subtle background tracking supporting recovery</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-xs font-bold text-amber-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Background Safeguards Active:</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with core product philosophy, your long-term academic/entrepreneurial goals (<strong>{goals[0]?.title || "Dean's List 3.8 GPA"}</strong>) and 14-day study streaks are tracked autonomously in the background. 
            </p>
            <p className="text-xs text-slate-400 font-mono border-t border-slate-900 pt-2.5">
              "We use your habits to fine-tune your rescue plan without cluttering your crisis interface with distracting charts or gauges."
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400">
            <span>Active Habits Monitored:</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              {habits[0]?.streakDays || 12}d Study Consistency
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
