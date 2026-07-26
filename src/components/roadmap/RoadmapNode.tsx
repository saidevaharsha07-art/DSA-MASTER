'use client';

import React, { useState } from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import { RoadmapNodeData } from './types';
import { CheckCircle2, Lock, BookOpen, Crown, Swords, Route } from 'lucide-react';

interface Props {
  node: RoadmapNodeData;
  onClick?: (nodeId: string) => void;
}

export function RoadmapNode({ node, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    if (node.state === 'locked') return <Lock size={20} style={{ color: 'var(--muted)' }} />;
    switch (node.type) {
      case 'boss': return <Swords size={20} style={{ color: 'var(--hard-fg)' }} />;
      case 'pattern': return <CheckCircle2 size={20} style={{ color: 'var(--easy-fg)' }} />;
      case 'checkpoint': return <Route size={20} style={{ color: '#60a5fa' }} />;
      case 'phase': return <Crown size={20} style={{ color: 'var(--medium-fg)' }} />;
      default: return <BookOpen size={20} style={{ color: '#22d3ee' }} />;
    }
  };

  const getStateStyles = (): React.CSSProperties => {
    switch (node.state) {
      case 'locked': 
        return { background: 'var(--muted-bg)', borderColor: 'var(--border)', opacity: 0.5, filter: 'grayscale(100%)' };
      case 'available': 
        return { background: 'var(--card)', borderColor: '#06b6d4', boxShadow: '0 0 15px rgba(6,182,212,0.2)' };
      case 'learning': 
        return { background: 'var(--card)', borderColor: 'var(--medium-fg)', boxShadow: '0 0 20px rgba(234,179,8,0.4)' };
      case 'mastered': 
        return { background: 'var(--easy-bg)', borderColor: 'var(--easy-fg)', boxShadow: '0 0 15px rgba(21,128,61,0.3)' };
      case 'elite': 
        return { background: 'rgba(168,85,247,0.1)', borderColor: '#a855f7', boxShadow: '0 0 25px rgba(168,85,247,0.5)' };
      default: 
        return { background: 'var(--card)', borderColor: 'var(--border)' };
    }
  };

  const pulseAnim: TargetAndTransition = (node.state === 'learning' || node.state === 'available') ? {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
  } : {};

  return (
    <div 
      style={{ 
        position: 'absolute', 
        zIndex: 10,
        left: `${node.position.x}%`, 
        top: `${node.position.y}%`, 
        transform: 'translate(-50%, -50%)' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        animate={pulseAnim}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick?.(node.id)}
        disabled={node.state === 'locked'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          borderWidth: '2px',
          borderStyle: 'solid',
          cursor: node.state === 'locked' ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s, border-color 0.3s',
          ...getStateStyles()
        }}
      >
        {getIcon()}

        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '16px',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s',
          zIndex: 50,
          width: '220px'
        }}>
          <div className="card layout-stack-sm" style={{ padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h4 className="title" style={{ margin: 0, fontSize: '14px' }}>{node.title}</h4>
            <div className="layout-row-between" style={{ fontSize: '12px', color: 'var(--muted)' }}>
              <span>Mastery:</span>
              <span style={{ fontWeight: 'bold', color: node.mastery > 80 ? 'var(--easy-fg)' : 'var(--medium-fg)' }}>{node.mastery}%</span>
            </div>
            {node.state !== 'locked' && (
              <div className="progress">
                <span style={{ width: `${node.mastery}%` }} />
              </div>
            )}
          </div>
        </div>
      </motion.button>
    </div>
  );
}
