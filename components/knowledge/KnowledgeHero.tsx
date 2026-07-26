'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

export function KnowledgeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        height: '280px',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(168, 85, 247, 0.1)',
        background: 'linear-gradient(135deg, rgba(13, 10, 25, 0.98) 0%, rgba(26, 16, 51, 0.95) 50%, rgba(13, 10, 25, 0.98) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Hero Background Artwork Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '58%',
        backgroundImage: 'url(/images/memory_sanctuary_banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        opacity: 0.65,
        maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Hero Left Content Area */}
      <div style={{ position: 'relative', zIndex: 10, padding: '36px 44px', maxWidth: '640px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)' }}>
            <Network size={24} style={{ color: '#C084FC' }} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A855F7', background: 'rgba(168, 85, 247, 0.15)', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            Official Codex & Knowledge Vault
          </span>
        </div>

        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Knowledge Graph 2.0
        </h1>
        <p style={{ margin: '8px 0 20px 0', fontSize: '14px', color: '#CBD5E1', lineHeight: '1.5' }}>
          Explore the official Codex of all 25 DSA Kingdoms. Every kingdom contains structured documentation, algorithms, patterns, interview insights, and revision notes.
        </p>

        {/* Badges Strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <ShieldCheck size={14} style={{ color: '#C084FC' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#F3E8FF' }}>25 Kingdoms</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <BookOpen size={14} style={{ color: '#38BDF8' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#38BDF8' }}>113 Official Patterns</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Sparkles size={14} style={{ color: '#F59E0B' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B' }}>713 Problems</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(20, 16, 38, 0.75)', backdropFilter: 'blur(12px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Network size={14} style={{ color: '#10B981' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981' }}>Dynamic Documentation</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
