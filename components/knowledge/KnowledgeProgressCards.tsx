'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Unlock, CheckCircle2, TrendingUp } from 'lucide-react';

interface KnowledgeProgressCardsProps {
  unlockedCount: number;
  totalPatterns: number;
  completedCount: number;
  readingProgressPct: number;
}

export function KnowledgeProgressCards({
  unlockedCount = 38,
  totalPatterns = 114,
  completedCount = 54,
  readingProgressPct = 68,
}: KnowledgeProgressCardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      
      {/* Card 1: Topics Unlocked */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(168, 85, 247, 0.25)' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '22px',
          borderRadius: '20px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C084FC' }}>
            Topics Unlocked
          </span>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <Unlock size={18} style={{ color: '#C084FC' }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
            {unlockedCount} <span style={{ fontSize: '18px', color: '#94A3B8', fontWeight: 600 }}>/ {totalPatterns}</span>
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '4px' }}>Curriculum Patterns Unlocked</span>
        </div>
      </motion.div>

      {/* Card 2: Official Notes */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(56, 189, 248, 0.25)' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '22px',
          borderRadius: '20px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7DD3FC' }}>
            Official Notes
          </span>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
            <BookOpen size={18} style={{ color: '#38BDF8' }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#38BDF8', lineHeight: 1 }}>{totalPatterns}</div>
          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '4px' }}>Official Pattern Documentation Files</span>
        </div>
      </motion.div>

      {/* Card 3: Completed Notes */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(16, 185, 129, 0.25)' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '22px',
          borderRadius: '20px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6EE7B7' }}>
            Completed Notes
          </span>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <CheckCircle2 size={18} style={{ color: '#10B981' }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#10B981', lineHeight: 1 }}>{completedCount}</div>
          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '4px' }}>Fully Mastered Codex Articles</span>
        </div>
      </motion.div>

      {/* Card 4: Reading Progress */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(245, 158, 11, 0.25)' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '22px',
          borderRadius: '20px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FDE68A' }}>
            Reading Progress
          </span>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <TrendingUp size={18} style={{ color: '#F59E0B' }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>{readingProgressPct}%</div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginTop: '8px' }}>
            <div style={{ width: `${readingProgressPct}%`, height: '100%', background: 'linear-gradient(to right, #F59E0B, #FBBF24)', borderRadius: '3px' }} />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
