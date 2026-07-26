'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { worlds, WorldInfo } from './worldData';
import { X, BookOpen, Activity, AlertTriangle, Shield, HelpCircle, Lock, Award, Key } from 'lucide-react';
import { Button, Card, Badge, ProgressBar } from '@/src/components/ui';
import { colors, typography, spacing, radius, shadows } from '@/src/design';
import { drawerRight } from '@/src/core/motion';
import Link from 'next/link';

interface JourneyNodeDrawerProps {
  world: WorldInfo | null;
  status: 'completed' | 'current' | 'locked';
  progress: number;
  onClose: () => void;
}

export function JourneyNodeDrawer({ world, status, progress, onClose }: JourneyNodeDrawerProps) {
  if (!world) return null;

  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';

  // Get previous world details if applicable
  const prevWorld = world.id > 1 ? worlds[world.id - 1] : null;

  // Patterns mock data mapped to each world for learning path view
  const worldPatterns: Record<number, string[]> = {
    1: ['Syntax Basics', 'Variables', 'Control Flow'],
    2: ['Primes', 'GCD', 'Modular Arithmetic'],
    3: ['Call Stacks', 'Base Cases', 'Tail Recursion'],
    4: ['Arrays 1D', 'Subarrays', 'Prefix Sums'],
    5: ['Hash Functions', 'Collisions', 'Hash Maps'],
  };

  const patterns = worldPatterns[world.id] || ['Core Fundamentals', 'Advanced Techniques', 'World Boss Challenges'];

  // 1. Locked World Drawer view
  if (isLocked) {
    return (
      <motion.div
        variants={drawerRight}
        initial="initial"
        animate="animate"
        exit="initial"
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '420px',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: `1px solid ${colors.border}`,
          padding: spacing.xl,
          boxShadow: shadows.xl,
          zIndex: 100,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.lg,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge variant="hard">LOCKED</Badge>
          <Button variant="ghost" onClick={onClose} style={{ padding: spacing.sm, height: '36px', width: '36px' }}>
            <X size={20} color={colors.foreground} />
          </Button>
        </div>

        <div style={{ textAlign: 'center', padding: `${spacing.xl} 0` }}>
          <div style={{ width: '80px', height: '80px', borderRadius: radius.full, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: colors.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={36} />
          </div>
          <h2 style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, margin: `0 0 ${spacing.xs} 0`, color: colors.foreground }}>
            {world.name}
          </h2>
          <span style={{ fontSize: typography.fontSize.caption, color: colors.muted, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {world.biome}
          </span>
        </div>

        <Card padding="md" style={{ border: `1px solid ${colors.border}`, backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <h4 style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, margin: `0 0 ${spacing.md} 0`, color: colors.foreground }}>
            Unlock Requirements
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <Key size={16} color={colors.primary} />
              <div style={{ fontSize: typography.fontSize.caption, color: colors.muted }}>
                Complete: <strong style={{ color: colors.foreground }}>{prevWorld ? prevWorld.name : 'Previous World'}</strong>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <Award size={16} color="#eab308" />
              <div style={{ fontSize: typography.fontSize.caption, color: colors.muted }}>
                Required XP: <strong style={{ color: colors.foreground }}>{world.id * 300} XP</strong>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <BookOpen size={16} color={colors.success} />
              <div style={{ fontSize: typography.fontSize.caption, color: colors.muted }}>
                Required Problems: <strong style={{ color: colors.foreground }}>{world.id * 5} Remaining</strong>
              </div>
            </div>
          </div>
        </Card>

        <Button disabled variant="outline" size="lg" style={{ width: '100%', marginTop: 'auto' }}>
          Realm Locked
        </Button>
      </motion.div>
    );
  }

  // 2. Completed / Current World Drawer view
  return (
    <motion.div
      variants={drawerRight}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '420px',
        height: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderLeft: `1px solid ${colors.border}`,
        padding: spacing.xl,
        boxShadow: shadows.xl,
        zIndex: 100,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.lg,
      }}
    >
      {/* Drawer Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Badge variant={isCompleted ? "easy" : "primary"}>
          {isCompleted ? "Completed" : "Current Frontier"}
        </Badge>
        <Button variant="ghost" onClick={onClose} style={{ padding: spacing.sm, height: '36px', width: '36px' }}>
          <X size={20} color={colors.foreground} />
        </Button>
      </div>

      {/* World Identity */}
      <div>
        <span style={{ fontSize: typography.fontSize.label, color: colors.muted, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {world.biome}
        </span>
        <h2 style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, margin: `4px 0 ${spacing.sm} 0`, color: colors.foreground }}>
          {world.name}
        </h2>
        <p style={{ color: colors.muted, lineHeight: 1.6, fontSize: typography.fontSize.caption, margin: 0 }}>
          Master the unique biomes of {world.name} by tackling patterns, code challenges, and defeating the World Boss.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md }}>
        <Card padding="md" style={{ backgroundColor: colors.background }}>
          <div style={{ color: colors.muted, fontSize: typography.fontSize.label, marginBottom: spacing.xs, textTransform: 'uppercase', fontWeight: typography.fontWeight.bold }}>World Progress</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <span style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: world.themeColor }}>{progress}%</span>
            <ProgressBar progress={progress} color={world.themeColor} height={4} />
          </div>
        </Card>
        <Card padding="md" style={{ backgroundColor: colors.background }}>
          <div style={{ color: colors.muted, fontSize: typography.fontSize.label, marginBottom: spacing.xs, textTransform: 'uppercase', fontWeight: typography.fontWeight.bold }}>Reward XP</div>
          <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: '#eab308' }}>+{world.rewardXp} XP</div>
        </Card>
      </div>

      {/* World Boss Card */}
      <Card padding="md" style={{ borderLeft: `3px solid #f59e0b`, backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#f59e0b' }}>
          <Shield size={16} color="#f59e0b" />
          <span style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.bold }}>World Boss Target</span>
        </div>
        <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: colors.foreground }}>
          {world.boss}
        </div>
        <p style={{ margin: '4px 0 0 0', fontSize: typography.fontSize.caption, color: colors.muted }}>
          Unlocks upon completing all preceding patterns in the realm.
        </p>
      </Card>

      {/* Patterns Checklist */}
      <div>
        <h4 style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, margin: `0 0 ${spacing.sm} 0`, color: colors.foreground }}>
          Patterns in this Biome
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          {patterns.map((pat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: spacing.md, padding: spacing.sm, backgroundColor: colors.background, borderRadius: radius.md, border: `1px solid ${colors.border}` }}>
              <div style={{ width: '8px', height: '8px', borderRadius: radius.full, backgroundColor: world.themeColor }}></div>
              <span style={{ fontSize: typography.fontSize.caption, color: colors.foreground, fontWeight: typography.fontWeight.medium }}>{pat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Coach recommendation */}
      <Card padding="md" style={{ borderLeft: `3px solid ${colors.primary}`, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: colors.primary }}>
          <HelpCircle size={16} />
          <span style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.bold }}>AI Coach Tip</span>
        </div>
        <p style={{ margin: 0, fontSize: typography.fontSize.caption, color: colors.foreground, lineHeight: 1.5 }}>
          &quot;Ensure you spend time understanding the math behind array ranges before trying to tackle Prefix Sums.&quot;
        </p>
      </Card>

      {/* Drawer Action CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginTop: 'auto', paddingTop: spacing.lg }}>
        <Button asChild variant="primary" size="lg" style={{ width: '100%' }}>
          <Link href={`/learn`}>
            <BookOpen size={18} style={{ marginRight: spacing.sm }} /> Start Learning
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" style={{ width: '100%' }}>
          <Link href={`/practice`}>
            <Activity size={18} style={{ marginRight: spacing.sm }} /> Practice Arena
          </Link>
        </Button>
      </div>

    </motion.div>
  );
}
