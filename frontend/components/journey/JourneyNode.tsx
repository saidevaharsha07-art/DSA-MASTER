'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Shield, Sparkles, HelpCircle } from 'lucide-react';
import { colors, typography, radius, shadows, spacing } from '@/src/design';
import { WorldInfo } from './worldData';

interface JourneyNodeProps {
  world: WorldInfo;
  status: 'completed' | 'current' | 'locked';
  progress: number;
  isFocused?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onHover: (isHovered: boolean) => void;
}

export const JourneyNode = React.memo(function JourneyNode({
  world,
  status,
  progress,
  isFocused = false,
  onClick,
  onDoubleClick,
  onHover,
}: JourneyNodeProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  
  // Designate boss levels: World 5, 10, 15, 20, 25
  const isBoss = [5, 10, 15, 20, 25].includes(world.id);

  // Biome-specific gradient backdrops representing the living game map
  const biomeAuras: Record<number, string> = {
    1: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)', // Green Valley
    2: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, transparent 70%)', // Number Hills
    3: 'radial-gradient(circle, rgba(5, 150, 105, 0.16) 0%, transparent 70%)',  // Recursion Forest
    4: 'radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, transparent 70%)', // Array Valley
    5: 'radial-gradient(circle, rgba(234, 179, 8, 0.22) 0%, transparent 75%)',  // Hash Forest BOSS
    6: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, transparent 70%)',  // Prefix Plains
    7: 'radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, transparent 70%)',   // Sliding River
    8: 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, transparent 70%)',  // Pointer Mountains
    9: 'radial-gradient(circle, rgba(236, 72, 153, 0.16) 0%, transparent 70%)',  // Binary Search Canyon
    10: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, transparent 75%)', // String City BOSS
    11: 'radial-gradient(circle, rgba(20, 184, 166, 0.16) 0%, transparent 70%)', // Linked Lake
    12: 'radial-gradient(circle, rgba(239, 68, 68, 0.16) 0%, transparent 70%)',  // Stack Volcano
    13: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 70%)', // Queue Harbor
    14: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)', // Tree Kingdom
    15: 'radial-gradient(circle, rgba(234, 179, 8, 0.22) 0%, transparent 75%)',  // BST Castle BOSS
    16: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, transparent 70%)', // Heap Mine
    17: 'radial-gradient(circle, rgba(236, 72, 153, 0.16) 0%, transparent 70%)', // Greedy Desert
    18: 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, transparent 70%)', // Graph Empire
    19: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)', // Backtracking Jungle
    20: 'radial-gradient(circle, rgba(244, 63, 94, 0.22) 0%, transparent 75%)',  // DP Temple BOSS
    21: 'radial-gradient(circle, rgba(20, 184, 166, 0.16) 0%, transparent 70%)', // Bit Caverns
    22: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, transparent 70%)', // Advanced Citadel
    23: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 70%)', // Algorithm Galaxy
    24: 'radial-gradient(circle, rgba(244, 63, 94, 0.16) 0%, transparent 70%)',  // Interview Arena
    25: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 80%)'   // Grand Master BOSS
  };

  // Node borders and glows based on state
  let borderColor = 'rgba(255, 255, 255, 0.08)';
  let glowColor = 'transparent';
  let labelColor = colors.muted;

  if (isCompleted) {
    borderColor = '#f59e0b'; // Gold border for completed
    glowColor = 'rgba(16, 185, 129, 0.35)'; // Green success glow
    labelColor = colors.success;
  } else if (isCurrent) {
    borderColor = colors.primary;
    glowColor = 'rgba(99, 102, 241, 0.55)'; // Heavy primary blue/indigo glow
    labelColor = colors.primary;
  }

  // Node sizing
  const nodeSize = isBoss ? '86px' : '72px';

  return (
    <div style={{ position: 'absolute', left: world.x - 75, top: world.y - 75, width: '150px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
      
      {/* 1. Biome atmospheric background aura (locked biomes have dark/foggy auras) */}
      <div style={{
        position: 'absolute',
        top: '-35px',
        left: '-35px',
        width: '220px',
        height: '220px',
        background: isLocked 
          ? 'radial-gradient(circle, rgba(15, 23, 42, 0.4) 0%, transparent 70%)' 
          : biomeAuras[world.id],
        pointerEvents: 'none',
        zIndex: 0,
        filter: isLocked ? 'blur(10px) saturate(0.2)' : 'blur(5px)',
        opacity: isLocked ? 0.3 : 1
      }} />

      {/* 2. Biome Decorator Emoji (Floating ambient asset above the node) */}
      {!isLocked && (
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ position: 'absolute', top: isBoss ? '-16px' : '-8px', fontSize: '18px', zIndex: 3 }}
        >
          {world.decorationEmoji}
        </motion.div>
      )}

      {/* 3. Main Orb Node */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: isFocused ? 1.15 : 1,
          opacity: isLocked ? 0.35 : 1 
        }}
        whileHover={isLocked ? {} : { 
          scale: 1.1, 
          boxShadow: `0 0 30px ${glowColor}`,
          borderColor: isBoss ? '#f59e0b' : world.themeColor 
        }}
        onClick={() => onClick()}
        onDoubleClick={() => onDoubleClick()}
        onMouseEnter={() => !isLocked && onHover(true)}
        onMouseLeave={() => onHover(false)}
        style={{
          width: nodeSize,
          height: nodeSize,
          borderRadius: radius.full,
          backgroundColor: isLocked ? 'rgba(9, 13, 22, 0.9)' : 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(12px)',
          border: isBoss ? `3px double ${borderColor}` : `2px solid ${borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: isFocused ? `0 0 35px ${glowColor}` : `0 8px 16px rgba(0,0,0,0.45)`,
          zIndex: 2,
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Pulsing Outer Rings for Current active beacon */}
        {isCurrent && (
          <>
            {/* Outer large pulse */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0 0px rgba(99, 102, 241, 0.4)`,
                  `0 0 0 20px rgba(99, 102, 241, 0)`
                ]
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: -3, left: -3, right: -3, bottom: -3,
                borderRadius: radius.full,
                pointerEvents: 'none'
              }}
            />
            {/* Inner small pulse */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0 0px rgba(99, 102, 241, 0.6)`,
                  `0 0 0 10px rgba(99, 102, 241, 0)`
                ]
              }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: -3, left: -3, right: -3, bottom: -3,
                borderRadius: radius.full,
                pointerEvents: 'none'
              }}
            />
          </>
        )}

        {/* Shine effects for Completed nodes */}
        {isCompleted && (
          <motion.div
            animate={{
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                `0 0 8px 0px rgba(16, 185, 129, 0.2)`,
                `0 0 20px 4px rgba(16, 185, 129, 0.5)`,
                `0 0 8px 0px rgba(16, 185, 129, 0.2)`
              ]
            }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: -3, left: -3, right: -3, bottom: -3,
              borderRadius: radius.full,
              border: `2px solid ${colors.success}`,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Content circle inner */}
        {isLocked ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: colors.muted }}>
              {world.id}
            </span>
            <Lock size={10} color={colors.muted} style={{ marginTop: '1px' }} />
          </div>
        ) : isCompleted ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: '#f59e0b' }}>
              {world.id}
            </span>
            <CheckCircle2 size={12} color={colors.success} style={{ marginTop: '2px' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: isBoss ? typography.fontSize.h3 : typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: colors.foreground }}>
              {world.id}
            </span>
            {isBoss && <Shield size={12} color="#f59e0b" style={{ marginTop: '2px' }} />}
          </div>
        )}
      </motion.div>

      {/* 4. Labels and Progress (faded in locked biomes) */}
      <div style={{ 
        marginTop: spacing.sm, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        zIndex: 2,
        pointerEvents: 'none',
        opacity: isLocked ? 0.45 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        <span style={{ 
          fontSize: typography.fontSize.caption, 
          fontWeight: typography.fontWeight.bold, 
          color: colors.foreground,
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          textAlign: 'center',
          maxWidth: '130px',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        }}>
          {world.name}
        </span>
        <span style={{ 
          fontSize: '9px', 
          color: labelColor, 
          marginTop: '2px', 
          fontWeight: typography.fontWeight.bold,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {isCompleted ? 'COMPLETED' : isCurrent ? 'ACTIVE' : 'LOCKED'}
        </span>
      </div>

    </div>
  );
});
