import React, { useState, useEffect } from 'react';
import { OrchestrationPayload, UserProfile, CalendarEvent, PrioritizedTask } from '../types';
import { 
  CheckCircle2, Mic, FileText, ArrowRight, Flame, Copy, Check, Sparkles, Circle, Send, RefreshCw, Clock, Shield
} from 'lucide-react';

interface CompanionProps {
  orchestration: OrchestrationPayload;
  userProfile: UserProfile;
  isOrchestrating: boolean;
  onTriggerScenario: (scenarioId: string, customPrompt?: string) => void;
  onDispatchEmail?: (recipient: string, subject: string) => void;
}

export const GoalLifecycleCompanion: React.FC<CompanionProps> = ({
  orchestration,
  userProfile,
  isOrchestrating,
  onTriggerScenario,
  onDispatchEmail
}) => {
  const [goalInput, setGoalInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isCooked, setIsCooked] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
  const [customTaskInput, setCustomTaskInput] = useState('');
  const [localTasks, setLocalTasks] = useState<PrioritizedTask[]>(orchestration.executiveInsights.tasks);
  const [localCalendar, setLocalCalendar] = useState<CalendarEvent[]>(orchestration.calendarAfter);
  const [draftRefineQuery, setDraftRefineQuery] = useState('');
  const [localDraft, setLocalDraft] = useState(orchestration.draftWorkspace.markdownContent);

  useEffect(() => {
    setLocalTasks(orchestration.executiveInsights.tasks);
    setLocalCalendar(orchestration.calendarAfter);
    setLocalDraft(orchestration.draftWorkspace.markdownContent);
  }, [orchestration]);

  const topTask = localTasks.find(t => !completedTasks[t.id]) || localTasks[0];

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTaskInput.trim()) return;
    const newTask: PrioritizedTask = {
      id: 'task-' + Date.now(),
      title: customTaskInput,
      category: 'User Custom',
      priorityScore: 88,
      urgency: 'High',
      impact: 'High',
      rank: localTasks.length + 1,
      deadline: 'Today 6 PM',
      completed: false
    };
    setLocalTasks([newTask, ...localTasks]);
    setCustomTaskInput('');
    onTriggerScenario('custom-task-added', customTaskInput);
  };

  const handleVoiceInteraction = () => {
    setIsSpeaking(true);
    onTriggerScenario('voice-companion', 'Voice Intake');
    setTimeout(() => setIsSpeaking(false), 2500);
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalInput.trim() || isOrchestrating) return;
    onTriggerScenario('custom-goal-intake', goalInput);
    setGoalInput('');
  };

  const handlePanic = () => {
    setIsCooked(true);
    onTriggerScenario('panic-cooked', `Emergency triage for ${userProfile.name || 'user'}`);
    setTimeout(() => setIsCooked(false), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleRefineDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftRefineQuery.trim() || isOrchestrating) return;
    setLocalDraft(prev => `${prev}\n\n### AI Refinement (${draftRefineQuery}):\n- Updated action items & verified deadlines.`);
    onTriggerScenario('refine-draft', draftRefineQuery);
    setDraftRefineQuery('');
  };

  const isStudent = userProfile.role?.toLowerCase().includes('student') || userProfile.focusArea?.toLowerCase().includes('exam');
  const presets = isStudent ? [
    "Term paper & citations due Friday",
    "Final exam study block",
    "Group presentation slides"
  ] : [
    "Investor pitch deck KPI review",
    "Key client contract closing",
    "Ship production MVP release"
  ];

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 text-slate-100 flex flex-col gap-6">
      
      {/* Simplistic AI Hero Command Deck */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-slate-900/90 border border-slate-800/90 p-2 sm:p-2.5 rounded-2xl shadow-xl">
          <form onSubmit={handleGoalSubmit} className="flex-1 flex items-center gap-2 px-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder={`What deadline or project are you racing against, ${userProfile.name.split(' ')[0]}?`}
              className="w-full py-2 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!goalInput.trim() || isOrchestrating}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer transition-all"
            >
              <span>Ship AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-2.5 justify-end">
            <button
              type="button"
              onClick={handleVoiceInteraction}
              disabled={isOrchestrating}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-purple-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
            >
              <Mic className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce text-purple-400' : 'text-purple-400'}`} />
              <span>{isSpeaking ? 'Listening...' : 'Voice'}</span>
            </button>

            <button
              type="button"
              onClick={handlePanic}
              disabled={isOrchestrating}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-all ${
                isCooked
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{isCooked ? 'Triaging...' : 'I Am Cooked'}</span>
            </button>
          </div>
        </div>

        {/* Minimal preset chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-1">
          <span className="text-[11px] font-mono text-slate-500 shrink-0">Quick Intake:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onTriggerScenario('quick-commitment', p)}
              className="px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-xs text-slate-400 hover:text-white shrink-0 cursor-pointer transition-colors"
            >
              + {p}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Clean Bento Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Panel: #1 Focal Action Deck (Col 7) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-slate-300">Focal Milestone</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
              {topTask ? topTask.deadline : 'In Progress'}
            </span>
          </div>

          {topTask && (
            <div 
              onClick={() => toggleTask(topTask.id)} 
              className={`p-4 rounded-xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                completedTasks[topTask.id]
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                  : 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
              }`}
            >
              <div className="mt-1 text-emerald-400 shrink-0">
                {completedTasks[topTask.id] ? <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-slate-950" /> : <Circle className="w-5 h-5 stroke-[2.5]" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide block mb-1">Current Action Step</span>
                <span className={`text-base font-bold leading-snug block ${completedTasks[topTask.id] ? 'line-through text-slate-500' : 'text-white'}`}>
                  {topTask.title}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Sub-Actions &amp; Checklist</span>
            <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
              {localTasks.map(tsk => {
                if (topTask && tsk.id === topTask.id) return null;
                const isDone = completedTasks[tsk.id];
                return (
                  <div key={tsk.id} onClick={() => toggleTask(tsk.id)} className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/70 flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-600 shrink-0" />}
                      <span className={`truncate font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>{tsk.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{tsk.deadline}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleAddTask} className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <input
              type="text"
              value={customTaskInput}
              onChange={e => setCustomTaskInput(e.target.value)}
              placeholder="+ Add subtask or step..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
            <button type="submit" disabled={!customTaskInput.trim()} className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white cursor-pointer transition-colors">Add</button>
          </form>
        </div>

        {/* Right Panel: Auto-Drafted Deliverable (Col 6) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 truncate pr-2">
              <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-bold font-mono text-slate-200 truncate">{orchestration.draftWorkspace.documentTitle}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button onClick={handleCopy} className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer transition-colors">
                {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDraft ? 'Copied!' : 'Copy'}</span>
              </button>
              {onDispatchEmail && (
                <button onClick={() => onDispatchEmail(orchestration.communication.recipient, orchestration.communication.subject)} className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1">
                  <Send className="w-3 h-3" />
                  <span>Send</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              value={localDraft}
              onChange={e => setLocalDraft(e.target.value)}
              rows={11}
              className="w-full p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 focus:border-cyan-500 focus:outline-none resize-none leading-relaxed shadow-inner"
            />
          </div>

          <form onSubmit={handleRefineDraft} className="flex items-center gap-2 mt-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={draftRefineQuery}
                onChange={e => setDraftRefineQuery(e.target.value)}
                placeholder="Refine draft with AI (e.g. make it professional)..."
                className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
            <button type="submit" disabled={!draftRefineQuery.trim() || isOrchestrating} className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs cursor-pointer transition-colors">
              Refine
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Sleek Bar: AI Protected Schedule Shield */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">AI Calendar Shield Active</span>
            <span className="text-[11px] text-slate-400">Protected focus blocks automatically synced</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {localCalendar.slice(0, 3).map(ev => (
            <div key={ev.id} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center gap-2 shrink-0">
              <Clock className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="font-mono text-[11px] text-blue-300 font-bold">{ev.startTime}-{ev.endTime}</span>
              <span className="text-slate-300 truncate max-w-[140px]">{ev.title}</span>
            </div>
          ))}
          <button onClick={() => onTriggerScenario('re-optimize-calendar')} className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer shrink-0 transition-colors" title="Re-optimize Calendar">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
