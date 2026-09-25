'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Check } from 'lucide-react';
import { TimelineStage } from '@/src/engines/revision';

interface RevisionTimelineProps {
  stages: TimelineStage[];
}

export function RevisionTimeline({ stages }: RevisionTimelineProps) {
  // Calculate width of active progress line dynamically based on active node index
  const activeIndex = stages.findIndex((s) => s.status === 'current');
  const fillPct = activeIndex >= 0 ? Math.round((activeIndex / (stages.length - 1)) * 100) : 0;

  return (
    <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
          <Award size={18} style={{ color: '#C084FC' }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>Spaced Repetition Journey Timeline</h2>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Dynamic Ebbinghaus Spaced Repetition Progression Stages</span>
        </div>
      </div>

      {/* Horizontal Progression Bar */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 20px' }}>
        
        {/* Background Line */}
        <div style={{ position: 'absolute', left: '40px', right: '40px', top: '46px', height: '4px', background: 'rgba(255,255,255,0.08)', zIndex: 1 }} />

        {/* Dynamic Active Connector Line Fill */}
        <div style={{ position: 'absolute', left: '40px', width: `calc(${fillPct}% - 40px)`, top: '46px', height: '4px', background: 'linear-gradient(to right, #10B981, #A855F7)', zIndex: 2, boxShadow: '0 0 14px rgba(168, 85, 247, 0.6)', transition: 'width 0.5s ease' }} />

        {stages.map((stg, idx) => {
          const isCompleted = stg.status === 'completed';
          const isCurrent = stg.status === 'current';

          return (
            <motion.div
              key={stg.stage}
              whileHover={{ scale: 1.08 }}
              style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {/* Node Circle (Animate ONLY active node!) */}
              <motion.div
                animate={isCurrent ? { scale: [1, 1.12, 1], boxShadow: ['0 0 20px #A855F7', '0 0 36px #C084FC', '0 0 20px #A855F7'] } : {}}
                transition={isCurrent ? { repeat: Infinity, duration: 2, ease: 'easeInOut' } : {}}
                style={{
                  width: isCurrent ? '44px' : '34px',
                  height: isCurrent ? '44px' : '34px',
                  borderRadius: '50%',
                  background: isCompleted
                    ? '#10B981'
                    : isCurrent
                    ? 'linear-gradient(135deg, #A855F7, #7E22CE)'
                    : 'rgba(20, 16, 38, 0.9)',
                  border: isCurrent
                    ? '3px solid #FFF'
                    : isCompleted
                    ? '3px solid #10B981'
                    : '2px solid rgba(255,255,255,0.15)',
                  boxShadow: isCompleted
                    ? '0 0 10px rgba(16, 185, 129, 0.4)'
                    : isCurrent
                    ? '0 0 24px #A855F7'
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCompleted ? '#FFF' : isCurrent ? '#FFF' : '#64748B',
                  fontWeight: 900,
                  fontSize: '11px',
                  transition: 'all 0.3s ease',
                }}
              >
                {isCompleted ? <Check size={16} /> : idx}
              </motion.div>

              {/* Stage Description */}
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: isCurrent ? '#C084FC' : isCompleted ? '#10B981' : '#64748B' }}>
                  {stg.stage}
                </span>
                <span style={{ fontSize: '9px', color: isCurrent ? '#FFF' : isCompleted ? '#94A3B8' : '#475569', fontWeight: 600 }}>
                  {stg.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
