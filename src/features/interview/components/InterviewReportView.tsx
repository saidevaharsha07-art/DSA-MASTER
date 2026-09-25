'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  BarChart3,
  Bot,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  ShieldCheck,
  Copy,
  Brain,
  FileCode,
  Check,
} from 'lucide-react';
import { InterviewArenaReport, InterviewArenaProblemAttempt } from '../types/interview.types';

interface InterviewReportViewProps {
  isLight: boolean;
  report: InterviewArenaReport;
  onTakeAnother: () => void;
  isSamplePreview?: boolean;
}

export function InterviewReportView({
  isLight,
  report,
  onTakeAnother,
  isSamplePreview = false,
}: InterviewReportViewProps) {
  const [copiedProblemId, setCopiedProblemId] = useState<string | null>(null);

  const mentorUrl = `/mentor?prompt=${encodeURIComponent(
    report.mentorQueryContext || 'Review my mock interview performance and suggest improvements.'
  )}`;

  const handleCopyCode = (code: string, problemId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedProblemId(problemId);
    setTimeout(() => setCopiedProblemId(null), 2000);
  };

  // Calculate total guidance checks completed across all problems
  const totalGuidanceCompleted = (report.problems || []).reduce(
    (acc, p) => acc + (p.guidanceChecksCompleted?.length || 0),
    0
  );
  const totalGuidancePossible = (report.problems || []).length * 5;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20" data-testid="interview-report-view">
      {/* SAMPLE PREVIEW NOTICE BANNER */}
      {isSamplePreview && (
        <div
          data-testid="sample-report-banner"
          className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold text-center flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>SAMPLE SCORECARD PREVIEW — Factual diagnostic scorecard generated after every completed interview round.</span>
        </div>
      )}

      {/* 1. FACTUAL SCORECARD HERO (ENGINEERING REVIEW AESTHETIC) */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200/80 shadow-sm'
            : 'bg-slate-900/70 border-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
              <span>FACTUAL PERFORMANCE DIAGNOSTIC (ZERO ARBITRARY GRADES)</span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Interview Performance Breakdown
            </h1>

            <p className={`text-xs sm:text-sm max-w-2xl font-normal leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {report.verdict}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono pt-1 text-slate-500 dark:text-slate-400">
              <span>Mode: <strong>{report.interviewType}</strong></span>
              <span>•</span>
              <span>Difficulty: <strong>{report.difficulty}</strong></span>
              <span>•</span>
              <span>Status: <strong>{report.status === 'completed' ? 'Submitted' : 'Time Expired'}</strong></span>
              <span>•</span>
              <span>Date: <strong>{report.date}</strong></span>
            </div>
          </div>

          {/* Evidence-Based Readiness State Badge */}
          <div className="flex items-center justify-start md:justify-end shrink-0">
            <div
              data-testid="readiness-state-badge"
              className={`px-5 py-3.5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                report.readinessState === 'Strong Evidence'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : report.readinessState === 'Developing'
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                  : report.readinessState === 'Needs Practice'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
              }`}
            >
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider opacity-80">Readiness State</div>
              <div className="text-xl font-black mt-0.5">{report.readinessState}</div>
              <div className="text-[11px] font-mono font-bold mt-0.5 opacity-90">
                {report.accuracyPercent}% Accuracy
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Factual Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800/60 font-mono">
          <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
            <div className="text-[11px] text-slate-500 font-sans font-medium">Problems Solved</div>
            <div className="text-base font-black text-cyan-500 dark:text-cyan-400 mt-0.5">
              {report.problemsSolved} / {report.problemsAttempted}
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
            <div className="text-[11px] text-slate-500 font-sans font-medium">Timed Accuracy</div>
            <div className="text-base font-black text-emerald-500 dark:text-emerald-400 mt-0.5">
              {report.accuracyPercent}%
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
            <div className="text-[11px] text-slate-500 font-sans font-medium">Time Used</div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
              {Math.max(1, Math.round(report.timeUsedSeconds / 60))}m / {Math.round(report.durationSeconds / 60)}m
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
            <div className="text-[11px] text-slate-500 font-sans font-medium">Average Pace</div>
            <div className="text-base font-black text-amber-500 dark:text-amber-400 mt-0.5">
              {report.averageTimePerProblemMinutes}m / prob
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
            <div className="text-[11px] text-slate-500 font-sans font-medium">Hints Used</div>
            <div className="text-base font-black text-purple-500 dark:text-purple-400 mt-0.5">
              {report.hintsUsedCount}
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
            <div className="text-[11px] text-slate-500 font-sans font-medium">Guidance Checks</div>
            <div className="text-base font-black text-cyan-500 dark:text-cyan-400 mt-0.5">
              {totalGuidanceCompleted} / {totalGuidancePossible}
            </div>
          </div>
        </div>

        {/* Patterns Tested & Learning Areas Chips */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-500 dark:text-slate-400">Patterns Tested:</span>
            {report.patternsEncountered && report.patternsEncountered.length > 0 ? (
              report.patternsEncountered.map((pat, idx) => (
                <Link
                  key={idx}
                  href={`/journey/${encodeURIComponent(pat.areaSlug || 'basic-arrays')}/${encodeURIComponent(pat.subtopicSlug || 'array-traversal')}/${encodeURIComponent(pat.patternSlug || 'array-fundamentals')}`}
                  className="px-2.5 py-0.5 rounded-lg font-mono text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{pat.patternName}</span>
                </Link>
              ))
            ) : (
              <span className="text-slate-400 font-mono text-xs">General Mixed</span>
            )}
          </div>

          {report.areasEncountered && report.areasEncountered.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Learning Areas:</span>
              {report.areasEncountered.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]"
                >
                  {area}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. PROBLEM-BY-PROBLEM REVIEW SECTION */}
      <div className="space-y-4" data-testid="problem-breakdown-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <h2 className={`text-base sm:text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Problem Review & Code Submissions
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {report.problems.length} {report.problems.length === 1 ? 'problem' : 'problems'} evaluated
          </span>
        </div>

        <div className="space-y-4">
          {report.problems.map((p, idx) => {
            const isSolved = p.status === 'passed';
            const isAttempted = p.status === 'failed' || (p.userCode && p.userCode.trim().length > 0);
            const areaSlug = p.areaSlug || 'basic-arrays';
            const subtopicSlug = p.subtopicSlug || 'array-traversal';
            const patternSlug = p.patternSlug || 'array-fundamentals';

            return (
              <div
                key={p.problemId || idx}
                data-testid={`problem-review-card-${idx + 1}`}
                className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                  isLight
                    ? 'bg-white border-slate-200/80 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Header: Title, Status, Difficulty, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-slate-500">Problem {idx + 1}</span>
                      <span>•</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          p.difficulty === 'Easy'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : p.difficulty === 'Hard'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {p.difficulty}
                      </span>
                      <span>•</span>
                      <span className="text-slate-500 font-medium">{p.pattern}</span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {p.title}
                    </h3>
                  </div>

                  {/* Status Pill */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 ${
                        isSolved
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : isAttempted
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          : 'bg-slate-100 text-slate-500 border-slate-300 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                    >
                      {isSolved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Solved</span>
                        </>
                      ) : isAttempted ? (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Failed ({p.testcasesPassed || 0}/{p.totalTestcases || 0})</span>
                        </>
                      ) : (
                        <span>Unattempted</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Candidate's Thinking Notes (If Entered) */}
                {(p.approachNotes || p.timeComplexityEstimate || p.spaceComplexityEstimate || p.identifiedEdgeCases) && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                        <Brain className="w-3.5 h-3.5" />
                        <span>Candidate Approach Notes</span>
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        {p.timeComplexityEstimate && <span>Time: <strong>{p.timeComplexityEstimate}</strong></span>}
                        {p.spaceComplexityEstimate && <span>Space: <strong>{p.spaceComplexityEstimate}</strong></span>}
                      </div>
                    </div>

                    {p.approachNotes && (
                      <p className={`text-xs leading-relaxed whitespace-pre-wrap font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {p.approachNotes}
                      </p>
                    )}

                    {p.identifiedEdgeCases && (
                      <div className="pt-1 text-[11px] font-mono text-slate-500">
                        <strong>Edge cases identified:</strong> {p.identifiedEdgeCases}
                      </div>
                    )}
                  </div>
                )}

                {/* Submitted Code Viewer */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-medium flex items-center gap-1">
                      <FileCode className="w-3.5 h-3.5" />
                      Submitted Code ({p.language || 'javascript'})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(p.userCode || '', p.problemId)}
                      className="text-[11px] font-mono hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedProblemId === p.problemId ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <pre
                    className={`p-3.5 rounded-xl border text-xs font-mono overflow-x-auto max-h-56 leading-relaxed ${
                      isLight
                        ? 'bg-slate-900 text-slate-100 border-slate-800'
                        : 'bg-slate-950 text-slate-200 border-slate-800'
                    }`}
                  >
                    <code>{p.userCode || '// No code submitted for this problem'}</code>
                  </pre>
                </div>

                {/* Pattern & Curriculum Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                  <div className="text-xs text-slate-500 font-mono">
                    Pattern: <strong className="text-slate-700 dark:text-slate-300">{p.pattern}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/journey/${encodeURIComponent(areaSlug)}/${encodeURIComponent(subtopicSlug)}/${encodeURIComponent(patternSlug)}`}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Learn Pattern ›</span>
                    </Link>

                    <Link
                      href={`/practice?pattern=${encodeURIComponent(p.pattern)}`}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1"
                    >
                      <Target className="w-3 h-3" />
                      <span>Practice Pattern ›</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTINUE IMPROVING SECTION */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-all ${
          isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-slate-900/60 border-slate-800'
        }`}
        data-testid="continue-improving-section"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Continue Improving: Targeted Next Practice
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Reinforce patterns from today&apos;s simulation with recommended problems from our 4,000 problem curriculum.
            </p>
          </div>

          <Link
            href={mentorUrl}
            className="text-xs font-bold text-cyan-500 dark:text-cyan-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Review with AI Mentor</span>
          </Link>
        </div>

        {/* Recommended Practice Problems */}
        {report.recommendedPracticeProblems && report.recommendedPracticeProblems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {report.recommendedPracticeProblems.map((prob) => (
              <Link
                key={prob.id}
                href={`/practice?problemId=${encodeURIComponent(prob.id)}`}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                  isLight
                    ? 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-900'
                    : 'bg-slate-950/40 hover:bg-slate-800/80 border-slate-800 text-slate-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                    <span
                      className={`font-bold ${
                        prob.difficulty === 'Easy'
                          ? 'text-emerald-500'
                          : prob.difficulty === 'Hard'
                          ? 'text-rose-500'
                          : 'text-amber-500'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                    <span className="text-slate-400 text-[10px] truncate max-w-[120px]">{prob.pattern}</span>
                  </div>
                  <h4 className="font-bold text-xs line-clamp-1">{prob.title}</h4>
                </div>
                <div className="text-[11px] font-bold text-cyan-500 dark:text-cyan-400 flex items-center gap-1 pt-1 font-mono">
                  <span>Solve in Practice Arena</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
          <Link
            href="/practice"
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-colors text-center ${
              isLight
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            Go to Practice Arena
          </Link>

          <button
            type="button"
            onClick={onTakeAnother}
            data-testid="take-another-interview-btn"
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-mono font-black bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Take Another Interview Round</span>
          </button>
        </div>
      </div>
    </div>
  );
}
