'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Bookmark, 
  Heart, 
  Share2, 
  Sparkles, 
  Layers, 
  Copy, 
  Check, 
  MessageSquare, 
  TrendingUp, 
  Building2, 
  Tag, 
  ArrowLeft, 
  ArrowRight, 
  Activity, 
  Zap,
  Play
} from 'lucide-react';
import { ProblemModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { useToast } from '@/src/context/ToastContext';

interface ProblemDescriptionPanelProps {
  problem: ProblemModel;
}

export function ProblemDescriptionPanel({ problem }: ProblemDescriptionPanelProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copiedExampleIndex, setCopiedExampleIndex] = useState<number | null>(null);
  const [activeHintIndex, setActiveHintIndex] = useState<number | null>(null);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState<boolean>(false);

  // Fetch Kingdom & Pattern Context
  const category = CurriculumRepository.getCategoryBySlug(problem.categorySlug);
  const pattern = CurriculumRepository.getPatternBySlug(problem.patternSlug);

  const kingdomTitle = category ? category.kingdomTitle : 'Kingdom of Beginnings';
  const patternTitle = pattern ? pattern.title : 'Array Fundamentals';

  // Dynamic Previous and Next Problem Navigation
  const allProblems = CurriculumRepository.getAllProblems();
  const currentIndex = allProblems.findIndex((p) => p.id === problem.id || p.slug === problem.slug);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  // Examples Dataset
  const exampleList = [
    {
      num: 1,
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      num: 2,
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
    },
    {
      num: 3,
      input: 'nums = [3,3], target = 6',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].',
    },
  ];

  // Constraints List
  const constraintsList = [
    '2 <= nums.length <= 10⁴',
    '-10⁹ <= nums[i] <= 10⁹',
    '-10⁹ <= target <= 10⁹',
    'Only one valid answer exists.',
  ];

  // Hints List
  const hintsList = [
    'A really brute force way would be to search for all possible pairs of numbers but that would be O(N²). Can we do better in O(N)?',
    'Can we use a Hash Table to look up the complement (target - nums[i]) in O(1) time?',
    'Iterate through the array once. For each element, check if target - nums[i] exists in the map. If yes, return indices.',
  ];

  // Companies List fallback
  const companiesList = problem.companies?.length > 0 ? problem.companies : ['Google', 'Amazon', 'Microsoft', 'Meta', 'Adobe', 'Uber'];

  // Topics List fallback
  const topicsList = problem.topics?.length > 0 ? problem.topics : ['Array', 'Hash Table', 'Two Pointers'];

  // Discussion Topics Mock
  const discussionsList = [
    { title: 'O(N) One-pass Hash Map Solution with clean TypeScript / Python', author: 'AlexDeveloper', votes: 142 },
    { title: 'Why brute force fails on 10^4 elements — Detailed Complexity Analysis', author: 'DataArchitect', votes: 89 },
    { title: 'Edge cases to watch out for in Java & C++ integer overflows', author: 'AlgoMaster', votes: 64 },
  ];

  const handleCopyExample = (idx: number, text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedExampleIndex(idx);
      toast('Copied to clipboard!', 'info');
      setTimeout(() => setCopiedExampleIndex(null), 2000);
    }
  };

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#CBD5E1',
      fontFamily: 'var(--font-sans, sans-serif)',
      background: 'linear-gradient(180deg, rgba(13, 10, 25, 0.98) 0%, rgba(9, 9, 11, 0.98) 100%)',
    }}>
      
      {/* SECTION 1: PROBLEM HEADER BADGES & CONTROLS */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Difficulty Badge */}
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: problem.difficulty === 'Easy' ? '#10B981' : problem.difficulty === 'Medium' ? '#F59E0B' : '#EF4444',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${problem.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.3)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}>
            {problem.difficulty}
          </span>

          {/* Kingdom Badge */}
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#C084FC', background: 'rgba(168, 85, 247, 0.15)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            🏰 {kingdomTitle}
          </span>

          {/* Pattern Badge */}
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            📘 {patternTitle}
          </span>

          {/* XP Reward */}
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} /> +{problem.xp || 50} XP
          </span>

          {/* Acceptance Rate */}
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} style={{ color: '#10B981' }} /> {problem.acceptanceRate ? `${(problem.acceptanceRate * 100).toFixed(1)}%` : '54.8%'} Acceptance
          </span>

          {/* Estimated Time */}
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> {problem.estimatedTimeMin || 15} min
          </span>
        </div>

        {/* Action Controls: Bookmark, Favorite, Share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: isBookmarked ? '#C084FC' : '#94A3B8', padding: '6px', cursor: 'pointer' }}
          >
            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: isLiked ? '#EF4444' : '#94A3B8', padding: '6px', cursor: 'pointer' }}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>

          <button
            type="button"
            onClick={() => toast('Problem link copied to clipboard!', 'info')}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94A3B8', padding: '6px', cursor: 'pointer' }}
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* SECTION 2: PROBLEM TITLE & SUBTITLE */}
      <div>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          #{problem.leetcodeNumber} {problem.title}
        </h1>
        <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#C084FC', fontWeight: 600 }}>
          Find two indices in an array that sum up to a specific target value.
        </p>
      </div>

      {/* SECTION 3: COMPLETE PROBLEM STATEMENT */}
      <div style={{ fontSize: '14px', lineHeight: '1.75', color: '#E2E8F0' }}>
        Given an array of integers <code style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>nums</code> and an integer <code style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>target</code>, return <em>indices of the two numbers</em> such that they add up to <code style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>target</code>.
        <br /><br />
        You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice. You can return the answer in any order.
      </div>

      {/* SECTION 4 & 5: INPUT & OUTPUT FORMAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#C084FC', display: 'block', marginBottom: '6px' }}>Input Format</span>
          <span style={{ fontSize: '12px', color: '#FFFFFF' }}>Integer array <code style={{ color: '#C084FC', fontFamily: 'monospace' }}>nums</code>, integer <code style={{ color: '#C084FC', fontFamily: 'monospace' }}>target</code></span>
        </div>

        <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', display: 'block', marginBottom: '6px' }}>Output Format</span>
          <span style={{ fontSize: '12px', color: '#FFFFFF' }}>Integer array of length 2 <code style={{ color: '#10B981', fontFamily: 'monospace' }}>[i, j]</code></span>
        </div>
      </div>

      {/* SECTION 6: CONSTRAINTS */}
      <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(20, 16, 38, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>Constraints</span>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {constraintsList.map((c, i) => (
            <li key={i}>
              <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: '#E2E8F0', fontFamily: 'monospace' }}>{c}</code>
            </li>
          ))}
        </ul>
      </div>

      {/* SECTION 7: EXAMPLES (UNLIMITED PREMIUM CARDS WITH COPY BUTTONS) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Examples</span>

        {exampleList.map((ex, idx) => (
          <div key={ex.num} style={{ padding: '18px', borderRadius: '16px', background: 'rgba(20, 16, 38, 0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#C084FC' }}>Example {ex.num}:</span>
              <button
                type="button"
                onClick={() => handleCopyExample(idx, `Input: ${ex.input}\nOutput: ${ex.output}`)}
                style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94A3B8', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copiedExampleIndex === idx ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
                {copiedExampleIndex === idx ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#E2E8F0', background: 'rgba(13, 10, 25, 0.8)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong style={{ color: '#94A3B8' }}>Input: </strong> {ex.input}
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#10B981', background: 'rgba(13, 10, 25, 0.8)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong style={{ color: '#94A3B8' }}>Output: </strong> {ex.output}
            </div>

            {ex.explanation && (
              <div style={{ fontSize: '12px', color: '#94A3B8', fontStyle: 'italic', marginTop: '2px' }}>
                <strong>Explanation: </strong> {ex.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SECTION 8: VISUAL WALKTHROUGH (UNIQUE TO DSA MASTER ROADMAP) */}
      <div style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(20, 16, 38, 0.9), rgba(35, 20, 60, 0.9))', border: '1px solid rgba(168, 85, 247, 0.4)', boxShadow: '0 12px 36px rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
        <div style={{ padding: '10px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.25)', color: '#C084FC' }}>
          <Zap size={22} />
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#FFF' }}>Interactive Visual Algorithm Walkthrough</h4>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Animated Hash Table Lookup & Index Matching Trace</span>
        </div>
        <button
          type="button"
          onClick={() => toast('Launching Visual Execution Trace...', 'info')}
          style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #C084FC', color: '#FFF', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Play size={12} fill="#FFF" /> Play Visual Trace
        </button>
      </div>

      {/* SECTION 9: HINTS (COLLAPSIBLE ACCORDIONS) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <HelpCircle size={15} style={{ color: '#C084FC' }} /> Hints ({hintsList.length})
        </span>

        {hintsList.map((h, i) => {
          const isOpen = activeHintIndex === i;
          return (
            <div key={i} style={{ borderRadius: '12px', background: 'rgba(20, 16, 38, 0.7)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setActiveHintIndex(isOpen ? null : i)}
                style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>Hint {i + 1}</span>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ padding: '0 16px 14px 16px', fontSize: '12px', color: '#CBD5E1', lineHeight: '1.6' }}
                  >
                    {h}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* SECTION 10: FOLLOW UP */}
      <div style={{ borderRadius: '14px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.25)', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => setIsFollowUpOpen(!isFollowUpOpen)}
          style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', color: '#C084FC', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <span>💡 Follow Up Challenge</span>
          {isFollowUpOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        <AnimatePresence>
          {isFollowUpOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ padding: '0 16px 14px 16px', fontSize: '12px', color: '#F3E8FF', lineHeight: '1.6' }}
            >
              Can you implement an algorithm that operates in <strong>O(N) time complexity</strong> and <strong>O(1) auxiliary space complexity</strong> if the array is already sorted?
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 11: RELATED CONCEPTS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Tag size={14} style={{ color: '#38BDF8' }} /> Related Concepts
        </span>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {topicsList.map((t) => (
            <Link key={t} href="/knowledge" style={{ textDecoration: 'none' }}>
              <span style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                {t}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION 12: COMPANIES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Building2 size={14} style={{ color: '#F59E0B' }} /> Target Companies
        </span>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {companiesList.map((c) => (
            <span key={c} style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#FDE68A', fontSize: '11px', fontWeight: 700 }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 13: SUBMISSION STATISTICS */}
      <div style={{ padding: '20px', borderRadius: '18px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={16} style={{ color: '#10B981' }} />
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Submission Statistics</h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block' }}>Acceptance Rate</span>
            <strong style={{ fontSize: '15px', color: '#10B981' }}>54.8%</strong>
          </div>

          <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block' }}>Avg Runtime</span>
            <strong style={{ fontSize: '15px', color: '#C084FC' }}>4ms</strong>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>
            <span>Global Submissions Passed</span>
            <span style={{ color: '#10B981', fontWeight: 800 }}>54.8%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '54.8%', height: '100%', background: 'linear-gradient(to right, #10B981, #34D399)', borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* SECTION 14: DISCUSSION PREVIEW */}
      <div style={{ padding: '20px', borderRadius: '18px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={16} style={{ color: '#C084FC' }} />
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Community Discussions</h4>
          </div>
          <span style={{ fontSize: '11px', color: '#C084FC', fontWeight: 700, cursor: 'pointer' }}>View All →</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {discussionsList.map((d, i) => (
            <div key={i} style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFF', display: 'block' }}>{d.title}</span>
                <span style={{ fontSize: '10px', color: '#94A3B8' }}>by {d.author}</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                ▲ {d.votes}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 15: BOTTOM NAVIGATION (GLOWING ARROWS) */}
      <div style={{
        paddingTop: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
      }}>
        <button
          type="button"
          onClick={() => prevProblem && router.push(`/practice/${prevProblem.slug}`)}
          disabled={!prevProblem}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            background: prevProblem ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
            border: prevProblem ? '1px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.06)',
            color: prevProblem ? '#FFFFFF' : '#475569',
            fontSize: '12px',
            fontWeight: 800,
            cursor: prevProblem ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            opacity: prevProblem ? 1 : 0.4,
          }}
        >
          <ArrowLeft size={14} /> Previous Problem
        </button>

        <button
          type="button"
          onClick={() => nextProblem && router.push(`/practice/${nextProblem.slug}`)}
          disabled={!nextProblem}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            background: nextProblem ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
            border: nextProblem ? '1px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.06)',
            color: nextProblem ? '#FFFFFF' : '#475569',
            fontSize: '12px',
            fontWeight: 800,
            cursor: nextProblem ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            opacity: nextProblem ? 1 : 0.4,
          }}
        >
          Next Problem <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
