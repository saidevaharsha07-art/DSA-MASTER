'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowRight } from 'lucide-react';

interface KnowledgeGraphNodesProps {
  onSelectNode?: (patternSlug: string) => void;
}

export function KnowledgeGraphNodes({ onSelectNode }: KnowledgeGraphNodesProps) {
  const nodeSequence = [
    { title: 'Array Fundamentals', slug: 'array-fundamentals', level: 'Beginner' },
    { title: 'Prefix Sum', slug: 'prefix-sum', level: 'Easy' },
    { title: 'Sliding Window', slug: 'sliding-window', level: 'Medium' },
    { title: 'Two Pointers', slug: 'two-pointers', level: 'Medium' },
    { title: 'Binary Search', slug: 'binary-search', level: 'Medium' },
    { title: 'Greedy Choice', slug: 'greedy', level: 'Hard' },
  ];

  return (
    <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
          <Network size={18} style={{ color: '#C084FC' }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>Connected Knowledge Progression Graph</h2>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Interactive Pattern Dependency & Prerequisite Map</span>
        </div>
      </div>

      {/* Horizontal Connected Node Pipeline */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', padding: '16px 0' }}>
        {nodeSequence.map((node, i) => (
          <React.Fragment key={node.slug}>
            <motion.div
              whileHover={{ scale: 1.08, y: -4 }}
              onClick={() => onSelectNode?.(node.slug)}
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(20, 16, 38, 0.9), rgba(35, 20, 60, 0.9))',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                boxShadow: '0 8px 24px rgba(168, 85, 247, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                flexShrink: 0,
                minWidth: '140px',
              }}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C084FC', boxShadow: '0 0 12px #C084FC' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', textAlign: 'center' }}>{node.title}</span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#94A3B8', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                {node.level}
              </span>
            </motion.div>

            {i < nodeSequence.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', color: '#C084FC', opacity: 0.6, flexShrink: 0 }}>
                <ArrowRight size={18} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
}
