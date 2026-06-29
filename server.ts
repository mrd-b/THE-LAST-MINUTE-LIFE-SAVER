import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { PREBAKED_ORCHESTRATIONS, PREBAKED_SCENARIOS, CORPUS_FILES, PERSONA_METADATA } from './src/data/mockCorpus.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization helper for Gemini
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'FinishLine AI Autonomous Agent Hub',
    geminiLive: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString()
  });
});

// Get Personas and Corpus data
app.get('/api/metadata', (req, res) => {
  res.json({
    personas: PERSONA_METADATA,
    scenarios: PREBAKED_SCENARIOS,
    corpus: CORPUS_FILES,
    geminiLive: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// Main autonomous micro-agent orchestration trigger
app.post('/api/orchestrate-crisis', async (req, res) => {
  const { scenarioId, customPrompt, personaId = 'student', userProfile, forceSimulation = false } = req.body;
  const startTime = Date.now();

  const isPrebaked = Boolean(scenarioId && PREBAKED_ORCHESTRATIONS[scenarioId]);
  const gemini = getGeminiClient();

  // If forceSimulation OR no real API key OR prebaked scenario requested in demo fast-mode
  if (forceSimulation || !gemini || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY' || (isPrebaked && !customPrompt)) {
    const fallbackId = isPrebaked ? scenarioId : (personaId === 'entrepreneur' ? 'entrepreneur-crisis-1' : 'student-crisis-1');
    const result = PREBAKED_ORCHESTRATIONS[fallbackId];
    
    // Tailor dynamically if userProfile or custom prompt was provided
    if (customPrompt || userProfile) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const customized = JSON.parse(JSON.stringify(result));
      const promptText = customPrompt || (userProfile ? `Optimize schedule for ${userProfile.name} (${userProfile.role})` : 'Emergency Triage');
      
      customized.logs[0].content = `Ingested commitment input: "${promptText.slice(0, 90)}..."`;
      customized.draftWorkspace.documentTitle = `${userProfile?.role ? userProfile.role + ' ' : ''}Action Draft: ${promptText.slice(0, 40)}`;
      
      if (userProfile) {
        customized.executiveInsights.tasks[0].title = customPrompt ? `Execute deliverable: ${customPrompt.slice(0, 50)}` : `${userProfile.focusArea} Core Milestone`;
        customized.communication.recipient = userProfile.role.toLowerCase().includes('student') ? 'Professor / Advisor' : 'Key Stakeholder / Client';
        customized.communication.subject = `Update regarding ${promptText.slice(0, 40)}`;
        customized.communication.body = `Hi,\n\nI am reaching out to share the latest status update on "${promptText}". I have blocked out dedicated deep focus time and structured the primary deliverables.\n\nBest regards,\n${userProfile.name || 'FinishLine User'}`;
        customized.executiveInsights.voiceAssistantWorkflow.voiceScriptResponse = `I have prioritized "${promptText}" for ${userProfile.name}. Your calendar has been adjusted to protect deep focus blocks.`;
      } else if (customPrompt) {
        customized.executiveInsights.tasks[0].title = `Execute commitment: ${customPrompt.slice(0, 50)}`;
        customized.executiveInsights.voiceAssistantWorkflow.voiceScriptResponse = `I analyzed your request "${customPrompt.slice(0, 40)}" and restructured your timeline.`;
      }
      
      customized.executionMode = 'autonomous-simulated';
      customized.totalLatencyMs = Date.now() - startTime;
      return res.json(customized);
    }

    return res.json({
      ...result,
      totalLatencyMs: Date.now() - startTime
    });
  }

  // Real Gemini 2.5 Pro / Flash Function Calling Execution
  try {
    const userContextStr = userProfile ? `User Name: ${userProfile.name}, Role: ${userProfile.role}, Focus Area: ${userProfile.focusArea}, Work Hours: ${userProfile.workHours}.` : `Default User Role: ${personaId}`;
    const systemInstruction = `You are FinishLine AI, an elite, autonomous micro-agent and executive companion for ${userProfile?.name || 'the user'}. You do not just remind the user; you take time-zero pre-emptive actions tailored to their exact role.
${userContextStr}

When a memo, note, or commitment is initiated, you must orchestrate your response by executing the following loop:
1. Analyze the timeline and trigger \`adjust_calendar_schedule\` to clear space for the user.
2. Ingest background reference data and call \`compile_draft_workspace\` to build a highly granular, 80% completed draft structure (using rich markdown, outlines, or code arrays).
3. Call \`generate_communication_payload\` to create an appropriate message template from ${userProfile?.name || 'the user'} to their relevant stakeholder.

Avoid generic placeholders, vague conversational responses, or basic advice. Act like an autonomous executive assistant.`;

    const toolDeclarations = [
      {
        name: 'adjust_calendar_schedule',
        description: 'Automatically moves conflicting events out of the crisis window and blocks out deep work time.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            conflictingEventTitle: { type: Type.STRING, description: 'The title of the lower priority event being moved.' },
            hoursShifted: { type: Type.NUMBER, description: 'Number of hours to push the conflicting event into the future.' },
            allocatedBlockMinutes: { type: Type.NUMBER, description: 'The amount of deep work time being blocked for the current crisis.' }
          },
          required: ['conflictingEventTitle', 'hoursShifted', 'allocatedBlockMinutes']
        }
      },
      {
        name: 'compile_draft_workspace',
        description: 'Compiles raw contextual assets, codes, and rubrics into a 70% completed markdown text or project framework.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            documentTitle: { type: Type.STRING, description: 'The name of the compiled asset or report.' },
            markdownContent: { type: Type.STRING, description: 'The complete, robust markdown body containing structural data points, outlines, or code arrays.' }
          },
          required: ['documentTitle', 'markdownContent']
        }
      },
      {
        name: 'generate_communication_payload',
        description: 'Generates a highly contextual email, notification, or extension request script to be sent out-of-band.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            recipient: { type: Type.STRING, description: 'The designation or profile of the person receiving the update (e.g., Professor, Client Manager).' },
            subject: { type: Type.STRING, description: 'The professional email subject line.' },
            body: { type: Type.STRING, description: 'The complete personalized email copy written with appropriate professional tone.' }
          },
          required: ['recipient', 'subject', 'body']
        }
      }
    ];

    const prompt = customPrompt || (personaId === 'entrepreneur' ? PREBAKED_SCENARIOS[1].promptText : PREBAKED_SCENARIOS[0].promptText);
    const corpusContext = JSON.stringify(CORPUS_FILES[personaId] || []);

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Background User Corpus Reference Files: ${corpusContext}\n\nUser Crisis Emergency Prompt: "${prompt}"\n\nExecute your autonomous 3-step mitigation loop now.`,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: toolDeclarations }],
        temperature: 0.2
      }
    });

    // Parse function calls or build from response
    const calls = response.functionCalls || [];
    const baseTemplate = JSON.parse(JSON.stringify(PREBAKED_ORCHESTRATIONS[personaId === 'entrepreneur' ? 'entrepreneur-crisis-1' : 'student-crisis-1']));
    
    baseTemplate.executionMode = 'gemini-1.5-pro-live';
    baseTemplate.logs[1].content = `Ingested live Gemini 2.5 context window. Executing multi-tool function loop...`;

    for (const call of calls) {
      if (call.name === 'adjust_calendar_schedule') {
        const args = call.args as any;
        baseTemplate.calendarAfter[2].title = `${args.conflictingEventTitle} (Shifted +${args.hoursShifted}h)`;
        baseTemplate.logs[2].toolParams = args;
      }
      if (call.name === 'compile_draft_workspace') {
        const args = call.args as any;
        baseTemplate.draftWorkspace.documentTitle = args.documentTitle;
        baseTemplate.draftWorkspace.markdownContent = args.markdownContent;
        baseTemplate.logs[4].toolParams = args;
      }
      if (call.name === 'generate_communication_payload') {
        const args = call.args as any;
        baseTemplate.communication.recipient = args.recipient;
        baseTemplate.communication.subject = args.subject;
        baseTemplate.communication.body = args.body;
        baseTemplate.logs[6].toolParams = args;
      }
    }

    baseTemplate.totalLatencyMs = Date.now() - startTime;
    return res.json(baseTemplate);

  } catch (err: any) {
    console.error('Gemini API execution error, falling back to simulation:', err);
    const fallbackId = personaId === 'entrepreneur' ? 'entrepreneur-crisis-1' : 'student-crisis-1';
    const result = PREBAKED_ORCHESTRATIONS[fallbackId];
    return res.json({
      ...result,
      executionMode: 'autonomous-simulated',
      totalLatencyMs: Date.now() - startTime
    });
  }
});

// Dispatch message endpoint
app.post('/api/dispatch', (req, res) => {
  const { recipient, subject } = req.body;
  res.json({
    success: true,
    message: `Outbound brief autonomously dispatched to ${recipient}`,
    dispatchedAt: new Date().toISOString()
  });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ FinishLine AI Hub running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
