'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  Sparkles,
  ArrowUpRight,
  Zap,
  Radio,
} from 'lucide-react';
import { PlatformTrainJourney, PlatformTrainNode } from '../services/dashboard-adapter.service';
import { useSettings } from '@/src/context/SettingsContext';

interface PlatformTrainJourneysProps {
  platformTrains: PlatformTrainJourney[];
}

/**
 * Large futuristic aerodynamic bullet locomotive.
 * Features glowing headlamps, cockpit glass, energy reactor conduit, and steel wheels seated on the track.
 */
function LargeFuturisticLocomotive({ color }: { color: string }) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: isLight ? `drop-shadow(0 4px 12px ${color}66)` : `drop-shadow(0 0 16px ${color}BB)`,
        position: 'relative',
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Headlight Beam Effect */}
      <div
        style={{
          position: 'absolute',
          right: '-28px',
          top: '16px',
          width: '32px',
          height: '14px',
          background: `linear-gradient(90deg, #FFFFFF 0%, ${color}88 40%, transparent 100%)`,
          clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)',
          opacity: 0.85,
          pointerEvents: 'none',
        }}
      />

      <svg
        width="82"
        height="44"
        viewBox="0 0 82 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Aerodynamic Engine Hull */}
        <path
          d="M80 30L68 14C66 11.5 63 10 59.5 10H16C13 10 10.5 12 9.5 15L6 30H80Z"
          fill={`url(#loco-hull-${color.replace('#', '')})`}
          stroke={color}
          strokeWidth="2"
        />

        {/* Cockpit Canopy Windshield */}
        <path
          d="M60 12L53 12L49 18H62.5L60 12Z"
          fill={isLight ? '#E2E8F0' : '#1E293B'}
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M46 12H30L28 18H46V12Z"
          fill={isLight ? '#E2E8F0' : '#1E293B'}
          stroke={color}
          strokeWidth="1.5"
        />

        {/* High-Tech Reactor Core Line */}
        <rect x="24" y="22" width="18" height="3.5" rx="1.75" fill={color} />
        <rect x="45" y="22" width="14" height="3.5" rx="1.75" fill={color} />

        {/* Forward High-Intensity Dual Headlamps */}
        <circle cx="76" cy="24" r="3.5" fill="#FFF" />
        <circle cx="77" cy="24" r="1.5" fill={color} />

        {/* Chassis & Wheels seated on rail */}
        <rect x="4" y="29" width="74" height="5" rx="2" fill={isLight ? '#CBD5E1' : '#1E293B'} stroke={color} strokeWidth="1.5" />
        <circle cx="16" cy="36" r="5.5" fill={isLight ? '#F8FAFC' : '#0F172A'} stroke="#94A3B8" strokeWidth="2" />
        <circle cx="16" cy="36" r="2" fill={color} />
        <circle cx="32" cy="36" r="5.5" fill={isLight ? '#F8FAFC' : '#0F172A'} stroke="#94A3B8" strokeWidth="2" />
        <circle cx="32" cy="36" r="2" fill={color} />
        <circle cx="48" cy="36" r="5.5" fill={isLight ? '#F8FAFC' : '#0F172A'} stroke="#94A3B8" strokeWidth="2" />
        <circle cx="48" cy="36" r="2" fill={color} />
        <circle cx="64" cy="36" r="5.5" fill={isLight ? '#F8FAFC' : '#0F172A'} stroke="#94A3B8" strokeWidth="2" />
        <circle cx="64" cy="36" r="2" fill={color} />

        {/* Rear Coupler */}
        <rect x="0" y="25" width="7" height="5" rx="1.5" fill={color} />

        <defs>
          <linearGradient
            id={`loco-hull-${color.replace('#', '')}`}
            x1="6"
            y1="10"
            x2="80"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} stopOpacity="0.95" />
            <stop offset="0.6" stopColor={color} stopOpacity="0.45" />
            <stop offset="1" stopColor={isLight ? '#F1F5F9' : '#1E293B'} />
          </linearGradient>
        </defs>
      </svg>

      {/* Train Engine Identifier Label */}
      <div
        style={{
          marginTop: '-4px',
          background: isLight ? '#FFFFFF' : 'var(--surface)',
          border: `1px solid ${color}88`,
          boxShadow: isLight ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
          borderRadius: '4px',
          padding: '1px 6px',
          fontSize: '9px',
          fontWeight: 900,
          color: color,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        EXPRESS ENGINE
      </div>
    </motion.div>
  );
}

/**
 * Visual Special Rear Railway Utility/Service Carriage.
 * Features a distinct utility silhouette, roof antennae, platform accent lighting,
 * and dual red safety LED tail lights. (NO "Guard's Van" / "Brake Van" text).
 */
function RearUtilityCarriageNode({ color }: { color: string }) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 5,
      }}
      title="Rear Railway Utility & Telemetry Service Carriage"
    >
      {/* Top Telemetry Beacon Tag */}
      <div
        style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: '#EF4444',
          fontSize: '9px',
          fontWeight: 900,
          padding: '2px 6px',
          borderRadius: '4px',
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        <Radio size={10} style={{ color: '#EF4444' }} /> SERVICE
      </div>

      {/* Carriage Main Hull */}
      <div
        style={{
          minWidth: '58px',
          height: '52px',
          borderRadius: '8px 16px 10px 4px',
          background: isLight
            ? `linear-gradient(135deg, ${color}20 0%, #FFFFFF 60%, #F1F5F9 100%)`
            : `linear-gradient(135deg, ${color}25 0%, rgba(30, 41, 59, 0.98) 60%, rgba(15, 23, 42, 1) 100%)`,
          border: isLight ? `1.5px solid ${color}66` : `1.5px solid ${color}88`,
          boxShadow: isLight
            ? `0 4px 14px ${color}15`
            : `0 8px 24px ${color}20, inset 0 0 12px ${color}15`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 8px',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Roof Antenna / Line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: color }} />

        {/* Observation Porthole & Access Panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', justifyContent: 'center' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: `${color}40`, border: `1px solid ${color}` }} />
          <div style={{ width: '18px', height: '3px', borderRadius: '2px', background: isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)' }} />
        </div>

        {/* Dual Red Safety Tail Lights */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px #EF4444' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px #EF4444' }} />
        </div>
      </div>

      {/* Bogie Wheel Assembly Firmly Seated on Track */}
      <div style={carriageBogieAssemblySt}>
        <div style={bogieWheelSt(color, isLight)} />
        <div style={bogieAxleBarSt(isLight)} />
        <div style={bogieWheelSt(color, isLight)} />
      </div>

      {/* Carriage Subtitle */}
      <span
        style={{
          fontSize: '10px',
          color: isLight ? 'var(--text-secondary)' : '#94A3B8',
          fontWeight: 700,
          marginTop: '2px',
        }}
      >
        UTIL-END
      </span>
    </div>
  );
}

export function PlatformTrainJourneys({ platformTrains }: PlatformTrainJourneysProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  if (!platformTrains || platformTrains.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      {/* ── SECTION HEADER ────────────────────────────────────────── */}
      <div
        style={{
          padding: '18px 24px',
          borderRadius: '20px',
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'
            : 'var(--card)',
          border: isLight
            ? '1.5px solid var(--border)'
            : '1px solid var(--border)',
          boxShadow: isLight
            ? '0 8px 24px rgba(0, 0, 0, 0.05)'
            : '0 8px 32px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--primary-bg, rgba(16, 185, 129, 0.15))',
              border: '1.5px solid var(--primary, #10B981)',
              boxShadow: '0 0 16px var(--accent-glow, rgba(16, 185, 129, 0.4))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={22} style={{ color: 'var(--primary, #10B981)' }} />
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              ✦ PLATFORM CAMPAIGN JOURNEYS
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginTop: '2px' }}>
              Three independent futuristic railways traveling across LeetCode, CodeChef, and Codeforces
            </span>
          </div>
        </div>

        <Link
          href="/journey"
          style={{
            fontSize: '13px',
            color: 'var(--primary, #10B981)',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--panel-border, rgba(255, 255, 255, 0.1))',
            transition: 'all 0.2s ease',
          }}
        >
          Platform Progression <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* ── 3 SEPARATE LARGE PLATFORM JOURNEY PANELS ───────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {platformTrains.map((train) => (
          <LargePlatformTrainPanel key={train.platformKey} train={train} />
        ))}
      </div>
    </div>
  );
}

function LargePlatformTrainPanel({ train }: { train: PlatformTrainJourney }) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const scrollRef = useRef<HTMLDivElement>(null);
  const pct = train.totalProblems > 0 ? Math.round((train.solvedProblems / train.totalProblems) * 100) : 0;

  // Find index of the active station
  const currentIdx = train.nodes.findIndex((n) => n.isCurrent);
  const activeStationIndex = currentIdx >= 0 ? currentIdx : 0;

  return (
    <div
      style={{
        padding: '24px 28px 28px 28px',
        borderRadius: '24px',
        background: isLight
          ? `linear-gradient(135deg, #FFFFFF 0%, ${train.color}08 50%, #F8FAFC 100%)`
          : `radial-gradient(ellipse at 15% 15%, ${train.color}18 0%, var(--card) 75%)`,
        border: isLight
          ? `1.5px solid ${train.color}40`
          : `1.5px solid ${train.color}55`,
        boxShadow: isLight
          ? `0 10px 30px ${train.color}10, 0 2px 8px rgba(0, 0, 0, 0.04)`
          : `0 14px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── 1. HEADER & METRIC SUMMARY ────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: isLight ? `1px solid ${train.color}20` : '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px',
          zIndex: 2,
        }}
      >
        {/* Left: Platform Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: train.color,
              boxShadow: `0 0 14px ${train.color}`,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary, #FFF)', letterSpacing: '0.03em' }}>
                {train.name}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  color: train.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  background: `${train.color}1A`,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: `1px solid ${train.color}40`,
                }}
              >
                {train.tagline}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary, #94A3B8)', fontWeight: 600, display: 'block', marginTop: '4px' }}>
              {train.subtitle}
            </span>
          </div>
        </div>

        {/* Right: Explicit Distinct Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {/* Current Campaign Realm */}
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.03)',
              border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              boxShadow: isLight ? '0 2px 6px rgba(0,0,0,0.03)' : 'none',
            }}
          >
            <span style={{ fontSize: '10px', color: 'var(--text-muted, #94A3B8)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Current Realm / Division
            </span>
            <strong style={{ fontSize: '13px', color: 'var(--text-primary, #FFF)', fontWeight: 900 }}>
              {train.currentStationTitle}
            </strong>
          </div>

          {/* Problem Catalog Solved Progress */}
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              background: `${train.color}15`,
              border: `1px solid ${train.color}35`,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minWidth: '150px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: isLight ? '#475569' : '#CBD5E1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Problem Progress
              </span>
              <strong style={{ fontSize: '11px', color: train.color, fontWeight: 900 }}>
                {pct}%
              </strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary, #FFF)', fontWeight: 900 }}>
                {train.solvedProblems}
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', fontWeight: 600 }}>
                / {train.totalProblems} Problems
              </span>
            </div>
            {/* Slim progress bar */}
            <div
              style={{
                width: '100%',
                height: '4px',
                borderRadius: '2px',
                background: isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                marginTop: '2px',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: train.color,
                  boxShadow: `0 0 8px ${train.color}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. PROMINENT RAILWAY TRACK & CONNECTED CARRIAGES ────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          padding: '16px 8px 30px 8px',
        }}
      >
        {/* Continuous Steel Railway Track System */}
        <div
          style={{
            position: 'absolute',
            bottom: '38px',
            left: '8px',
            right: '8px',
            height: '24px',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          {/* Upper Metallic Steel Rail (with subtle platform glow) */}
          <div
            style={{
              height: '4px',
              background: `linear-gradient(90deg, #64748B 0%, #CBD5E1 30%, ${train.color} 50%, #CBD5E1 70%, #64748B 100%)`,
              width: '100%',
              borderRadius: '2px',
              boxShadow: isLight
                ? `0 1px 4px ${train.color}33`
                : `0 0 8px ${train.color}55, 0 2px 4px rgba(0,0,0,0.5)`,
              zIndex: 3,
            }}
          />

          {/* Heavy Railway Sleepers / Ties Row */}
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
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '18px',
                  borderRadius: '2px',
                  background: isLight
                    ? 'linear-gradient(180deg, #E2E8F0 0%, #CBD5E1 100%)'
                    : 'linear-gradient(180deg, #334155 0%, #1E293B 100%)',
                  border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.08)' : '0 2px 4px rgba(0, 0, 0, 0.35)',
                }}
              />
            ))}
          </div>

          {/* Lower Metallic Steel Rail */}
          <div
            style={{
              height: '4px',
              background: 'linear-gradient(90deg, #475569 0%, #94A3B8 30%, #E2E8F0 50%, #94A3B8 70%, #475569 100%)',
              width: '100%',
              borderRadius: '2px',
              boxShadow: isLight
                ? '0 1px 3px rgba(0,0,0,0.1)'
                : '0 2px 4px rgba(0,0,0,0.5)',
              zIndex: 3,
            }}
          />
        </div>

        {/* Horizontal Railway Fleet Corridor */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0px',
            position: 'relative',
            zIndex: 2,
            minWidth: '100%',
            paddingBottom: '12px',
          }}
        >
          {/* Station Carriages & Progress-Driven Locomotive */}
          {train.nodes.map((node, index) => {
            const isJustBeforeActive = index === activeStationIndex;

            return (
              <React.Fragment key={node.id}>
                {/* Dynamically positioned Locomotive pulling at the active current station */}
                {isJustBeforeActive && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      marginRight: '6px',
                      marginBottom: '10px',
                      flexShrink: 0,
                    }}
                  >
                    <LargeFuturisticLocomotive color={train.color} />
                    {/* Coupler connecting Locomotive to Active Station */}
                    <div style={stationCouplerSt(train.color, true, isLight)} />
                  </div>
                )}

                {/* Substantial Station Carriage Node */}
                <StationPlatformNode node={node} color={train.color} totalStations={train.totalStations} />

                {/* Heavy Coupler Connector to Next Station */}
                {index < train.nodes.length - 1 && !isJustBeforeActive && (
                  <div style={stationCouplerSt(train.color, node.isCompleted, isLight)} />
                )}
              </React.Fragment>
            );
          })}

          {/* Coupler to Final Rear Carriage */}
          <div style={stationCouplerSt(train.color, false, isLight)} />

          {/* SPECIAL FINAL REAR UTILITY / SERVICE CARRIAGE */}
          <RearUtilityCarriageNode color={train.color} />
        </div>
      </div>
    </div>
  );
}

/**
 * Substantial Station Platform / Carriage Node.
 * Clearly renders 2-digit number, station platform base, status indicator,
 * bogie wheels seated on rail, and title.
 */
function StationPlatformNode({
  node,
  color,
  totalStations,
}: {
  node: PlatformTrainNode;
  color: string;
  totalStations: number;
}) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const formattedNumber = node.number < 10 ? `0${node.number}` : `${node.number}`;

  return (
    <Link
      href={node.url}
      style={{ textDecoration: 'none', flexShrink: 0 }}
      title={`Station ${node.number}: ${node.title} (${node.solvedCount}/${node.totalCount} Solved)`}
    >
      <motion.div
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          paddingBottom: '2px',
        }}
      >
        {/* Top Floating "CURRENT" Banner for Active Station */}
        {node.isCurrent ? (
          <div
            style={{
              background: color,
              color: '#FFFFFF',
              fontSize: '9px',
              fontWeight: 900,
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.08em',
              boxShadow: `0 0 10px ${color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Zap size={10} style={{ fill: '#FFFFFF' }} /> CURRENT
          </div>
        ) : (
          <div style={{ height: '18px' }} />
        )}

        {/* Main Station Carriage Body */}
        <div
          style={{
            minWidth: node.isCurrent ? '58px' : totalStations <= 8 ? '68px' : '52px',
            height: node.isCurrent ? '54px' : totalStations <= 8 ? '54px' : '48px',
            borderRadius: '12px',
            background: node.isCompleted
              ? `linear-gradient(135deg, ${color}F0, ${color}CC)`
              : node.isCurrent
              ? isLight
                ? `linear-gradient(135deg, ${color}25, #FFFFFF)`
                : `linear-gradient(135deg, ${color}45, ${color}15)`
              : isLight
              ? '#FFFFFF'
              : 'rgba(255, 255, 255, 0.04)',
            border: node.isCompleted
              ? `2px solid ${color}`
              : node.isCurrent
              ? `2.5px solid ${color}`
              : isLight
              ? '1.5px solid #CBD5E1'
              : '1.5px solid rgba(255, 255, 255, 0.12)',
            boxShadow: node.isCompleted
              ? `0 0 16px ${color}66, inset 0 1px 0 rgba(255,255,255,0.4)`
              : node.isCurrent
              ? `0 0 24px ${color}66, inset 0 1px 0 rgba(255,255,255,0.2)`
              : isLight
              ? '0 2px 6px rgba(0,0,0,0.04)'
              : 'inset 0 1px 0 rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
            margin: node.isCurrent ? '0 4px' : '0',
          }}
        >
          {node.isCompleted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
              <Check size={16} strokeWidth={3.8} style={{ color: '#FFFFFF' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                {formattedNumber}
              </span>
            </div>
          ) : (
            <span
              style={{
                fontSize: node.isCurrent ? '16px' : '13px',
                fontWeight: 900,
                color: node.isCurrent ? (isLight ? color : '#FFF') : isLight ? '#64748B' : '#94A3B8',
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              {formattedNumber}
            </span>
          )}
        </div>

        {/* Bogie Wheel Assembly Firmly Seated on Rail */}
        <div style={carriageBogieAssemblySt}>
          <div style={bogieWheelSt(color, isLight)} />
          <div style={bogieAxleBarSt(isLight)} />
          <div style={bogieWheelSt(color, isLight)} />
        </div>

        {/* Station Name Label below Carriage */}
        <span
          style={{
            fontSize: '10px',
            color: node.isCurrent
              ? isLight
                ? '#0F172A'
                : '#FFF'
              : isLight
              ? '#475569'
              : '#64748B',
            fontWeight: node.isCurrent ? 800 : 600,
            maxWidth: '68px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            marginTop: '2px',
          }}
        >
          {node.title.replace('Kingdom of ', '').replace(' Division', '')}
        </span>
      </motion.div>
    </Link>
  );
}

// ── RAILWAY SUB-COMPONENT STYLES ───────────────────────────────────────

// Wheel assembly under each carriage firmly touching the rail
const carriageBogieAssemblySt: React.CSSProperties = {
  width: '42px',
  height: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '2px',
  zIndex: 3,
};

function bogieWheelSt(color: string, isLight: boolean = false): React.CSSProperties {
  return {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: isLight
      ? 'radial-gradient(circle at 35% 35%, #F8FAFC 0%, #CBD5E1 70%, #94A3B8 100%)'
      : 'radial-gradient(circle at 35% 35%, #CBD5E1 0%, #334155 70%, #1E293B 100%)',
    border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid #64748B',
    boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.1)' : `0 0 6px ${color}55, 0 2px 4px rgba(0,0,0,0.5)`,
  };
}

function bogieAxleBarSt(isLight: boolean = false): React.CSSProperties {
  return {
    flex: 1,
    height: '3px',
    background: isLight ? '#CBD5E1' : '#334155',
    border: isLight ? '1px solid #94A3B8' : '1px solid #1E293B',
    margin: '0 2px',
  };
}

// Coupler connecting adjacent carriages
function stationCouplerSt(color: string, isCompleted: boolean, isLight: boolean = false): React.CSSProperties {
  return {
    width: '16px',
    height: '4px',
    borderRadius: '2px',
    background: isCompleted ? color : isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.16)',
    boxShadow: isCompleted ? `0 0 8px ${color}88` : 'none',
    marginBottom: '32px',
    flexShrink: 0,
    transition: 'background 0.2s ease',
  };
}
