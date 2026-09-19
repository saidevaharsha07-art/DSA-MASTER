'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { DashboardAdapterService, DashboardSummary } from '../services/dashboard-adapter.service';
import { PracticeEngineService } from '@/src/features/practice/services/practice-engine.service';
import { InterviewArenaService } from '@/src/features/interview/services/interview-arena.service';
import { StudyPlanOrchestratorService } from '@/src/features/study-plan/services/study-plan.service';
import { DailyStudyPlan } from '@/src/features/study-plan/types/study-plan.types';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { EventBus } from '@/src/core/events/event-bus';
import { canonicalDb } from '@/src/core/storage/db/canonical-db.service';

// Modular Dashboard Subcomponents
import { CommandCenterHeader } from './CommandCenterHeader';
import { HeroMissionCard } from './HeroMissionCard';
import { ActiveSprintCard } from './ActiveSprintCard';
import { RoadmapSnapshotCard } from './RoadmapSnapshotCard';
import { NeedsAttentionSection } from './NeedsAttentionSection';
import { WeakAreasCard } from './WeakAreasCard';
import { MasteryOverviewCard } from './MasteryOverviewCard';
import { PlatformCoverageCard } from './PlatformCoverageCard';
import { LearningAreasGrid } from './LearningAreasGrid';
import { RecentActivityCard } from './RecentActivityCard';
import { StudyPlanCard } from './StudyPlanCard';
import { InterviewSnapshotCard } from './InterviewSnapshotCard';
import { EditProfileModal } from './EditProfileModal';

export function CommandCenterView() {
  const { userId, username: activeUsername, isAuthenticated } = useActiveUser();
  const { settings } = useSettings();
  const { toast } = useToast();

  const [summary, setSummary] = useState<DashboardSummary>(() =>
    DashboardAdapterService.getDashboardSummary(userId)
  );

  const [studyPlan, setStudyPlan] = useState<DailyStudyPlan | null>(() => {
    try {
      return StudyPlanOrchestratorService.getTodayPlan(userId);
    } catch {
      return null;
    }
  });

  const interviewReadiness = useMemo(() => {
    return InterviewArenaService.getInterviewReadiness(userId);
  }, [userId, summary]);

  // Profile Information State
  const [profileName, setProfileName] = useState<string>('Developer');
  const [profileEmail, setProfileEmail] = useState<string>('developer@dsamaster.dev');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [userHandles, setUserHandles] = useState({
    leetcode: '',
    codechef: '',
    codeforces: '',
    geeksforgeeks: '',
  });

  useEffect(() => {
    const userRec = canonicalDb.getUser(userId);
    const savedName =
      userRec?.displayName ||
      localStorage.getItem(`dsa-user-name_${userId}`) ||
      localStorage.getItem('dsa-user-name');
    const savedEmail =
      userRec?.email ||
      localStorage.getItem(`dsa-user-email_${userId}`) ||
      localStorage.getItem('dsa-user-email');

    if (savedName) {
      setProfileName(savedName);
    } else if (activeUsername && activeUsername !== 'Guest') {
      setProfileName(activeUsername);
    } else {
      setProfileName(isAuthenticated ? 'Learner' : 'Guest Learner');
    }

    if (savedEmail) {
      setProfileEmail(savedEmail);
    } else {
      setProfileEmail('developer@dsamaster.dev');
    }

    const handles = userRec?.settings?.handles || {};
    setUserHandles({
      leetcode:
        handles.leetcode ||
        localStorage.getItem(`dsa-handle-leetcode_${userId}`) ||
        localStorage.getItem('dsa-handle-leetcode') ||
        '',
      codechef:
        handles.codechef ||
        localStorage.getItem(`dsa-handle-codechef_${userId}`) ||
        localStorage.getItem('dsa-handle-codechef') ||
        '',
      codeforces:
        handles.codeforces ||
        localStorage.getItem(`dsa-handle-codeforces_${userId}`) ||
        localStorage.getItem('dsa-handle-codeforces') ||
        '',
      geeksforgeeks:
        handles.geeksforgeeks ||
        localStorage.getItem(`dsa-handle-gfg_${userId}`) ||
        localStorage.getItem('dsa-handle-gfg') ||
        '',
    });

    const refresh = () => {
      DashboardAdapterService.clearCache();
      const fresh = DashboardAdapterService.getDashboardSummary(userId);
      setSummary(fresh);
      try {
        setStudyPlan(StudyPlanOrchestratorService.getTodayPlan(userId));
      } catch {}
    };

    refresh();

    const unsubProblem = EventBus.subscribe('ProblemSolved', refresh);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', refresh);
    const unsubProfile = EventBus.subscribe('ProfileUpdated', refresh);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', refresh);
    const unsubPracticeSession = EventBus.subscribe('PracticeSessionUpdated', refresh);
    const unsubStudyPlan = EventBus.subscribe('StudyPlanUpdated', refresh);

    return () => {
      unsubProblem();
      unsubMemory();
      unsubProfile();
      unsubPlatform();
      unsubPracticeSession();
      unsubStudyPlan();
    };
  }, [userId, activeUsername, isAuthenticated]);

  const handleEndActiveSession = () => {
    PracticeEngineService.saveActiveSession(userId, null);
    DashboardAdapterService.clearCache();
    const fresh = DashboardAdapterService.getDashboardSummary(userId);
    setSummary(fresh);
    EventBus.publish('PracticeSessionUpdated', { userId, status: 'ended' });
    toast('Practice sprint ended successfully.', 'info');
  };

  const handleOpenEditModal = () => {
    const userRec = canonicalDb.getUser(userId);
    const handles = userRec?.settings?.handles || {};
    setUserHandles({
      leetcode:
        handles.leetcode ||
        localStorage.getItem(`dsa-handle-leetcode_${userId}`) ||
        localStorage.getItem('dsa-handle-leetcode') ||
        '',
      codechef:
        handles.codechef ||
        localStorage.getItem(`dsa-handle-codechef_${userId}`) ||
        localStorage.getItem('dsa-handle-codechef') ||
        '',
      codeforces:
        handles.codeforces ||
        localStorage.getItem(`dsa-handle-codeforces_${userId}`) ||
        localStorage.getItem('dsa-handle-codeforces') ||
        '',
      geeksforgeeks:
        handles.geeksforgeeks ||
        localStorage.getItem(`dsa-handle-gfg_${userId}`) ||
        localStorage.getItem('dsa-handle-gfg') ||
        '',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (data: {
    displayName: string;
    email: string;
    leetcode: string;
    codechef: string;
    codeforces: string;
    geeksforgeeks: string;
  }) => {
    setIsSaving(true);

    localStorage.setItem(`dsa-user-name_${userId}`, data.displayName);
    localStorage.setItem(`dsa-user-email_${userId}`, data.email);
    localStorage.setItem(`dsa-handle-leetcode_${userId}`, data.leetcode);
    localStorage.setItem(`dsa-handle-codechef_${userId}`, data.codechef);
    localStorage.setItem(`dsa-handle-codeforces_${userId}`, data.codeforces);
    localStorage.setItem(`dsa-handle-gfg_${userId}`, data.geeksforgeeks);

    canonicalDb.saveUser({
      userId,
      username: activeUsername || data.displayName,
      displayName: data.displayName,
      email: data.email,
      settings: {
        handles: {
          leetcode: data.leetcode,
          codechef: data.codechef,
          codeforces: data.codeforces,
          geeksforgeeks: data.geeksforgeeks,
        },
      },
      createdAt: canonicalDb.getUser(userId)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setProfileName(data.displayName);
    setProfileEmail(data.email);
    setUserHandles({
      leetcode: data.leetcode,
      codechef: data.codechef,
      codeforces: data.codeforces,
      geeksforgeeks: data.geeksforgeeks,
    });

    setTimeout(() => {
      EventBus.publish('ProfileUpdated', {
        userId,
        name: data.displayName,
        email: data.email,
        timestamp: new Date().toISOString(),
      });

      EventBus.publish('PlatformSynced', {
        userId,
        platform: 'all',
        timestamp: new Date().toISOString(),
      });

      setIsSaving(false);
      setIsEditModalOpen(false);
      toast('Profile updated successfully!', 'success');
    }, 250);
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-sans antialiased box-border p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1520px] mx-auto">
      {/* ── 1. GLOBAL IDENTITY & PERFORMANCE HUD ── */}
      <CommandCenterHeader
        summary={summary}
        profileName={profileName}
        profileEmail={profileEmail}
        isAuthenticated={isAuthenticated}
        onOpenEditModal={handleOpenEditModal}
      />

      {/* ── 2. TWO-COLUMN ASYMMETRICAL COMMAND CENTER GRID (WITH STRICT MOBILE ORDERING) ── */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 w-full items-start">
        {/* Item 1 (Mobile Order 1, Desktop Left): Your Next Move (Hero Focal Point) */}
        <div className="order-1 lg:order-1 lg:col-span-7 w-full">
          <HeroMissionCard heroMission={summary.heroMission} />
        </div>

        {/* Item 2 (Mobile Order 2, Desktop Left): Active Practice Sprint / Sprint Launcher */}
        <div className="order-2 lg:order-3 lg:col-span-7 w-full">
          <ActiveSprintCard
            activeSessionSummary={summary.activeSessionSummary}
            onEndSession={handleEndActiveSession}
          />
        </div>

        {/* Item 3 (Mobile Order 3, Desktop Left): Adaptive Roadmap Focus Snapshot */}
        <div className="order-3 lg:order-5 lg:col-span-7 w-full">
          <RoadmapSnapshotCard roadmapSnapshot={summary.roadmapSnapshot} />
        </div>

        {/* Item 4 & 5 (Mobile Order 4 & 5, Desktop Right): Needs Attention (Revision Queue & Mistake Intelligence) */}
        <div className="order-4 lg:order-2 lg:col-span-5 w-full">
          <NeedsAttentionSection
            revisionQueueSnapshot={summary.revisionQueueSnapshot}
            mistakeSnapshot={summary.mistakeSnapshot}
          />
        </div>

        {/* Item 6 (Mobile Order 6, Desktop Left): Where You're Getting Stuck (Weak Areas) */}
        <div className="order-6 lg:order-7 lg:col-span-7 w-full">
          <WeakAreasCard weakAreasList={summary.weakAreasList} />
        </div>

        {/* Item 7 (Mobile Order 7, Desktop Right): Today's Study Plan */}
        {studyPlan && (
          <div className="order-7 lg:order-4 lg:col-span-5 w-full">
            <StudyPlanCard studyPlan={studyPlan} />
          </div>
        )}

        {/* Item 8 (Mobile Order 8, Desktop Right): Technical Interview Simulator */}
        <div className="order-8 lg:order-6 lg:col-span-5 w-full">
          <InterviewSnapshotCard interviewReadiness={interviewReadiness} />
        </div>

        {/* Item 9 (Mobile Order 9, Desktop Right): Mastery Overview (Analytics Panel + 3-Tier Drilldown) */}
        <div className="order-9 lg:order-8 lg:col-span-5 w-full">
          <MasteryOverviewCard masteryOverview={summary.masteryOverview} />
        </div>

        {/* Item 10 (Mobile Order 10, Desktop Right): Platform Coverage Mix */}
        <div className="order-10 lg:order-10 lg:col-span-5 w-full">
          <PlatformCoverageCard platformMix={summary.platformMix} />
        </div>

        {/* Item 11 (Mobile Order 11, Desktop Left): All 25 Canonical Learning Areas */}
        <div className="order-11 lg:order-9 lg:col-span-7 w-full">
          <LearningAreasGrid canonicalLearningAreas={summary.canonicalLearningAreas} />
        </div>

        {/* Item 12 (Mobile Order 12, Desktop Right): Recent Progress & Telemetry Momentum */}
        <div className="order-12 lg:order-11 lg:col-span-5 w-full">
          <RecentActivityCard progressMomentum={summary.progressMomentum} />
        </div>
      </div>

      {/* ── 3. EDIT PROFILE MODAL ── */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialName={profileName}
        initialEmail={profileEmail}
        initialHandles={userHandles}
        isSaving={isSaving}
      />
    </div>
  );
}
