'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface JourneyConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isUnlocked: boolean;
  themeColor: string;
  pathType: 'stone' | 'trail' | 'bridge' | 'river' | 'portal' | 'mountain' | 'desert' | 'galaxy' | 'swamp';
}

export const JourneyConnection = React.memo(function JourneyConnection({
  x1,
  y1,
  x2,
  y2,
  isUnlocked,
  themeColor,
  pathType,
}: JourneyConnectionProps) {
  const dx = x2 - x1;
  const path = `M ${x1} ${y1} C ${x1 + dx / 2} ${y1}, ${x2 - dx / 2} ${y2}, ${x2} ${y2}`;

  // Custom styling attributes per path type representing different biome routes
  let strokeWidth = 3;
  let strokeDasharray = "0";
  let color = isUnlocked ? themeColor : 'rgba(255, 255, 255, 0.08)';
  let flowParticleColor = '#ffffff';

  switch (pathType) {
    case 'stone':
      strokeWidth = 5;
      strokeDasharray = isUnlocked ? "0" : "6,6";
      break;
    case 'trail':
      strokeWidth = 3;
      strokeDasharray = isUnlocked ? "4,4" : "8,8";
      color = isUnlocked ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255,255,255,0.08)';
      break;
    case 'bridge':
      strokeWidth = 6;
      color = isUnlocked ? 'rgba(139, 92, 246, 0.7)' : 'rgba(255,255,255,0.08)'; // Purple bridge vibes
      break;
    case 'river':
      strokeWidth = 4;
      color = isUnlocked ? 'rgba(6, 182, 212, 0.7)' : 'rgba(255,255,255,0.08)'; // Cyan water flow
      flowParticleColor = '#67e8f9';
      break;
    case 'portal':
      strokeWidth = 4;
      color = isUnlocked ? 'rgba(244, 63, 94, 0.8)' : 'rgba(255,255,255,0.08)'; // Glowing portal magic
      flowParticleColor = '#fda4af';
      break;
    case 'mountain':
      strokeWidth = 5;
      strokeDasharray = isUnlocked ? "12,4" : "12,12";
      color = isUnlocked ? 'rgba(100, 116, 139, 0.8)' : 'rgba(255,255,255,0.08)'; // Stone steps
      break;
    case 'desert':
      strokeWidth = 3.5;
      strokeDasharray = isUnlocked ? "15,5" : "10,10";
      color = isUnlocked ? 'rgba(234, 179, 8, 0.6)' : 'rgba(255,255,255,0.08)'; // Sand tracks
      break;
    default:
      break;
  }

  return (
    <g>
      {/* Visual background track to add depth to path */}
      <path
        d={path}
        fill="none"
        stroke={isUnlocked ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'}
        strokeWidth={strokeWidth + 4}
        strokeLinecap="round"
      />

      {/* The main trail line */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        style={{
          opacity: isUnlocked ? 0.9 : 0.25,
          transition: 'stroke 0.4s ease, opacity 0.4s ease',
        }}
      />

      {/* Flowing energy particles on unlocked routes */}
      {isUnlocked && (
        <motion.path
          d={path}
          fill="none"
          stroke={flowParticleColor}
          strokeWidth={strokeWidth / 2}
          strokeLinecap="round"
          strokeDasharray="6, 40"
          animate={{
            strokeDashoffset: [-160, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "linear"
          }}
        />
      )}
    </g>
  );
});
