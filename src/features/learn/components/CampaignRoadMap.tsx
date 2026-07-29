'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CAMPAIGN_KINGDOMS, CampaignKingdom } from '../data/campaignKingdoms';

interface CampaignRoadMapProps {
  kingdoms: CampaignKingdom[];
}

export function CampaignRoadMap({ kingdoms }: CampaignRoadMapProps) {
  return (
    <div
      style={{
        padding: '24px 30px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(15, 12, 32, 0.95) 0%, rgba(8, 6, 18, 0.98) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#FFF', letterSpacing: '0.04em' }}>
            CAMPAIGN ROADMAP PROGRESS
          </h3>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
            Magical highways linking all 25 realms from Array Beginnings to the Citadel of Masters.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '10px', fontWeight: 800 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F59E0B' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 8px #F59E0B' }} /> Mastered (Gold)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 8px #38BDF8' }} /> Available (Blue)
          </span>
        </div>
      </div>

      {/* ROADMAP NODES STRIP */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', paddingBottom: '10px' }}>
        {kingdoms.map((k, index) => {
          const isMastered = k.status === 'mastered';
          const isCurrent = k.id === 4;

          return (
            <React.Fragment key={k.id}>
              {/* NODE ITEM */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  minWidth: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: isMastered
                    ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                    : isCurrent
                    ? 'linear-gradient(135deg, #38BDF8, #0284C7)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isMastered
                    ? '2px solid #FDE047'
                    : isCurrent
                    ? '2px solid #7DD3FC'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isMastered
                    ? '0 0 12px rgba(245, 158, 11, 0.6)'
                    : isCurrent
                    ? '0 0 14px rgba(56, 189, 248, 0.6)'
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '11px',
                  color: isMastered ? '#000' : isCurrent ? '#000' : '#94A3B8',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                title={`${k.title} (${k.progressPct}%)`}
              >
                {k.id}
              </motion.div>

              {/* CONNECTING ROAD LINE */}
              {index < kingdoms.length - 1 && (
                <div
                  style={{
                    height: '3px',
                    width: '20px',
                    background: isMastered ? '#F59E0B' : isCurrent ? '#38BDF8' : 'rgba(255, 255, 255, 0.08)',
                    flexShrink: 0,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
}
