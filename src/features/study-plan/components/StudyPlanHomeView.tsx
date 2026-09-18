'use client';

/**
 * DSA MASTER — Daily Study Planner 2.0 Home View
 * Grounded daily learning plan with dynamic time budgeting, explainable prioritization,
 * primary mission spotlight, mid-day replanning, and factual end-of-day summary.
 */

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  BookOpen,
  Code2,
  Timer,
  RefreshCw,
  FastForward,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowRight,
} from 'lucide-react';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { StudyPlanOrchestratorService } from '../services/study-plan.service';
import {
  DailyStudyPlan,
  StudyPlanItem,
  StudyPlanActivityType,
  TimeBudgetPreset,
  EndOfDaySummary,
} from '../types/study-plan.types';

const BUDGET_OPTIONS: TimeBudgetPreset[] = [20, 30, 45, 60, 90, 120];

export function StudyPlanHomeView() {
  const router = useRouter();
  const { userId, isAuthenticated } = useActiveUser();

  const [plan, setPlan] = useState<DailyStudyPlan | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<number>(45);
  const [customBudgetInput, setCustomBudgetInput] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isReplanning, setIsReplanning] = useState(false);
  const [summaryData, setSummaryData] = useState<EndOfDaySummary | null>(null);
  const [activeTab, setActiveTab] = useState<'plan' | 'summary'>('plan');

  // Load user plan and budget
  useEffect(() => {
    const savedBudget = StudyPlanOrchestratorService.getTimeBudget(userId);
    setSelectedBudget(savedBudget);
    const todayPlan = StudyPlanOrchestratorService.getTodayPlan(userId);
    setPlan(todayPlan);
    if (todayPlan.status === 'completed') {
      setSummaryData(StudyPlanOrchestratorService.getEndOfDaySummary(userId));
    }
  }, [userId]);

  const primaryMission = useMemo(() => {
    if (!plan || !plan.items.length) return null;
    return (
      plan.items.find((i) => i.id === plan.primaryMissionId) ||
      plan.items.find((i) => i.status === 'pending' || i.status === 'in_progress') ||
      plan.items[0]
    );
  }, [plan]);

  const handleSelectBudget = (minutes: number) => {
    setSelectedBudget(minutes);
    setShowCustomInput(false);
    StudyPlanOrchestratorService.setTimeBudget(userId, minutes);
    const updated = StudyPlanOrchestratorService.generateDailyPlan(userId, minutes);
    setPlan(updated);
  };

  const handleApplyCustomBudget = () => {
    const parsed = parseInt(customBudgetInput, 10);
    if (!isNaN(parsed) && parsed >= 10 && parsed <= 360) {
      handleSelectBudget(parsed);
    }
  };

  const handleStartActivity = (item: StudyPlanItem) => {
    if (!plan) return;
    const updated = StudyPlanOrchestratorService.startActivity(userId, item.id);
    setPlan(updated);
    router.push(item.actionUrl);
  };

  const handleCompleteItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    if (!plan) return;
    const updated = StudyPlanOrchestratorService.completeActivity(userId, itemId);
    setPlan(updated);
    if (updated.status === 'completed') {
      setSummaryData(StudyPlanOrchestratorService.getEndOfDaySummary(userId));
      setActiveTab('summary');
    }
  };

  const handleSkipItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    if (!plan) return;
    const updated = StudyPlanOrchestratorService.skipActivity(userId, itemId);
    setPlan(updated);
    if (updated.status === 'completed') {
      setSummaryData(StudyPlanOrchestratorService.getEndOfDaySummary(userId));
      setActiveTab('summary');
    }
  };

  const handleReplan = () => {
    setIsReplanning(true);
    setTimeout(() => {
      const updated = StudyPlanOrchestratorService.replanDailyPlan(
        userId,
        'User triggered mid-day optimization'
      );
      setPlan(updated);
      setIsReplanning(false);
    }, 400);
  };

  const getActivityBadge = (type: StudyPlanActivityType) => {
    switch (type) {
      case 'LEARN':
        return {
          label: 'LEARN',
          bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          icon: <BookOpen className="w-3.5 h-3.5" />,
        };
      case 'PRACTICE':
        return {
          label: 'PRACTICE',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: <Code2 className="w-3.5 h-3.5" />,
        };
      case 'REVISE':
        return {
          label: 'REVISE',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: <RotateCcw className="w-3.5 h-3.5" />,
        };
      case 'INTERVIEW':
        return {
          label: 'INTERVIEW',
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          icon: <Timer className="w-3.5 h-3.5" />,
        };
      case 'REVIEW':
        return {
          label: 'REVIEW',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          icon: <AlertCircle className="w-3.5 h-3.5" />,
        };
      default:
        return {
          label: 'STUDY',
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
          icon: <Sparkles className="w-3.5 h-3.5" />,
        };
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
          <span>Generating your adaptive daily study plan...</span>
        </div>
      </div>
    );
  }

  const isAllComplete = plan.status === 'completed';
  const progressPercent =
    plan.items.length > 0
      ? Math.round(((plan.completedCount + plan.skippedCount) / plan.items.length) * 100)
      : 0;

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-emerald-500/30"
      data-testid="study-plan-home-view"
    >
      {/* Header Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div data-testid="study-plan-header">
            <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Today&apos;s Learning Plan &bull; {plan.date}</span>
              {plan.isZeroState && (
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Day 1 Foundation
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Daily Study Planner 2.0
            </h1>
          </div>

          {/* Time Budget Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Available Time:
            </span>
            {BUDGET_OPTIONS.map((mins) => (
              <button
                key={mins}
                onClick={() => handleSelectBudget(mins)}
                data-testid={`budget-btn-${mins}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedBudget === mins && !showCustomInput
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {mins}m
              </button>
            ))}
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              data-testid="budget-btn-custom"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                showCustomInput || !BUDGET_OPTIONS.includes(selectedBudget as any)
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              Custom
            </button>

            {showCustomInput && (
              <div className="flex items-center gap-1.5 ml-1">
                <input
                  type="number"
                  min="10"
                  max="360"
                  placeholder="Minutes"
                  value={customBudgetInput}
                  onChange={(e) => setCustomBudgetInput(e.target.value)}
                  data-testid="custom-budget-input"
                  className="w-20 px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleApplyCustomBudget}
                  data-testid="apply-custom-budget-btn"
                  className="px-2.5 py-1 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Guest Warning / Informational Banner */}
        {!isAuthenticated && (
          <div
            data-testid="guest-banner"
            className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-start gap-3.5"
          >
            <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <h4 className="font-semibold text-blue-300">Guest Mode — Standard Curriculum Plan</h4>
              <p className="text-slate-400 mt-0.5 text-xs">
                You are previewing a clean, isolated study plan. Sign in to enable continuous mastery tracking,
                automated SRS scheduling, and personalized mistake remediation.
              </p>
            </div>
          </div>
        )}

        {/* Progress & Telemetry HUD */}
        <div
          data-testid="plan-progress-hud"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80"
        >
          <div>
            <div className="text-xs text-slate-400 font-medium">Estimated Time</div>
            <div className="text-xl font-bold text-white mt-0.5 font-mono">
              {plan.totalEstimatedMinutes}m
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Budget: {plan.timeBudgetMinutes}m</div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium">Actual Time Spent</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 font-mono">
              {plan.actualTimeSpentMinutes}m
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {plan.actualTimeSpentMinutes > 0 ? 'Recorded active study' : 'Not started yet'}
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium">Activity Progress</div>
            <div className="text-xl font-bold text-white mt-0.5 font-mono">
              {plan.completedCount} / {plan.items.length}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {plan.remainingCount} remaining &bull; {plan.skippedCount} skipped
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="text-xs text-slate-400 font-medium">Plan Completion</div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 mt-2">
              <div
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-right text-slate-400 font-mono mt-1">
              {progressPercent}% Complete
            </div>
          </div>
        </div>

        {/* Mode Tabs: Plan vs Summary */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'plan'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Today&apos;s Schedule ({plan.items.length} Activities)
          </button>
          <button
            onClick={() => {
              if (!summaryData) {
                setSummaryData(StudyPlanOrchestratorService.getEndOfDaySummary(userId));
              }
              setActiveTab('summary');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'summary'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            End-Of-Day Summary
          </button>
        </div>

        {activeTab === 'plan' ? (
          <>
            {/* Primary Mission Card */}
            {primaryMission && !isAllComplete && (
              <div
                data-testid="primary-mission-card"
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Today&apos;s Primary Mission &bull; Up Next
                      </span>
                      {(() => {
                        const badge = getActivityBadge(primaryMission.type);
                        return (
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${badge.bg}`}
                          >
                            {badge.icon}
                            {badge.label}
                          </span>
                        );
                      })()}
                      <span className="text-xs text-slate-400 font-mono">
                        ~{primaryMission.estimatedMinutes}m
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {primaryMission.title}
                    </h2>
                    <p className="text-sm text-slate-300 max-w-2xl">
                      {primaryMission.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                      <span className="text-emerald-400/90 font-medium font-mono">
                        Why this now:
                      </span>
                      <span>{primaryMission.reason}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => handleStartActivity(primaryMission)}
                      data-testid="primary-mission-cta"
                      className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>{plan.actualTimeSpentMinutes > 0 ? "Continue Today's Plan" : "Start Today's Plan"}</span>
                    </button>

                    <button
                      onClick={(e) => handleCompleteItem(e, primaryMission.id)}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Done</span>
                    </button>

                    <button
                      onClick={(e) => handleSkipItem(e, primaryMission.id)}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 font-medium text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
                    >
                      <FastForward className="w-4 h-4" />
                      <span>Skip</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Replanning Controls */}
            <div className="flex items-center justify-between py-1">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <span>All Activities</span>
                <span className="text-xs font-mono text-slate-500">
                  ({plan.completedCount} done, {plan.remainingCount} remaining)
                </span>
                {plan.lastReplannedAt && (
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    Replanned: {plan.replanReason || 'mid-day update'}
                  </span>
                )}
              </div>

              <button
                onClick={handleReplan}
                disabled={isReplanning}
                data-testid="replan-btn"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isReplanning ? 'animate-spin text-emerald-400' : ''}`} />
                <span>Recalculate Remaining Plan</span>
              </button>
            </div>

            {/* Plan Activity Items List */}
            <div className="space-y-3">
              {plan.items.map((item, index) => {
                const badge = getActivityBadge(item.type);
                const isCompleted = item.status === 'completed';
                const isSkipped = item.status === 'skipped';
                const isCurrent = item.id === plan.primaryMissionId;

                return (
                  <div
                    key={item.id}
                    data-testid={`plan-item-${index + 1}`}
                    className={`p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-slate-900/30 border-slate-800/50 opacity-70'
                        : isSkipped
                        ? 'bg-slate-900/20 border-slate-800/40 opacity-50'
                        : isCurrent
                        ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="mt-1">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSkipped ? (
                            <FastForward className="w-5 h-5 text-slate-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-xs font-mono text-slate-400">
                              {index + 1}
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium border flex items-center gap-1 ${badge.bg}`}
                            >
                              {badge.icon}
                              {badge.label}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {item.area} &bull; {item.pattern}
                            </span>
                            {item.platform && (
                              <span className="text-xs font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                                {item.platform}
                              </span>
                            )}
                            <span className="text-xs text-slate-400 font-mono">
                              ~{item.estimatedMinutes}m
                            </span>
                          </div>

                          <h3
                            className={`text-base font-semibold ${
                              isCompleted
                                ? 'line-through text-slate-400'
                                : isSkipped
                                ? 'line-through text-slate-500'
                                : 'text-white'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-400 max-w-2xl">{item.description}</p>
                          <div className="text-xs text-emerald-400/80 font-mono">
                            Reason: {item.reason}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {!isCompleted && !isSkipped && (
                          <>
                            <Link
                              href={item.actionUrl}
                              onClick={() => StudyPlanOrchestratorService.startActivity(userId, item.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-medium flex items-center gap-1 transition-all"
                            >
                              <span>Start Activity</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={(e) => handleCompleteItem(e, item.id)}
                              data-testid={`complete-item-btn-${index + 1}`}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 border border-slate-700 transition-all"
                              title="Mark Completed"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={(e) => handleSkipItem(e, item.id)}
                              data-testid={`skip-item-btn-${index + 1}`}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all"
                              title="Skip Activity"
                            >
                              <FastForward className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {isCompleted && (
                          <span className="text-xs text-emerald-400 font-mono font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Done ({item.actualMinutes || item.estimatedMinutes}m)
                          </span>
                        )}
                        {isSkipped && (
                          <span className="text-xs text-slate-500 font-mono">Skipped</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* End-Of-Day Summary View */
          <div
            data-testid="end-of-day-summary"
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Factual Performance Record &bull; {plan.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">End-Of-Day Study Summary</h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Objective review of time spent and learning accomplishments across all modules today.
              </p>
            </div>

            {summaryData && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400">Activities Completed</div>
                    <div className="text-xl font-bold text-white mt-1 font-mono">
                      {summaryData.activitiesCompleted}
                    </div>
                    <div className="text-xs text-slate-500">{summaryData.activitiesSkipped} skipped</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Actual Time Spent</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                      {summaryData.actualTimeSpentMinutes}m
                    </div>
                    <div className="text-xs text-slate-500">
                      Planned: {summaryData.totalEstimatedMinutes}m
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Problems Solved</div>
                    <div className="text-xl font-bold text-white mt-1 font-mono">
                      {summaryData.problemsSolvedCount}
                    </div>
                    <div className="text-xs text-slate-500">Across active tiers</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">SRS Reviews Done</div>
                    <div className="text-xl font-bold text-white mt-1 font-mono">
                      {summaryData.revisionItemsReviewed}
                    </div>
                    <div className="text-xs text-slate-500">Flashcards cleared</div>
                  </div>
                </div>

                {summaryData.patternsPracticed.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                      Patterns Practiced Today
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {summaryData.patternsPracticed.map((pat) => (
                        <span
                          key={pat}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
                        >
                          {pat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 font-mono">
                    Recommended Next Actions for Tomorrow
                  </h4>
                  <div className="space-y-2">
                    {summaryData.nextRecommendedWork.map((work, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white">{work.title}</div>
                          <div className="text-xs text-slate-400">{work.reason}</div>
                        </div>
                        <Link
                          href={work.actionUrl}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium flex items-center gap-1"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
