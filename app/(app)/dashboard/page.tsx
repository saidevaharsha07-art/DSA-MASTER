'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Map as MapIcon, 
  RotateCcw, 
  BrainCircuit, 
  ArrowRight,
  Sparkles,
  Flame,
  BookOpen,
  Bot,
  Star,
  LineChart,
  Award,
  Lightbulb,
  TrendingUp,
  Zap,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { memoryEngine } from '@/src/engines/memory';
import { DashboardLayout } from '@/src/components/layouts/DashboardLayout';
import { Button, Card, Badge, ProgressBar } from '@/src/components/ui';
import { colors, typography, spacing, radius } from '@/src/design';
import { slideUp, staggerContainer } from '@/src/core/motion';
import { useSettings } from '@/src/context/SettingsContext';

export default function Dashboard() {
  const { settings } = useSettings();
  const user = memoryEngine.getUserProfile();
  const weakestPattern = memoryEngine.getWeakestPattern();
  const dueRevisions = memoryEngine.getDueRevisions();
  
  const isNewUser = user.xp === 0;
  const { dailyTarget, missionDifficulty } = settings.goals;
  const { revisionPerDay } = settings.revision;

  return (
    <DashboardLayout>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: spacing['3xl'] }}>
        
        {/* 1. Hero Section (Dominant Workspace Header) */}
        <motion.div variants={slideUp}>
          <Card padding="none" style={{ 
            background: `linear-gradient(135deg, var(--primary-bg) 0%, transparent 100%)`, 
            borderLeft: `4px solid var(--primary)`,
            overflow: 'hidden'
          }}>
            <div style={{ padding: spacing['2xl'], display: 'flex', flexDirection: 'column', gap: spacing.xl }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: spacing.lg }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                  <h1 style={{ fontSize: typography.fontSize.h1, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)", letterSpacing: '-0.02em' }}>
                    Good morning, {user.name}
                  </h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, color: "var(--text-secondary)", fontSize: typography.fontSize.body }}>
                    <MapIcon size={18} />
                    <span>Currently exploring <strong style={{ color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold }}>{user.currentWorld}</strong></span>
                  </div>
                </div>

                {/* Hero Metrics (XP, Streak, Goal) */}
                <div style={{ display: 'flex', gap: spacing.lg }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.xs }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, color: "var(--text-secondary)" }}>
                      <Flame size={16} color="#f97316" /> <span style={{ fontSize: typography.fontSize.label, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase' }}>Streak</span>
                    </div>
                    <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>{user.streak}</div>
                  </div>
                  <div style={{ width: '1px', backgroundColor: "var(--border)", alignSelf: 'stretch' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.xs }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, color: "var(--text-secondary)" }}>
                      <Sparkles size={16} color="#eab308" /> <span style={{ fontSize: typography.fontSize.label, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase' }}>XP</span>
                    </div>
                    <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>{user.xp}</div>
                  </div>
                  <div style={{ width: '1px', backgroundColor: "var(--border)", alignSelf: 'stretch' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.xs }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, color: "var(--text-secondary)" }}>
                      <Target size={16} color="#10B981" /> <span style={{ fontSize: typography.fontSize.label, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase' }}>Daily Goal</span>
                    </div>
                    <div style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)", marginTop: spacing.xs }}>1 / {dailyTarget}</div>
                  </div>
                </div>
              </div>

              {/* Today's Mission Action Bar */}
              <div style={{ 
                padding: spacing.lg, 
                backgroundColor: "var(--card)", 
                borderRadius: "var(--radius)", 
                border: `1px solid var(--border)`, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                  <div style={{ padding: spacing.md, backgroundColor: "var(--primary-soft)", borderRadius: radius.lg, color: "var(--primary)" }}>
                    <Zap size={28} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                    <Badge variant="easy" style={{ alignSelf: 'flex-start', textTransform: 'capitalize' }}>Today&apos;s Mission ({missionDifficulty})</Badge>
                    <h3 style={{ margin: 0, fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>
                      {isNewUser ? "Complete your first pattern" : `Improve ${weakestPattern?.title || "your fundamentals"}`}
                    </h3>
                  </div>
                </div>
                <Button variant="primary" size="lg" asChild style={{ padding: `0 ${spacing.xl}`, height: '48px', fontSize: typography.fontSize.body, background: "var(--primary)", color: "#FFF" }}>
                  <Link href="/practice">
                    Continue Learning <ArrowRight size={20} style={{ marginLeft: spacing.sm }} />
                  </Link>
                </Button>
              </div>

            </div>
          </Card>
        </motion.div>

        {/* 2. Quick Actions */}
        <motion.div variants={slideUp}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg }}>
            <h3 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)" }}>Quick Actions</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: spacing.lg }}>
            
            <Card interactive padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg, background: "var(--card)", border: "1px solid var(--border)" }}>
              <div style={{ width: '48px', height: '48px', borderRadius: radius.lg, backgroundColor: "var(--primary-soft)", color: "var(--primary)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit size={24} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Continue Practice</div>
                <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)" }}>Platform: {settings.practice.preferredPlatform}</div>
              </div>
            </Card>
            
            <Card interactive padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg, background: "var(--card)", border: "1px solid var(--border)" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: radius.lg, backgroundColor: colors.warningBg, color: colors.warning, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RotateCcw size={24} />
                </div>
                <Badge variant="hard">{dueRevisions.length || revisionPerDay}</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Resume Revision</div>
                <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)" }}>Strengthen retention</div>
              </div>
            </Card>

            <Card interactive padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg, background: "var(--card)", border: "1px solid var(--border)" }}>
              <div style={{ width: '48px', height: '48px', borderRadius: radius.lg, backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapIcon size={24} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Open Journey</div>
                <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)" }}>Explore the map</div>
              </div>
            </Card>
            
            <Card interactive padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg, background: "var(--card)", border: "1px solid var(--border)" }}>
              <div style={{ width: '48px', height: '48px', borderRadius: radius.lg, backgroundColor: colors.successBg, color: colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={24} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Recommended</div>
                <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)" }}>Two Sum</div>
              </div>
            </Card>

          </div>
        </motion.div>

        {/* 3. AI Coach & Upcoming */}
        <motion.div variants={slideUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: spacing.xl }}>
          
          <Card padding="xl" style={{ border: `1px solid var(--primary)`, backgroundColor: 'var(--card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, marginBottom: spacing.xl }}>
               <div style={{ width: '48px', height: '48px', borderRadius: radius.full, backgroundColor: "var(--primary-soft)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Bot size={24} color="var(--primary)" />
               </div>
               <div>
                 <h3 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)" }}>AI Coach Insight</h3>
                 <span style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)" }}>Personalized for you</span>
               </div>
            </div>
            
            <div style={{ marginBottom: spacing.xl }}>
              <p style={{ margin: 0, fontSize: typography.fontSize.body, color: "var(--text-primary)", lineHeight: 1.6, fontWeight: typography.fontWeight.medium }}>
                &quot;You struggled with edge cases on Subarray Sum last time. Remember to initialize your hash map with `{`0: 1`}` to handle prefixes correctly.&quot;
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg, padding: spacing.lg, backgroundColor: "var(--surface)", borderRadius: radius.lg, border: `1px solid var(--border)` }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                 <span style={{ fontSize: typography.fontSize.label, color: "var(--text-secondary)", textTransform: 'uppercase', fontWeight: typography.fontWeight.bold }}>Weakest Topic</span>
                 <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: radius.full, backgroundColor: colors.danger }}></div>
                   <span style={{ fontSize: typography.fontSize.body, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold }}>Prefix Sums</span>
                 </div>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                 <span style={{ fontSize: typography.fontSize.label, color: "var(--text-secondary)", textTransform: 'uppercase', fontWeight: typography.fontWeight.bold }}>Suggested Next</span>
                 <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: radius.full, backgroundColor: "var(--primary)" }}></div>
                   <span style={{ fontSize: typography.fontSize.body, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold }}>Contiguous Array (45m)</span>
                 </div>
               </div>
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
            <h3 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)" }}>Upcoming</h3>
            
            <Card padding="lg" interactive style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: "var(--card)", border: "1px solid var(--border)" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                <div style={{ padding: spacing.md, backgroundColor: colors.warningBg, borderRadius: radius.lg, color: colors.warning }}>
                  <RotateCcw size={24} />
                </div>
                <div>
                  <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Spaced Repetition</div>
                  <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)", marginTop: spacing.xs }}>{revisionPerDay} items due today</div>
                </div>
              </div>
              <Badge variant="hard">Action Needed</Badge>
            </Card>
            
            <Card padding="lg" interactive style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: "var(--card)", border: "1px solid var(--border)" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                <div style={{ padding: spacing.md, backgroundColor: "var(--surface)", borderRadius: radius.lg, color: "var(--text-secondary)" }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Next Unlock</div>
                  <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)", marginTop: spacing.xs }}>Fast & Slow Pointers</div>
                </div>
              </div>
              <Badge variant="default">Locked</Badge>
            </Card>
          </div>
        </motion.div>

        {/* 4. Analytics Snapshot & Achievements */}
        <motion.div variants={slideUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: spacing.xl }}>
          
          <Card padding="xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                <LineChart size={24} color={colors.info} />
                <h3 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)" }}>Analytics Snapshot</h3>
              </div>
              <Button variant="ghost" size="sm">View Full</Button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                <div style={{ fontSize: typography.fontSize.label, color: "var(--text-secondary)", textTransform: 'uppercase', fontWeight: typography.fontWeight.bold }}>Accuracy</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: spacing.sm }}>
                  <div style={{ fontSize: typography.fontSize.h1, color: "var(--text-primary)", fontWeight: typography.fontWeight.bold, letterSpacing: '-0.02em' }}>92%</div>
                  <div style={{ display: 'flex', alignItems: 'center', color: colors.success, fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.bold }}>
                    <TrendingUp size={14} style={{ marginRight: spacing.xs }}/> +5%
                  </div>
                </div>
                <ProgressBar progress={92} color={colors.success} height={6} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                <div style={{ fontSize: typography.fontSize.label, color: "var(--text-secondary)", textTransform: 'uppercase', fontWeight: typography.fontWeight.bold }}>Roadmap Completion</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: spacing.sm }}>
                  <div style={{ fontSize: typography.fontSize.h1, color: "var(--text-primary)", fontWeight: typography.fontWeight.bold, letterSpacing: '-0.02em' }}>14%</div>
                </div>
                <ProgressBar progress={14} color="var(--primary)" height={6} />
              </div>
            </div>
          </Card>

          <Card padding="xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xl }}>
              <Award size={24} color="#f59e0b" />
              <h3 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)" }}>Achievements</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                <div style={{ width: '56px', height: '56px', borderRadius: radius.full, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Flame size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
                    <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>7 Day Streak</div>
                    <span style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)", fontWeight: typography.fontWeight.semibold }}>Completed</span>
                  </div>
                  <ProgressBar progress={100} color="#f59e0b" height={6} />
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                <div style={{ width: '56px', height: '56px', borderRadius: radius.full, backgroundColor: "var(--surface)", color: "var(--text-secondary)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
                    <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>First 10 Arrays</div>
                    <span style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)", fontWeight: typography.fontWeight.semibold }}>8 / 10</span>
                  </div>
                  <ProgressBar progress={80} color="var(--primary)" height={6} />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 5. Recent Activity */}
        <motion.div variants={slideUp}>
          <h3 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: `0 0 ${spacing.lg} 0`, color: "var(--text-primary)" }}>Recent Activity</h3>
          <Card padding="none" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[1, 2, 3].map((_, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: spacing.xl, 
                  borderBottom: i < 2 ? `1px solid var(--border)` : 'none',
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: radius.lg, backgroundColor: colors.successBg, color: colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Two Sum</div>
                      <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)", marginTop: spacing.xs }}>Solved in 15 mins with O(n) complexity</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                    <div style={{ fontSize: typography.fontSize.caption, color: "var(--text-secondary)", fontWeight: typography.fontWeight.semibold }}>2 hours ago</div>
                    <Button variant="ghost" size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 6. Footer Tips */}
        <motion.div variants={slideUp}>
          <Card padding="lg" style={{ backgroundColor: "var(--surface)", border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: spacing.lg }}>
            <div style={{ padding: spacing.sm, backgroundColor: colors.warningBg, borderRadius: radius.full, color: colors.warning }}>
              <Lightbulb size={24} />
            </div>
            <p style={{ margin: 0, fontSize: typography.fontSize.body, color: "var(--text-primary)", lineHeight: 1.5 }}>
              <strong style={{ fontWeight: typography.fontWeight.bold }}>Pro Tip:</strong> Re-visit problems you struggled with within 48 hours to significantly improve long-term retention. Use the Revision queue to automate this process.
            </p>
          </Card>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}
