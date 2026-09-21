'use client';

/**
 * DSA MASTER — Daily Study Planner 2.0 Home View
 * Grounded daily learning plan with dynamic time budgeting, explainable prioritization,
 * primary mission spotlight, vertical execution timeline, and factual end-of-day review.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { StudyPlanOrchestratorService } from '../services/study-plan.service';
import {
  DailyStudyPlan,
  StudyPlanItem,
  EndOfDaySummary,
} from '../types/study-plan.types';

import { StudyPlanHeader } from './StudyPlanHeader';
import { StudyPlanTimeBudgetSelector } from './StudyPlanTimeBudgetSelector';
import { StudyPlanProgressHUD } from './StudyPlanProgressHUD';
import { StudyPlanPrimaryMission } from './StudyPlanPrimaryMission';
import { StudyPlanTimeline } from './StudyPlanTimeline';
import { StudyPlanCompletionScreen } from './StudyPlanCompletionScreen';
import { StudyPlanEndOfDaySummary } from './StudyPlanEndOfDaySummary';

export function StudyPlanHomeView() {
  const router = useRouter();
  const { userId, isAuthenticated } = useActiveUser();

  const [plan, setPlan] = useState<DailyStudyPlan | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<number>(45);
  const [isReplanning, setIsReplanning] = useState(false);
  const [summaryData, setSummaryData] = useState<EndOfDaySummary | null>(null);
  const [activeTab, setActiveTab] = useState<'plan' | 'summary'>('plan');

  // Load user plan and persisted budget
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
    StudyPlanOrchestratorService.setTimeBudget(userId, minutes);
    const updated = StudyPlanOrchestratorService.generateDailyPlan(userId, minutes);
    setPlan(updated);
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
      const summary = StudyPlanOrchestratorService.getEndOfDaySummary(userId);
      setSummaryData(summary);
    }
  };

  const handleSkipItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    if (!plan) return;
    const updated = StudyPlanOrchestratorService.skipActivity(userId, itemId);
    setPlan(updated);
    if (updated.status === 'completed') {
      const summary = StudyPlanOrchestratorService.getEndOfDaySummary(userId);
      setSummaryData(summary);
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

  if (!plan) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-[var(--text-muted)]">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
          <span className="text-sm font-medium">Generating your adaptive daily study plan...</span>
        </div>
      </div>
    );
  }

  const isAllComplete = plan.status === 'completed';

  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] pb-20 selection:bg-emerald-500/30 transition-colors"
      data-testid="study-plan-home-view"
    >
      {/* 1. Header with Compact Telemetry & Tabs */}
      <StudyPlanHeader
        plan={plan}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'summary' && !summaryData) {
            setSummaryData(StudyPlanOrchestratorService.getEndOfDaySummary(userId));
          }
          setActiveTab(tab);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6">
        {/* Guest Informational Banner */}
        {!isAuthenticated && (
          <div
            data-testid="guest-banner"
            className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3.5 transition-colors"
          >
            <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <h4 className="font-semibold text-blue-300">
                Guest Mode — Standard Curriculum Plan
              </h4>
              <p className="text-[var(--text-secondary)] mt-0.5 text-xs leading-relaxed">
                You are previewing a clean, isolated study plan. Sign in to enable continuous mastery tracking,
                automated SRS scheduling, and personalized mistake remediation.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'plan' ? (
          <>
            {/* Completion Screen when all items are completed */}
            {isAllComplete ? (
              <StudyPlanCompletionScreen
                plan={plan}
                summary={summaryData}
                onReviewToday={() => {
                  if (!summaryData) {
                    setSummaryData(StudyPlanOrchestratorService.getEndOfDaySummary(userId));
                  }
                  setActiveTab('summary');
                }}
              />
            ) : (
              /* Asymmetric Workspace Grid:
                 Mobile (flex-col): Sidebar (Time Budget, Primary Mission, Progress HUD) -> Timeline
                 Desktop (lg:grid): Left (Timeline, col-span-7) and Right (Sidebar, col-span-5)
                 Single DOM instance of each component prevents hidden locator confusion */
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
                {/* Left Column on Desktop (col-span-7) / Second on Mobile (order-2 lg:order-1): Timeline */}
                <div className="w-full lg:col-span-7 order-2 lg:order-1 space-y-4">
                  <StudyPlanTimeline
                    plan={plan}
                    isReplanning={isReplanning}
                    onStartItem={handleStartActivity}
                    onCompleteItem={handleCompleteItem}
                    onSkipItem={handleSkipItem}
                    onReplan={handleReplan}
                  />
                </div>

                {/* Right Column on Desktop (col-span-5) / First on Mobile (order-1 lg:order-2): Sidebar */}
                <div className="w-full lg:col-span-5 order-1 lg:order-2 space-y-6 lg:sticky lg:top-24">
                  {primaryMission && (
                    <StudyPlanPrimaryMission
                      mission={primaryMission}
                      hasStarted={plan.actualTimeSpentMinutes > 0}
                      onStart={handleStartActivity}
                      onComplete={(id) => handleCompleteItem({ stopPropagation: () => {} } as any, id)}
                      onSkip={(id) => handleSkipItem({ stopPropagation: () => {} } as any, id)}
                    />
                  )}

                  <StudyPlanTimeBudgetSelector
                    selectedBudget={selectedBudget}
                    onSelectBudget={handleSelectBudget}
                  />

                  <StudyPlanProgressHUD plan={plan} />
                </div>
              </div>
            )}
          </>
        ) : (
          /* End-Of-Day Summary Tab */
          summaryData && (
            <StudyPlanEndOfDaySummary
              summary={summaryData}
              dateStr={plan.date}
            />
          )
        )}
      </main>
    </div>
  );
}
