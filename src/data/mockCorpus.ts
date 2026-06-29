import { CorpusFile, CrisisScenario, OrchestrationPayload, ExecutiveInsights } from '../types';

export const PERSONA_METADATA = {
  student: {
    name: 'Aarav Sharma',
    role: 'B.Tech Robotics & AI Student (Sem 4)',
    institution: 'National Institute of Technology',
    avatarText: 'AS',
    tagline: 'Balancing rigorous lab deadlines & Lead Coordinator duties for "TechNexus 2026" college festival.',
    activeCrisisCount: 2,
    corpusFilesCount: 14,
  },
  entrepreneur: {
    name: 'Elena Rostova',
    role: 'Founder & Lead Architect (@Antigravity Labs)',
    institution: 'Y-Combinator W26 / Vibe Coding Stack',
    avatarText: 'ER',
    tagline: 'Practicing high-focus vibe coding on mobile-first LLM applications while juggling Enterprise SLAs.',
    activeCrisisCount: 3,
    corpusFilesCount: 28,
  },
};

export const CORPUS_FILES: Record<string, CorpusFile[]> = {
  student: [
    {
      id: 'c1',
      name: 'ROB302_Lab_Manual_&_Rubric.pdf',
      type: 'PDF Specification',
      size: '4.2 MB',
      description: 'Official Department Rubric: Denavit-Hartenberg (DH) parameters, Jacobian matrices, and trajectory planning plotting requirements.',
      snippet: 'Section 4.2: Students must include verified DH transformation matrices (T0_3) and plot end-effector velocity using matplotlib or ROS2 rviz.',
    },
    {
      id: 'c2',
      name: 'imu_encoder_raw_logs.csv',
      type: 'Telemetry Data',
      size: '850 KB',
      description: 'Captured 500Hz joint encoder angles (theta1, theta2, d3) and accelerometer readings from SCARA robot testbed.',
      snippet: 't,j1_rad,j2_rad,j3_mm,ax,ay,az\n0.00,0.124,-0.432,12.5,0.01,-0.04,9.81\n0.02,0.145,-0.410,12.5,0.02,-0.03,9.80...',
    },
    {
      id: 'c3',
      name: 'TechNexus_Fest_Master_Schedule.xlsx',
      type: 'Spreadsheet',
      size: '1.8 MB',
      description: 'Stage allocation, celebrity artist transport logistics, and sponsorship stall setup schedule for tomorrow morning.',
      snippet: 'Event: Inaugural Keynote | Venue: Main Auditorium | Time: tomorrow 09:00 AM | Coordinator: Aarav Sharma (Mandatory Attendance)',
    },
    {
      id: 'c4',
      name: 'kinematics_solver_draft.py',
      type: 'Python Script',
      size: '12 KB',
      description: 'Incomplete sympy script for deriving inverse kinematics equations from Cartesian target coordinates.',
      snippet: 'import sympy as sp\n# TODO: Fix singularity calculation when theta2 = 0 or 180 deg.',
    },
  ],
  entrepreneur: [
    {
      id: 'e1',
      name: 'core_v2_architecture_spec.md',
      type: 'System Design',
      size: '156 KB',
      description: 'Zero-latency edge proxy architecture, WebSockets connection pool sizing, and Cloud Run container scaling rules.',
      snippet: 'Architecture Requirement: All ingress traffic must terminate at Cloudflare Workers before proxying to containerized gRPC instances.',
    },
    {
      id: 'e2',
      name: 'Stripe_SaaS_Billing_Schema.sql',
      type: 'Database Schema',
      size: '45 KB',
      description: 'PostgreSQL DDL for usage-based metering tokens, seat expansion prorating, and enterprise invoice generation.',
      snippet: 'CREATE TABLE usage_ledger (id UUID PRIMARY KEY, org_id UUID, token_count BIGINT, timestamp TIMESTAMPTZ DEFAULT NOW());',
    },
    {
      id: 'e3',
      name: 'AcmeCorp_Enterprise_SLA_v2.docx',
      type: 'Contract',
      size: '1.2 MB',
      description: 'Master Services Agreement requiring 99.99% uptime guarantee and weekly synchronous engineering review calls.',
      snippet: 'Clause 8.4: Vendor shall provide weekly architectural progress briefs 24 hours prior to bi-weekly stakeholder check-ins.',
    },
    {
      id: 'e4',
      name: 'investor_monthly_update_draft.txt',
      type: 'Text Note',
      size: '8 KB',
      description: 'Rough bullet points on MRR growth (+34% MoM), customer acquisition cost reduction, and runway forecast.',
      snippet: '- Crossed $45k MRR this week\n- Shipped v2 beta to 14 pilot enterprise accounts\n- Need to hire 2 Senior Rust engineers.',
    },
  ],
};

export const PREBAKED_SCENARIOS: CrisisScenario[] = [
  {
    id: 'student-crisis-1',
    personaId: 'student',
    title: '11:00 PM Robotics Lab Submission Crunch',
    category: 'Academic Crisis',
    shortBadge: '🚨 Due in 60 Mins',
    description: 'It is 11:00 PM. A highly technical Robotics Lab Report (SCARA Kinematics & Data Tables) is due on the university portal at midnight (1 hour). Meanwhile, an urgent midnight committee review for tomorrow\'s college festival is demanding your presence.',
    deadlineInMinutes: 60,
    conflictingEventTitle: 'TechNexus Fest Committee Emergency Meet',
    promptText: 'It is 11:00 PM. My Robotics Lab Report on SCARA Kinematics is due in 60 minutes on the submission portal. I haven\'t formatted the data tables or mathematical DH proofs yet. Right now I have a conflicting "TechNexus Fest Committee Emergency Meet" scheduled on my calendar from 11:15 PM to midnight. Act autonomously to protect my grade.',
  },
  {
    id: 'entrepreneur-crisis-1',
    personaId: 'entrepreneur',
    title: 'v2.0 Production Launch vs Client Sync',
    category: 'Operational Crisis',
    shortBadge: '💥 Crashing Deadline',
    description: 'Antigravity Cloud Core v2.0 Production Deployment is scheduled for 2:00 PM today. A blocking database schema migration issue just emerged, directly colliding with a mandatory status sync meeting with your largest enterprise client (Acme Corp).',
    deadlineInMinutes: 120,
    conflictingEventTitle: 'Acme Corp Bi-Weekly Stakeholder Sync',
    promptText: 'Our v2.0 Production Architecture Launch is due in 2 hours and we hit a critical PostgreSQL schema migration bottleneck. At the exact same time (1:00 PM - 2:00 PM), I have a conflicting "Acme Corp Bi-Weekly Stakeholder Sync" on my calendar. I need to be 100% in deep-work coding flow right now. Take over.',
  },
];

export const STUDENT_INSIGHTS: ExecutiveInsights = {
  tasks: [
    { id: 't1', title: 'Derive DH Parameters & Jacobian for SCARA Manipulator', category: 'Robotics Lab', priorityScore: 98, urgency: 'High', impact: 'High', rank: 1, deadline: 'Midnight Portal Lock', completed: false },
    { id: 't2', title: 'Plot 500Hz Telemetry Velocity Verification', category: 'Data Analysis', priorityScore: 91, urgency: 'High', impact: 'High', rank: 2, deadline: 'T-30 Mins', completed: false },
    { id: 't3', title: 'Approve Fest Stage Acoustic Transport Sign-off', category: 'Fest Admin', priorityScore: 74, urgency: 'Medium', impact: 'Medium', rank: 3, deadline: 'Tomorrow 9:00 AM', completed: true },
    { id: 't4', title: 'Review Advanced Robotics Dynamics Lecture Slides', category: 'Study Prep', priorityScore: 42, urgency: 'Low', impact: 'High', rank: 4, deadline: 'Friday Quiz', completed: false }
  ],
  recommendations: [
    { id: 'r1', type: 'Burnout Prevention', title: 'Micro-Pomodoro Cognitive Buffer', description: 'Heavy mathematical syntax detected. Take a 3-minute diaphragmatic breathing pause at 11:30 PM.', actionBadge: 'Schedule Pause' },
    { id: 'r2', type: 'Deep Work Focus', title: 'Portal Tab Lockdown', description: 'Suppressing social webhooks & WhatsApp desktop notifications until LaTeX deliverable is signed.', actionBadge: 'Shield Active' },
    { id: 'r3', type: 'Study Strategy', title: 'Sympy Symbolic Verification', description: 'Use automated Sympy Jacobian determinant checks rather than manual arithmetic substitution.', actionBadge: 'Apply Rule' }
  ],
  reminders: [
    { id: 'cm1', taskTitle: 'ROB302 Submission Portal Verification', riskLevel: 'Critical', scheduledTiming: 'T-15 Mins (23:45 EST)', dynamicContent: 'If PDF file size > 5MB, university gateway drops attachments. Autonomously compressed graphs to 150 DPI.', escalationProtocol: 'Auto-SMS to Aarav & Freeze Screen', acknowledged: false },
    { id: 'cm2', taskTitle: 'TechNexus Fest Co-Chair Hand-off', riskLevel: 'Elevated', scheduledTiming: 'Tomorrow 08:30 EST', dynamicContent: 'Remind Co-Chair regarding auditorium keys before keynote setup begins.', escalationProtocol: 'Slack PagerDuty Alert', acknowledged: true }
  ],
  goals: [
    { id: 'g1', title: 'Maintain 9.4+ GPA in Robotics Core Semester', category: 'Long-Term Academic', progress: 88, targetDate: 'May 2026', milestones: [{ id: 'm1', title: 'A+ in Kinematics Midterm', completed: true }, { id: 'm2', title: 'Lab 4 Trajectory Proof Submission', completed: false, aiGenerated: true }, { id: 'm3', title: 'Autonomous ROS2 Navigation Project', completed: false }] },
    { id: 'g2', title: 'Execute TechNexus 2026 with 5,000+ Footfall', category: 'Career & Leadership', progress: 65, targetDate: 'March 2026', milestones: [{ id: 'm4', title: 'Lock Title Sponsor ($12k)', completed: true }, { id: 'm5', title: 'Finalize Stage Logistics Matrix', completed: true }, { id: 'm6', title: 'Zero Logistics Delay Execution Day', completed: false }] }
  ],
  habits: [
    { id: 'h1', title: 'Late-Night Deep Work Flow Block (2h)', category: 'Study Habit', consistencyScore: 92, streakDays: 14, completedToday: true, weeklyHistory: [true, true, true, false, true, true, true] },
    { id: 'h2', title: 'Time-Zero Calendar Roadblock Triage', category: 'Work Habit', consistencyScore: 96, streakDays: 21, completedToday: true, weeklyHistory: [true, true, true, true, true, true, true] },
    { id: 'h3', title: 'Midnight Sleep & Cognitive Recovery', category: 'Recovery', consistencyScore: 78, streakDays: 5, completedToday: false, weeklyHistory: [false, true, true, true, true, false, false] }
  ],
  dailyAgenda: [
    { id: 'da1', timeSlot: '23:00 - 23:45', title: 'DH Proof & Kinematics Matrix Derivation', mode: 'Autonomous Deep Focus', aiExecutionNote: 'Pre-populated Sympy LaTeX transformation equations.' },
    { id: 'da2', timeSlot: '23:45 - 00:00', title: 'Telemetry CSV Formatting & Portal Upload', mode: 'Autonomous Deep Focus', aiExecutionNote: 'Checking PDF payload headers against LMS portal.' },
    { id: 'da3', timeSlot: '00:00 - 00:15', title: 'Cognitive Decompress & Outbound Dispatch Review', mode: 'Buffer & Recovery', aiExecutionNote: 'Email confirmation sent to Fest core committee.' }
  ],
  dashboardMetrics: {
    overallPriorityScore: 96,
    deadlineRiskScore: 92,
    completionProbability: 95,
    cognitiveRunwayHours: 1.8
  },
  voiceAssistantWorkflow: {
    nextActionSummary: 'Aarav, your immediate focus is completing Section 3 transformation matrices. I have cleared your calendar until 1 AM.',
    voiceScriptResponse: 'I have intercepted your Robotics Lab deadline crunch. Your conflicting festival committee meeting has been pushed to 9:45 AM tomorrow. The Denavit-Hartenberg mathematical proofs are 72% pre-compiled in your draft workspace. Say "upload telemetry" when ready to verify joint velocity plots.',
    suggestedVoiceCommands: ['"What should I do next?"', '"Read kinematic summary"', '"Dispatch email to Fest committee"']
  }
};

export const ENTREPRENEUR_INSIGHTS: ExecutiveInsights = {
  tasks: [
    { id: 'et1', title: 'Execute CONCURRENTLY Index Migration on usage_ledger', category: 'Cloud Core v2.0', priorityScore: 99, urgency: 'High', impact: 'High', rank: 1, deadline: 'Launch Window (14:00)', completed: false },
    { id: 'et2', title: 'Configure Knative Traffic Splitter (10% Canary -> 90%)', category: 'DevOps Ingress', priorityScore: 94, urgency: 'High', impact: 'High', rank: 2, deadline: 'T-45 Mins', completed: false },
    { id: 'et3', title: 'Brief Acme Corp VP Engineering on 18ms Latency SLA', category: 'Enterprise Comms', priorityScore: 82, urgency: 'Medium', impact: 'High', rank: 3, deadline: '16:30 Sync', completed: true },
    { id: 'et4', title: 'Review Senior Rust Engineer Candidate Take-home Repos', category: 'Hiring Pipeline', priorityScore: 48, urgency: 'Low', impact: 'Medium', rank: 4, deadline: 'End of Week', completed: false }
  ],
  recommendations: [
    { id: 'er1', type: 'Burnout Prevention', title: 'Context-Switch Shielding', description: 'High enterprise cognitive load. Automatically deferring non-urgent Slack threads until v2 cutover reaches 100% stability.', actionBadge: 'Shield Engaged' },
    { id: 'er2', type: 'Workflow Optimization', title: 'Safe DDL Concurrency', description: 'Always execute PostgreSQL index builds outside transaction blocks to prevent table-level write locks.', actionBadge: 'Enforced' },
    { id: 'er3', type: 'Deep Work Focus', title: 'Async Executive Voice Brief', description: 'Use AI voice note synthesis for Acme Corp weekly updates rather than 30-minute synchronous calls.', actionBadge: 'Adopt Flow' }
  ],
  reminders: [
    { id: 'ecm1', taskTitle: 'Cloud Run Ingress Health Check Rejection Alarm', riskLevel: 'Critical', scheduledTiming: 'T-10 Mins before Traffic Cutover', dynamicContent: 'If HTTP 5xx rate > 0.05%, automated circuit breaker auto-reverts traffic to v1-stable revision.', escalationProtocol: 'PagerDuty Override & Rollback Script', acknowledged: false },
    { id: 'ecm2', taskTitle: 'Stripe Webhook Idempotency Verification', riskLevel: 'Elevated', scheduledTiming: 'Post-Launch +30 Mins', dynamicContent: 'Verify ledger token metering count matches raw Stripe billing webhooks.', escalationProtocol: 'Slack DevOps Ping', acknowledged: true }
  ],
  goals: [
    { id: 'eg1', title: 'Scale Antigravity Core to $100k MRR', category: 'Product Architecture', progress: 75, targetDate: 'Q4 2026', milestones: [{ id: 'em1', title: 'Cross $45k MRR Milestone', completed: true }, { id: 'em2', title: 'Ship Zero-Latency Edge Core v2.0', completed: false, aiGenerated: true }, { id: 'em3', title: 'SOC2 Type II Audit Completion', completed: false }] },
    { id: 'eg2', title: 'Maintain 99.99% Enterprise SLA Uptime', category: 'Career & Leadership', progress: 96, targetDate: 'Continuous', milestones: [{ id: 'em4', title: 'Zero Downtime Database Cutover', completed: false, aiGenerated: true }, { id: 'em5', title: 'Automated Canary Rollback Circuit Breaker', completed: true }] }
  ],
  habits: [
    { id: 'eh1', title: 'Uninterrupted Vibe Coding Deep Flow (3h+)', category: 'Work Habit', consistencyScore: 98, streakDays: 32, completedToday: true, weeklyHistory: [true, true, true, true, true, true, true] },
    { id: 'eh2', title: 'FinishLine AI Daily Action Review', category: 'Work Habit', consistencyScore: 94, streakDays: 19, completedToday: true, weeklyHistory: [true, true, true, false, true, true, true] },
    { id: 'eh3', title: 'Evening Digital Disconnect & Physical Run', category: 'Recovery', consistencyScore: 82, streakDays: 8, completedToday: false, weeklyHistory: [true, false, true, true, true, true, false] }
  ],
  dailyAgenda: [
    { id: 'eda1', timeSlot: '12:45 - 13:30', title: 'PostgreSQL Index Safe-Mode Execution', mode: 'Autonomous Deep Focus', aiExecutionNote: 'Running non-blocking CONCURRENTLY index scripts.' },
    { id: 'eda2', timeSlot: '13:30 - 14:15', title: 'Cloud Run Canary Splitter 10% -> 90% Verification', mode: 'Autonomous Deep Focus', aiExecutionNote: 'Monitoring p99 latency drop across asia-east1.' },
    { id: 'eda3', timeSlot: '16:30 - 17:15', title: 'Acme Corp Executive Stakeholder Briefing Call', mode: 'Executive Shield Admin', aiExecutionNote: 'Pre-staged 18ms latency benchmark docs.' }
  ],
  dashboardMetrics: {
    overallPriorityScore: 98,
    deadlineRiskScore: 94,
    completionProbability: 96,
    cognitiveRunwayHours: 2.5
  },
  voiceAssistantWorkflow: {
    nextActionSummary: 'Elena, your top rank task is running the PostgreSQL safe migration. Client sync is successfully pushed to 4:30 PM.',
    voiceScriptResponse: 'Welcome to your v2.0 Cutover Hub. I have neutralized your calendar conflict with Acme Corp by shifting the sync to 4:30 PM. Your database migration safe-mode SQL is staged and validated. All external pings are routed to your executive shield. Say "deploy canary" when index build completes.',
    suggestedVoiceCommands: ['"What should I do next?"', '"Check canary traffic split"', '"Read executive client brief"']
  }
};

export const PREBAKED_ORCHESTRATIONS: Record<string, OrchestrationPayload> = {
  'student-crisis-1': {
    scenarioId: 'student-crisis-1',
    personaId: 'student',
    executionMode: 'autonomous-simulated',
    totalLatencyMs: 1420,
    logs: [
      {
        id: 'l1',
        stepNumber: 1,
        timestamp: '23:00:01',
        type: 'system',
        title: 'CRISIS INTERCEPTED: Academic Deadline Imminent',
        content: 'Triggered FinishLine AI autonomous action protocol. Target: B.Tech Robotics Lab Submission (ROB302). Remaining window: 60 minutes.',
      },
      {
        id: 'l2',
        stepNumber: 2,
        timestamp: '23:00:02',
        type: 'thought',
        title: 'Gemini 1.5 Pro Reasoning Loop (Context Ingestion)',
        content: 'Ingested 4 background corpus artifacts (ROB302_Lab_Manual.pdf, imu_logs.csv, kinematics.py). Evaluated calendar conflict: "TechNexus Fest Committee Meet" (Priority: Medium-High) clashes with critical academic submission portal lock at 00:00. Calculating required deep work mitigation window: 120 minutes.',
      },
      {
        id: 'l3',
        stepNumber: 3,
        timestamp: '23:00:03',
        type: 'tool_call',
        title: 'Invoking Tool: adjust_calendar_schedule()',
        content: 'Executing calendar mutation payload to secure uninterrupted cognitive band.',
        toolName: 'adjust_calendar_schedule',
        toolParams: {
          conflictingEventTitle: 'TechNexus Fest Committee Emergency Meet',
          hoursShifted: 10.5,
          allocatedBlockMinutes: 120,
        },
      },
      {
        id: 'l4',
        stepNumber: 4,
        timestamp: '23:00:04',
        type: 'tool_result',
        title: 'Tool Executed: Calendar Roadblock Removed',
        content: 'Successfully shifted "TechNexus Fest Committee Meet" downstream to tomorrow 09:45 AM. Created locked red-alert block: "TIME-ZERO DEEP WORK: ROBOTICS LAB" (23:00 - 01:00). All Slack & email notifications suppressed.',
        toolResult: { status: 'SUCCESS', eventRescheduled: true, newTime: 'Tomorrow 09:45 AM' },
      },
      {
        id: 'l5',
        stepNumber: 5,
        timestamp: '23:00:05',
        type: 'tool_call',
        title: 'Invoking Tool: compile_draft_workspace()',
        content: 'Synthesizing raw CSV telemetry logs and sympy Python code into structured academic deliverable.',
        toolName: 'compile_draft_workspace',
        toolParams: {
          documentTitle: 'ROB302: Kinematic Analysis & Trajectory Verification of 3-DOF SCARA Manipulator',
          markdownContent: '## Abstract\nThis report presents the forward and inverse kinematic modeling of a 3-DOF Selective Compliance Assembly Robot Arm (SCARA)... [Truncated for brevity in log]',
        },
      },
      {
        id: 'l6',
        stepNumber: 6,
        timestamp: '23:00:07',
        type: 'tool_result',
        title: 'Tool Executed: 70% Deliverable Compiled',
        content: 'Generated 1,450 words of structured LaTeX/Markdown with pre-calculated Denavit-Hartenberg transformation matrices, formatted telemetry verification table (500Hz sample subset), and ROS2 Python node implementation.',
        toolResult: { completionRatio: '72%', wordCount: 1450, codeBlocksGenerated: 2 },
      },
      {
        id: 'l7',
        stepNumber: 7,
        timestamp: '23:00:08',
        type: 'tool_call',
        title: 'Invoking Tool: generate_communication_payload()',
        content: 'Drafting diplomatic out-of-band notification to Fest Lead Team regarding tonight\'s absence.',
        toolName: 'generate_communication_payload',
        toolParams: {
          recipient: 'Prof. R. K. Gupta & Fest Core Committee',
          subject: 'Absence Notice: Tonight\'s TechNexus Sync -> Rescheduled to Tomorrow 9:45 AM',
          body: 'Dear Team,\n\nDue to an urgent academic lab submission portal closing tonight at midnight, I am shifting my attendance for tonight\'s committee sync to tomorrow morning at 9:45 AM.\n\nI have already reviewed the Stage Allocation logistics sheet (attached in shared drive) and signed off on the acoustic transport vendor.\n\nBest regards,\nAarav Sharma\nLead Coordinator, TechNexus 2026',
        },
      },
      {
        id: 'l8',
        stepNumber: 8,
        timestamp: '23:00:09',
        type: 'synthesis',
        title: 'AUTONOMOUS EXECUTION COMPLETE',
        content: 'Friction reduced to zero. Calendar space protected. Deliverable draft staged at 72% fidelity. Outbound brief ready for one-click dispatch.',
      },
    ],
    calendarBefore: [
      { id: 'b1', startTime: '21:00', endTime: '22:30', title: 'Robotics Group Study & Sensor Test', category: 'academic', priority: 'medium', status: 'original' },
      { id: 'b2', startTime: '23:15', endTime: '00:00', title: 'TechNexus Fest Committee Emergency Meet', category: 'meeting', priority: 'high', status: 'original' },
      { id: 'b3', startTime: '00:00', endTime: '00:15', title: 'PORTAL CLOSES: ROB302 Lab Submission', category: 'crisis', priority: 'urgent', status: 'original' },
    ],
    calendarAfter: [
      { id: 'a1', startTime: '21:00', endTime: '22:30', title: 'Robotics Group Study & Sensor Test', category: 'academic', priority: 'medium', status: 'original' },
      { id: 'a2', startTime: '23:00', endTime: '01:00', title: '⚡ TIME-ZERO DEEP WORK: ROBOTICS LAB REPORT', category: 'deep_work', priority: 'urgent', status: 'created', notes: 'Autonomous Executive Block. Notifications Muted.' },
      { id: 'a3', startTime: '09:45', endTime: '10:30', title: 'TechNexus Fest Committee Meet (Shifted +10.5h)', category: 'meeting', priority: 'medium', status: 'shifted', originalTime: '23:15 yesterday' },
    ],
    draftWorkspace: {
      documentTitle: 'ROB302: Forward & Inverse Kinematics of a 3-DOF SCARA Manipulator',
      completionPercentage: 72,
      deliverableType: 'Lab Report & Data Tables',
      keyRubricPoints: [
        'Verified Denavit-Hartenberg (DH) Parameter Table',
        'Homogeneous Transformation Matrix T0_3 Derivation',
        'Singularity Analysis & Jacobian Determinant Proof',
        'Empirical Joint Telemetry vs Theoretical Plot Comparison',
      ],
      markdownContent: `# ROB302: Forward & Inverse Kinematics of a 3-DOF SCARA Manipulator

**Author:** Aarav Sharma (Roll No: 24-ROB-108)  
**Date:** June 24, 2026 | **Status:** 72% Pre-Compiled Autonomous Draft  

---

## 1. Executive Abstract
This laboratory submission verifies the theoretical kinematic model of a 3-Degree-of-Freedom (3-DOF) Selective Compliance Assembly Robot Arm (SCARA) against live 500Hz joint encoder logs captured from the laboratory testbed. Homogeneous transformation matrices are derived using standard **Denavit-Hartenberg (DH) conventions**.

## 2. Denavit-Hartenberg (DH) Parameters

The standard DH parameters assigned to the manipulator links are tabulated below:

| Link ($i$) | Link Length $a_i$ (mm) | Link Twist $\\alpha_i$ (deg) | Joint Distance $d_i$ (mm) | Joint Angle $\\theta_i$ (rad) |
| :--- | :--- | :--- | :--- | :--- |
| **1** | $L_1 = 350.0$ | $0^\\circ$ | $0.0$ | $\\theta_1^*$ (Variable) |
| **2** | $L_2 = 250.0$ | $180^\\circ$ | $0.0$ | $\\theta_2^*$ (Variable) |
| **3** | $0.0$ | $0^\\circ$ | $d_3^*$ (Variable prismatic) | $0.0$ |

## 3. Transformation Matrix Derivation ($T_0^3$)

By multiplying individual homogeneous transforms $A_1 \\cdot A_2 \\cdot A_3$:

\`\`\`math
T_0^3 = \\begin{bmatrix}
\\cos(\\theta_1+\\theta_2) & \\sin(\\theta_1+\\theta_2) & 0 & L_1\\cos\\theta_1 + L_2\\cos(\\theta_1+\\theta_2) \\\\
\\sin(\\theta_1+\\theta_2) & -\\cos(\\theta_1+\\theta_2) & 0 & L_1\\sin\\theta_1 + L_2\\sin(\\theta_1+\\theta_2) \\\\
0 & 0 & -1 & -d_3 \\\\
0 & 0 & 0 & 1
\\end{bmatrix}
\`\`\`

## 4. Empirical Telemetry Calibration Sample

Below is the structured extraction from \`imu_encoder_raw_logs.csv\` synchronized with calculated end-effector coordinates:

| Timestamp ($t$) | $\\theta_1$ (rad) | $\\theta_2$ (rad) | $d_3$ (mm) | Calc $X_{ee}$ (mm) | Calc $Y_{ee}$ (mm) | Status |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0.00s** | 0.124 | -0.432 | 12.50 | 588.42 | 41.20 | ✔ Verified |
| **0.02s** | 0.145 | -0.410 | 12.50 | 587.10 | 48.95 | ✔ Verified |
| **0.04s** | 0.168 | -0.388 | 12.55 | 585.22 | 56.80 | ✔ Verified |
| **0.06s** | 0.192 | -0.365 | 12.60 | 582.80 | 64.71 | ✔ Verified |

## 5. Singularity & Singularity Avoidance
Singularities occur when $\\det(J) = L_1 L_2 \\sin(\\theta_2) = 0$, implying $\\theta_2 = 0$ or $\\pi$. In our testbed trajectory, $\\theta_2$ remained within $[-0.432, -0.110]$ radians, ensuring full dynamic manipulability throughout the assembly cycle.

---
*Generated by FinishLine AI Hub v1.5*`,
      codeSnippets: [
        {
          filename: 'scara_kinematics_solver.py',
          language: 'python',
          code: `import numpy as np
import math

class ScaraKinematics:
    def __init__(self, l1=350.0, l2=250.0):
        self.L1 = l1
        self.L2 = l2

    def forward_kinematics(self, theta1, theta2, d3):
        """Computes end-effector (x, y, z) from joint space."""
        x = self.L1 * math.cos(theta1) + self.L2 * math.cos(theta1 + theta2)
        y = self.L1 * math.sin(theta1) + self.L2 * math.sin(theta1 + theta2)
        z = -d3
        return np.array([x, y, z])

    def inverse_kinematics(self, x, y, z):
        """Analytical closed-form IK solver for SCARA."""
        r_sq = x**2 + y**2
        cos_t2 = (r_sq - self.L1**2 - self.L2**2) / (2 * self.L1 * self.L2)
        cos_t2 = np.clip(cos_t2, -1.0, 1.0) # Singularity guard
        
        theta2 = math.acos(cos_t2) # Elbow down solution
        k1 = self.L1 + self.L2 * math.cos(theta2)
        k2 = self.L2 * math.sin(theta2)
        
        theta1 = math.atan2(y, x) - math.atan2(k2, k1)
        d3 = -z
        return theta1, theta2, d3

if __name__ == "__main__":
    solver = ScaraKinematics()
    print("Test FK:", solver.forward_kinematics(0.124, -0.432, 12.5))`
        }
      ]
    },
    communication: {
      recipient: 'Prof. R. K. Gupta & Fest Core Committee',
      recipientDesignation: 'Head of Department / Fest Advisors',
      channel: 'Email',
      subject: 'Absence Notice: Tonight\'s TechNexus Committee Sync -> Rescheduled to Tomorrow 9:45 AM',
      body: `Dear Professor Gupta and Committee Members,

Please accept this brief update regarding tonight's emergency sync. Due to the strict midnight submission deadline for the ROB302 Robotics Lab Report (Kinematics & Trajectory Verification), I am prioritizing completing the technical data tables and mathematical proofs tonight.

I have shifted my attendance for our festival committee review to tomorrow morning at 9:45 AM. 

Before signing off tonight, I verified and uploaded the finalized Stage Allocation Sheet and acoustic vendor sign-offs to our shared Drive folder so committee operations proceed without delay.

Thank you for your understanding.

Sincerely,
Aarav Sharma
Roll No: 24-ROB-108
Lead Coordinator, TechNexus 2026`,
      toneMetadata: ['Diplomatic', 'Proactive Accountability', 'High Composure'],
      suggestedAction: 'Dispatch via SMTP Outbox',
      dispatched: false
    },
    executiveInsights: STUDENT_INSIGHTS
  },
  'entrepreneur-crisis-1': {
    scenarioId: 'entrepreneur-crisis-1',
    personaId: 'entrepreneur',
    executionMode: 'autonomous-simulated',
    totalLatencyMs: 1650,
    logs: [
      {
        id: 'el1',
        stepNumber: 1,
        timestamp: '12:45:01',
        type: 'system',
        title: 'CRISIS INTERCEPTED: Production Launch Blocker',
        content: 'Detected impending v2.0 Production Launch vs Client Status Sync collision. Target: Antigravity Core v2.0 Ingress Cutover.',
      },
      {
        id: 'el2',
        stepNumber: 2,
        timestamp: '12:45:02',
        type: 'thought',
        title: 'Gemini 1.5 Pro Reasoning Loop (Conflict Triage)',
        content: 'Analyzed v2_architecture_spec.md and Stripe_SaaS_Billing_Schema.sql. Identified database migration locking bottleneck on `usage_ledger`. Calendar conflict: "Acme Corp Stakeholder Sync" at 1:00 PM (Client SLA: High). Decision: Shift client sync by +3.5 hours with executive brief justification to lock down 2-hour coding sandbox.',
      },
      {
        id: 'el3',
        stepNumber: 3,
        timestamp: '12:45:03',
        type: 'tool_call',
        title: 'Invoking Tool: adjust_calendar_schedule()',
        content: 'Mutating calendar schedule to clear cognitive runway for PostgreSQL bottleneck resolution.',
        toolName: 'adjust_calendar_schedule',
        toolParams: {
          conflictingEventTitle: 'Acme Corp Bi-Weekly Stakeholder Sync',
          hoursShifted: 3.5,
          allocatedBlockMinutes: 120,
        },
      },
      {
        id: 'el4',
        stepNumber: 4,
        timestamp: '12:45:04',
        type: 'tool_result',
        title: 'Tool Executed: Calendar Mutated',
        content: 'Rescheduled "Acme Corp Stakeholder Sync" to 4:30 PM today. Placed red-shield block: "TIME-ZERO DEEP WORK: v2.0 DATABASE MIGRATION" (12:45 - 14:45). Auto-responder enabled.',
        toolResult: { status: 'SUCCESS', shiftedHours: 3.5, newSlot: 'Today 04:30 PM EST' },
      },
      {
        id: 'el5',
        stepNumber: 5,
        timestamp: '12:45:06',
        type: 'tool_call',
        title: 'Invoking Tool: compile_draft_workspace()',
        content: 'Assembling v2.0 Production Deployment Guide, migration safe-mode SQL, and SLA release notes.',
        toolName: 'compile_draft_workspace',
        toolParams: {
          documentTitle: 'Antigravity Cloud Core v2.0: Production Migration & Zero-Downtime Rollout Spec',
          markdownContent: '# Antigravity Core v2.0: Zero-Downtime Cutover Spec\n\n## 1. Incident Context\nDuring pre-flight checks for the 2:00 PM v2 launch... [Truncated]',
        },
      },
      {
        id: 'el6',
        stepNumber: 6,
        timestamp: '12:45:08',
        type: 'tool_result',
        title: 'Tool Executed: Architecture Workspace Ready',
        content: 'Compiled 70% draft architecture spec, non-locking SQL index migration script (`CONCURRENTLY`), and Cloud Run traffic splitting manifest.',
        toolResult: { completionRatio: '75%', artifactsGenerated: 3 },
      },
      {
        id: 'el7',
        stepNumber: 7,
        timestamp: '12:45:09',
        type: 'tool_call',
        title: 'Invoking Tool: generate_communication_payload()',
        content: 'Drafting high-signal executive briefing to Acme Corp VP of Engineering.',
        toolName: 'generate_communication_payload',
        toolParams: {
          recipient: 'Marcus Vance (VP Engineering @ Acme Corp)',
          subject: 'Briefing Update & Slight Time Shift: Acme Corp <-> Antigravity v2 Sync (Moving to 4:30 PM)',
          body: 'Hi Marcus,\n\nTo ensure our v2.0 zero-latency edge cutover goes live seamlessly this afternoon, our core engineering team is performing an uninterrupted database index optimization over the next 90 minutes.\n\nI have moved our bi-weekly architecture check-in to 4:30 PM EST today. I\'ve already attached the preliminary v2 latency benchmark report (showing 18ms p99 ingress response) for your review ahead of our call.\n\nLooking forward to catching up at 4:30 PM.\n\nBest,\nElena Rostova\nFounder, Antigravity Labs',
        },
      },
      {
        id: 'el8',
        stepNumber: 8,
        timestamp: '12:45:10',
        type: 'synthesis',
        title: 'AUTONOMOUS CUTOVER ORCHESTRATED',
        content: 'Engineering runway cleared. Database hotfix staged. Enterprise client relationship buffered with high-signal executive transparency.',
      },
    ],
    calendarBefore: [
      { id: 'eb1', startTime: '11:00', endTime: '12:00', title: 'Stripe Webhook Refactor Code Review', category: 'personal', priority: 'medium', status: 'original' },
      { id: 'eb2', startTime: '13:00', endTime: '14:00', title: 'Acme Corp Bi-Weekly Stakeholder Sync', category: 'meeting', priority: 'high', status: 'original' },
      { id: 'eb3', startTime: '14:00', endTime: '14:30', title: 'CUTOVER WINDOW: v2.0 Cloud Run Launch', category: 'crisis', priority: 'urgent', status: 'original' },
    ],
    calendarAfter: [
      { id: 'ea1', startTime: '11:00', endTime: '12:00', title: 'Stripe Webhook Refactor Code Review', category: 'personal', priority: 'medium', status: 'original' },
      { id: 'ea2', startTime: '12:45', endTime: '14:45', title: '⚡ TIME-ZERO DEEP WORK: v2.0 SCHEMA MIGRATION', category: 'deep_work', priority: 'urgent', status: 'created', notes: 'Autonomous Executive Shield Active. Do Not Disturb.' },
      { id: 'ea3', startTime: '16:30', endTime: '17:30', title: 'Acme Corp Stakeholder Sync (Shifted +3.5h)', category: 'meeting', priority: 'high', status: 'shifted', originalTime: '13:00 today' },
    ],
    draftWorkspace: {
      documentTitle: 'Antigravity Core v2.0: Production Cutover & Schema Safe-Mode Spec',
      completionPercentage: 75,
      deliverableType: 'Technical Architecture & Deployment',
      keyRubricPoints: [
        'Non-locking CONCURRENTLY Index Creation on Ledger',
        'Cloud Run Canary Split (10% -> 50% -> 100%)',
        'Stripe Token Idempotency Replay Safeguard',
        'p99 Latency Reduction Validation (18ms SLA)',
      ],
      markdownContent: `# Antigravity Core v2.0: Zero-Downtime Cutover Spec

**Architect:** Elena Rostova (@Antigravity Labs)  
**Target Environment:** Cloud Run (asia-east1 / us-central1 multi-region)  
**Status:** 75% Pre-Compiled Autonomous Engineering Brief  

---

## 1. Problem Bottleneck Analysis
During final staging pre-flight validation for the v2.0 release, exclusive table locks on \`usage_ledger\` caused connection pool starvation under 10k RPS load tests. Standard \`CREATE INDEX\` operations block DML inserts.

## 2. Safe Migration Remediation (PostgreSQL)
To eliminate downtime during our 2:00 PM launch window, we execute non-blocking index builds:

\`\`\`sql
-- Run in standalone migration transaction
SET lock_timeout = '2s';
SET statement_timeout = '60s';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_usage_org_time 
ON usage_ledger (org_id, timestamp DESC)
INCLUDE (token_count);

ALTER TABLE usage_ledger ADD CONSTRAINT chk_positive_tokens 
CHECK (token_count >= 0) NOT VALID;
\`\`\`

## 3. Traffic Canary Rollout Strategy

We utilize dynamic traffic splitting to isolate enterprise pilot orgs:

\`\`\`yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: antigravity-core-ingress
spec:
  traffic:
  - revisionName: antigravity-core-v1-stable
    percent: 10
  - revisionName: antigravity-core-v2-canary
    percent: 90
    tag: v2-preview
\`\`\`

## 4. Latency Verification Matrix (p99 Benchmarks)

| Endpoint Ingress Route | v1 Stable (ms) | v2 Edge Proxy (ms) | Delta Improv. | Status |
| :--- | :---: | :---: | :---: | :---: |
| \`POST /v1/chat/completions\` | 142ms | 48ms | **-66.2%** | ✔ Verified |
| \`GET /v1/ledger/balance\` | 84ms | 18ms | **-78.5%** | ✔ Verified |
| \`POST /v1/webhooks/stripe\` | 210ms | 65ms | **-69.0%** | ✔ Verified |

## 5. Rollback Trigger Thresholds
If HTTP 5xx error rates exceed **0.05%** over any continuous 60-second sliding window, the automated CI/CD circuit breaker will instantly revert 100% traffic back to \`v1-stable\`.

---
*Orchestrated by FinishLine AI Hub v1.5*`,
      codeSnippets: [
        {
          filename: 'cloudrun_canary_deploy.sh',
          language: 'bash',
          code: `#!/usr/bin/env bash
set -euo pipefail

echo "⚡ Deploying Antigravity Core v2.0 Canary Container..."
gcloud run deploy antigravity-core-ingress \\
  --image=gcr.io/antigravity-labs/core:v2.0-rc4 \\
  --region=asia-east1 \\
  --no-traffic \\
  --tag=canary

echo "🔄 Routing 10% pilot traffic to Canary revision..."
gcloud run services update-traffic antigravity-core-ingress \\
  --region=asia-east1 \\
  --to-tags canary=10`
        }
      ]
    },
    communication: {
      recipient: 'Marcus Vance',
      recipientDesignation: 'VP of Engineering (@Acme Corp)',
      channel: 'Email',
      subject: 'Briefing Update & Slight Time Shift: Acme Corp <-> Antigravity v2 Architecture Sync (Moving to 4:30 PM)',
      body: `Hi Marcus,

To ensure our v2.0 zero-latency edge cutover goes live seamlessly for Acme Corp this afternoon, our core backend architecture team is performing an uninterrupted database index optimization over the next 90 minutes.

I have moved our bi-weekly stakeholder check-in to 4:30 PM EST today. 

Ahead of our call, I've already shared the preliminary v2 latency benchmark report (showing an 18ms p99 ingress response time across your tenant cluster) directly to your project portal.

Looking forward to catching up at 4:30 PM.

Best regards,
Elena Rostova
Founder & Chief Architect
Antigravity Labs`,
      toneMetadata: ['High-Signal Transparency', 'Executive Partnership', 'Zero Fluff'],
      suggestedAction: 'Dispatch via Enterprise Priority SMTP',
      dispatched: false
    },
    executiveInsights: ENTREPRENEUR_INSIGHTS
  }
};
