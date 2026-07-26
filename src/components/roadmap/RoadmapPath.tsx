'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isUnlocked: boolean;
}

export function RoadmapPath({ startX, startY, endX, endY, isUnlocked }: Props) {
  const curve = Math.abs(startY - endY) * 0.5;
  const d = `M ${startX} ${startY} C ${startX} ${startY + curve}, ${endX} ${endY - curve}, ${endX} ${endY}`;

  return (
    <svg 
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      <path
        d={d}
        fill="none"
        stroke="#1e293b" 
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1 3"
        vectorEffect="non-scaling-stroke"
      />
      
      {isUnlocked && (
        <motion.path
          d={d}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}

      <defs>
        <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
