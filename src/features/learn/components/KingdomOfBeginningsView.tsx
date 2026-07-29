'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Compass,
  CheckCircle2,
  Lock,
  Swords,
  Award,
  Sparkles,
  ChevronRight,
  BookOpen,
  Clock,
  Shield,
  Skull
} from 'lucide-react';

export function KingdomOfBeginningsView() {
  const questLandmarks = [
    {
      id: 'l1',
      title: 'Small Training Village',
      pattern: 'Array Fundamentals & Memory Layout',
      status: 'completed',
      progressPct: 100,
      solvedCount: '8 / 8',
      difficulty: 'Easy',
      estTime: '45 mins',
      xpReward: 150,
      icon: '🏡',
      landmark: 'Ancient Windmill & Training Grounds',
    },
    {
      id: 'l2',
      title: 'Ancient Temple',
      pattern: 'Prefix Sum & Cumulative Range Queries',
      status: 'completed',
      progressPct: 100,
      solvedCount: '6 / 6',
      difficulty: 'Easy',
      estTime: '50 mins',
      xpReward: 200,
      icon: '🏛️',
      landmark: 'Energy Obelisks & Sun Altar',
    },
    {
      id: 'l3',
      title: 'Twin Bridges',
      pattern: 'Two Pointer Convergence & In-Place Swaps',
      status: 'completed',
      progressPct: 100,
      solvedCount: '7 / 7',
      difficulty: 'Medium',
      estTime: '60 mins',
      xpReward: 250,
      icon: '🌉',
      landmark: 'River Crossing & Dual Statues',
    },
    {
      id: 'l4',
      title: 'Magic Observatory',
      pattern: 'Sliding Window & Subarray Frames',
      status: 'in_progress',
      progressPct: 60,
      solvedCount: '5 / 8',
      difficulty: 'Medium',
      estTime: '75 mins',
      xpReward: 300,
      icon: '🔭',
      landmark: 'Telescope Spire & Moving Glass',
    },
    {
      id: 'l5',
      title: 'Battlefield',
      pattern: 'Kadane\'s Algorithm & Maximum Subarray',
      status: 'locked',
      progressPct: 0,
      solvedCount: '0 / 5',
      difficulty: 'Medium',
      estTime: '60 mins',
      xpReward: 350,
      icon: '⚔️',
      landmark: 'Sunken Ruins & Forgotten Swords',
    },
    {
      id: 'l6',
      title: 'Crystal Mountain',
      pattern: 'Binary Search on 2D Matrix Arrays',
      status: 'locked',
      progressPct: 0,
      solvedCount: '0 / 6',
      difficulty: 'Hard',
      estTime: '90 mins',
      xpReward: 400,
      icon: '💎',
      landmark: 'Glowing Blue Caves & Frozen Peaks',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', background: '#080614', color: '#FFF', padding: '24px 36px', gap: '24px' }}>
      
      {/* TOP BAR: BACK NAVIGATION & BREADCRUMB */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/learn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: '#C084FC', fontWeight: 800, fontSize: '13px' }}>
          <ArrowLeft size={18} /> Back to Master Campaign Overview
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>
          <span>Campaign</span> / <span>Kingdoms</span> / <span style={{ color: '#FFF', fontWeight: 900 }}>Kingdom of Beginnings</span>
        </div>
      </div>

      {/* MASSIVE KINGDOM HERO ENVIRONMENT BANNER */}
      <div
        style={{
          position: 'relative',
          borderRadius: '24px',
          padding: '36px 44px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(30, 20, 10, 0.95) 60%, rgba(10, 8, 20, 0.98) 100%)',
          border: '2px solid #F59E0B',
          boxShadow: '0 20px 60px rgba(245, 158, 11, 0.25), inset 0 0 30px rgba(245, 158, 11, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '32px' }}>🧭</span>
              <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: '#F59E0B', padding: '4px 10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #F59E0B' }}>
                KINGDOM 1 • ARRAYS & MEMORY
              </span>
            </div>

            <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 900, color: '#FFF', letterSpacing: '0.02em' }}>
              KINGDOM OF BEGINNINGS
            </h1>

            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#CBD5E1', maxWidth: '750px', lineHeight: '1.6' }}>
              Golden plains, ancient temples, stone roads, ruined towers, crystal rivers, and the huge compass monument of foundational memory arrays.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.4)', padding: '16px 24px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>KINGDOM MASTERY</span>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#F59E0B' }}>85%</span>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>QUESTS COMPLETED</span>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#FFF' }}>4 / 6</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUEST LANDMARKS MAP (6 CONNECTED FANTASY LANDMARKS ON A GLOWING ROAD) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#FFF', letterSpacing: '0.04em' }}>
            QUEST LANDMARKS & PATTERN TRAVERSAL
          </h3>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
            Master each pattern landmark to unlock the Array Titan Castle
          </span>
        </div>

        {/* 2-COLUMN GRID OF MASSIVE QUEST LANDMARK CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {questLandmarks.map((lm) => {
            const isCompleted = lm.status === 'completed';
            const isInProgress = lm.status === 'in_progress';
            const isLocked = lm.status === 'locked';

            return (
              <motion.div
                key={lm.id}
                whileHover={{ scale: isLocked ? 1 : 1.02 }}
                style={{
                  padding: '20px 24px',
                  borderRadius: '20px',
                  background: isInProgress
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(20, 15, 35, 0.95) 100%)'
                    : isCompleted
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(15, 25, 20, 0.95) 100%)'
                    : 'rgba(15, 12, 28, 0.7)',
                  border: isInProgress
                    ? '2px solid #F59E0B'
                    : isCompleted
                    ? '1px solid #10B981'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isInProgress
                    ? '0 0 20px rgba(245, 158, 11, 0.3)'
                    : 'none',
                  opacity: isLocked ? 0.6 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{lm.icon}</span>
                    <div>
                      <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                        {lm.landmark}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#FFF' }}>
                        {lm.title}
                      </h4>
                    </div>
                  </div>

                  {isCompleted ? (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Mastered
                    </span>
                  ) : isInProgress ? (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={12} /> In Progress ({lm.progressPct}%)
                    </span>
                  ) : (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Lock size={12} /> Locked Landmark
                    </span>
                  )}
                </div>

                <p style={{ margin: 0, fontSize: '12px', color: '#CBD5E1', lineHeight: '1.5' }}>
                  {lm.pattern}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>
                    <span>Solved: <strong style={{ color: '#FFF' }}>{lm.solvedCount}</strong></span>
                    <span>Time: <strong style={{ color: '#FFF' }}>{lm.estTime}</strong></span>
                  </div>

                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#F59E0B' }}>
                    +{lm.xpReward} XP
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* KINGDOM BOSS AREA: MASSIVE RUINED CASTLE */}
      <div
        style={{
          padding: '28px 36px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(40, 10, 20, 0.95) 0%, rgba(20, 5, 10, 0.95) 100%)',
          border: '2px solid #EF4444',
          boxShadow: '0 12px 40px rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '14px', borderRadius: '18px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444' }}>
            <Skull size={32} style={{ color: '#EF4444' }} />
          </div>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              FINAL REALM GUARDIAN
            </span>
            <h2 style={{ margin: '2px 0 0 0', fontSize: '22px', fontWeight: 900, color: '#FFF' }}>
              ARRAY TITAN BOSS BATTLE
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#CBD5E1' }}>
              Solve 10 mixed-difficulty array challenges to conquer the Kingdom of Beginnings.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>BOSS REWARDS</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#F59E0B' }}>+1,000 XP</span>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#EF4444' }}>🏆 Legendary Badge</span>
            </div>
          </div>

          <Link href="/practice" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              style={{
                padding: '12px 28px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #EF4444, #991B1B)',
                border: 'none',
                color: '#FFF',
                fontSize: '13px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(239, 68, 68, 0.4)',
              }}
            >
              Challenge Array Titan
            </motion.button>
          </Link>
        </div>
      </div>

    </div>
  );
}
