'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Layers, Search, Play, CheckCircle2, Clock } from 'lucide-react';
import { ProblemModel, RevisionData } from '@/src/curriculum/types';

interface RevisionQueueTableProps {
  problems: (ProblemModel & { revisionData: RevisionData })[];
  onReviewCompleted?: (problemId: string, rating: 'easy' | 'medium' | 'hard') => void;
  selectedDateFilter?: string | null;
}

export function RevisionQueueTable({ problems, onReviewCompleted, selectedDateFilter }: RevisionQueueTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeModalProblem, setActiveModalProblem] = useState<(ProblemModel & { revisionData: RevisionData }) | null>(null);

  const filteredProblems = problems.filter((p) => {
    if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.leetcodeNumber.toString().includes(q) || p.patternTitle.toLowerCase().includes(q) || p.kingdomTitle.toLowerCase().includes(q);
    }
    return true;
  });

  const formatDate = (isoStr: string) => {
    if (!isoStr) return 'Never';
    const date = new Date(isoStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDueLabel = (nextReviewIso: string) => {
    if (!nextReviewIso) return { label: 'Unscheduled', color: '#94A3B8' };
    const now = new Date().getTime();
    const nextTime = new Date(nextReviewIso).getTime();
    const diffHours = Math.round((nextTime - now) / 3600000);

    if (diffHours < -24) return { label: `${Math.abs(Math.round(diffHours / 24))}d Overdue`, color: '#EF4444' };
    if (diffHours < 0) return { label: 'Overdue Today', color: '#EF4444' };
    if (diffHours < 12) return { label: 'Due Today', color: '#F59E0B' };
    if (diffHours < 24) return { label: 'Due Tomorrow', color: '#C084FC' };
    return { label: `In ${Math.ceil(diffHours / 24)}d`, color: '#94A3B8' };
  };

  return (
    <div style={{ padding: '24px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' }}>
      
      {/* Table Header Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <Layers size={18} style={{ color: '#C084FC' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
              Scheduled Revision Queue <span style={{ fontSize: '12px', color: '#C084FC', background: 'rgba(168, 85, 247, 0.15)', padding: '2px 8px', borderRadius: '99px', marginLeft: '6px' }}>{filteredProblems.length} Items</span>
            </h2>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>{selectedDateFilter ? `Filtered for ${selectedDateFilter}` : 'Sorted by Overdue & Due Priority'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search queue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 12px 6px 30px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px', outline: 'none', width: '160px' }}
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px', outline: 'none' }}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Queue Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em' }}>
              <th style={{ padding: '10px 12px' }}>Problem</th>
              <th style={{ padding: '10px 12px' }}>Kingdom</th>
              <th style={{ padding: '10px 12px' }}>Pattern</th>
              <th style={{ padding: '10px 12px', width: '80px' }}>Difficulty</th>
              <th style={{ padding: '10px 12px', width: '120px' }}>Memory %</th>
              <th style={{ padding: '10px 12px', width: '90px' }}>Last Review</th>
              <th style={{ padding: '10px 12px', width: '90px' }}>Next Review</th>
              <th style={{ padding: '10px 12px', width: '90px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>
                  No scheduled revisions match the selected filters.
                </td>
              </tr>
            ) : (
              filteredProblems.map((prob) => {
                const mastery = prob.revisionData.mastery;
                const dueStatus = getDueLabel(prob.revisionData.nextReview);

                // AAA Color for mastery bar: Gold (>=90), Purple (>=75), Green (>=60), Amber (<60)
                const barColor = mastery >= 90 ? '#F59E0B' : mastery >= 75 ? '#A855F7' : mastery >= 60 ? '#10B981' : '#EAB308';

                return (
                  <motion.tr
                    key={prob.id}
                    whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.08)', y: -2 }}
                    transition={{ duration: 0.15 }}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <td style={{ padding: '12px' }}>
                      <Link href={`/practice/${prob.slug}`} style={{ textDecoration: 'none' }}>
                        <span style={{ fontWeight: 700, color: '#FFFFFF', display: 'block' }}>{prob.title}</span>
                        <span style={{ fontSize: '10px', color: '#94A3B8' }}>#{prob.leetcodeNumber}</span>
                      </Link>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#C084FC', background: 'rgba(168, 85, 247, 0.12)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                        {prob.kingdomTitle}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#CBD5E1', fontWeight: 500 }}>{prob.patternTitle}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: prob.difficulty === 'Easy' ? '#10B981' : prob.difficulty === 'Medium' ? '#F59E0B' : '#EF4444', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                        {prob.difficulty}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: barColor }}>{mastery}% Strength</span>
                        <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '2.5px', overflow: 'hidden' }}>
                          <div style={{ width: `${mastery}%`, height: '100%', background: barColor, borderRadius: '2.5px' }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', color: '#94A3B8', fontSize: '11px' }}>
                      {formatDate(prob.revisionData.lastReviewed)}
                    </td>
                    <td style={{ padding: '12px', color: dueStatus.color, fontWeight: 700, fontSize: '11px' }}>
                      {dueStatus.label}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setActiveModalProblem(prob)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #A855F7, #7E22CE)',
                          border: 'none',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 8px rgba(168, 85, 247, 0.4)',
                        }}
                      >
                        Review <Play size={10} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Review Interactive Rating Modal */}
      {activeModalProblem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ width: '420px', padding: '28px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(20, 16, 38, 0.98), rgba(30, 20, 55, 0.98))', border: '1px solid rgba(168, 85, 247, 0.4)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)' }}
          >
            <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 900, color: '#FFF' }}>Review Memory Recall</h3>
            <span style={{ fontSize: '13px', color: '#C084FC', fontWeight: 700 }}>{activeModalProblem.title} (#{activeModalProblem.leetcodeNumber})</span>
            
            <p style={{ margin: '16px 0 24px 0', fontSize: '13px', color: '#CBD5E1', lineHeight: '1.5' }}>
              How easily did you recall the pattern and solution for this problem?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  onReviewCompleted?.(activeModalProblem.id, 'easy');
                  setActiveModalProblem(null);
                }}
                style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10B981', fontSize: '13px', fontWeight: 800, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>⚡ Easy (Perfect Recall)</span>
                <span>+20 XP • +14d Interval</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onReviewCompleted?.(activeModalProblem.id, 'medium');
                  setActiveModalProblem(null);
                }}
                style={{ padding: '12px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#F59E0B', fontSize: '13px', fontWeight: 800, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>🤔 Medium (Some Hesitation)</span>
                <span>+35 XP • +7d Interval</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onReviewCompleted?.(activeModalProblem.id, 'hard');
                  setActiveModalProblem(null);
                }}
                style={{ padding: '12px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#EF4444', fontSize: '13px', fontWeight: 800, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>🔴 Hard (Forgot Pattern)</span>
                <span>+60 XP • Reset to 1d</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActiveModalProblem(null)}
              style={{ width: '100%', marginTop: '16px', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '12px', borderRadius: '10px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
