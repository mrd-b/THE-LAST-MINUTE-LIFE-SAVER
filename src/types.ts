export type PersonaId = 'student' | 'entrepreneur';

export interface UserProfile {
  name: string;
  role: string;
  focusArea: string;
  workHours: string;
}

export interface CorpusFile {
  id: string;
  name: string;
  type: string;
  size: string;
  description: string;
  snippet: string;
}

export interface CrisisScenario {
  id: string;
  personaId: PersonaId;
  title: string;
  category: 'Academic Crisis' | 'Operational Crisis' | 'Custom Override';
  shortBadge: string;
  description: string;
  deadlineInMinutes: number;
  conflictingEventTitle: string;
  promptText: string;
}

export interface CalendarEvent {
  id: string;
  startTime: string; // e.g. "23:00"
  endTime: string;   // e.g. "01:00"
  title: string;
  category: 'crisis' | 'meeting' | 'deep_work' | 'personal' | 'academic';
  priority: 'high' | 'medium' | 'low' | 'urgent';
  status: 'original' | 'shifted' | 'created' | 'cancelled';
  originalTime?: string;
  shiftedToTime?: string;
  notes?: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  stepNumber: number;
  type: 'system' | 'thought' | 'tool_call' | 'tool_result' | 'synthesis';
  title: string;
  content: string;
  toolName?: 'adjust_calendar_schedule' | 'compile_draft_workspace' | 'generate_communication_payload';
  toolParams?: Record<string, any>;
  toolResult?: Record<string, any>;
  durationMs?: number;
}

export interface DraftWorkspaceData {
  documentTitle: string;
  completionPercentage: number;
  deliverableType: 'Lab Report & Data Tables' | 'Technical Architecture & Deployment' | 'Executive Brief';
  markdownContent: string;
  codeSnippets?: { filename: string; language: string; code: string }[];
  keyRubricPoints?: string[];
}

export interface CommunicationPayload {
  recipient: string;
  recipientDesignation: string;
  channel: 'Email' | 'Slack Executive' | 'Academic Portal';
  subject: string;
  body: string;
  toneMetadata: string[];
  suggestedAction: string;
  dispatched?: boolean;
}

export interface PrioritizedTask {
  id: string;
  title: string;
  category: string;
  priorityScore: number; // 0-100 AI score
  urgency: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  rank: number;
  deadline: string;
  completed: boolean;
}

export interface Recommendation {
  id: string;
  type: 'Burnout Prevention' | 'Deep Work Focus' | 'Study Strategy' | 'Workflow Optimization';
  title: string;
  description: string;
  actionBadge: string;
}

export interface ContextReminder {
  id: string;
  taskTitle: string;
  riskLevel: 'Critical' | 'Elevated' | 'Low';
  scheduledTiming: string; // e.g. "T-45 Mins based on Singularity Risk"
  dynamicContent: string;
  escalationProtocol: string; // e.g. "Auto-SMS & Lock Portal Tab"
  acknowledged: boolean;
}

export interface GoalMilestone {
  id: string;
  title: string;
  completed: boolean;
  aiGenerated?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  category: 'Long-Term Academic' | 'Product Architecture' | 'Career & Leadership';
  progress: number; // 0-100
  targetDate: string;
  milestones: GoalMilestone[];
}

export interface Habit {
  id: string;
  title: string;
  category: 'Study Habit' | 'Work Habit' | 'Recovery';
  consistencyScore: number; // 0-100 consistency score
  streakDays: number;
  completedToday: boolean;
  weeklyHistory: boolean[]; // 7 days
}

export interface DailyAgendaItem {
  id: string;
  timeSlot: string;
  title: string;
  mode: 'Autonomous Deep Focus' | 'Executive Shield Admin' | 'Buffer & Recovery';
  aiExecutionNote: string;
}

export interface PriorityDashboardMetrics {
  overallPriorityScore: number; // 0-100
  deadlineRiskScore: number;    // 0-100
  completionProbability: number;// e.g. 94%
  cognitiveRunwayHours: number;
}

export interface ExecutiveInsights {
  tasks: PrioritizedTask[];
  recommendations: Recommendation[];
  reminders: ContextReminder[];
  goals: Goal[];
  habits: Habit[];
  dailyAgenda: DailyAgendaItem[];
  dashboardMetrics: PriorityDashboardMetrics;
  voiceAssistantWorkflow: {
    nextActionSummary: string;
    voiceScriptResponse: string;
    suggestedVoiceCommands: string[];
  };
}

export interface OrchestrationPayload {
  scenarioId: string;
  personaId: PersonaId;
  logs: ExecutionLog[];
  calendarBefore: CalendarEvent[];
  calendarAfter: CalendarEvent[];
  draftWorkspace: DraftWorkspaceData;
  communication: CommunicationPayload;
  executiveInsights: ExecutiveInsights;
  executionMode: 'gemini-1.5-pro-live' | 'autonomous-simulated';
  totalLatencyMs: number;
}
