'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Compass,
  Trophy,
  Flame,
  Shield,
  Sparkles,
  ChevronRight,
  BookOpen,
  Swords,
  Clock,
  CheckCircle2,
  Lock,
  Zap,
  Target,
  BarChart3,
  Brain,
  Award,
  Star,
  Activity,
  Heart,
  Bot,
  Landmark,
  Layers,
  ArrowUpRight,
  RefreshCw,
  TrendingUp,
  Sword,
  Crown,
  Search,
  BookMarked,
  Lightbulb,
} from 'lucide-react';
import { CAMPAIGN_KINGDOMS } from '@/src/features/learn/data/campaignKingdoms';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { useRoadmap } from '@/hooks/use-roadmap';

export function CommandCenterView() {
  const { state: roadmapState } = useRoadmap();
  const [hudSearch, setHudSearch] = useState('');

  // Dynamic user metrics from roadmapState
  const solvedCount = roadmapState?.completed?.length ?? 120;
  const xp = roadmapState?.xp ?? (solvedCount * 50);
  const streak = 18; // Active learning streak
  const level = Math.floor(xp / 500) + 1;
  const currentLevelXp = xp % 500;
  const nextLevelXp = 500;
  const levelPct = Math.round((currentLevelXp / nextLevelXp) * 100);

  // Active Kingdom Data
  const allCategories = CurriculumRepository.getAllCategories();
  const activeKingdom = allCategories[0]; // Kingdom of Beginnings
  const activeKingdomProblems = CurriculumRepository.filterProblems({ categorySlug: activeKingdom?.slug }, []);
  const activeSolved = activeKingdomProblems.filter((p) => roadmapState?.completed?.includes(p.leetcodeNumber)).length;
  const activeTotal = activeKingdomProblems.length;
  const activePct = activeTotal > 0 ? Math.round((activeSolved / activeTotal) * 100) : 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        minHeight: '100vh',
        background: '#070512',
        color: '#FFF',
        padding: '24px 32px',
        overflowY: 'auto',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ── 1. GAME HUD TOP NAVIGATION BAR ───────────────────────────── */}
      <div
        style={{
          padding: '12px 24px',
          borderRadius: '16px',
          background: 'rgba(14, 10, 32, 0.94)',
          border: '1.5px solid rgba(168, 85, 247, 0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* HUD Quick Search */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#C084FC', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search quests, kingdoms, patterns..."
            value={hudSearch}
            onChange={(e) => setHudSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#FFF',
              fontSize: '12px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Top HUD Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: '#F59E0B' }}>
            <Zap size={16} /> <span>{xp} XP</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: '#F97316' }}>
            <Flame size={16} /> <span>{streak}d Streak</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: '#C084FC' }}>
            <Trophy size={16} /> <span>Rank #14</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: '#10B981' }}>
            <Shield size={16} /> <span>Level {level}</span>
          </div>
        </div>
      </div>

      {/* ── 2. PLAYER PROFILE HERO SECTION ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'relative',
          padding: '28px 36px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(32, 22, 64, 0.96) 0%, rgba(14, 10, 32, 0.98) 60%, rgba(8, 6, 18, 1) 100%)',
          border: '1.5px solid rgba(168, 85, 247, 0.45)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 45px rgba(168, 85, 247, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Player Profile Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', zIndex: 1 }}>
          {/* Avatar Crest */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #A855F7 0%, #4F46E5 100%)',
                border: '3px solid #C084FC',
                boxShadow: '0 0 35px rgba(192, 132, 252, 0.75), inset 0 0 20px rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 900,
                color: '#FFF',
              }}
            >
              A
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                borderRadius: '99px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 900,
                color: '#000',
                border: '2px solid #070512',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.5)',
              }}
            >
              Lvl {level}
            </div>
          </div>

          {/* Player Title & Location */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.01em' }}>
                Arjun&apos;s Command Center 2.0
              </h1>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  padding: '4px 14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.15))',
                  border: '1.5px solid #F59E0B',
                  color: '#FDE047',
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 0 16px rgba(245, 158, 11, 0.35)',
                }}
              >
                <Crown size={12} /> Grandmaster Architect
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>
              <span>
                Current Realm: <strong style={{ color: '#38BDF8' }}>{activeKingdom?.kingdomTitle ?? 'Kingdom of Beginnings'}</strong>
              </span>
              <span>•</span>
              <span>
                Pattern: <strong style={{ color: '#C084FC' }}>Array Fundamentals</strong>
              </span>
            </div>

            {/* Level XP Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px', maxWidth: '400px' }}>
              <div style={{ flex: 1, height: '9px', borderRadius: '99px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ height: '100%', width: `${levelPct}%`, background: 'linear-gradient(90deg, #A855F7, #10B981)', borderRadius: '99px', transition: 'width 0.4s ease', boxShadow: '0 0 12px rgba(16, 185, 129, 0.7)' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#10B981', whiteSpace: 'nowrap' }}>
                {currentLevelXp} / {nextLevelXp} XP ({levelPct}%)
              </span>
            </div>
          </div>
        </div>

        {/* Hero HUD Stat Tiles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', zIndex: 1 }}>
          <div style={hudTileSt('rgba(249, 115, 22, 0.16)', 'rgba(249, 115, 22, 0.4)', 'rgba(249, 115, 22, 0.2)')}>
            <Flame size={22} style={{ color: '#F97316' }} />
            <div>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', display: 'block', lineHeight: 1.1 }}>{streak} Days</span>
              <span style={{ fontSize: '10px', color: '#F97316', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Learning Streak</span>
            </div>
          </div>

          <div style={hudTileSt('rgba(168, 85, 247, 0.16)', 'rgba(168, 85, 247, 0.4)', 'rgba(168, 85, 247, 0.2)')}>
            <Trophy size={22} style={{ color: '#C084FC' }} />
            <div>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', display: 'block', lineHeight: 1.1 }}>#14 Global</span>
              <span style={{ fontSize: '10px', color: '#C084FC', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grandmaster Rank</span>
            </div>
          </div>

          <div style={hudTileSt('rgba(16, 185, 129, 0.16)', 'rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0.2)')}>
            <CheckCircle2 size={22} style={{ color: '#10B981' }} />
            <div>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#10B981', display: 'block', lineHeight: 1.1 }}>{solvedCount} Solved</span>
              <span style={{ fontSize: '10px', color: '#6EE7B7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mastered Problems</span>
            </div>
          </div>

          <div style={hudTileSt('rgba(245, 158, 11, 0.16)', 'rgba(245, 158, 11, 0.4)', 'rgba(245, 158, 11, 0.2)')}>
            <Zap size={22} style={{ color: '#F59E0B' }} />
            <div>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#F59E0B', display: 'block', lineHeight: 1.1 }}>+{xp} XP</span>
              <span style={{ fontSize: '10px', color: '#FDE68A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Earned XP</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 3. ACTIVE CAMPAIGN QUEST SPOTLIGHT PANEL ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        style={{
          position: 'relative',
          padding: '32px 36px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(22, 16, 44, 0.97) 65%, rgba(10, 8, 22, 0.98) 100%)',
          border: '2px solid #F59E0B',
          boxShadow: '0 20px 50px rgba(245, 158, 11, 0.28), inset 0 0 30px rgba(245, 158, 11, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#F59E0B',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '5px 14px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1.5px solid #F59E0B',
                boxShadow: '0 0 14px rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sword size={13} /> ACTIVE CAMPAIGN QUEST
            </span>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#10B981' }}>
              {activeSolved} / {activeTotal} Completed ({activePct}%)
            </span>
          </div>

          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.01em' }}>
            🏰 {activeKingdom?.kingdomTitle ?? 'Kingdom of Beginnings'}
          </h2>

          <p style={{ margin: '0 0 18px 0', fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6' }}>
            Objective: <strong>Array Fundamentals & Subarray Framing</strong>. Master variable lens bounds and sliding window logic to unlock the Array Titan Castle.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', fontSize: '13px', color: '#94A3B8', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} style={{ color: '#38BDF8' }} /> Est. Time: <strong style={{ color: '#FFF' }}>25 mins</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={15} style={{ color: '#F59E0B' }} /> Reward: <strong style={{ color: '#F59E0B' }}>+300 XP</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={15} style={{ color: '#10B981' }} /> Tier: <strong style={{ color: '#10B981' }}>Learn</strong>
            </span>
          </div>
        </div>

        <Link href="/learn/beginnings" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 12px 36px rgba(245, 158, 11, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            type="button"
            style={{
              padding: '18px 36px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: 'none',
              color: '#FFF',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.45)',
              letterSpacing: '0.02em',
            }}
          >
            Continue Campaign Quest <ChevronRight size={22} />
          </motion.button>
        </Link>
      </motion.div>

      {/* ── 4. 25-KINGDOM CAMPAIGN MAP ───────────────────────────────── */}
      <div style={commandPanelSt}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Landmark size={20} style={{ color: '#C084FC' }} /> 25 KINGDOMS CAMPAIGN MAP
            </h3>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Active campaign progress across all 25 realms of Algorithmia</span>
          </div>
          <Link href="/learn" style={{ fontSize: '13px', color: '#C084FC', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Master Campaign Map <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Kingdom Nodes Horizontal Grid */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '12px' }}>
          {CAMPAIGN_KINGDOMS.map((k) => {
            const isMastered = k.status === 'mastered';
            const isCurrent = k.id === 1;

            return (
              <div
                key={k.id}
                style={{
                  minWidth: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: isMastered
                    ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                    : isCurrent
                    ? 'linear-gradient(135deg, #38BDF8, #0284C7)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isMastered
                    ? '2.5px solid #FDE047'
                    : isCurrent
                    ? '2.5px solid #7DD3FC'
                    : '1.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isMastered
                    ? '0 0 16px rgba(245, 158, 11, 0.7)'
                    : isCurrent
                    ? '0 0 18px rgba(56, 189, 248, 0.7)'
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 900,
                  color: isMastered || isCurrent ? '#000' : '#64748B',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
                title={`${k.id}. ${k.title}`}
              >
                {k.id}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. DAILY MISSIONS & TACTICAL QUEST LOG ──────────────────── */}
      <div style={commandPanelSt}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={20} style={{ color: '#F59E0B' }} /> DAILY MISSIONS & TACTICAL QUEST LOG
          </h3>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 900, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: '10px', padding: '4px 10px' }}>
            Resets in 6h 24m
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {/* Mission 1 */}
          <div style={{ padding: '18px 22px', borderRadius: '18px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.09)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle2 size={22} style={{ color: '#10B981' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#FFF' }}>Solve 2 Array Problems</h4>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>Daily Campaign Quest</span>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#F59E0B' }}>+300 XP</span>
          </div>

          {/* Mission 2 */}
          <div style={{ padding: '18px 22px', borderRadius: '18px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.09)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <RefreshCw size={22} style={{ color: '#38BDF8' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#FFF' }}>Complete Memory Cleanse</h4>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>Spaced Repetition</span>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#F59E0B' }}>+200 XP</span>
          </div>

          {/* Mission 3 */}
          <div style={{ padding: '18px 22px', borderRadius: '18px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.09)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Brain size={22} style={{ color: '#C084FC' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#FFF' }}>Review 1 Weak Topic</h4>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>Dynamic Programming</span>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#F59E0B' }}>+150 XP</span>
          </div>
        </div>
      </div>

      {/* ── 6. UPGRADED ORACLE AI RECOMMENDATION ENGINE PANEL ───────── */}
      <div
        style={{
          padding: '28px 34px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(20, 14, 44, 0.98) 60%, rgba(10, 8, 26, 1) 100%)',
          border: '2px solid #38BDF8',
          boxShadow: '0 20px 50px rgba(56, 189, 248, 0.22), inset 0 0 35px rgba(56, 189, 248, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          {/* AI Header with Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                padding: '14px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(56,189,248,0.3) 0%, rgba(3,105,161,0.2) 100%)',
                border: '2px solid #38BDF8',
                boxShadow: '0 0 20px rgba(56,189,248,0.4)',
              }}
            >
              <Bot size={34} style={{ color: '#38BDF8' }} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={12} /> ORACLE AI RECOMMENDATION ENGINE
              </span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 900, color: '#FFF' }}>
                Target: Binary Search on Monotonic Spaces
              </h3>
            </div>
          </div>

          <Link href="/practice" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(56,189,248,0.5)' }}
              whileTap={{ scale: 0.95 }}
              type="button"
              style={{
                padding: '14px 28px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                border: 'none',
                color: '#000',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 22px rgba(56,189,248,0.35)',
              }}
            >
              Start Practice Arena <ChevronRight size={18} />
            </motion.button>
          </Link>
        </div>

        {/* Reasoning & Recommendation Box */}
        <div style={{ padding: '16px 22px', borderRadius: '16px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <Lightbulb size={20} style={{ color: '#FDE047', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
              ORACLE TACTICAL REASONING
            </span>
            <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: '1.6' }}>
              &quot;Based on your <strong>98% accuracy in Array Fundamentals</strong>, your strongest cognitive path is mastering logarithmic search bounds. Transitioning to <strong>Binary Search on Monotonic Spaces</strong> next will boost your technical interview readiness index by <strong>+15%</strong>.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* ── 7. HORIZONTAL COMMAND HUD CONSOLE STRIP (4 PANELS) ───────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          width: '100%',
        }}
      >
        {/* PANEL 1: 🐲 BYTE THE CYBER DRAKE COMPANION */}
        <div style={hudConsolePanelSt}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '38px' }}>🐲</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#FFF' }}>Byte the Cyber Drake</h4>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 800 }}>Mood: Energetic (+15% XP Boost)</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', fontWeight: 900 }}>
              <span>EVOLUTION LEVEL 12</span>
              <span>Phase 2 / 4</span>
            </div>
            <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' }} />
            </div>
          </div>
        </div>

        {/* PANEL 2: 📊 LEARNING INSIGHTS HUD */}
        <div style={hudConsolePanelSt}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 900, color: '#FFF', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={16} style={{ color: '#A855F7' }} /> LEARNING INSIGHTS
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8', fontWeight: 600 }}>Strongest:</span>
              <strong style={{ color: '#10B981', fontWeight: 800 }}>Arrays (98%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8', fontWeight: 600 }}>Weakest:</span>
              <strong style={{ color: '#EF4444', fontWeight: 800 }}>DP (42%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8', fontWeight: 600 }}>Velocity:</span>
              <strong style={{ color: '#FFF', fontWeight: 800 }}>4.2 Probs / Day</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8', fontWeight: 600 }}>Contest Index:</span>
              <strong style={{ color: '#F59E0B', fontWeight: 800 }}>85% (Grandmaster)</strong>
            </div>
          </div>
        </div>

        {/* PANEL 3: 🏆 HALL OF CHAMPIONS & TROPHIES */}
        <div style={hudConsolePanelSt}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} style={{ color: '#F59E0B' }} /> TROPHY VAULT
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px', color: '#CBD5E1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={16} style={{ color: '#F59E0B', flexShrink: 0 }} />
              <span>Unlocked: <strong style={{ color: '#FFF' }}>Compass of Contiguous Truth</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Swords size={16} style={{ color: '#EF4444', flexShrink: 0 }} />
              <span>Defeated: <strong style={{ color: '#FFF' }}>Array Colossus Boss</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={16} style={{ color: '#F97316', flexShrink: 0 }} />
              <span>Streak Titan: <strong style={{ color: '#FFF' }}>18 Days Active</strong></span>
            </div>
          </div>
        </div>

        {/* PANEL 4: 📖 CHRONICLE OF LEGENDS (LORE BOOK) */}
        <div style={hudConsolePanelSt}>
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <BookMarked size={12} style={{ color: '#38BDF8' }} /> CHRONICLE OF LEGENDS
          </span>
          <h5 style={{ margin: '4px 0 2px 0', fontSize: '14px', fontWeight: 900, color: '#FFF' }}>
            Chapter 4: Moving Horizon Sands
          </h5>
          <p style={{ margin: 0, fontSize: '11px', color: '#CBD5E1', lineHeight: '1.5' }}>
            &quot;As stargazers adjusted the glass lens, desert sands revealed ancient subarray vaults...&quot;
          </p>
        </div>
      </div>

    </div>
  );
}

// Helper styling for top hero HUD tiles
function hudTileSt(bg: string, border: string, glowBg: string): React.CSSProperties {
  return {
    padding: '14px 22px',
    borderRadius: '18px',
    background: bg,
    border: `1.5px solid ${border}`,
    boxShadow: `0 8px 24px ${glowBg}`,
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  };
}

// Helper styling for connected command center panels
const commandPanelSt: React.CSSProperties = {
  padding: '26px 30px',
  borderRadius: '22px',
  background: 'rgba(14, 10, 32, 0.92)',
  border: '1.5px solid rgba(168, 85, 247, 0.3)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(168, 85, 247, 0.08)',
  backdropFilter: 'blur(20px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

// Helper styling for horizontal HUD console strip panels
const hudConsolePanelSt: React.CSSProperties = {
  padding: '22px 24px',
  borderRadius: '20px',
  background: 'rgba(14, 10, 32, 0.92)',
  border: '1.5px solid rgba(168, 85, 247, 0.3)',
  boxShadow: '0 12px 32px rgba(0,0,0,0.6), inset 0 0 15px rgba(168, 85, 247, 0.08)',
  backdropFilter: 'blur(20px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};
