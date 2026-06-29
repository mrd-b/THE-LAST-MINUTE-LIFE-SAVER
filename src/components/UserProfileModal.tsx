import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Briefcase, Sparkles, Check, X } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
}

const PRESET_ROLES = [
  { label: '🎓 Student', role: 'Computer Science Student', focus: 'Exams, Lab Reports & Assignments', name: 'Alex Rivera' },
  { label: '💻 Engineer', role: 'Senior Software Engineer', focus: 'Shipping MVP Features & Bug Fixes', name: 'Alex Rivera' },
  { label: '🚀 Founder', role: 'Indie Tech Founder & CEO', focus: 'Investor Pitch Deck & Closings', name: 'Alex Rivera' }
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_ROLES[0]) => {
    const updated: UserProfile = {
      name: formData.name || preset.name,
      role: preset.role,
      focusArea: preset.focus,
      workHours: '8:00 AM - 6:30 PM'
    };
    setFormData(updated);
    onSave(updated);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col gap-5 text-slate-100">
        
        {/* Sleek Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">AI Identity &amp; Workflow</h2>
              <p className="text-[11px] text-slate-400">1-click switch or custom identity</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white cursor-pointer p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instant 1-Click Persona Toggles */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">Instant Switch (1-Click):</span>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_ROLES.map((preset, idx) => {
              const isSelected = formData.role === preset.role;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border text-center flex items-center justify-center ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center justify-center border-t border-slate-800/80 pt-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-900 px-2 -mt-3">or manual edit</span>
        </div>

        {/* Simplistic Compact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono text-slate-400">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono text-slate-400">Role / Title</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Software Engineer"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono text-slate-400">Active Goal / Focus</label>
            <input
              type="text"
              required
              value={formData.focusArea}
              onChange={e => setFormData({ ...formData, focusArea: e.target.value })}
              placeholder="e.g. Shipping MVP"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Custom Profile</span>
          </button>
        </form>

      </div>
    </div>
  );
};
