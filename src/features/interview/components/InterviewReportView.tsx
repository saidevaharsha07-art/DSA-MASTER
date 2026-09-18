'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Timer,
  BarChart3,
  Bot,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
  HelpCircle,
  Clock,
  ShieldCheck,
  Check,
  TrendingUp,
  Code2,
  Copy,
  Brain,
  Layers,
  FileCode,
  ExternalLink,
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

  const mentorUrl = `/mentor?prompt=${encodeURIComponent(report.mentorQueryContext || 'Review my mock interview performance')}`;

  const handleCopyCode = (code: string, problemId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedProblemId(problemId);
    setTimeout(() => setCopiedProblemId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20" data-testid="interview-report-view">
      {/* SAMPLE BADGE IF PREVIEW */}
      {isSamplePreview && (
        <div
          data-testid="sample-report-banner"
          className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold text-center flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>SAMPLE REPORT PREVIEW — Factual diagnostic scorecard generated after every completed interview round.</span>
        </div>
      )}

      {/* 1. FACTUAL SCORECARD HERO */}
      <div
        className={`p-6 sm:p-8 md:p-10 rounded-3xl border shadow-xl relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border-slate-200'
            : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              FACTUAL PERFORMANCE DIAGNOSTIC (ZERO ARBITRARY GRADES)
            </div>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Interview Performance Breakdown
            </h1>
            <p className={`text-xs sm:text-sm max-w-2xl font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {report.verdict}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs pt-1 text-slate-500 dark:text-slate-400">
              <span><strong>Mode / Type:</strong> {report.interviewType}</span>
              <span>•</span>
              <span><strong>Difficulty:</strong> {report.difficulty}</span>
              <span>•</span>
              <span><strong>Status:</strong> {report.status === 'completed' ? 'Submitted' : 'Time Expired'}</span>
              <span>•</span>
              <span><strong>Date:</strong> {report.date}</span>
            </div>
          </div>

          {/* Evidence-based Readiness State Badge */}
          <div className="flex items-center justify-center md:justify-end shrink-0">
            <div
              data-testid="readiness-state-badge"
              className={`px-5 py-4 rounded-3xl border flex flex-col items-center justify-center text-center shadow-lg transition-all ${
                report.readinessState === 'Strong Evidence'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10'
                  : report.readinessState === 'Developing'
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shadow-cyan-500/10'
                  : report.readinessState === 'Needs Practice'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 shadow-rose-500/10'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-amber-500/10'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Readiness State</div>
              <div className="text-xl sm:text-2xl font-black mt-1">{report.readinessState}</div>
              <div className="text-[11px] font-bold mt-1 opacity-90">
                {report.accuracyPercent}% Accuracy
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Factual Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className={`p-3.5 rounded-2xl border text-center ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
            <div className="text-[11px] text-slate-500 font-medium">Problems Solved</div>
            <div className="text-lg font-black text-cyan-500 dark:text-cyan-400 mt-0.5">
              {report.problemsSolved} / {report.problemsAttempted}
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
            <div className="text-[11px] text-slate-500 font-medium">Accuracy</div>
            <div className="text-lg font-black text-emerald-500 dark:text-emerald-400 mt-0.5">
              {report.accuracyPercent}%
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
            <div className="text-[11px] text-slate-500 font-medium">Time Used</div>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {Math.max(1, Math.round(report.timeUsedSeconds / 60))}m / {Math.round(report.durationSeconds / 60)}m
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
            <div className="text-[11px] text-slate-500 font-medium">Avg Time / Prob</div>
            <div className="text-lg font-black text-amber-500 dark:text-amber-400 mt-0.5">
              {report.averageTimePerProblemMinutes}m
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
            <div className="text-[11px] text-slate-500 font-medium">Hints Used</div>
            <div className="text-lg font-black text-purple-500 dark:text-purple-400 mt-0.5">
              {report.hintsUsedCount}
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
            <div className="text-[11px] text-slate-500 font-medium">Failed Attempts</div>
            <div className="text-lg font-black text-rose-500 dark:text-rose-400 mt-0.5">
              {report.failedAttemptsCount}
            </div>
          </div>
        </div>

        {/* Patterns Encountered & Areas Encountered Chips */}
        <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-500 dark:text-slate-400">Patterns Tested:</span>
            {report.patternsEncountered && report.patternsEncountered.length > 0 ? (
              report.patternsEncountered.map((pat, idx) => (
                <Link
                  key={idx}
                  href={`/journey/${encodeURIComponent(pat.areaSlug || 'basic-arrays')}/${encodeURIComponent(pat.subtopicSlug || 'array-traversal')}/${encodeURIComponent(pat.patternSlug || 'array-fundamentals')}`}
                  className="px-2.5 py-1 rounded-lg font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{pat.patternName}</span>
                </Link>
              ))
            ) : (
              <span className="text-slate-400">General Mixed</span>
            )}
          </div>

          {report.areasEncountered && report.areasEncountered.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-500 dark:text-slate-400">Learning Areas:</span>
              {report.areasEncountered.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]"
                >
                  {area}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. PROBLEM-BY-PROBLEM REVIEW SECTION */}
      <div className="space-y-6" data-testid="problem-breakdown-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            <h2 className={`text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Problem Review & Code Submissions
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {report.problems.length} {report.problems.length === 1 ? 'problem' : 'problems'} evaluated
          </span>
        </div>

        <div className="space-y-6">
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
                className={`p-6 rounded-3xl border transition-all space-y-4 ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Header: Title, Status, Difficulty, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
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

                  {/* Status & Testcases */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
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
                    className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-cyan-500 dark:text-cyan-400">
                        <Brain className="w-3.5 h-3.5" />
                        Candidate Thinking & Approach Notes
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        {p.timeComplexityEstimate && <span>Time: <strong>{p.timeComplexityEstimate}</strong></span>}
                        {p.spaceComplexityEstimate && <span>Space: <strong>{p.spaceComplexityEstimate}</strong></span>}
                      </div>
                    </div>

                    {p.approachNotes && (
                      <p className={`text-xs leading-relaxed whitespace-pre-wrap ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {p.approachNotes}
                      </p>
                    )}

                    {p.identifiedEdgeCases && (
                      <div className="pt-1 text-[11px] text-slate-500">
                        <strong>Edge cases identified:</strong> {p.identifiedEdgeCases}
                      </div>
                    )}
                  </div>
                )}

                {/* Submitted Code Viewer */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold flex items-center gap-1">
                      <FileCode className="w-3.5 h-3.5" />
                      Submitted Code ({p.language || 'javascript'})
                    </span>
                    <button
                      onClick={() => handleCopyCode(p.userCode || '', p.problemId)}
                      className="text-[11px] hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedProblemId === p.problemId ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <pre
                    className={`p-4 rounded-2xl border text-xs font-mono overflow-x-auto max-h-60 leading-relaxed ${
                      isLight
                        ? 'bg-slate-900 text-slate-100 border-slate-800'
                        : 'bg-slate-950 text-slate-200 border-slate-800'
                    }`}
                  >
                    <code>{p.userCode || '// No code submitted for this problem'}</code>
                  </pre>
                </div>

                {/* Pattern & Curriculum Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="text-xs text-slate-500">
                    Target Pattern: <strong className="text-slate-700 dark:text-slate-300">{p.pattern}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/journey/${encodeURIComponent(areaSlug)}/${encodeURIComponent(subtopicSlug)}/${encodeURIComponent(patternSlug)}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Learn Pattern ›</span>
                    </Link>

                    <Link
                      href={`/practice?pattern=${encodeURIComponent(p.pattern)}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Practice Pattern ›</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTINUE IMPROVING HANDOFF SECTION */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
        }`}
        data-testid="continue-improving-section"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className={`text-base sm:text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Continue Improving: Targeted Next Practice
              </h2>
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Reinforce patterns that challenged you today with recommendations from our 4,000 problem curriculum.
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

        {/* Recommended Practice Problems Grid */}
        {report.recommendedPracticeProblems && report.recommendedPracticeProblems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {report.recommendedPracticeProblems.map((prob) => (
              <Link
                key={prob.id}
                href={`/practice?problemId=${encodeURIComponent(prob.id)}`}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                  isLight
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-900'
                    : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
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
                <div className="text-[11px] font-bold text-cyan-500 dark:text-cyan-400 flex items-center gap-1 pt-1">
                  <span>Solve in Practice Arena</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/practice"
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            Go to Practice Arena 2.0
          </Link>

          <button
            onClick={onTakeAnother}
            data-testid="take-another-interview-btn"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Take Another Interview Round</span>
          </button>
        </div>
      </div>
    </div>
  );
}
