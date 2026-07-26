'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Compass, TrendingUp, Navigation, BookOpen, Layers } from 'lucide-react';
import { PatternModel } from '@/src/curriculum/types';

interface KnowledgeSidebarProps {
  bookmarkedPatterns: PatternModel[];
  onSelectPattern?: (patternId: string) => void;
  totalPatternsCount: number;
}

export function KnowledgeSidebar({ bookmarkedPatterns, onSelectPattern, totalPatternsCount }: KnowledgeSidebarProps) {
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '20px' }}>
      
      {/* 1. Quick Reading Progress Box */}
      <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <TrendingUp size={16} style={{ color: '#F59E0B' }} />
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Reading Progress</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginBottom: '6px' }}>
          <span>Mastery Progress</span>
          <strong style={{ color: '#F59E0B' }}>68%</strong>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: 'linear-gradient(to right, #F59E0B, #FBBF24)', borderRadius: '3px' }} />
        </div>
      </div>

      {/* 2. Bookmarked Codex Articles */}
      <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={16} style={{ color: '#C084FC' }} />
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Bookmarked Codex</h4>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#C084FC', background: 'rgba(168, 85, 247, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>
            {bookmarkedPatterns.length}
          </span>
        </div>

        {bookmarkedPatterns.length === 0 ? (
          <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8', fontStyle: 'italic' }}>
            Click the bookmark icon on any pattern to save it here for instant reference.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bookmarkedPatterns.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ x: 2, backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                onClick={() => onSelectPattern?.(p.id)}
                style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFF' }}>{p.title}</span>
                <span style={{ fontSize: '9px', color: '#C084FC' }}>{p.kingdomTitle}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Table of Contents & Quick Jump */}
      <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Navigation size={16} style={{ color: '#38BDF8' }} />
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Quick Navigation</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#CBD5E1' }}>
          <span style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)' }}>1. Basic Arrays & Fundamentals</span>
          <span style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)' }}>2. Sliding Window & Two Pointers</span>
          <span style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)' }}>3. Binary Search & Trees</span>
          <span style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)' }}>4. Dynamic Programming Empire</span>
          <span style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)' }}>5. Graphs & Shortest Path</span>
        </div>
      </div>

    </aside>
  );
}
