'use client';

import React from 'react';
import { Check, Lock, Swords, Award } from 'lucide-react';
import { SkillNode } from '../data/kingdoms';

interface SkillTreeProps {
  skills: SkillNode[];
}

export function SkillTree({ skills }: SkillTreeProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px 0' }}>
      <span style={{ fontSize: '11px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        LEARNING PATH
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
        {skills.map((skill, index) => {
          const isCompleted = skill.status === 'completed';
          const isInProgress = skill.status === 'in_progress';
          const isLocked = skill.status === 'locked';

          return (
            <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
              {/* VERTICAL CONNECTING LINE */}
              {index < skills.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '18px',
                    top: '36px',
                    width: '2px',
                    height: '24px',
                    background: isCompleted ? '#10B981' : isInProgress ? '#F59E0B' : 'rgba(255,255,255,0.08)',
                    zIndex: 1,
                  }}
                />
              )}

              {/* NODE ITEM ROW */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '6px 0', zIndex: 2, width: '100%' }}>
                {/* NODE ICON BADGE */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? 'linear-gradient(135deg, #10B981, #059669)'
                      : isInProgress
                      ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                      : 'rgba(30, 25, 50, 0.8)',
                    border: isCompleted
                      ? '2px solid #34D399'
                      : isInProgress
                      ? '2px solid #FBBF24'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isInProgress ? '0 0 14px rgba(245, 158, 11, 0.5)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isCompleted ? (
                    <Check size={16} style={{ color: '#FFF' }} />
                  ) : isInProgress ? (
                    <Swords size={16} style={{ color: '#FFF' }} />
                  ) : (
                    <Lock size={14} style={{ color: '#64748B' }} />
                  )}
                </div>

                {/* NODE CARD CONTENT */}
                <div
                  style={{
                    flex: 1,
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: isInProgress
                      ? 'rgba(245, 158, 11, 0.12)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isInProgress
                      ? '1px solid rgba(245, 158, 11, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: isLocked ? '#64748B' : '#FFF' }}>
                      {skill.title}
                    </h5>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: isCompleted ? '#10B981' : isInProgress ? '#F59E0B' : '#475569' }}>
                      {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Locked'}
                    </span>
                  </div>

                  {isCompleted && (
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} style={{ color: '#10B981' }} />
                    </div>
                  )}

                  {isInProgress && (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 6px', borderRadius: '4px', background: '#F59E0B', color: '#000' }}>
                      {skill.progressPct}%
                    </span>
                  )}

                  {isLocked && <Lock size={12} style={{ color: '#475569' }} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
