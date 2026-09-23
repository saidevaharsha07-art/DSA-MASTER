'use client';

import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  FileCode,
} from 'lucide-react';
import { PatternTemplateBundle } from '@/src/curriculum/data/pattern-templates.data';

interface PatternTemplateSectionProps {
  readonly templateBundle: PatternTemplateBundle;
  readonly activeLang: 'python' | 'java' | 'cpp';
  readonly onSelectLang: (lang: 'python' | 'java' | 'cpp') => void;
  readonly onCopyCode: () => void;
  readonly copied: boolean;
}

export function PatternTemplateSection({
  templateBundle,
  activeLang,
  onSelectLang,
  onCopyCode,
  copied,
}: PatternTemplateSectionProps) {
  const currentTemplate = templateBundle[activeLang];
  const codeLines = (currentTemplate?.code || '').split('\n');

  const langLabels = {
    python: 'Python 3',
    java: 'Java',
    cpp: 'C++ 17/20',
  };

  return (
    <section id="stage-template" className="flex flex-col gap-6 scroll-mt-16">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
          <Code2 size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-500">03 //</span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Stage 3: Learn the Algorithmic Template
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Concise, production-grade canonical templates in Java, Python, and C++.
          </p>
        </div>
      </div>

      {/* ── CODE EDITOR CONTAINER ── */}
      <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden flex flex-col shadow-xs">
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface)] border-b border-[var(--border)] flex-wrap gap-2">
          {/* Language Switcher Tabs */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Template programming languages">
            {(['python', 'java', 'cpp'] as const).map((lang) => {
              const isActive = activeLang === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--accent)] text-white shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]'
                  }`}
                >
                  {langLabels[lang]}
                </button>
              );
            })}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={onCopyCode}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all cursor-pointer active:scale-95"
            aria-label="Copy template code to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Template</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block with Line Numbers */}
        <div className="p-4 sm:p-6 bg-[#0B1120] text-slate-100 overflow-x-auto max-w-full font-mono text-xs sm:text-sm leading-relaxed select-text">
          <pre className="overflow-x-auto flex">
            {/* Line numbers column */}
            <div
              aria-hidden="true"
              className="select-none pr-4 text-slate-600 text-right font-mono text-xs select-none border-r border-slate-800/80 mr-4 shrink-0"
            >
              {codeLines.map((_, idx) => (
                <div key={idx} className="leading-relaxed">
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Code lines */}
            <code className="text-slate-200 overflow-x-auto block">
              {currentTemplate?.code || '// Template not available'}
            </code>
          </pre>
        </div>

        {/* ── CODE TEMPLATE HIERARCHY: KEY INVARIANTS & RULES ── */}
        <div className="p-5 bg-[var(--surface)] border-t border-[var(--border)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            <ShieldCheck size={14} className="text-[var(--accent)]" />
            <span>Key Implementation Invariants &amp; Rules</span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
            {(currentTemplate?.keyNotes || [
              'Maintain loop invariant across all pointer transitions.',
              'Verify boundary pre-conditions before dereferencing array indices.',
            ]).map((note: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[var(--accent)] font-bold">•</span>
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>

          {templateBundle.coreInvariant && (
            <div className="mt-2 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--text-secondary)] flex items-start gap-2.5">
              <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--text-primary)] font-semibold">Core Invariant: </strong>
                <span>{templateBundle.coreInvariant}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
