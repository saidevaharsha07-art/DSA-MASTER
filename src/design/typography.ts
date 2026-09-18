export const typography = {
  fontFamily: {
    sans: 'var(--font-sans, Inter, system-ui, -apple-system, sans-serif)',
    mono: 'var(--font-mono, "JetBrains Mono", "Fira Code", monospace)',
  },
  fontSize: {
    display: 'var(--text-display, 2.25rem)', // 36px
    h1: 'var(--text-3xl, 1.875rem)',          // 30px
    h2: 'var(--text-2xl, 1.5rem)',            // 24px
    h3: 'var(--text-xl, 1.25rem)',            // 20px
    h4: 'var(--text-lg, 1.125rem)',           // 18px
    body: 'var(--text-md, 1rem)',             // 16px
    caption: 'var(--text-sm, 0.875rem)',      // 14px
    label: 'var(--text-xs, 0.75rem)',         // 12px
    hero: 'var(--text-display, 2.25rem)',     // backward compat
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  }
};
