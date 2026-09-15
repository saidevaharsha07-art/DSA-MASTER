'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Lock,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Radio,
  Layers,
  Flame,
} from 'lucide-react';
import { PlatformTrainJourney } from '../services/dashboard-adapter.service';

interface CanonicalPlatformRailwayProps {
  platformTrains?: PlatformTrainJourney[];
  platformSnapshot?: Array<{
    platformKey: string;
    name: string;
    solved: number;
    total: number;
    percentage: number;
    color: string;
  }>;
}

export function CanonicalPlatformRailway({
  platformTrains = [],
  platformSnapshot = [],
}: CanonicalPlatformRailwayProps) {
  // Extract real canonical metrics
  const lcData = platformSnapshot.find((p) => p.platformKey === 'leetcode') || {
    solved: 21,
    total: 713,
    percentage: 3,
    color: '#10B981',
  };
  const ccData = platformSnapshot.find((p) => p.platformKey === 'codechef') || {
    solved: 13,
    total: 839,
    percentage: 2,
    color: '#F97316',
  };
  const cfData = platformSnapshot.find((p) => p.platformKey === 'codeforces') || {
    solved: 7,
    total: 792,
    percentage: 1,
    color: '#3B82F6',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, rgba(20, 14, 44, 0.96) 0%, rgba(10, 8, 26, 0.98) 60%, rgba(6, 4, 16, 1) 100%)',
        border: '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        padding: '28px 32px 36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Background illuminated railway atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '20%',
          width: '500px',
          height: '250px',
          background: 'radial-gradient(circle, var(--accent-glow, rgba(168, 85, 247, 0.15)) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          zIndex: 1,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: 'var(--primary, #8B5CF6)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '4px 10px',
                borderRadius: '8px',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={13} /> CANONICAL PLATFORM COVERAGE
            </span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#CBD5E1' }}>
              Futuristic Multi-Platform Coding Express
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#94A3B8' }}>
            Connected train fleet traveling across 3 active competitive realms (2,344 Total Problems)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10B981', fontWeight: 800 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
            Line Active · High Speed Sync
          </div>
        </div>
      </div>

      {/* ── THE CONTINUOUS RAILWAY TRACK & TRAIN FLEET ─────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: '24px 10px 48px 10px',
          overflowX: 'auto',
          overflowY: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Main Train Body Container (Horizontal Sequence) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            minWidth: '1020px',
            width: '100%',
            justifyContent: 'space-between',
            gap: '0px',
            paddingBottom: '26px', // Room for bogie wheels & track
          }}
        >
          {/* 1. FRONT LOCOMOTIVE ENGINE */}
          <div style={{ position: 'relative', width: '170px', flexShrink: 0 }}>
            {/* Locomotive Body */}
            <div
              style={{
                height: '140px',
                borderRadius: '24px 8px 6px 14px',
                background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 60%, #020617 100%)',
                border: '1.5px solid rgba(56, 189, 248, 0.5)',
                boxShadow: '0 12px 30px rgba(56, 189, 248, 0.25), inset 0 0 20px rgba(56, 189, 248, 0.15)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {/* Aerodynamic Engine Stripe */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #38BDF8, #818CF8)',
                  boxShadow: '0 0 10px #38BDF8',
                }}
              />

              {/* Engine Headlights & Cowcatcher Front */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#38BDF8',
                      boxShadow: '0 0 16px #38BDF8, 0 0 24px #38BDF8',
                    }}
                  />
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#FDE047',
                      boxShadow: '0 0 10px #FDE047',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 900,
                    letterSpacing: '0.1em',
                    color: '#38BDF8',
                    background: 'rgba(56, 189, 248, 0.15)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  EXP-01
                </span>
              </div>

              {/* Futuristic Driver Cabin Window */}
              <div
                style={{
                  width: '90%',
                  height: '32px',
                  borderRadius: '12px 4px 4px 6px',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.45) 0%, rgba(15, 23, 42, 0.9) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.6)',
                  boxShadow: 'inset 0 0 12px rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '10px',
                }}
              >
                <Radio size={14} style={{ color: '#38BDF8', opacity: 0.8 }} />
              </div>

              {/* Locomotive Label */}
              <div>
                <strong style={{ fontSize: '11px', fontWeight: 900, color: '#FFF', letterSpacing: '0.05em', display: 'block' }}>
                  LOCOMOTIVE
                </strong>
                <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700 }}>Coding Master Engine</span>
              </div>
            </div>

            {/* Locomotive Wheel Assembly (Bogies) */}
            <div style={bogieAssemblySt}>
              <div style={wheelSt('#38BDF8')} />
              <div style={bogieFrameSt} />
              <div style={wheelSt('#38BDF8')} />
            </div>
          </div>

          {/* COUPLER 1 */}
          <div style={couplerSt} />

          {/* 2. LEETCODE CARRIAGE */}
          <div style={{ position: 'relative', flex: 1, minWidth: '175px' }}>
            <Link href="/practice" style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  height: '140px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(15, 23, 42, 0.98) 60%, rgba(6, 78, 59, 0.4) 100%)',
                  border: '1.5px solid #10B981',
                  boxShadow: '0 12px 30px rgba(16, 185, 129, 0.22), inset 0 0 20px rgba(16, 185, 129, 0.1)',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Carriage Roof Vent / Illumination Line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />

                {/* Header & Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                    <strong style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>LeetCode</strong>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '6px' }}>
                    {lcData.percentage}%
                  </span>
                </div>

                {/* Passenger / Computing Windows */}
                <div style={{ display: 'flex', gap: '6px', margin: '4px 0' }}>
                  <div style={carriageWindowSt('rgba(16, 185, 129, 0.35)')} />
                  <div style={carriageWindowSt('rgba(16, 185, 129, 0.35)')} />
                  <div style={carriageWindowSt('rgba(16, 185, 129, 0.35)')} />
                </div>

                {/* Solved Ratio Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#CBD5E1', marginBottom: '4px' }}>
                    <span style={{ color: '#10B981' }}>{lcData.solved} / {lcData.total}</span>
                    <span style={{ color: '#94A3B8', fontSize: '10px' }}>Solved</span>
                  </div>
                  <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.max(4, lcData.percentage)}%`, background: '#10B981', borderRadius: '3px', boxShadow: '0 0 8px #10B981' }} />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Wheel Assembly */}
            <div style={bogieAssemblySt}>
              <div style={wheelSt('#10B981')} />
              <div style={bogieFrameSt} />
              <div style={wheelSt('#10B981')} />
            </div>
          </div>

          {/* COUPLER 2 */}
          <div style={couplerSt} />

          {/* 3. CODECHEF CARRIAGE */}
          <div style={{ position: 'relative', flex: 1, minWidth: '175px' }}>
            <Link href="/practice/codechef" style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  height: '140px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.14) 0%, rgba(15, 23, 42, 0.98) 60%, rgba(154, 52, 18, 0.4) 100%)',
                  border: '1.5px solid #F97316',
                  boxShadow: '0 12px 30px rgba(249, 115, 22, 0.22), inset 0 0 20px rgba(249, 115, 22, 0.1)',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Carriage Roof Vent / Illumination Line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#F97316', boxShadow: '0 0 8px #F97316' }} />

                {/* Header & Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F97316', boxShadow: '0 0 6px #F97316' }} />
                    <strong style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>CodeChef</strong>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#F97316', background: 'rgba(249, 115, 22, 0.15)', padding: '2px 6px', borderRadius: '6px' }}>
                    {ccData.percentage}%
                  </span>
                </div>

                {/* Passenger / Computing Windows */}
                <div style={{ display: 'flex', gap: '6px', margin: '4px 0' }}>
                  <div style={carriageWindowSt('rgba(249, 115, 22, 0.35)')} />
                  <div style={carriageWindowSt('rgba(249, 115, 22, 0.35)')} />
                  <div style={carriageWindowSt('rgba(249, 115, 22, 0.35)')} />
                </div>

                {/* Solved Ratio Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#CBD5E1', marginBottom: '4px' }}>
                    <span style={{ color: '#F97316' }}>{ccData.solved} / {ccData.total}</span>
                    <span style={{ color: '#94A3B8', fontSize: '10px' }}>Solved</span>
                  </div>
                  <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.max(4, ccData.percentage)}%`, background: '#F97316', borderRadius: '3px', boxShadow: '0 0 8px #F97316' }} />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Wheel Assembly */}
            <div style={bogieAssemblySt}>
              <div style={wheelSt('#F97316')} />
              <div style={bogieFrameSt} />
              <div style={wheelSt('#F97316')} />
            </div>
          </div>

          {/* COUPLER 3 */}
          <div style={couplerSt} />

          {/* 4. CODEFORCES CARRIAGE */}
          <div style={{ position: 'relative', flex: 1, minWidth: '175px' }}>
            <Link href="/practice" style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  height: '140px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14) 0%, rgba(15, 23, 42, 0.98) 60%, rgba(30, 58, 138, 0.4) 100%)',
                  border: '1.5px solid #3B82F6',
                  boxShadow: '0 12px 30px rgba(59, 130, 246, 0.22), inset 0 0 20px rgba(59, 130, 246, 0.1)',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Carriage Roof Vent / Illumination Line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#3B82F6', boxShadow: '0 0 8px #3B82F6' }} />

                {/* Header & Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 6px #3B82F6' }} />
                    <strong style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>Codeforces</strong>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#3B82F6', background: 'rgba(59, 130, 246, 0.15)', padding: '2px 6px', borderRadius: '6px' }}>
                    {cfData.percentage}%
                  </span>
                </div>

                {/* Passenger / Computing Windows */}
                <div style={{ display: 'flex', gap: '6px', margin: '4px 0' }}>
                  <div style={carriageWindowSt('rgba(59, 130, 246, 0.35)')} />
                  <div style={carriageWindowSt('rgba(59, 130, 246, 0.35)')} />
                  <div style={carriageWindowSt('rgba(59, 130, 246, 0.35)')} />
                </div>

                {/* Solved Ratio Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#CBD5E1', marginBottom: '4px' }}>
                    <span style={{ color: '#3B82F6' }}>{cfData.solved} / {cfData.total}</span>
                    <span style={{ color: '#94A3B8', fontSize: '10px' }}>Solved</span>
                  </div>
                  <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.max(4, cfData.percentage)}%`, background: '#3B82F6', borderRadius: '3px', boxShadow: '0 0 8px #3B82F6' }} />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Wheel Assembly */}
            <div style={bogieAssemblySt}>
              <div style={wheelSt('#3B82F6')} />
              <div style={bogieFrameSt} />
              <div style={wheelSt('#3B82F6')} />
            </div>
          </div>

          {/* COUPLER 4 */}
          <div style={couplerSt} />

          {/* 5. GEEKSFORGEEKS CARRIAGE */}
          <div style={{ position: 'relative', flex: 1, minWidth: '160px', opacity: 0.75 }}>
            <div
              style={{
                height: '140px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.12) 0%, rgba(15, 23, 42, 0.98) 70%, rgba(30, 41, 59, 0.6) 100%)',
                border: '1.5px solid rgba(100, 116, 139, 0.4)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Carriage Roof Vent Line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#64748B' }} />

              {/* Header & Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={12} style={{ color: '#94A3B8' }} />
                  <strong style={{ fontSize: '13px', fontWeight: 800, color: '#94A3B8' }}>GFG</strong>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#94A3B8', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '6px' }}>
                  Locked
                </span>
              </div>

              {/* Tinted Armored Windows */}
              <div style={{ display: 'flex', gap: '6px', margin: '4px 0' }}>
                <div style={carriageWindowSt('rgba(100, 116, 139, 0.2)')} />
                <div style={carriageWindowSt('rgba(100, 116, 139, 0.2)')} />
                <div style={carriageWindowSt('rgba(100, 116, 139, 0.2)')} />
              </div>

              {/* Locked Label */}
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block' }}>
                  Coming Soon
                </span>
                <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.04)', marginTop: '4px' }} />
              </div>
            </div>

            {/* Wheel Assembly */}
            <div style={bogieAssemblySt}>
              <div style={wheelSt('#64748B')} />
              <div style={bogieFrameSt} />
              <div style={wheelSt('#64748B')} />
            </div>
          </div>

          {/* COUPLER 5 */}
          <div style={couplerSt} />

          {/* 6. SPECIAL REAR RAILWAY UTILITY / SERVICE CARRIAGE (NO "Guard's Van" text) */}
          <div style={{ position: 'relative', width: '135px', flexShrink: 0 }}>
            <div
              style={{
                height: '140px',
                borderRadius: '8px 24px 14px 6px',
                background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 70%, #090616 100%)',
                border: '1.5px solid rgba(168, 85, 247, 0.45)',
                boxShadow: '0 12px 30px rgba(168, 85, 247, 0.2), inset 0 0 18px rgba(168, 85, 247, 0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '12px 14px',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {/* Utility Roof Antennae & Marker Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #A855F7, #EF4444)',
                  boxShadow: '0 0 8px #A855F7',
                }}
              />

              {/* Rear Red Safety LED Lights */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '9px', fontWeight: 900, color: '#C084FC', letterSpacing: '0.08em' }}>
                  UTIL-09
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#EF4444',
                      boxShadow: '0 0 10px #EF4444, 0 0 18px #EF4444',
                    }}
                  />
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#EF4444',
                      boxShadow: '0 0 8px #EF4444',
                    }}
                  />
                </div>
              </div>

              {/* Utility Observation Porthole & Access Panels */}
              <div
                style={{
                  width: '100%',
                  height: '30px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.4)', border: '1px solid #A855F7' }} />
                <div style={{ width: '28px', height: '4px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0.1)' }} />
              </div>

              {/* Utility Status */}
              <div>
                <strong style={{ fontSize: '10px', fontWeight: 900, color: '#CBD5E1', display: 'block' }}>
                  TELEMETRY
                </strong>
                <span style={{ fontSize: '9px', color: '#10B981', fontWeight: 700 }}>Telemetry Online</span>
              </div>
            </div>

            {/* Wheel Assembly */}
            <div style={bogieAssemblySt}>
              <div style={wheelSt('#A855F7')} />
              <div style={bogieFrameSt} />
              <div style={wheelSt('#A855F7')} />
            </div>
          </div>
        </div>

        {/* ── THE CONTINUOUS STEEL RAILWAY TRACK & SLEEPERS ───────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '10px',
            right: '10px',
            height: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Upper Steel Rail (Polished Metallic) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, #64748B 0%, #CBD5E1 30%, #F1F5F9 50%, #CBD5E1 70%, #64748B 100%)',
              boxShadow: '0 0 6px rgba(203, 213, 225, 0.5), 0 2px 4px rgba(0,0,0,0.8)',
              zIndex: 3,
            }}
          />

          {/* Sleepers / Ties Row (Regularly Spaced Wood/Concrete Ties) */}
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 4px',
              zIndex: 1,
            }}
          >
            {Array.from({ length: 42 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '10px',
                  height: '20px',
                  borderRadius: '2px',
                  background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
                }}
              />
            ))}
          </div>

          {/* Lower Steel Rail (Polished Metallic) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '4px',
              marginTop: '8px',
              background: 'linear-gradient(90deg, #475569 0%, #94A3B8 30%, #E2E8F0 50%, #94A3B8 70%, #475569 100%)',
              boxShadow: '0 0 6px rgba(148, 163, 184, 0.4), 0 2px 6px rgba(0,0,0,0.9)',
              zIndex: 3,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── TRAIN SUB-COMPONENT STYLES ─────────────────────────────────────────

// Wheel Assembly (Bogies) firmly touching the rails
const bogieAssemblySt: React.CSSProperties = {
  position: 'absolute',
  bottom: '-16px',
  left: '12px',
  right: '12px',
  height: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 4,
};

function wheelSt(glowColor: string): React.CSSProperties {
  return {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #94A3B8 0%, #1E293B 70%, #020617 100%)',
    border: '2px solid #64748B',
    boxShadow: `0 0 8px ${glowColor}66, 0 4px 6px rgba(0,0,0,0.8)`,
    position: 'relative',
  };
}

const bogieFrameSt: React.CSSProperties = {
  flex: 1,
  height: '4px',
  background: '#334155',
  border: '1px solid #1E293B',
  margin: '0 2px',
};

// Coupler connecting adjacent carriages
const couplerSt: React.CSSProperties = {
  width: '18px',
  height: '6px',
  borderRadius: '2px',
  background: 'linear-gradient(180deg, #64748B 0%, #1E293B 100%)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  marginBottom: '42px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
  flexShrink: 0,
  zIndex: 2,
};

function carriageWindowSt(glowBg: string): React.CSSProperties {
  return {
    flex: 1,
    height: '22px',
    borderRadius: '4px',
    background: glowBg,
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: `inset 0 0 6px ${glowBg}`,
  };
}
