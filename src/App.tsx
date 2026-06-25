import React, { useState, useEffect } from 'react';
import { PersonaId, OrchestrationPayload } from './types';
import { PREBAKED_ORCHESTRATIONS, STUDENT_INSIGHTS, ENTREPRENEUR_INSIGHTS } from './data/mockCorpus';
import { Header } from './components/Header';
import { ControlConsole } from './components/ControlConsole';
import { CalendarHUD } from './components/CalendarHUD';
import { DraftWorkspace } from './components/DraftWorkspace';
import { OutboundEscalation } from './components/OutboundEscalation';
import { ExecutionFeed } from './components/ExecutionFeed';
import { ExecutiveIntelligenceHub } from './components/ExecutiveIntelligenceHub';
import { Zap, Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export default function App() {
  const [activePersona, setActivePersona] = useState<PersonaId>('student');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('student-crisis-1');
  const [orchestration, setOrchestration] = useState<OrchestrationPayload>(
    PREBAKED_ORCHESTRATIONS['student-crisis-1']
  );
  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false);
  const [geminiLive, setGeminiLive] = useState<boolean>(false);

  // Check backend health & secrets on mount
  useEffect(() => {
    const fetchMeta = async (retries = 4, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch('/api/metadata');
          if (res.ok) {
            const data = await res.json();
            if (data && typeof data.geminiLive === 'boolean') {
              setGeminiLive(data.geminiLive);
            }
            return;
          }
        } catch (e) {
          if (i === retries - 1) {
            console.debug('Backend metadata check offline, operating in simulated autonomous mode.');
          } else {
            await new Promise(r => setTimeout(r, delay));
          }
        }
      }
    };
    fetchMeta();
  }, []);

  // Handle Persona Toggle
  const handleSelectPersona = (p: PersonaId) => {
    if (isOrchestrating || p === activePersona) return;
    setActivePersona(p);
    const defaultScenario = p === 'entrepreneur' ? 'entrepreneur-crisis-1' : 'student-crisis-1';
    setActiveScenarioId(defaultScenario);
    setOrchestration(PREBAKED_ORCHESTRATIONS[defaultScenario]);
  };

  // Trigger Autonomous Mitigation Loop
  const handleTriggerScenario = async (scenarioId: string, customPrompt?: string) => {
    setIsOrchestrating(true);
    setActiveScenarioId(scenarioId);

    try {
      const res = await fetch('/api/orchestrate-crisis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId,
          customPrompt,
          personaId: activePersona,
        }),
      });

      if (res.ok) {
        const data: OrchestrationPayload = await res.json();
        setOrchestration(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.error('Orchestration error:', err);
      // Fallback
      const fallback = activePersona === 'entrepreneur' ? 'entrepreneur-crisis-1' : 'student-crisis-1';
      setOrchestration(PREBAKED_ORCHESTRATIONS[fallback]);
    } finally {
      setIsOrchestrating(false);
    }
  };

  // Reset to default
  const handleReset = () => {
    const defaultScenario = activePersona === 'entrepreneur' ? 'entrepreneur-crisis-1' : 'student-crisis-1';
    setActiveScenarioId(defaultScenario);
    setOrchestration(PREBAKED_ORCHESTRATIONS[defaultScenario]);
  };

  // Dispatch outbound script
  const handleDispatch = async (recipient: string, subject: string) => {
    await fetch('/api/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, subject }),
    });
  };

  const insights = orchestration.executiveInsights || (activePersona === 'entrepreneur' ? ENTREPRENEUR_INSIGHTS : STUDENT_INSIGHTS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Sticky HUD Header */}
      <Header
        activePersona={activePersona}
        onSelectPersona={handleSelectPersona}
        geminiLive={geminiLive}
        onReset={handleReset}
        isOrchestrating={isOrchestrating}
      />

      {/* Main Split Interface Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Column: Control Console & Sandbox Matrix */}
        <ControlConsole
          activePersona={activePersona}
          onTriggerScenario={handleTriggerScenario}
          isOrchestrating={isOrchestrating}
          activeScenarioId={activeScenarioId}
        />

        {/* Main Work Hub Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40">
          
          {/* Top Banner Status Overview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white">
                    {orchestration.logs[0]?.title || 'Autonomous Executive Shadow Protocol'}
                  </h2>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Friction &rarr; Zero
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Gemini Tool Orchestration Loop | Mode: <strong className="text-emerald-400">{orchestration.executionMode}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Active Turn Tools: <strong>3/3 Resolving</strong></span>
            </div>
          </div>

          {/* Official Challenge Pillars (Pillars 1-8) */}
          <ExecutiveIntelligenceHub 
            insights={insights}
            isOrchestrating={isOrchestrating}
            activePersona={activePersona}
            onTriggerScenario={handleTriggerScenario}
          />

          {/* Feature 2 (Tool A): Autonomous Timeline Shift */}
          <CalendarHUD
            before={orchestration.calendarBefore}
            after={orchestration.calendarAfter}
            isOrchestrating={isOrchestrating}
          />

          {/* Grid for Tool B & Tool C */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            
            {/* Feature 3 (Tool B): 70% Completed Draft Workspace (7 cols on xl) */}
            <div className="xl:col-span-7 flex flex-col">
              <DraftWorkspace
                data={orchestration.draftWorkspace}
                isOrchestrating={isOrchestrating}
              />
            </div>

            {/* Feature 4 (Tool C): Outbound Escalation Brief (5 cols on xl) */}
            <div className="xl:col-span-5 flex flex-col">
              <OutboundEscalation
                payload={orchestration.communication}
                isOrchestrating={isOrchestrating}
                onDispatch={handleDispatch}
              />
            </div>

          </div>

          {/* Terminal Execution Feed at bottom */}
          <ExecutionFeed
            logs={orchestration.logs}
            isOrchestrating={isOrchestrating}
            executionMode={orchestration.executionMode}
            totalLatencyMs={orchestration.totalLatencyMs}
          />

          {/* Footer note */}
          <footer className="text-center py-4 border-t border-slate-800/60 text-slate-500 text-xs font-mono flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>The Shadow Executive — Built for Google AI Studio Build Prototype Evaluation</span>
          </footer>

        </main>

      </div>

    </div>
  );
}
