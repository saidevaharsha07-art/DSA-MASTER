'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Target,
  Zap,
  RotateCcw,
  Bot,
  Brain,
  Map,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { colors, spacing, typography, radius, animations } from "@/src/design";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { ProgressRing } from "@/src/components/ui/ProgressRing";

export function ContextPanel() {
  const pathname = usePathname();

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: typography.fontSize.label,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase' as const,
    color: colors.muted,
    letterSpacing: '0.05em',
  };

  const renderDashboardContext = () => (
    <>
      <div style={sectionStyle}>
        <span style={labelStyle}>
          <Target size={14} /> Daily Mission
        </span>
        <Card style={{ padding: spacing.md }}>
          <p style={{ margin: `0 0 ${spacing.sm} 0`, fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.semibold, color: colors.foreground }}>Solve 2 Sliding Window problems</p>
          <div style={{ height: '6px', background: colors.mutedBg, borderRadius: radius.full, overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: colors.primary, transition: `width ${animations.transition.normal}` }}></div>
          </div>
          <p style={{ color: colors.muted, fontSize: typography.fontSize.label, textAlign: 'right', marginTop: spacing.xs, margin: 0 }}>1/2 Completed</p>
        </Card>
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>
          <Zap size={14} /> Today&apos;s XP
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: spacing.sm }}>
          <span style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.foreground, margin: 0 }}>240</span>
          <span style={{ color: colors.muted, fontSize: typography.fontSize.caption }}>XP earned</span>
        </div>
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>
          <RotateCcw size={14} /> Revision Due
        </span>
        <Card style={{ padding: spacing.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
            <span style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.semibold, color: colors.foreground }}>12 Items Pending</span>
            <Badge variant="hard">High</Badge>
          </div>
          <p style={{ color: colors.muted, fontSize: typography.fontSize.label, margin: 0 }}>Includes Two Pointers and Prefix Sum</p>
        </Card>
      </div>
      
      <div style={sectionStyle}>
        <span style={labelStyle}>
          <Bot size={14} /> AI Coach
        </span>
        <Card style={{ padding: spacing.md, background: colors.primaryBg, borderColor: colors.primaryBg }}>
          <p style={{ margin: 0, fontSize: typography.fontSize.caption, color: colors.primary, lineHeight: 1.5 }}>
            &quot;You struggled with edge cases on Subarray Sum last time. Remember to initialize your hash map with `{`0: 1`}`.&quot;
          </p>
        </Card>
      </div>
    </>
  );

  const renderJourneyContext = () => (
    <>
      <div style={sectionStyle}>
        <span style={labelStyle}>
          <Map size={14} /> Current World
        </span>
        <Card style={{ padding: spacing.md }}>
          <h4 style={{ margin: 0, fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: colors.foreground }}>Array Valley</h4>
          <p style={{ color: colors.muted, margin: `${spacing.xs} 0 0`, fontSize: typography.fontSize.label }}>Exploring Prefix Sums</p>
        </Card>
      </div>
      
      <div style={sectionStyle}>
        <span style={labelStyle}>
          <Trophy size={14} /> Completion
        </span>
        <Card style={{ padding: spacing.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: spacing.sm }}>
            <span style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: colors.primary, margin: 0 }}>14%</span>
            <span style={{ color: colors.muted, fontSize: typography.fontSize.label }}>of roadmap</span>
          </div>
          <div style={{ height: '6px', background: colors.mutedBg, borderRadius: radius.full, overflow: 'hidden' }}>
            <div style={{ width: '14%', height: '100%', background: colors.primary, transition: `width ${animations.transition.normal}` }}></div>
          </div>
        </Card>
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>
          <CheckCircle2 size={14} /> Next Unlock
        </span>
        <Card style={{ padding: spacing.md, opacity: 0.7 }}>
          <h4 style={{ margin: 0, fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.bold, color: colors.foreground }}>Two Pointers</h4>
          <p style={{ color: colors.muted, margin: `${spacing.xs} 0 0`, fontSize: typography.fontSize.label }}>Master Sliding Window to unlock.</p>
        </Card>
      </div>
    </>
  );

  const renderPatternContext = () => (
    <>
      <div style={sectionStyle}>
        <span style={labelStyle}>
          <Brain size={14} /> Pattern Mastery
        </span>
        <Card style={{ padding: spacing.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: spacing.sm }}>
            <span style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: colors.success, margin: 0 }}>85%</span>
          </div>
          <div style={{ height: '6px', background: colors.mutedBg, borderRadius: radius.full, overflow: 'hidden' }}>
            <div style={{ width: '85%', height: '100%', background: colors.success, transition: `width ${animations.transition.normal}` }}></div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm, marginBottom: spacing.xl }}>
        <Card style={{ padding: spacing.sm }}>
          <span style={{ display: 'block', color: colors.muted, fontSize: '10px', textTransform: 'uppercase', fontWeight: typography.fontWeight.bold, marginBottom: spacing.xs }}>Difficulty</span>
          <Badge variant="medium">Medium</Badge>
        </Card>
        <Card style={{ padding: spacing.sm }}>
          <span style={{ display: 'block', color: colors.muted, fontSize: '10px', textTransform: 'uppercase', fontWeight: typography.fontWeight.bold, marginBottom: spacing.xs }}>Time</span>
          <span style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.bold, display: 'flex', alignItems: 'center', gap: spacing.xs, color: colors.foreground }}><Clock size={12}/> 4h</span>
        </Card>
      </div>
      
      <div style={sectionStyle}>
        <span style={labelStyle}>
          <BookOpen size={14} /> Related Patterns
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          <Card interactive style={{ padding: spacing.sm, fontSize: typography.fontSize.caption, cursor: 'pointer', color: colors.foreground }}>Sliding Window</Card>
          <Card interactive style={{ padding: spacing.sm, fontSize: typography.fontSize.caption, cursor: 'pointer', color: colors.foreground }}>Two Pointers</Card>
        </div>
      </div>
    </>
  );

  const renderDefaultContext = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: spacing.md, color: colors.muted }}>
      <Bot size={48} style={{ opacity: 0.2 }} />
      <p style={{ fontSize: typography.fontSize.caption, maxWidth: '200px', margin: 0 }}>Context panel updates dynamically based on your active route.</p>
    </div>
  );

  let content = renderDefaultContext();
  if (pathname === '/dashboard') content = renderDashboardContext();
  else if (pathname === '/journey') content = renderJourneyContext();
  else if (pathname?.includes('/topic') || pathname?.includes('/learn') || pathname?.includes('/problems')) content = renderPatternContext();

  return (
    <aside style={{
      width: '320px',
      backgroundColor: colors.card,
      borderLeft: `1px solid ${colors.border}`,
      padding: spacing.xl,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      fontFamily: typography.fontFamily.sans,
    }}>
      {content}
    </aside>
  );
}
