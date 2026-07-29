'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { Kingdom } from '../data/kingdoms';

interface KingdomCardProps {
  kingdom: Kingdom;
  isSelected: boolean;
  onSelect: (kingdom: Kingdom) => void;
}

export function KingdomCard({ kingdom, isSelected, onSelect }: KingdomCardProps) {
  const isLocked = kingdom.status === 'locked';
  const isCurrent = kingdom.status === 'current' || isSelected;

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.04 }}
      whileTap={{ scale: isLocked ? 1 : 0.96 }}
      onClick={() => !isLocked && onSelect(kingdom)}
      style={{
        position: 'relative',
        height: '92px',
        borderRadius: '14px',
        padding: '10px 12px',
        background: isSelected
          ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(30, 18, 55, 0.95) 100%)'
          : isLocked
          ? 'rgba(15, 12, 28, 0.6)'
          : 'linear-gradient(135deg, rgba(25, 20, 45, 0.9) 0%, rgba(15, 12, 28, 0.9) 100%)',
        border: isSelected
          ? '2px solid #F59E0B'
          : isLocked
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid rgba(168, 85, 247, 0.25)',
        boxShadow: isSelected
          ? '0 0 20px rgba(245, 158, 11, 0.4), inset 0 0 10px rgba(245, 158, 11, 0.2)'
          : 'none',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isLocked ? 0.5 : 1,
        overflow: 'hidden',
      }}
    >
      {/* TOP BAR: KINGDOM NUMBER & CHECKMARK / LOCK */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 900,
            padding: '2px 6px',
            borderRadius: '6px',
            background: isSelected ? '#F59E0B' : 'rgba(255, 255, 255, 0.08)',
            color: isSelected ? '#000' : '#CBD5E1',
          }}
        >
          {kingdom.id}
        </span>

        {isLocked ? (
          <Lock size={12} style={{ color: '#64748B' }} />
        ) : kingdom.progressPct >= 100 || kingdom.status === 'completed' ? (
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={10} style={{ color: '#FFF' }} />
          </div>
        ) : null}
      </div>

      {/* CENTER ICON & NAME */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <span style={{ fontSize: '18px' }}>{isLocked ? '🔒' : kingdom.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4
            style={{
              margin: 0,
              fontSize: '11px',
              fontWeight: 800,
              color: isLocked ? '#64748B' : '#FFF',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {kingdom.name}
          </h4>
          <span style={{ fontSize: '10px', fontWeight: 700, color: isLocked ? '#475569' : kingdom.color }}>
            {kingdom.progressPct}%
          </span>
        </div>
      </div>

      {/* BOTTOM PROGRESS BAR */}
      <div style={{ width: '100%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: '4px' }}>
        <div
          style={{
            width: `${kingdom.progressPct}%`,
            height: '100%',
            background: isSelected ? 'linear-gradient(90deg, #F59E0B, #EAB308)' : kingdom.color,
          }}
        />
      </div>
    </motion.div>
  );
}
