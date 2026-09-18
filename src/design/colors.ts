export const colors = {
  // Base & Surface Layers
  bg: 'var(--bg, #0B0F17)',
  bgSubtle: 'var(--bg-subtle, #111827)',
  surface: 'var(--surface, #151D2E)',
  surfaceElevated: 'var(--surface-elevated, #1E293B)',

  // Borders
  border: 'var(--border, rgba(255, 255, 255, 0.08))',
  borderSubtle: 'var(--border-subtle, rgba(255, 255, 255, 0.04))',
  borderStrong: 'var(--border-strong, rgba(255, 255, 255, 0.16))',

  // Typography
  textPrimary: 'var(--text-primary, #F8FAFC)',
  textSecondary: 'var(--text-secondary, #94A3B8)',
  textMuted: 'var(--text-muted, #64748B)',
  textInverse: 'var(--text-inverse, #0F172A)',

  // Brand / Accent (Linear / Vercel style technical precision blue)
  accent: 'var(--accent, #38BDF8)',
  accentHover: 'var(--accent-hover, #0284C7)',
  accentSubtle: 'var(--accent-subtle, rgba(56, 189, 248, 0.10))',

  // Semantic Feedback
  success: 'var(--success, #10B981)',
  successBg: 'rgba(16, 185, 129, 0.12)',
  warning: 'var(--warning, #F59E0B)',
  warningBg: 'rgba(245, 158, 11, 0.12)',
  danger: 'var(--danger, #EF4444)',
  dangerBg: 'rgba(239, 68, 68, 0.12)',
  info: 'var(--info, #3B82F6)',
  infoBg: 'rgba(59, 130, 246, 0.12)',

  // Backward Compatibility Aliases (Preserves All Existing Views)
  background: 'var(--background, var(--bg, #0B0F17))',
  foreground: 'var(--foreground, var(--text-primary, #F8FAFC))',
  card: 'var(--card, var(--surface, #151D2E))',
  panel: 'var(--panel, var(--surface, #151D2E))',
  muted: 'var(--muted, var(--text-secondary, #94A3B8))',
  mutedBg: 'var(--muted-bg, var(--accent-subtle, rgba(56, 189, 248, 0.10)))',
  primary: 'var(--primary, var(--accent, #38BDF8))',
  primaryHover: 'var(--primary-hover, var(--accent-hover, #0284C7))',
  primaryBg: 'var(--primary-bg, var(--accent-subtle, rgba(56, 189, 248, 0.10)))',

  // App Specific (Preserved for Journey/Roadmap components)
  xp: '#F59E0B',
  locked: '#334155',
  mastered: '#10B981',
  current: '#8B5CF6',
  boss: '#EF4444',
};
