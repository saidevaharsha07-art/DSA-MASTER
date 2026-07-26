'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Crown, 
  Shield, 
  Compass, 
  Layers, 
  Flame, 
  Zap, 
  GitBranch, 
  Database, 
  Sparkles, 
  Cpu, 
  Network, 
  Target, 
  BookOpen, 
  Star, 
  Activity,
  ArrowLeft,
  X,
  Play,
  CheckCircle2,
  Clock,
  Bookmark,
  Award,
  Lightbulb,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { CategoryModel, PatternModel, ProblemModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { KnowledgePatternCard } from './KnowledgePatternCard';

interface KingdomDistrictLevel2Props {
  category: CategoryModel;
  onBackToKingdoms: () => void;
  bookmarkedPatternIds: string[];
  onToggleBookmark: (patternId: string) => void;
}

// Fantasy Titles for Kingdom Realms
const KINGDOM_REALM_TITLES: Record<string, { realmName: string; lore: string }> = {
  'basic-arrays': {
    realmName: 'Crystal Canyon of Arrays',
    lore: 'The birthplace of memory arrays, sequential storage, and indexing algorithms.'
  },
  'sliding-window': {
    realmName: 'Moving Horizon Citadel',
    lore: 'The dynamic realm of bounded windows, contiguous subarrays, and streaming frames.'
  },
  'two-pointers': {
    realmName: 'Convergence Peaks',
    lore: 'The sanctuary where opposing memory pointers meet across sorted boundaries.'
  },
  'prefix-sum': {
    realmName: 'Sanctuary of Cumulative Range',
    lore: 'The ancient valley of constant-time range sum queries and precalculated states.'
  },
  'binary-search': {
    realmName: 'Hidden Truth Vault',
    lore: 'The logarithmic split valley of monotonic functions and binary boundaries.'
  },
  'trees-binary-trees': {
    realmName: 'Ancient World Tree Canopy',
    lore: 'The sacred canopy of hierarchical branch traversals and recursive node invariants.'
  },
  'graphs-bfs-dfs': {
    realmName: 'Shadow Forest Matrix',
    lore: 'The interconnected web of node vertices, queue traversals, and topological paths.'
  },
  'hashing-hash-table': {
    realmName: 'Cipher Vault of Keys',
    lore: 'The instant lookup sanctuary of keys, values, and collision-free hash functions.'
  },
  '1d-dynamic-programming': {
    realmName: 'Imperial Memoization Citadel',
    lore: 'The foundation of subproblem memoization and linear state transition tables.'
  },
};

// Fantasy Subtitles for Pattern Districts
const PATTERN_DISTRICT_SUBTITLES: Record<string, string> = {
  'pattern.array-fundamentals': 'The First Academy of Memory',
  'pattern.kadanes-algorithm': 'The Valley of Maximum Energy',
  'pattern.array-simulation': 'The Mirror Dimension of Matrices',
  'pattern.array-rearrangement': 'The Shifting Grounds of Pointers',
  'pattern.sliding-window': 'The Moving Horizon Domain',
  'pattern.two-pointers': 'The Boundary Convergence Peaks',
  'pattern.prefix-sum': 'The Cumulative Range Citadel',
  'pattern.binary-search': 'The Logarithmic Split Vault',
  'pattern.bfs-traversal': 'The Queue Breadth Matrix',
  'pattern.dfs-traversal': 'The Recursive Depth Canopy',
};

export function KingdomDistrictLevel2({
  category,
  onBackToKingdoms,
  bookmarkedPatternIds,
  onToggleBookmark,
}: KingdomDistrictLevel2Props) {
  // Fetch real curriculum patterns & problems for this kingdom
  const kingdomPatterns = useMemo(() => CurriculumRepository.getPatternsByCategory(category.slug), [category.slug]);
  const kingdomProblems = useMemo(() => CurriculumRepository.getProblemsByCategory(category.slug), [category.slug]);

  const realmInfo = KINGDOM_REALM_TITLES[category.slug] || {
    realmName: `${category.title} Realm`,
    lore: category.description || 'The sacred domain of algorithm mastery.'
  };

  const totalProblems = kingdomProblems.length || category.totalProblemCount || 42;
  const totalPatterns = kingdomPatterns.length || category.patternIds.length || 4;

  // Completion & Mastery Stats
  const completionPct = Math.min(100, Math.max(35, 60 + ((category.order * 7) % 38)));
  const totalXpEarned = category.totalXp || totalProblems * 40;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
      
      {/* Back to Level 1 Kingdoms Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={onBackToKingdoms}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            color: '#C084FC',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(168, 85, 247, 0.2)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={16} /> Back to 25 Kingdoms Grid
        </button>

        <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
          Level 2 District Selection • <strong style={{ color: '#FFF' }}>{category.kingdomTitle}</strong>
        </span>
      </div>

      {/* ==================================================== */}
      {/* 1. HERO SECTION & FANTASY DISTRICT MAP (2 COLUMNS)   */}
      {/* ==================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(168, 85, 247, 0.15)',
          background: 'linear-gradient(135deg, rgba(13, 10, 25, 0.98) 0%, rgba(26, 16, 51, 0.95) 50%, rgba(13, 10, 25, 0.98) 100%)',
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          alignItems: 'stretch',
          position: 'relative',
        }}
      >
        {/* Hero Left Content Area */}
        <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C084FC', background: 'rgba(168, 85, 247, 0.2)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
              Kingdom Realm Level 2
            </span>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 800 }}>● {completionPct}% Mastered</span>
          </div>

          <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            {category.order}. {category.title}
          </h1>
          <h3 style={{ margin: '4px 0 10px 0', fontSize: '16px', fontWeight: 700, color: '#C084FC' }}>
            {realmInfo.realmName}
          </h3>
          <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#CBD5E1', lineHeight: '1.6', maxWidth: '520px' }}>
            &quot;{realmInfo.lore}&quot;
          </p>

          {/* Statistics Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ padding: '8px 14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Problems</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>{totalProblems}</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Patterns</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#C084FC' }}>{totalPatterns} Districts</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Difficulty</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#10B981' }}>Easy → Hard</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Total XP</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#F59E0B' }}>+{totalXpEarned} XP</span>
            </div>

            <div style={{ padding: '8px 14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Current Rank</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#38BDF8' }}>Archon Scholar</span>
            </div>
          </div>
        </div>

        {/* Hero Right: Fantasy District Map Node Visualization */}
        <div style={{
          position: 'relative',
          padding: '30px',
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, rgba(13, 10, 25, 0.95) 80%)',
          borderLeft: '1px solid rgba(168, 85, 247, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C084FC', marginBottom: '16px' }}>
            🏰 District Map of {category.title}
          </span>

          {/* Connected Magical Roads & Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '280px' }}>
            {kingdomPatterns.map((pat, idx) => {
              const subtitle = PATTERN_DISTRICT_SUBTITLES[pat.id] || `District ${idx + 1}`;
              const isMastered = idx < 2;

              return (
                <div key={pat.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
                  {/* Glowing Node Marker */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isMastered ? '#10B981' : 'linear-gradient(135deg, #A855F7, #7E22CE)',
                    border: '2px solid #FFF',
                    boxShadow: isMastered ? '0 0 14px #10B981' : '0 0 14px #A855F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    fontSize: '11px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}>
                    {isMastered ? '✓' : idx + 1}
                  </div>

                  <div style={{ padding: '8px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFF', display: 'block' }}>{pat.title}</span>
                    <span style={{ fontSize: '9px', color: '#C084FC', fontStyle: 'italic' }}>&quot;{subtitle}&quot;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ==================================================== */}
      {/* 2. PATTERN DISTRICTS GRID & ACCORDION CODEX          */}
      {/* ==================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={20} style={{ color: '#C084FC' }} />
            Pattern Districts in {category.title} ({kingdomPatterns.length})
          </h2>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Select any district card below to expand its official codex & documentation.</span>
        </div>

        {/* Pattern District Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {kingdomPatterns.map((pat) => (
            <KnowledgePatternCard
              key={pat.id}
              pattern={pat}
              isBookmarked={bookmarkedPatternIds.includes(pat.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. BOTTOM: LEARNING JOURNEY ROADMAP                  */}
      {/* ==================================================== */}
      <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <Award size={18} style={{ color: '#C084FC' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>Kingdom Progression Journey</h2>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>District Mastery Sequence for {category.title}</span>
          </div>
        </div>

        {/* Progression Pipeline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', position: 'relative' }}>
          
          <div style={{ position: 'absolute', left: '40px', right: '40px', top: '50%', height: '4px', background: 'rgba(255,255,255,0.08)', transform: 'translateY(-50%)', zIndex: 1 }} />
          <div style={{ position: 'absolute', left: '40px', width: '50%', top: '50%', height: '4px', background: 'linear-gradient(to right, #10B981, #A855F7)', transform: 'translateY(-50%)', zIndex: 2 }} />

          {kingdomPatterns.map((pat, idx) => {
            const isMastered = idx < 2;
            const subtitle = PATTERN_DISTRICT_SUBTITLES[pat.id] || `District ${idx + 1}`;

            return (
              <motion.div
                key={pat.id}
                whileHover={{ scale: 1.08 }}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isMastered ? '#10B981' : 'linear-gradient(135deg, #A855F7, #7E22CE)',
                  border: '3px solid #FFF',
                  boxShadow: isMastered ? '0 0 16px #10B981' : '0 0 16px #A855F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontWeight: 900,
                  fontSize: '12px',
                }}>
                  {isMastered ? '✓' : idx + 1}
                </div>

                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: isMastered ? '#10B981' : '#FFF', display: 'block' }}>
                    {pat.title}
                  </span>
                  <span style={{ fontSize: '9px', color: '#94A3B8' }}>&quot;{subtitle}&quot;</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
