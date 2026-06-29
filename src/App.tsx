import React, { useState, useEffect } from 'react';
import { OrchestrationPayload, UserProfile } from './types';
import { PREBAKED_ORCHESTRATIONS } from './data/mockCorpus';
import { Header } from './components/Header';
import { GoalLifecycleCompanion } from './components/GoalLifecycleCompanion';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('finishline_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Alex Rivera',
      role: 'Full-Stack Engineer & Founder',
      focusArea: 'Shipping Product Features & MVP Triage',
      workHours: '8:00 AM - 6:30 PM'
    };
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
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
            console.debug('Operating in standalone client mode.');
          } else {
            await new Promise(r => setTimeout(r, delay));
          }
        }
      }
    };
    fetchMeta();
  }, []);

  // Trigger Autonomous Mitigation Loop
  const handleTriggerScenario = async (scenarioId: string, customPrompt?: string) => {
    setIsOrchestrating(true);

    try {
      const res = await fetch('/api/orchestrate-crisis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId,
          customPrompt,
          personaId: userProfile.role.toLowerCase().includes('student') ? 'student' : 'entrepreneur',
          userProfile
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
      const fallback = userProfile.role.toLowerCase().includes('student') ? 'student-crisis-1' : 'entrepreneur-crisis-1';
      setOrchestration(PREBAKED_ORCHESTRATIONS[fallback]);
    } finally {
      setIsOrchestrating(false);
    }
  };

  // Save User Profile
  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem('finishline_user_profile', JSON.stringify(newProfile));
    // Trigger immediate re-adaptation
    handleTriggerScenario('profile-adapted', `Adapting timeline for ${newProfile.name} (${newProfile.role})`);
  };

  // Dispatch outbound script
  const handleDispatch = async (recipient: string, subject: string) => {
    await fetch('/api/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, subject }),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        geminiLive={geminiLive}
        isOrchestrating={isOrchestrating}
      />

      {/* Main Minimalist Product View */}
      <main className="flex-1 overflow-y-auto flex flex-col bg-slate-950">
        <GoalLifecycleCompanion
          orchestration={orchestration}
          userProfile={userProfile}
          isOrchestrating={isOrchestrating}
          onTriggerScenario={handleTriggerScenario}
          onDispatchEmail={handleDispatch}
        />
      </main>

      {/* User Identity Customization Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        onSave={handleSaveProfile}
      />

    </div>
  );
}
