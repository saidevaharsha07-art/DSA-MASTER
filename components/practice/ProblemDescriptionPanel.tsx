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
  Play,
  ExternalLink
} from 'lucide-react';
import { ProblemModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { getPlatformMeta } from '@/src/curriculum/services';
import { getProblemDetailInfo } from '@/src/problems/services/problem-detail.service';
import { useToast } from '@/src/context/ToastContext';
import { useSettings } from '@/src/context/SettingsContext';

import { useActiveUser } from '@/src/hooks/useActiveUser';
import { judgeEngine } from '@/src/engines/judge';
import { BookOpen, BarChart2 } from 'lucide-react';

interface ProblemDescriptionPanelProps {
  problem: ProblemModel;
}

export function ProblemDescriptionPanel({ problem }: ProblemDescriptionPanelProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { settings } = useSettings();
  const { userId } = useActiveUser();
  const isLight = settings?.appearance?.theme === 'light';

  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'submissions' | 'discussions'>('description');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copiedExampleIndex, setCopiedExampleIndex] = useState<number | null>(null);
  const [activeHintIndex, setActiveHintIndex] = useState<number | null>(null);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState<boolean>(false);

  // User Submissions
  const userSubmissions = judgeEngine.getSubmissionsForProblem(problem.id, userId);
  const acceptedCount = userSubmissions.filter((s) => s.verdict === 'Accepted').length;
  const userAccuracy = userSubmissions.length > 0 ? Math.round((acceptedCount / userSubmissions.length) * 100) : 0;

  // Category & Pattern Metadata
  const category = CurriculumRepository.getCategoryBySlug(problem.categorySlug);
  const pattern = CurriculumRepository.getPatternBySlug(problem.patternSlug);

  const kingdomTitle = category ? category.kingdomTitle : (problem.kingdomTitle || 'Kingdom of Beginnings');
  const patternTitle = pattern ? pattern.title : (problem.patternTitle || 'Array Fundamentals');

  // Dynamic Previous & Next Problem Calculation
  const allProblems = CurriculumRepository.getAllProblems();
  const currentIndex = allProblems.findIndex((p) => p.id === problem.id || p.slug === problem.slug);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  // Retrieve comprehensive dynamic problem detail information
  const detailInfo = getProblemDetailInfo(problem);
  const exampleList = detailInfo.examples;
  const hintsList = detailInfo.hints;
  const constraintsList = detailInfo.constraints;
  const statement = detailInfo.statement;
  const inputFormat = detailInfo.inputFormat;
  const outputFormat = detailInfo.outputFormat;

  // Companies List fallback
  const companiesList: string[] = (problem.companies && problem.companies.length > 0) ? problem.companies : ['Google', 'Amazon', 'Microsoft', 'Meta', 'Adobe', 'Uber'];

  // Topics List fallback
  const topicsList: string[] = (problem.topics && problem.topics.length > 0) ? problem.topics : ['Array', 'Hash Table', 'Two Pointers'];

  // Discussion Topics Mock
  const discussionsList = [
    { title: `Optimal Solution with clean TypeScript / Python for ${problem.title}`, author: 'AlgorithmMaster', votes: 42 },
    { title: 'Detailed Complexity Analysis (Time & Space Trade-offs)', author: 'DataArchitect', votes: 29 },
    { title: 'Edge cases and boundary constraints to watch out for', author: 'CodeExplorer', votes: 18 },
  ];

  const handleCopyExample = (idx: number, text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedExampleIndex(idx);
      toast('Copied to clipboard!', 'info');
      setTimeout(() => setCopiedExampleIndex(null), 2000);
    }
  };

  const diffColor =
    (problem.difficulty || '').toLowerCase() === 'easy'
      ? '#10B981'
      : (problem.difficulty || '').toLowerCase() === 'hard'
      ? '#EF4444'
      : '#F59E0B';

  const platformMeta = getPlatformMeta(problem);

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans, sans-serif)',
      background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      boxSizing: 'border-box',
    }}>
      
      {/* TOP NAVIGATION TABS: Description, Strategy, Submissions, Discussions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.15)',
        paddingBottom: '8px',
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: activeTab === 'description' ? (isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.2)') : 'transparent',
            border: activeTab === 'description' ? '1px solid var(--primary)' : '1px solid transparent',
            color: activeTab === 'description' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <BookOpen size={13} /> Description
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('editorial')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: activeTab === 'editorial' ? (isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.2)') : 'transparent',
            border: activeTab === 'editorial' ? '1px solid var(--primary)' : '1px solid transparent',
            color: activeTab === 'editorial' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Sparkles size={13} /> Strategy & Editorial
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('submissions')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: activeTab === 'submissions' ? (isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.2)') : 'transparent',
            border: activeTab === 'submissions' ? '1px solid var(--primary)' : '1px solid transparent',
            color: activeTab === 'submissions' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <BarChart2 size={13} /> Submissions ({userSubmissions.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('discussions')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: activeTab === 'discussions' ? (isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.2)') : 'transparent',
            border: activeTab === 'discussions' ? '1px solid var(--primary)' : '1px solid transparent',
            color: activeTab === 'discussions' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <MessageSquare size={13} /> Discussions ({discussionsList.length})
        </button>
      </div>

      {/* TAB 1: DESCRIPTION */}
      {activeTab === 'description' && (
        <>
          {/* SECTION 1: PROBLEM HEADER BADGES & CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {/* Difficulty Badge */}
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: diffColor,
                background: `${diffColor}15`,
                padding: '2px 8px',
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
                background: isLight ? 'rgba(56, 189, 248, 0.08)' : 'rgba(56, 189, 248, 0.15)',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
              }}>
                🏰 {kingdomTitle}
              </span>

              {/* Pattern Badge */}
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
              }}>
                📘 {patternTitle}
              </span>

              {/* XP Reward */}
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#F59E0B',
                background: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.15)',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <Sparkles size={12} /> +{problem.xp || 50} XP
              </span>

              {/* Estimated Time */}
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {problem.estimatedTimeMin || 15} min
              </span>
            </div>

            {/* Action Controls: Prev/Next Navigation + Bookmark, Favorite, Share */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {prevProblem && (
                <Link
                  href={`/practice/${prevProblem.slug}`}
                  title={`Previous: ${prevProblem.title}`}
                  style={{
                    background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: 'var(--text-secondary)',
                    padding: '5px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <ArrowLeft size={12} /> Prev
                </Link>
              )}

              {nextProblem && (
                <Link
                  href={`/practice/${nextProblem.slug}`}
                  title={`Next: ${nextProblem.title}`}
                  style={{
                    background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: 'var(--text-secondary)',
                    padding: '5px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  Next <ArrowRight size={12} />
                </Link>
              )}

              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
                style={{
                  background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: isBookmarked ? 'var(--primary)' : 'var(--text-muted)',
                  padding: '5px',
                  cursor: 'pointer',
                }}
              >
                <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                aria-label={isLiked ? 'Remove favorite' : 'Add to favorites'}
                style={{
                  background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: isLiked ? '#EF4444' : 'var(--text-muted)',
                  padding: '5px',
                  cursor: 'pointer',
                }}
              >
                <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              </button>

              <button
                type="button"
                onClick={() => toast('Problem link copied to clipboard!', 'info')}
                aria-label="Share problem"
                style={{
                  background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: 'var(--text-muted)',
                  padding: '5px',
                  cursor: 'pointer',
                }}
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* SECTION 2: PROBLEM TITLE & SOURCE BANNER */}
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              #{problem.leetcodeNumber || problem.id} {problem.title}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: platformMeta.color,
                  background: isLight ? `${platformMeta.color}12` : `${platformMeta.color}18`,
                  border: `1px solid ${platformMeta.color}40`,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Platform: {platformMeta.name}
              </span>

              <a
                href={platformMeta.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open original problem on ${platformMeta.name}`}
                style={{
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: isLight ? `${platformMeta.color}15` : `${platformMeta.color}22`,
                  border: `1.5px solid ${platformMeta.color}`,
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
                <span>Open on {platformMeta.name}</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* SECTION 3: COMPLETE PROBLEM STATEMENT */}
          <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
            {statement}
          </div>

          {/* SECTION 4 & 5: INPUT & OUTPUT FORMAT CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '3px' }}>Input Format</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{inputFormat}</span>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', display: 'block', marginBottom: '3px' }}>Output Format</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{outputFormat}</span>
            </div>
          </div>

          {/* SECTION 6: CONSTRAINTS */}
          <div style={{ padding: '14px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Constraints</span>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {constraintsList.map((c, i) => (
                <li key={i}>
                  <code style={{ background: isLight ? '#EEF2F6' : 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{c}</code>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 7: EXAMPLES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Examples</span>

            {exampleList.map((ex, idx) => (
              <div key={ex.num} style={{ padding: '14px', borderRadius: '10px', background: isLight ? '#FFFFFF' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)', boxShadow: isLight ? '0 1px 4px rgba(0,0,0,0.03)' : 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)' }}>Example {ex.num}:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyExample(idx, `Input: ${ex.input}\nOutput: ${ex.output}`)}
                    style={{ padding: '2px 6px', borderRadius: '4px', background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                  >
                    {copiedExampleIndex === idx ? <Check size={11} style={{ color: '#10B981' }} /> : <Copy size={11} />}
                    {copiedExampleIndex === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-primary)', background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.7)', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-muted)' }}>Input: </strong> {ex.input}
                </div>

                <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#10B981', background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.7)', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-muted)' }}>Output: </strong> {ex.output}
                </div>

                {ex.explanation && (
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                    <strong>Explanation: </strong> {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SECTION 8: HINTS (COLLAPSIBLE ACCORDIONS) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={14} style={{ color: 'var(--primary)' }} /> Hints ({hintsList.length})
            </span>

            {hintsList.map((h, i) => {
              const isOpen = activeHintIndex === i;
              return (
                <div key={i} style={{ borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setActiveHintIndex(isOpen ? null : i)}
                    style={{ width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
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
                        style={{ padding: '0 14px 12px 14px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}
                      >
                        {h}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* SECTION 9: RELATED CONCEPTS & COMPANIES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={13} style={{ color: 'var(--primary)' }} /> Related Topics
            </span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {topicsList.map((t) => (
                <Link key={t} href="/practice" style={{ textDecoration: 'none' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '6px', background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                    {t}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* TAB 2: EDITORIAL & STRATEGY */}
      {activeTab === 'editorial' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> Algorithmic Pattern Strategy
            </h3>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              This problem exemplifies the <strong>{patternTitle}</strong> pattern in the <strong>{kingdomTitle}</strong> curriculum. 
              Always consider time and space complexity trade-offs before choosing brute-force versus optimized two-pointer/hash map solutions.
            </p>
          </div>

          {/* Complexity Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '14px', borderRadius: '10px', background: isLight ? '#FFFFFF' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Time Complexity</span>
              <p style={{ margin: '6px 0 0 0', fontSize: '13px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                O(N) - Linear Scan
              </p>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                Single pass traversal through elements.
              </span>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: isLight ? '#FFFFFF' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#3B82F6', textTransform: 'uppercase' }}>Space Complexity</span>
              <p style={{ margin: '6px 0 0 0', fontSize: '13px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                O(1) - Constant Auxiliary Space
              </p>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                In-place array modification without allocating extra buffers.
              </span>
            </div>
          </div>

          {/* Key Insights */}
          <div style={{ padding: '14px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Key Invariant</span>
            <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Maintain two pointers: a fast pointer scanning through all elements and a slow pointer recording the valid prefix.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: USER SUBMISSIONS TELEMETRY */}
      {activeTab === 'submissions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Stats Header Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Submissions</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>
                {userSubmissions.length}
              </strong>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.1)', border: isLight ? '1px solid #BBF7D0' : '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>Accepted</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: 900, color: '#10B981', marginTop: '2px' }}>
                {acceptedCount}
              </strong>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.1)', border: isLight ? '1px solid #BFDBFE' : '1px solid rgba(59, 130, 246, 0.3)', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase' }}>Accuracy</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: 900, color: '#3B82F6', marginTop: '2px' }}>
                {userAccuracy}%
              </strong>
            </div>
          </div>

          {/* Submissions List */}
          {userSubmissions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.4)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <BarChart2 size={28} style={{ opacity: 0.4, margin: '0 auto 8px auto' }} />
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>No submissions yet</p>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Submit your solution in the right editor panel to track your verdicts.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {userSubmissions.map((s) => {
                const isPass = s.verdict === 'Accepted';
                return (
                  <div
                    key={s.id}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: isPass ? (isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.08)') : (isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.08)'),
                      border: isPass ? (isLight ? '1px solid #BBF7D0' : '1px solid rgba(16, 185, 129, 0.25)') : (isLight ? '1px solid #FECACA' : '1px solid rgba(239, 68, 68, 0.25)'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: isPass ? '#10B981' : '#EF4444', fontSize: '12px' }}>
                        {s.verdict}
                      </strong>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span style={{ textTransform: 'capitalize', fontWeight: 700, color: 'var(--text-secondary)' }}>{s.language}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                      <span>{s.runtimeMs}ms</span>
                      <span>{s.memoryMb}MB</span>
                      <span>+{s.xpEarned} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DISCUSSIONS & COMMUNITY SOLUTIONS */}
      {activeTab === 'discussions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>Community Solutions & Threads</span>
            <button
              type="button"
              onClick={() => toast('New discussion thread creation opened', 'info')}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                background: 'var(--primary)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              + New Post
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {discussionsList.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{d.title}</strong>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', background: isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                    ▲ {d.votes}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Posted by <strong style={{ color: 'var(--primary)' }}>{d.author}</strong> • 2 days ago
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 10: BOTTOM NAVIGATION */}
      <div style={{
        paddingTop: '16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
      }}>
        <button
          type="button"
          onClick={() => prevProblem && router.push(`/practice/${prevProblem.slug || prevProblem.id}`)}
          disabled={!prevProblem}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: prevProblem
              ? isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'
              : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
            border: prevProblem
              ? isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)'
              : '1px solid var(--border)',
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
          <ArrowLeft size={14} /> Previous Problem
        </button>

        <button
          type="button"
          onClick={() => nextProblem && router.push(`/practice/${nextProblem.slug || nextProblem.id}`)}
          disabled={!nextProblem}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: nextProblem
              ? isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'
              : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
            border: nextProblem
              ? isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)'
              : '1px solid var(--border)',
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
          Next Problem <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
