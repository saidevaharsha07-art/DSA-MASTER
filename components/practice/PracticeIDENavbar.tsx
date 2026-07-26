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
  Shield
} from 'lucide-react';
import { ProblemModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';

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

  // Fetch Category and Pattern metadata
  const category = CurriculumRepository.getCategoryBySlug(problem.categorySlug);
  const pattern = CurriculumRepository.getPatternBySlug(problem.patternSlug);

  const kingdomTitle = category ? category.kingdomTitle : 'Kingdom of Beginnings';
  const patternTitle = pattern ? pattern.title : 'Array Fundamentals';

  // Dynamic Previous and Next problem calculation across CurriculumRepository
  const allProblems = CurriculumRepository.getAllProblems();
  const currentIndex = allProblems.findIndex((p) => p.id === problem.id || p.slug === problem.slug);

  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  const handleNavigatePrev = () => {
    if (prevProblem) {
      router.push(`/practice/${prevProblem.slug}`);
    }
  };

  const handleNavigateNext = () => {
    if (nextProblem) {
      router.push(`/practice/${nextProblem.slug}`);
    }
  };

  return (
    <header style={{
      height: '52px',
      padding: '0 20px',
      background: 'rgba(13, 10, 25, 0.98)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      fontSize: '12px',
    }}>
      {/* Left Navigation: Glowing Previous Button -> Breadcrumbs -> Glowing Next Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* Previous Problem Button */}
        <motion.button
          whileHover={{ scale: prevProblem ? 1.05 : 1 }}
          whileTap={{ scale: prevProblem ? 0.95 : 1 }}
          type="button"
          onClick={handleNavigatePrev}
          disabled={!prevProblem}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: prevProblem ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
            border: prevProblem ? '1px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.06)',
            color: prevProblem ? '#FFFFFF' : '#475569',
            fontSize: '11px',
            fontWeight: 800,
            cursor: prevProblem ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: prevProblem ? '0 0 14px rgba(168, 85, 247, 0.3)' : 'none',
            opacity: prevProblem ? 1 : 0.4,
          }}
        >
          <ArrowLeft size={14} /> Previous
        </motion.button>

        {/* Current Path Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontWeight: 600 }}>
          <Link href="/practice" style={{ color: '#C084FC', textDecoration: 'none', fontWeight: 800 }}>
            Practice
          </Link>
          <ChevronRight size={12} />

          <Link href={`/knowledge/${problem.categorySlug}`} style={{ color: '#CBD5E1', textDecoration: 'none' }}>
            {kingdomTitle}
          </Link>
          <ChevronRight size={12} />

          <span style={{ color: '#CBD5E1' }}>{patternTitle}</span>
          <ChevronRight size={12} />

          <span style={{ color: '#FFFFFF', fontWeight: 800 }}>{problem.title}</span>
        </div>

        {/* Next Problem Button */}
        <motion.button
          whileHover={{ scale: nextProblem ? 1.05 : 1 }}
          whileTap={{ scale: nextProblem ? 0.95 : 1 }}
          type="button"
          onClick={handleNavigateNext}
          disabled={!nextProblem}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: nextProblem ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
            border: nextProblem ? '1px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.06)',
            color: nextProblem ? '#FFFFFF' : '#475569',
            fontSize: '11px',
            fontWeight: 800,
            cursor: nextProblem ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: nextProblem ? '0 0 14px rgba(168, 85, 247, 0.3)' : 'none',
            opacity: nextProblem ? 1 : 0.4,
          }}
        >
          Next <ArrowRight size={14} />
        </motion.button>

      </div>

      {/* Right Header Badges Strip & Quick Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        
        {/* Difficulty Badge */}
        <span style={{
          fontSize: '11px',
          fontWeight: 800,
          color: problem.difficulty === 'Easy' ? '#10B981' : problem.difficulty === 'Medium' ? '#F59E0B' : '#EF4444',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '3px 8px',
          borderRadius: '6px',
          border: `1px solid ${problem.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.3)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        }}>
          {problem.difficulty}
        </span>

        {/* Kingdom Badge */}
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#C084FC', background: 'rgba(168, 85, 247, 0.15)', padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          🏰 {kingdomTitle}
        </span>

        {/* Pattern Badge */}
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          📘 {patternTitle}
        </span>

        {/* XP Reward */}
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)', padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
          <Sparkles size={11} /> +{problem.xp || 35} XP
        </span>

        {/* Acceptance % */}
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
          <CheckCircle2 size={11} style={{ color: '#10B981' }} /> {problem.acceptanceRate ? `${(problem.acceptanceRate * 100).toFixed(1)}%` : '74.8%'}
        </span>

        {/* Estimated Time */}
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
          <Clock size={11} /> {problem.estimatedTimeMin || 15}m
        </span>

        {/* Bookmark Action */}
        <button
          type="button"
          onClick={onToggleBookmark}
          style={{ background: 'transparent', border: 'none', color: isBookmarked ? '#C084FC' : '#94A3B8', cursor: 'pointer', padding: '4px' }}
        >
          <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {/* Like Action */}
        <button
          type="button"
          onClick={onToggleLike}
          style={{ background: 'transparent', border: 'none', color: isLiked ? '#EF4444' : '#94A3B8', cursor: 'pointer', padding: '4px' }}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

      </div>
    </header>
  );
}
