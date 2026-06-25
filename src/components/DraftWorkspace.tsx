import React, { useState } from 'react';
import { DraftWorkspaceData } from '../types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Copy, Check, Download, Code2, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

interface DraftWorkspaceProps {
  data: DraftWorkspaceData;
  isOrchestrating: boolean;
}

export const DraftWorkspace: React.FC<DraftWorkspaceProps> = ({
  data,
  isOrchestrating,
}) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'code' | 'rubric'>('markdown');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([data.markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.documentTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-slate-800 bg-slate-950 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 h-full">
      
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tool B: compile_draft_workspace()</span>
          </div>
          <h3 className="text-sm font-bold text-slate-100 line-clamp-1">{data.documentTitle}</h3>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400">
              <span>{data.completionPercentage}% Pre-Compiled</span>
            </div>
            <div className="w-24 bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-1000"
                style={{ width: `${data.completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Copy markdown content"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Download Markdown artifact"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('markdown')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'markdown'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Compiled Report Body</span>
        </button>

        {data.codeSnippets && data.codeSnippets.length > 0 && (
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code & Math Solver ({data.codeSnippets.length})</span>
          </button>
        )}

        {data.keyRubricPoints && data.keyRubricPoints.length > 0 && (
          <button
            onClick={() => setActiveTab('rubric')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'rubric'
                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Rubric Validation</span>
          </button>
        )}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto max-h-[520px] bg-slate-900/40 rounded-xl border border-slate-900 p-6 text-slate-200 font-sans leading-relaxed text-sm">
        {isOrchestrating && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-emerald-400 animate-pulse">
            <Sparkles className="w-8 h-8 animate-spin" />
            <p className="font-mono text-xs">Synthesizing background materials & boilerplate arrays...</p>
          </div>
        )}

        {!isOrchestrating && activeTab === 'markdown' && (
          <div className="prose prose-invert prose-emerald max-w-none text-xs sm:text-sm [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-slate-800 [&_th]:bg-slate-900 [&_th]:p-2 [&_td]:border [&_td]:border-slate-800 [&_td]:p-2 [&_pre]:bg-black [&_pre]:border [&_pre]:border-slate-800 [&_code]:font-mono [&_code]:text-emerald-300 [&_h1]:text-slate-100 [&_h2]:text-slate-200 [&_h3]:text-emerald-400">
            <Markdown remarkPlugins={[remarkGfm]}>
              {data.markdownContent}
            </Markdown>
          </div>
        )}

        {!isOrchestrating && activeTab === 'code' && data.codeSnippets && (
          <div className="flex flex-col gap-6">
            {data.codeSnippets.map((snip, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-slate-800 bg-black/90">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-300">
                  <span>{snip.filename}</span>
                  <span className="uppercase text-[10px] text-slate-500">{snip.language}</span>
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-400/90 leading-relaxed">
                  <code>{snip.code}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        {!isOrchestrating && activeTab === 'rubric' && data.keyRubricPoints && (
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="text-slate-400 mb-2">Automated Compliance Rubric Matcher:</div>
            {data.keyRubricPoints.map((point, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  ✔
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
