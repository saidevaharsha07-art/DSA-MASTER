'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Play, Layers, Lightbulb, AlertTriangle, Cpu } from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';

interface Level3CodexPageProps {
  params: Promise<{ kingdomSlug: string; patternSlug: string }>;
}

export default function Level3CodexPage({ params }: Level3CodexPageProps) {
  const resolvedParams = use(params);
  const category = CurriculumRepository.getCategoryBySlug(resolvedParams.kingdomSlug);
  const pattern = CurriculumRepository.getPatternBySlug(resolvedParams.patternSlug);

  if (!category || !pattern) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#FFF' }}>
        <h2>Codex Document Not Found</h2>
        <Link href="/knowledge" style={{ color: '#C084FC', fontWeight: 800 }}>← Return to Knowledge Codex</Link>
      </div>
    );
  }

  const patternProblems = CurriculumRepository.getProblemsByPattern(pattern.slug);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ width: '100%', minHeight: '100vh', background: '#09090B', display: 'flex', flexDirection: 'column', gap: '28px', padding: '0 24px 40px 24px', fontFamily: 'var(--font-sans, sans-serif)' }}
    >
      {/* Top Breadcrumb Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href={`/knowledge/${category.slug}`} style={{ textDecoration: 'none' }}>
          <button
            type="button"
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
            }}
          >
            <ArrowLeft size={16} /> Back to {category.title}
          </button>
        </Link>

        <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
          Knowledge Codex Level 3 • <strong style={{ color: '#FFF' }}>{pattern.title}</strong>
        </span>
      </div>

      {/* Level 3 Hero Banner */}
      <div style={{
        padding: '32px 40px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(13, 10, 25, 0.98) 0%, rgba(26, 16, 51, 0.95) 50%, rgba(13, 10, 25, 0.98) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <BookOpen size={20} style={{ color: '#C084FC' }} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#C084FC', background: 'rgba(168, 85, 247, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
            {category.kingdomTitle}
          </span>
        </div>

        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: '#FFFFFF' }}>{pattern.title}</h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6' }}>{pattern.overview}</p>
      </div>

      {/* Core Intuition */}
      <div style={{ padding: '24px', borderRadius: '20px', background: '#11111A', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 800, color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lightbulb size={18} /> Intuition & Mental Model
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#CBD5E1', lineHeight: '1.7' }}>{pattern.intuition || pattern.overview}</p>
      </div>

      {/* Complexity Table */}
      <div style={{ padding: '24px', borderRadius: '20px', background: '#11111A', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 800, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={18} /> Time & Space Complexity Analysis
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8' }}>
              <th style={{ padding: '10px' }}>Approach</th>
              <th style={{ padding: '10px' }}>Time</th>
              <th style={{ padding: '10px' }}>Space</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px', color: '#FFF', fontWeight: 700 }}>Brute Force</td>
              <td style={{ padding: '10px', color: '#EF4444' }}>O(N²)</td>
              <td style={{ padding: '10px', color: '#10B981' }}>O(1)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', color: '#FFF', fontWeight: 700 }}>Optimal ({pattern.title})</td>
              <td style={{ padding: '10px', color: '#10B981' }}>O(N)</td>
              <td style={{ padding: '10px', color: '#F59E0B' }}>O(1) to O(N)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Curriculum Problems List */}
      <div style={{ padding: '24px', borderRadius: '20px', background: '#11111A', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Play size={18} style={{ color: '#10B981' }} /> Practice Problems ({patternProblems.length})
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {patternProblems.map((prob) => (
            <div key={prob.id} style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFF', display: 'block' }}>{prob.title}</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>#{prob.leetcodeNumber} • {prob.difficulty}</span>
              </div>
              <Link href={`/practice/${prob.slug}`} style={{ textDecoration: 'none' }}>
                <button type="button" style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#C084FC', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>
                  Solve
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
