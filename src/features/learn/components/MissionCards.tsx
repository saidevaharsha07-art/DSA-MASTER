'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Coins, Sparkles, ArrowRight } from 'lucide-react';
import { RECOMMENDED_MISSIONS } from '../data/kingdoms';

export function MissionCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '11px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        RECOMMENDED NEXT MISSIONS
      </span>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
        {RECOMMENDED_MISSIONS.map((m) => (
          <Link key={m.id} href={`/practice/${m.slug}`} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              style={{
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'rgba(20, 16, 38, 0.85)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '72px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h5 style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                  {m.title}
                </h5>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: m.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.2)' : m.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: m.difficulty === 'Easy' ? '#10B981' : m.difficulty === 'Medium' ? '#F59E0B' : '#EF4444',
                  }}
                >
                  {m.difficulty}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#F59E0B' }}>+{m.xp} XP</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10px', fontWeight: 900, color: '#EAB308' }}>
                    <Coins size={10} /> {m.coins}
                  </div>
                </div>
                <ChevronRight size={14} style={{ color: '#94A3B8' }} />
              </div>
            </motion.div>
          </Link>
        ))}

        {/* VIEW ALL PROBLEMS CARD */}
        <Link href="/practice" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(30, 18, 55, 0.8))',
              border: '1px solid #C084FC',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '72px',
              color: '#FFF',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 900 }}>View All Problems</span>
            <ArrowRight size={14} style={{ marginTop: '4px', color: '#C084FC' }} />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
