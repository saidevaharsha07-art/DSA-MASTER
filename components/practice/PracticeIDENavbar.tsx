'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Bookmark, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Shield,
  ExternalLink
} from 'lucide-react';
import { ProblemModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { getPlatformMeta } from '@/src/curriculum/services';
import { useSettings } from '@/src/context/SettingsContext';

interface PracticeIDENavbarProps {
  problem: ProblemModel;
  isBookmarked: boolean;
  isLiked: boolean;
  onToggleBookmark: () => void;
  onToggleLike: () => void;
}

export function PracticeIDENavbar({
  problem,
  isBookmarked,
  isLiked,
  onToggleBookmark,
  onToggleLike,
}: PracticeIDENavbarProps) {
  const router = useRouter();
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  // Fetch Category and Pattern metadata
  const category = CurriculumRepository.getCategoryBySlug(problem.categorySlug);
  const pattern = CurriculumRepository.getPatternBySlug(problem.patternSlug);

  const kingdomTitle = category ? category.kingdomTitle : (problem.kingdomTitle || 'Kingdom of Beginnings');
  const patternTitle = pattern ? pattern.title : (problem.patternTitle || 'Array Fundamentals');

  // Dynamic Previous and Next problem calculation across CurriculumRepository
  const allProblems = CurriculumRepository.getAllProblems();
  const currentIndex = allProblems.findIndex((p) => p.id === problem.id || p.slug === problem.slug);

  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  const handleNavigatePrev = () => {
    if (prevProblem) {
      router.push(`/practice/${prevProblem.slug || prevProblem.id}`);
    }
  };

  const handleNavigateNext = () => {
    if (nextProblem) {
      router.push(`/practice/${nextProblem.slug || nextProblem.id}`);
    }
  };

  const diffColor =
    (problem.difficulty || '').toLowerCase() === 'easy'
      ? '#10B981'
      : (problem.difficulty || '').toLowerCase() === 'hard'
      ? '#EF4444'
      : '#F59E0B';

  return (
    <header style={{
      height: '52px',
      padding: '0 20px',
      background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.4)',
      fontSize: '12px',
      color: 'var(--text-primary)',
      transition: 'background-color 0.2s ease, border-color 0.2s ease',
    }}>
      {/* Left Navigation: Previous Button -> Breadcrumbs -> Next Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* Previous Problem Button */}
        <motion.button
          whileHover={{ scale: prevProblem ? 1.04 : 1 }}
          whileTap={{ scale: prevProblem ? 0.96 : 1 }}
          type="button"
          onClick={handleNavigatePrev}
          disabled={!prevProblem}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: prevProblem
              ? isLight ? 'var(--surface-secondary, #F1F5F9)' : 'rgba(255, 255, 255, 0.05)'
              : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
            border: prevProblem
              ? isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)'
              : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
            color: prevProblem ? 'var(--text-primary)' : 'var(--text-muted)',
            fontSize: '11px',
            fontWeight: 800,
            cursor: prevProblem ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            opacity: prevProblem ? 1 : 0.4,
          }}
        >
          <ArrowLeft size={14} /> Previous
        </motion.button>

        {/* Current Path Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <Link href="/practice" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800 }}>
            Practice
          </Link>
          <ChevronRight size={12} />

          <Link href={`/knowledge/${problem.categorySlug}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            {kingdomTitle}
          </Link>
          <ChevronRight size={12} />

          <span style={{ color: 'var(--text-muted)' }}>{patternTitle}</span>
          <ChevronRight size={12} />

          <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{problem.title}</span>
        </div>

        {/* Next Problem Button */}
        <motion.button
          whileHover={{ scale: nextProblem ? 1.04 : 1 }}
          whileTap={{ scale: nextProblem ? 0.96 : 1 }}
          type="button"
          onClick={handleNavigateNext}
          disabled={!nextProblem}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: nextProblem
              ? isLight ? 'var(--surface-secondary, #F1F5F9)' : 'rgba(255, 255, 255, 0.05)'
              : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
            border: nextProblem
              ? isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)'
              : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
            color: nextProblem ? 'var(--text-primary)' : 'var(--text-muted)',
            fontSize: '11px',
            fontWeight: 800,
            cursor: nextProblem ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            opacity: nextProblem ? 1 : 0.4,
          }}
        >
          Next <ArrowRight size={14} />
        </motion.button>

      </div>

      {/* Right Header Badges Strip & Quick Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        
        {/* Difficulty Badge */}
        <span style={{
          fontSize: '11px',
          fontWeight: 800,
          color: diffColor,
          background: `${diffColor}15`,
          padding: '3px 8px',
          borderRadius: '6px',
          border: `1px solid ${diffColor}40`,
        }}>
          {problem.difficulty}
        </span>

        {/* Kingdom Badge */}
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--primary)',
          background: isLight ? 'rgba(56, 189, 248, 0.1)' : 'rgba(56, 189, 248, 0.15)',
          padding: '3px 8px',
          borderRadius: '6px',
          border: '1px solid var(--border)',
        }}>
          🏰 {kingdomTitle}
        </span>

        {/* XP Reward */}
        <span style={{
          fontSize: '11px',
          fontWeight: 800,
          color: '#F59E0B',
          background: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.15)',
          padding: '3px 8px',
          borderRadius: '6px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
        }}>
          <Sparkles size={11} /> +{problem.xp || 50} XP
        </span>

        {/* Estimated Time */}
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
          <Clock size={11} /> {problem.estimatedTimeMin || 15}m
        </span>

        {/* Platform External Link Button */}
        {(() => {
          const platformMeta = getPlatformMeta(problem);
          return (
            <a
              href={platformMeta.canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open original problem on ${platformMeta.name}`}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: isLight ? `${platformMeta.color}15` : `${platformMeta.color}22`,
                border: `1px solid ${platformMeta.color}50`,
                color: platformMeta.color,
                fontSize: '11px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{platformMeta.name}</span>
              <ExternalLink size={11} />
            </a>
          );
        })()}

        {/* Bookmark Action */}
        <button
          type="button"
          onClick={onToggleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
          style={{
            background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.04)',
            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: isBookmarked ? 'var(--primary)' : 'var(--text-muted)',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {/* Like Action */}
        <button
          type="button"
          onClick={onToggleLike}
          aria-label={isLiked ? 'Remove favorite' : 'Add to favorites'}
          style={{
            background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.04)',
            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: isLiked ? '#EF4444' : 'var(--text-muted)',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

      </div>
    </header>
  );
}
