# DSA Magna — Frontend Architecture

This directory houses the client-side user interface, design system components, interactive hooks, styling tokens, and frontend utility functions.

## Directory Structure

```text
frontend/
├── components/     # Reusable UI widgets and application shells
│   ├── ai/         # AI mentor visualizer and oracle cards
│   ├── analytics/  # Visual activity graphs and calendar heatmaps
│   ├── homepage/   # Landing and hero components
│   ├── journey/    # Interactive curriculum map and timeline views
│   ├── layout/     # AppShell, headers, sidebar navigation, and drawers
│   ├── practice/   # Monaco editor IDE, problem panels, and console
│   ├── settings/   # Profile, goals, integrations, and preferences
│   └── ui/         # Base UI primitives (buttons, modals, badges, tabs)
├── features/       # Feature modules linking core platform surfaces
├── hooks/          # Client React hooks (useRoadmap, useCodeforces, useActiveUser)
├── lib/            # Client utilities (Tailwind class merger `cn()`)
├── styles/         # Visual tokens, typography constants, and color definitions
├── types/          # Client-side presentation interfaces
└── README.md
```

## Architectural Guidelines
1. **Server/Client Separation**: All interactive UI components declare `'use client'` at the top.
2. **Next.js Routing**: Page entrypoints and layouts reside under `app/` at root, importing components from `@frontend/components` or `@/components`.
3. **Theming**: Dark/Light mode is enforced via CSS variables defined in `app/globals.css` and managed dynamically via `SettingsContext` and `data-theme`.
