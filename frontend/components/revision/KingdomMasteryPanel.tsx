'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Search, ChevronRight, ShieldCheck } from 'lucide-react';
import { KingdomMastery } from '@/src/engines/revision';

interface KingdomMasteryPanelProps {
  kingdoms: KingdomMastery[];
  onSelectKingdom?: (kingdomSlug: string) => void;
}

export function KingdomMasteryPanel({ kingdoms, onSelectKingdom }: KingdomMasteryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredKingdoms = kingdoms.filter((k) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return k.title.toLowerCase().includes(q) || k.kingdomTitle.toLowerCase().includes(q);
  });

  const overallAvgMastery = Math.round(
    kingdoms.reduce((acc, k) => acc + k.averageMastery, 0) / (kingdoms.length || 1)
  );

  return (
    <div style={{ padding: '24px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <Compass size={18} style={{ color: '#C084FC' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>Topic Mastery Panel</h2>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>25 Topic Areas • Live Average Problem Retention</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 12px 6px 30px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px', outline: 'none', width: '150px' }}
            />
          </div>

          <span style={{ fontSize: '12px', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 10px', borderRadius: '99px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            {overallAvgMastery}% Overall Avg
          </span>
        </div>
      </div>

      {/* Scrollable Kingdom List */}
      <div style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredKingdoms.map((k) => {
          const mastery = k.averageMastery;
          // Dynamic AAA color scheme: Gold (>= 90%), Purple (>= 75%), Green (>= 60%), Amber (< 60%)
          const barColor = mastery >= 90 ? '#F59E0B' : mastery >= 75 ? '#A855F7' : mastery >= 60 ? '#10B981' : '#EAB308';
          const glowShadow = mastery >= 90 ? '0 0 12px rgba(245, 158, 11, 0.4)' : mastery >= 75 ? '0 0 12px rgba(168, 85, 247, 0.4)' : '0 0 12px rgba(16, 185, 129, 0.4)';

          return (
            <motion.div
              key={k.slug}
              whileHover={{ y: -2, backgroundColor: 'rgba(168, 85, 247, 0.08)' }}
              onClick={() => onSelectKingdom?.(k.slug)}
              style={{
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ flex: '1 1 200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#C084FC', width: '22px' }}>#{k.order}</span>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{k.title}</h4>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 500 }}>({k.kingdomTitle})</span>
                </div>
                <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>
                  {k.solvedCount} / {k.totalProblems} Problems Solved {k.dueCount > 0 && <strong style={{ color: '#F59E0B' }}>• {k.dueCount} Due</strong>}
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div style={{ flex: '1 1 180px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${mastery}%`,
                      height: '100%',
                      background: barColor,
                      boxShadow: glowShadow,
                      borderRadius: '4px',
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 900, color: barColor, width: '40px', textAlign: 'right' }}>
                  {mastery}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
