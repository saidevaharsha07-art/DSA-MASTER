'use client';

import React from 'react';
import { Kingdom } from '../data/kingdoms';
import { KingdomCard } from './KingdomCard';

interface KingdomGridProps {
  kingdoms: Kingdom[];
  selectedKingdom: Kingdom;
  onSelectKingdom: (kingdom: Kingdom) => void;
}

export function KingdomGrid({ kingdoms, selectedKingdom, onSelectKingdom }: KingdomGridProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px' }}>
      
      {/* GRID HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '4px' }}>
        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#FFF', letterSpacing: '0.05em' }}>
          25 KINGDOMS OF JOURNEY
        </h2>
        <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
          Your Adventure Awaits • Complete kingdoms, earn XP, unlock new worlds!
        </span>
      </div>

      {/* 5 x 5 RPG KINGDOM GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          flex: 1,
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {kingdoms.map((k) => (
          <KingdomCard
            key={k.id}
            kingdom={k}
            isSelected={k.id === selectedKingdom.id}
            onSelect={onSelectKingdom}
          />
        ))}
      </div>

    </div>
  );
}
