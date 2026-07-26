'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, ShieldCheck, Zap, Flame, Play, AlertCircle } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';

// Import Modular Revision Engine & Components
import { revisionEngine } from '@/src/engines/revision';
import { RevisionStatCards } from '@/components/revision/RevisionStatCards';
import { RevisionQueueTable } from '@/components/revision/RevisionQueueTable';
import { KingdomMasteryPanel } from '@/components/revision/KingdomMasteryPanel';
import { RevisionCalendar } from '@/components/revision/RevisionCalendar';
import { RevisionTimeline } from '@/components/revision/RevisionTimeline';

export default function MemorySanctuaryPage() {
  const { settings } = useSettings();
  const { toast } = useToast();
  const { masteryThreshold } = settings.learningEngine;

  // Reactive state for review submissions & filters
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  // Fetch 100% Dynamic Engine Data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dueTodayProblems = useMemo(() => revisionEngine.getDueTodayProblems(), [refreshCount]);
  const upcomingQueue = useMemo(() => {
    const queue = revisionEngine.getUpcomingQueue();
    if (selectedDateFilter) {
      return queue.filter((p) => p.revisionData.nextReview && p.revisionData.nextReview.split('T')[0] === selectedDateFilter);
    }
    return queue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCount, selectedDateFilter]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const kingdoms = useMemo(() => revisionEngine.getKingdomMasteries(), [refreshCount]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const streakStats = useMemo(() => revisionEngine.getStreakStats(), [refreshCount]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const xpStats = useMemo(() => revisionEngine.getXpStats(), [refreshCount]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timelineStages = useMemo(() => revisionEngine.getTimelineStages(), [refreshCount]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rewards = useMemo(() => revisionEngine.getUnlockedRewards(), [refreshCount]);

  const nextReward = useMemo(() => {
    return rewards.find((r) => !r.unlocked) || rewards[rewards.length - 1];
  }, [rewards]);

  // Handle Review Completion
  const handleReviewCompleted = (problemId: string, rating: 'easy' | 'medium' | 'hard') => {
    const result = revisionEngine.recordReview(problemId, rating);
    toast(`Review Recorded! +${result.xpEarned} XP awarded! Next review in ${result.updated.interval} days.`, 'success');
    setRefreshCount((prev) => prev + 1);
  };

  const handleReviewNowClick = () => {
    const el = document.getElementById('due-today-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px', padding: '0 24px 40px 24px', fontFamily: 'var(--font-sans, sans-serif)' }}>
      
      {/* ==================================================== */}
      {/* 1. HERO SECTION (320px Height with Banner Artwork)   */}
      {/* ==================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          height: '320px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(168, 85, 247, 0.1)',
          background: 'linear-gradient(135deg, rgba(13, 10, 25, 0.98) 0%, rgba(26, 16, 51, 0.95) 50%, rgba(13, 10, 25, 0.98) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Background Widescreen Concept Art Banner */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '58%',
          backgroundImage: 'url(/images/memory_sanctuary_banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.65,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Hero Left Content Area */}
        <div style={{ position: 'relative', zIndex: 10, padding: '36px 44px', maxWidth: '640px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)' }}>
              <Brain size={24} style={{ color: '#C084FC' }} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A855F7', background: 'rgba(168, 85, 247, 0.15)', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              Spaced Repetition Protocol
            </span>
          </div>

          <h1 style={{ margin: 0, fontSize: '38px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            Revision Center
          </h1>
          <p style={{ margin: '8px 0 20px 0', fontSize: '14px', color: '#CBD5E1', lineHeight: '1.5' }}>
            Strengthen your memory using spaced repetition. Consolidate DSA patterns before cognitive decay sets in.
          </p>

          {/* Dynamic Hero Stats Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Flame size={15} style={{ color: '#EF4444' }} />
              <div>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Current Streak</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#FCA5A5' }}>{streakStats.currentStreak} Days</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Zap size={15} style={{ color: '#F59E0B' }} />
              <div>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Total XP</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#FDE68A' }}>{xpStats.totalXp} XP</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <AlertCircle size={15} style={{ color: '#C084FC' }} />
              <div>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Due Today</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#C084FC' }}>{dueTodayProblems.length} Items</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <ShieldCheck size={15} style={{ color: '#38BDF8' }} />
              <div>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Current Level</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#38BDF8' }}>Lvl {xpStats.currentLevel} ({xpStats.levelTitle})</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================================================== */}
      {/* 2. DYNAMIC STAT CARDS (STREAK, XP, DUE TODAY, REWARD) */}
      {/* ==================================================== */}
      <RevisionStatCards
        dueTodayCount={dueTodayProblems.length}
        streakStats={streakStats}
        xpStats={xpStats}
        nextReward={nextReward}
        onReviewClick={handleReviewNowClick}
      />

      {/* ==================================================== */}
      {/* 3. MAIN DASHBOARD: REVISION QUEUE & KINGDOM MASTERY   */}
      {/* ==================================================== */}
      <div id="due-today-section" style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: '28px' }}>
        
        {/* LEFT (65%): DYNAMIC REVISION QUEUE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <RevisionQueueTable
            problems={upcomingQueue}
            onReviewCompleted={handleReviewCompleted}
            selectedDateFilter={selectedDateFilter}
          />
        </div>

        {/* RIGHT (35%): DYNAMIC KINGDOM MASTERY PANEL (25 KINGDOMS) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <KingdomMasteryPanel kingdoms={kingdoms} />
        </div>

      </div>

      {/* ==================================================== */}
      {/* 4. DYNAMIC REVISION CALENDAR                         */}
      {/* ==================================================== */}
      <RevisionCalendar
        selectedDateFilter={selectedDateFilter}
        onSelectDateFilter={(dateIso) => setSelectedDateFilter(dateIso)}
      />

      {/* ==================================================== */}
      {/* 5. DYNAMIC EBBINGHAUS REVISION TIMELINE               */}
      {/* ==================================================== */}
      <RevisionTimeline stages={timelineStages} />

    </div>
  );
}
