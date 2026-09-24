'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  Badge,
  Input,
  Breadcrumbs,
  EmptyState,
  PageContainer,
  ProgressBar,
  ProgressRing,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/src/components/ui';
import {
  Code2,
  Sparkles,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Search,
  ArrowRight,
  Layers,
  Palette,
  Type,
  Box,
  Sliders,
  Copy,
  Check,
} from 'lucide-react';
import { colors, radius, spacing, typography, shadows } from '@/src/design';

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState('Dynamic input content');
  const [btnLoading, setBtnLoading] = useState(false);

  const handleCopy = (token: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <PageContainer maxWidth="xl">
      {/* Header Section */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Badge variant="primary" dot>
            DSA Magna 2.0
          </Badge>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Production Design System
          </span>
        </div>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 8px 0',
            color: 'var(--text-primary)',
          }}
        >
          Design System & Component Catalog
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            margin: 0,
            maxWidth: '680px',
            lineHeight: 1.5,
          }}
        >
          A standardized, accessible, and high-performance design system engineered for technical
          developer platforms. Inspired by Linear, Vercel, and Raycast.
        </p>
      </div>

      <Tabs defaultValue="components">
        <TabsList style={{ marginBottom: '32px' }}>
          <TabsTrigger value="components" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box size={14} /> Components
          </TabsTrigger>
          <TabsTrigger value="tokens" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Palette size={14} /> Tokens & Colors
          </TabsTrigger>
          <TabsTrigger value="typography" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Type size={14} /> Typography
          </TabsTrigger>
        </TabsList>

        {/* ══════════════════════════════════════════════════════════════
            TAB 1: UI COMPONENTS
           ══════════════════════════════════════════════════════════════ */}
        <TabsContent value="components">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* 1. BUTTONS */}
            <section>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Buttons
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  Accessible, keyboard-navigable actions across 6 variants and 4 sizes with interactive feedback.
                </p>
              </div>

              <Card padding="lg" variant="default">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Variants */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                      Variants
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                      <Button variant="primary">Primary Button</Button>
                      <Button variant="secondary">Secondary Button</Button>
                      <Button variant="outline">Outline Button</Button>
                      <Button variant="ghost">Ghost Button</Button>
                      <Button variant="success">Success Button</Button>
                      <Button variant="danger">Danger Button</Button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                      Sizes & States
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                      <Button variant="primary" size="sm">
                        Small (32px)
                      </Button>
                      <Button variant="primary" size="md">
                        Medium (38px)
                      </Button>
                      <Button variant="primary" size="lg">
                        Large (44px)
                      </Button>
                      <Button variant="secondary" size="icon" title="Icon Button">
                        <Terminal size={15} />
                      </Button>
                      <Button
                        variant="secondary"
                        isLoading={btnLoading}
                        onClick={() => {
                          setBtnLoading(true);
                          setTimeout(() => setBtnLoading(false), 2000);
                        }}
                      >
                        {btnLoading ? 'Saving...' : 'Click for Loading'}
                      </Button>
                      <Button variant="outline" disabled>
                        Disabled Button
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* 2. BADGES */}
            <section>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Badges & Tags
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  High-contrast semantic indicators for problem difficulties, platform sources, and mastery progress.
                </p>
              </div>

              <Card padding="lg">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Difficulty */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                      Difficulty Badges
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <Badge variant="easy" dot>Easy</Badge>
                      <Badge variant="medium" dot>Medium</Badge>
                      <Badge variant="hard" dot>Hard</Badge>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                      Platform Badges
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <Badge variant="leetcode">LeetCode</Badge>
                      <Badge variant="codeforces">Codeforces</Badge>
                      <Badge variant="codechef">CodeChef</Badge>
                      <Badge variant="geeksforgeeks">GeeksForGeeks</Badge>
                    </div>
                  </div>

                  {/* Mastery & Status */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                      Mastery & Lifecycle States
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <Badge variant="novice">Novice</Badge>
                      <Badge variant="proficient">Proficient</Badge>
                      <Badge variant="advanced">Advanced</Badge>
                      <Badge variant="master">Master</Badge>
                      <Badge variant="completed" dot>Completed</Badge>
                      <Badge variant="in_progress" dot>In Progress</Badge>
                      <Badge variant="recommended" dot>Recommended</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* 3. INPUTS & FORM CONTROLS */}
            <section>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Inputs & Form Controls
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  Developer-grade inputs with explicit focus states, validation states, and icon slots.
                </p>
              </div>

              <Card padding="lg">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <Input
                    label="Standard Input"
                    placeholder="e.g. Two Pointers"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    helperText="Type any search query or identifier"
                  />

                  <Input
                    label="Input with Left Icon"
                    leftIcon={<Search size={15} />}
                    placeholder="Search curriculum..."
                  />

                  <Input
                    label="Validated Input"
                    error="This field is required for test execution"
                    defaultValue="invalid_input_format"
                  />

                  <Input
                    label="Disabled Input"
                    disabled
                    defaultValue="System locked parameter"
                  />
                </div>
              </Card>
            </section>

            {/* 4. CARDS & ELEVATION */}
            <section>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Cards & Elevation
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  Surface layers calibrated for dark and light themes with 1px hairline borders.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <Card variant="default">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Default Surface</span>
                    <Badge variant="outline">var(--surface)</Badge>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                    Standard content container with 1px border and soft shadow.
                  </p>
                </Card>

                <Card variant="elevated">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Elevated Surface</span>
                    <Badge variant="secondary">var(--surface-elevated)</Badge>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                    Raised container for active panels, dropdowns, and modals.
                  </p>
                </Card>

                <Card interactive onClick={() => alert('Interactive Card Clicked')}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Interactive Card</span>
                    <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                    Hover to preview subtle elevation and focus accent ring.
                  </p>
                </Card>
              </div>
            </section>

            {/* 5. NAVIGATION & UTILITIES */}
            <section>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Navigation & Utilities
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  Structural elements including Breadcrumbs, Progress meters, and Empty states.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Card padding="lg">
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                    Breadcrumb Navigation
                  </span>
                  <Breadcrumbs
                    items={[
                      { label: 'DSA Magna', href: '/dashboard' },
                      { label: 'Curriculum', href: '/journey' },
                      { label: 'Binary Search', href: '/practice' },
                      { label: 'Search in Rotated Sorted Array' },
                    ]}
                  />
                </Card>

                <Card padding="lg">
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '16px' }}>
                    Progress Trackers
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <ProgressRing progress={75} size={54} strokeWidth={5} />
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 600, display: 'block', color: 'var(--text-primary)' }}>
                          Pattern Mastery
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          75% completed
                        </span>
                      </div>
                    </div>

                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                          Daily Study Plan
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)' }}>
                          3 / 4 Tasks
                        </span>
                      </div>
                      <ProgressBar progress={75} />
                    </div>
                  </div>
                </Card>

                <EmptyState
                  icon={<Code2 size={20} />}
                  title="No Pending Mistakes Logged"
                  description="Your practice session had a 100% pass rate. Run another session to discover edge-case gaps."
                  action={
                    <Button variant="primary" size="sm">
                      Start Practice Arena
                    </Button>
                  }
                />
              </div>
            </section>
          </div>
        </TabsContent>

        {/* ══════════════════════════════════════════════════════════════
            TAB 2: DESIGN TOKENS
           ══════════════════════════════════════════════════════════════ */}
        <TabsContent value="tokens">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Card padding="lg">
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
                Semantic Color Tokens
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { name: '--bg', label: 'Background', color: 'var(--bg)' },
                  { name: '--bg-subtle', label: 'Subtle Background', color: 'var(--bg-subtle)' },
                  { name: '--surface', label: 'Surface', color: 'var(--surface)' },
                  { name: '--surface-elevated', label: 'Elevated Surface', color: 'var(--surface-elevated)' },
                  { name: '--border', label: 'Border', color: 'var(--border)' },
                  { name: '--border-strong', label: 'Strong Border', color: 'var(--border-strong)' },
                  { name: '--accent', label: 'Accent / Brand', color: 'var(--accent)' },
                  { name: '--accent-hover', label: 'Accent Hover', color: 'var(--accent-hover)' },
                  { name: '--success', label: 'Success', color: 'var(--success)' },
                  { name: '--warning', label: 'Warning', color: 'var(--warning)' },
                  { name: '--danger', label: 'Danger', color: 'var(--danger)' },
                  { name: '--info', label: 'Info', color: 'var(--info)' },
                ].map((token) => (
                  <div
                    key={token.name}
                    onClick={() => handleCopy(token.name, `var(${token.name})`)}
                    style={{
                      padding: '12px',
                      borderRadius: radius.md,
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      cursor: 'pointer',
                      transition: 'transform 0.1s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        height: '36px',
                        borderRadius: radius.sm,
                        backgroundColor: token.color,
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {token.label}
                        </span>
                        {copiedToken === token.name ? (
                          <Check size={12} style={{ color: 'var(--success)' }} />
                        ) : (
                          <Copy size={12} style={{ color: 'var(--text-muted)' }} />
                        )}
                      </div>
                      <code style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{token.name}</code>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="lg">
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
                Radii & Spacing Scale
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    Radii (Clean Developer Curves)
                  </span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <li><code>--radius-sm</code>: 6px (buttons, badges)</li>
                    <li><code>--radius-md</code>: 8px (inputs, nav items)</li>
                    <li><code>--radius-lg</code>: 12px (cards, modals)</li>
                  </ul>
                </div>

                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    Spacing Rhythm (4px Base)
                  </span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <li><code>--space-1</code>: 4px</li>
                    <li><code>--space-2</code>: 8px</li>
                    <li><code>--space-4</code>: 16px</li>
                    <li><code>--space-6</code>: 24px</li>
                    <li><code>--space-8</code>: 32px</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ══════════════════════════════════════════════════════════════
            TAB 3: TYPOGRAPHY
           ══════════════════════════════════════════════════════════════ */}
        <TabsContent value="typography">
          <Card padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Display 36px</span>
                <div style={{ fontSize: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  Algorithmic Mastery Platform
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Heading 1 (30px)</span>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                  Master 113 Core DSA Patterns
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Heading 2 (24px)</span>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  Two Pointers & Sliding Window
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Body (16px)</span>
                <div style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '650px' }}>
                  The two-pointer technique is an effective algorithmic strategy typically used on sorted arrays
                  or linked lists to search pairs or subsegments in linear time \(O(N)\).
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Code & Monospace (13px)</span>
                <div
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: radius.md,
                    padding: '12px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--accent)',
                    marginTop: '6px',
                  }}
                >
                  const [left, right] = [0, nums.length - 1]; // O(1) auxiliary space
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
