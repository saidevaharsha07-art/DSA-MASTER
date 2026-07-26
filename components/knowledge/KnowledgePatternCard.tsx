'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Bookmark, 
  Clock, 
  Layers, 
  Lightbulb, 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  Cpu, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { PatternModel, ProblemModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';

interface KnowledgePatternCardProps {
  pattern: PatternModel;
  isBookmarked: boolean;
  onToggleBookmark: (patternId: string) => void;
}

export function KnowledgePatternCard({ pattern, isBookmarked, onToggleBookmark }: KnowledgePatternCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Fetch problems belonging to this pattern from CurriculumRepository
  const patternProblems = CurriculumRepository.getProblemsByPattern(pattern.slug);
  const totalProblems = patternProblems.length || pattern.problemIds?.length || 12;

  return (
    <motion.div
      layout
      whileHover={{ y: isExpanded ? 0 : -3, borderColor: 'rgba(168, 85, 247, 0.4)' }}
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: '20px',
        background: 'rgba(20, 16, 38, 0.7)',
        backdropFilter: 'blur(16px)',
        border: isExpanded ? '1px solid #C084FC' : '1px solid rgba(168, 85, 247, 0.25)',
        boxShadow: isExpanded ? '0 16px 48px rgba(168, 85, 247, 0.25)' : '0 8px 24px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Pattern Card Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: isExpanded ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
          borderBottom: isExpanded ? '1px solid rgba(168, 85, 247, 0.25)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 auto' }}>
          <div style={{ padding: '10px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <BookOpen size={20} style={{ color: '#C084FC' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>{pattern.title}</h3>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#C084FC', background: 'rgba(168, 85, 247, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                {pattern.kingdomTitle}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8', maxWidth: '550px' }}>
              {pattern.shortDescription || pattern.overview?.slice(0, 100) + '...'}
            </p>
          </div>
        </div>

        {/* Stats & Controls Strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '11px' }}>
            <span style={{ fontWeight: 700, color: '#CBD5E1' }}>{totalProblems} Problems</span>
            <span style={{ fontSize: '10px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={10} /> 12 min read
            </span>
          </div>

          <span style={{ fontSize: '10px', fontWeight: 700, color: pattern.difficulty === 'Easy' ? '#10B981' : pattern.difficulty === 'Medium' ? '#F59E0B' : '#EF4444', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px' }}>
            {pattern.difficulty}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(pattern.id);
            }}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isBookmarked ? '#C084FC' : '#94A3B8', padding: '4px' }}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          <button
            type="button"
            style={{ padding: '6px 12px', borderRadius: '8px', background: isExpanded ? '#A855F7' : 'rgba(255,255,255,0.06)', border: 'none', color: '#FFF', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            {isExpanded ? 'Collapse' : 'Open Codex'} {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded Pattern Codex Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            
            {/* 1. OVERVIEW */}
            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} /> Overview
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: '1.7' }}>
                {pattern.overview || pattern.shortDescription}
              </p>
            </div>

            {/* 2. CORE IDEA & INTUITION */}
            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lightbulb size={16} /> Core Intuition & Mental Model
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: '1.7' }}>
                {pattern.intuition || pattern.mentalModel || "Visualize state updates as continuous bounds moving over input structures. Maintain invariants at every boundary step."}
              </p>
            </div>

            {/* 3. WHEN TO USE */}
            {pattern.whenToUse && (
              <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} /> When to Use in Interviews
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: '1.7' }}>
                  {pattern.whenToUse}
                </p>
              </div>
            )}

            {/* 4. COMMON MISTAKES */}
            {pattern.commonMistakes && pattern.commonMistakes.length > 0 && (
              <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} /> Common Pitfalls & Bugs
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#FCA5A5', lineHeight: '1.6' }}>
                  {pattern.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. TIME & SPACE COMPLEXITY TABLE */}
            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={16} /> Complexity Analysis
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8' }}>
                    <th style={{ padding: '8px 12px' }}>Operation / Approach</th>
                    <th style={{ padding: '8px 12px' }}>Time Complexity</th>
                    <th style={{ padding: '8px 12px' }}>Space Complexity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: '#FFF' }}>Brute Force</td>
                    <td style={{ padding: '8px 12px', color: '#EF4444' }}>O(N²)</td>
                    <td style={{ padding: '8px 12px', color: '#10B981' }}>O(1)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: '#FFF' }}>Optimal ({pattern.title})</td>
                    <td style={{ padding: '8px 12px', color: '#10B981' }}>O(N)</td>
                    <td style={{ padding: '8px 12px', color: '#F59E0B' }}>O(1) to O(N)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 6. VISUAL DIAGRAM CONTAINER */}
            <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(13, 10, 25, 0.8)', border: '1px stroke rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
              <div style={{ padding: '10px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC' }}>
                <Layers size={24} />
              </div>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFF', display: 'block' }}>Visual Algorithm Execution Diagram</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Interactive visual state machine step-by-step trace</span>
              </div>
            </div>

            {/* 7. RELATED CURRICULUM PROBLEMS */}
            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={16} style={{ color: '#10B981' }} /> Official Curriculum Problems ({patternProblems.length})
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {patternProblems.slice(0, 8).map((prob) => (
                  <div key={prob.id} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFF', display: 'block' }}>{prob.title}</span>
                      <span style={{ fontSize: '10px', color: '#94A3B8' }}>#{prob.leetcodeNumber} • {prob.difficulty}</span>
                    </div>
                    <Link href={`/practice/${prob.slug}`} style={{ textDecoration: 'none' }}>
                      <button type="button" style={{ padding: '5px 10px', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#C084FC', fontSize: '10px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Solve <Play size={10} />
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
