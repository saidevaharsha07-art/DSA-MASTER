'use client';

import React from 'react';
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
} from 'lucide-react';
import { InterviewArenaReport } from '../types/interview.types';

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
  const mentorUrl = `/mentor?prompt=${encodeURIComponent(report.mentorQueryContext)}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* SAMPLE BADGE IF PREVIEW */}
      {isSamplePreview && (
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold text-center flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>SAMPLE REPORT PREVIEW — This shows the diagnostic scorecard generated after every completed interview round.</span>
        </div>
      )}

      {/* 1. SCORECARD HERO */}
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
              <Award className="w-3.5 h-3.5" />
              INTERVIEW EVALUATION REPORT
            </div>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Performance Diagnosis
            </h1>
            <p className={`text-xs sm:text-sm max-w-xl font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {report.verdict}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs pt-1 text-slate-500 dark:text-slate-400">
              <span><strong>Topic:</strong> {report.interviewType}</span>
              <span>•</span>
              <span><strong>Difficulty:</strong> {report.difficulty}</span>
              <span>•</span>
              <span><strong>Time Used:</strong> {Math.max(1, Math.round(report.timeUsedSeconds / 60))} of {Math.round(report.durationSeconds / 60)} min</span>
              <span>•</span>
              <span><strong>Date:</strong> {report.date}</span>
            </div>
          </div>

          {/* Grade & Score Badge */}
          <div className="flex items-center justify-center md:justify-end shrink-0">
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border flex flex-col items-center justify-center p-3 text-center shadow-lg transition-all ${
                report.overallScore >= 80
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10'
                  : report.overallScore >= 60
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shadow-cyan-500/10'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-amber-500/10'
              }`}
            >
              <div className="text-3xl sm:text-4xl font-black tracking-tight">{report.grade}</div>
              <div className="text-xs font-bold mt-1 opacity-90">{report.overallScore}% Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 5 CORE PERFORMANCE PILLARS */}
      <div className="space-y-3">
        <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          5-Pillar Performance Diagnostic
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Accuracy */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800'}`}>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Accuracy</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-500 dark:text-emerald-400">{report.metrics.accuracy}%</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${report.metrics.accuracy}%` }} />
            </div>
            <div className="text-[10px] text-slate-400">Test verification</div>
          </div>

          {/* Problem Solving */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800'}`}>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Problem Solving</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-500 dark:text-cyan-400">{report.metrics.problemSolving}%</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${report.metrics.problemSolving}%` }} />
            </div>
            <div className="text-[10px] text-slate-400">Problems passed</div>
          </div>

          {/* Time Management */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800'}`}>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Time Mgmt</div>
            <div className="text-xl sm:text-2xl font-black text-amber-500 dark:text-amber-400">{report.metrics.timeManagement}%</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${report.metrics.timeManagement}%` }} />
            </div>
            <div className="text-[10px] text-slate-400">Pacing efficiency</div>
          </div>

          {/* Pattern Recognition */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800'}`}>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Pattern Rec</div>
            <div className="text-xl sm:text-2xl font-black text-blue-500 dark:text-blue-400">{report.metrics.patternRecognition}%</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${report.metrics.patternRecognition}%` }} />
            </div>
            <div className="text-[10px] text-slate-400">Algorithmic fit</div>
          </div>

          {/* Consistency */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 col-span-2 sm:col-span-1 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800'}`}>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Consistency</div>
            <div className="text-xl sm:text-2xl font-black text-indigo-500 dark:text-indigo-400">{report.metrics.consistency}%</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${report.metrics.consistency}%` }} />
            </div>
            <div className="text-[10px] text-slate-400">Approach hygiene</div>
          </div>
        </div>
      </div>

      {/* 3. PROBLEM-BY-PROBLEM BREAKDOWN */}
      <div className="space-y-3">
        <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <BarChart3 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          Problem Breakdown
        </h3>

        <div className={`rounded-3xl border overflow-hidden ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[550px]">
              <thead className={`border-b font-bold uppercase tracking-wider ${isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                <tr>
                  <th className="p-3.5 sm:p-4">Problem</th>
                  <th className="p-3.5 sm:p-4">Difficulty</th>
                  <th className="p-3.5 sm:p-4">Pattern</th>
                  <th className="p-3.5 sm:p-4">Result</th>
                  <th className="p-3.5 sm:p-4">Attempts</th>
                  <th className="p-3.5 sm:p-4">Time Spent</th>
                  <th className="p-3.5 sm:p-4">Testcases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                {report.problemBreakdown.map((item, idx) => (
                  <tr key={item.problemId || idx} className={isLight ? 'hover:bg-slate-50/70' : 'hover:bg-slate-800/40'}>
                    <td className="p-3.5 sm:p-4 font-sans font-bold text-slate-900 dark:text-white">
                      Problem {idx + 1}: {item.title}
                    </td>
                    <td className="p-3.5 sm:p-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.difficulty === 'Easy' ? 'text-emerald-500 dark:text-emerald-400' : item.difficulty === 'Hard' ? 'text-rose-500 dark:text-rose-400' : 'text-amber-500 dark:text-amber-400'
                      }`}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4 font-sans text-slate-500 dark:text-slate-400">{item.pattern}</td>
                    <td className="p-3.5 sm:p-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold inline-flex items-center gap-1.5 ${
                        item.result === 'Passed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : item.result === 'Failed'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {item.result === 'Passed' && <CheckCircle2 className="w-3 h-3" />}
                        {item.result === 'Failed' && <XCircle className="w-3 h-3" />}
                        {item.result}
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4">{item.attempts}</td>
                    <td className="p-3.5 sm:p-4">{item.timeSpentMinutes}m</td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">{item.testcasesPassed} / {item.totalTestcases}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. GROUNDED DIAGNOSTIC INSIGHTS: WHAT WENT WELL & WHAT NEEDS WORK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* WHAT WENT WELL */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-3.5 ${isLight ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' : 'bg-emerald-950/20 border-emerald-800/40'}`}>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>WHAT WENT WELL</span>
          </div>
          <ul className="space-y-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {report.whatWentWell.map((w, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT NEEDS WORK */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-3.5 ${isLight ? 'bg-amber-50/50 border-amber-200 shadow-sm' : 'bg-amber-950/20 border-amber-800/40'}`}>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm sm:text-base">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>WHAT NEEDS WORK</span>
          </div>
          <ul className="space-y-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {report.whatNeedsWork.map((w, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. RECOMMENDED NEXT STEPS */}
      <div className="space-y-3">
        <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <Target className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          Recommended Action Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.recommendedNextSteps.map((step, idx) => (
            <Link
              key={idx}
              href={step.url}
              className={`p-4 sm:p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 group ${
                isLight ? 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">
                  {step.type === 'practice' ? 'Targeted Practice' : 'Pattern Revision'}
                </span>
                <h4 className={`font-bold text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'} group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors`}>
                  {step.title}
                </h4>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {step.reason}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
            </Link>
          ))}
        </div>
      </div>

      {/* 6. AI MENTOR INTEGRATION CTA */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${
          isLight ? 'bg-cyan-50/90 border-cyan-200 shadow-sm' : 'bg-cyan-950/30 border-cyan-800/50'
        }`}
      >
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className={`font-black text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Ask AI Mentor About This Round
            </h4>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Discuss specific test case failures, optimize time complexities, and receive tailored exercises.
            </p>
          </div>
        </div>

        <Link
          href={mentorUrl}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Chat with Mentor</span>
        </Link>
      </div>

      {/* 7. BOTTOM ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onTakeAnother}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
            isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Back to Setup & History</span>
        </button>

        <button
          onClick={onTakeAnother}
          className="px-6 py-2.5 rounded-xl text-xs font-black bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Start Another Interview</span>
        </button>
      </div>
    </div>
  );
}
