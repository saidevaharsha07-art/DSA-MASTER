# DSA Magna

> **The Sovereign Platform for Engineering Mastery**  
> A production-grade, offline-first, cinematic platform unifying 4,000+ data structures and algorithms problems into a cohesive, gamified mastery curriculum with spaced repetition, real-time algorithm visualization, and AI-powered coaching.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live Production URL**: [https://dsa-master-7boq.vercel.app](https://dsa-master-7boq.vercel.app)

---

## 🏛️ System Architecture

DSA Magna is architected into clean, decoupled domains following modern software engineering best practices:

```
dsa-magna/
├── app/                  # Next.js App Router (pages, layouts, thin route handlers)
│   ├── (app)/            # Authenticated product application shell
│   │   ├── dashboard/    # Sovereign command center & analytics
│   │   ├── journey/      # Vertical cinematic curriculum map
│   │   ├── practice/     # Problem solving & IDE experience
│   │   ├── interview/    # AI mock interview simulator
│   │   ├── visualizer/   # Real-time algorithm visualizer
│   │   ├── mentor/       # AI mentor coaching center
│   │   ├── revision/     # Spaced repetition memory command center
│   │   ├── contests/     # Competitive programming tracker
│   │   ├── career/       # Role readiness & company pattern packs
│   │   └── settings/     # Appearance, themes, cloud sync, security
│   └── api/              # Thin HTTP route handlers delegating to backend/
├── frontend/             # Client-side UI domain
│   ├── components/       # Design system & domain-specific UI components
│   ├── hooks/            # Custom React hooks (state, shortcuts, animations)
│   ├── lib/              # Client-side utility functions
│   ├── styles/           # Global styles, design tokens, and CSS modules
│   └── types/            # Frontend state models and UI type definitions
├── backend/              # Server-side business logic domain
│   ├── ai/               # AI Mentor engine (Gemini API with offline fallbacks)
│   ├── db/               # Cloud data synchronization & user state persistence
│   ├── platform/         # Multi-platform stats scrapers (LeetCode, CodeChef, Codeforces)
│   ├── judge/            # Isolated code evaluation and sandbox architecture
│   ├── utils/            # Authentication guards and server-side utilities
│   └── types/            # Backend domain contracts and API payloads
├── database/             # Relational data layer
│   ├── schema/           # Canonical PostgreSQL schema with Row-Level Security (RLS)
│   ├── migrations/       # Versioned migration baselines
│   ├── docs/             # Data dictionary and entity-relationship documentation
│   ├── types/            # Strongly-typed TypeScript database entities
│   └── seeds/            # Initial dataset definitions and seed instructions
├── src/                  # Feature slices, curriculum data, and shared state
│   ├── features/         # Modular feature views and controllers
│   ├── curriculum/       # 4,000+ problem catalog, 7 bands, and 13 kingdoms
│   └── services/         # Client-side storage and audio services
└── public/               # Static assets, branding logos, and service worker manifests
```

---

## ✨ Features

- **4,000+ Problem Unified Curriculum**: Structured into 7 progressive Mastery Bands across 13 Kingdom domains (Arrays, Two Pointers, Trees, Graphs, Dynamic Programming, and more) with exact difficulty ratings and topic tags.
- **Vertical Cinematic Journey Map**: Visual roadmap navigating learners through progressive milestones with animated checkpoints, kingdom locks, and completion rings.
- **Monaco-Powered Practice IDE**: Rich multi-language code editor supporting C++, Java, and Python with customizable keyboard shortcuts, syntax highlighting, and theme support.
- **Cognitive Metacognition (Thinking & Reflection Phases)**:
  - *Thinking Phase*: Forces problem deconstruction, constraint verification, and brute-force to optimal complexity planning before writing code.
  - *Reflection Phase*: Post-solution review capturing lessons learned, alternative patterns, and personal pitfalls.
- **Interactive Algorithm Visualizer**: Step-by-step visual animation across 7 core algorithmic patterns (Two Pointers, Binary Search, Sorting, Tree Traversals, Graph BFS/DFS, etc.).
- **AI Mentor Coaching Center**: Interactive problem guidance powered by Google Gemini API with intelligent offline fallback heuristics when disconnected or API keys are omitted.
- **Mock Interview Simulator**: Realistic technical and behavioral interview sessions featuring audio synthesis questions, real-time timer pressure, and deep post-interview competency scorecards.
- **Spaced Repetition Memory Command Center**: SM-2 spaced repetition algorithm tracking retention decay, scheduling optimal review dates, and ensuring long-term concept permanence.
- **Contest Performance Hub**: Live profile tracking across CodeChef, Codeforces, and LeetCode with submission history and contest rating trajectories.
- **Career Readiness Engine**: Target company pattern packs (Google, Meta, Amazon, Microsoft) and role readiness assessments evaluating readiness against benchmark standards.
- **Complete Customization & Theming**: 12 precision themes (OLED Dark, Cyberpunk, Nord, Solarized, Monokai, Moonlight, etc.) and 5 accent palettes with full light/dark mode support.
- **Offline-First Resilience**: Zero required login to start practicing. All state is maintained locally in browser storage with instant one-click Supabase cloud backup when authenticated.

---

## 🛡️ Code Execution Policy (Production Release)

DSA Magna is built with a pluggable code evaluation architecture designed for isolated multi-tenant execution via Judge0.

For the initial **\$0 Free Release**:
- Public server-side arbitrary code execution is intentionally held in an **explicit, safe `unavailable` state**.
- The platform does not execute untrusted user code locally in production and does not spin up unauthenticated child processes.
- The UI gracefully communicates that sandbox execution is coming soon in an upcoming dedicated cluster deployment, allowing users to write, solve, test thinking phases, and track progress risk-free.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) & CSS Modules with CSS Variables
- **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security)
- **AI Engine**: [Google Gemini 1.5 Flash](https://ai.google.dev/)
- **Testing**: [Playwright](https://playwright.dev/) End-to-End Suite

---

## 🚀 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/saidevaharsha07-art/DSA-MASTER.git
cd DSA-MASTER
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ENABLE_LOCAL_RUNNER=false

# Optional: AI Mentor features
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run test suites & typecheck
```bash
# Typecheck
npx tsc --noEmit

# Lint
npx eslint .

# End-to-end test suite
npx playwright test

# Production build check
npm run build
```

---

## 🚢 Vercel Deployment

DSA Magna deploys out-of-the-box on Vercel with zero configuration:

1. Push your changes to GitHub `main` branch.
2. Link the repository in the [Vercel Dashboard](https://vercel.com).
3. Set the required Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-deployment-name.vercel.app`
   - `NEXT_PUBLIC_SUPABASE_URL` = `<your-supabase-url>`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your-supabase-anon-key>`
   - `NEXT_PUBLIC_ENABLE_LOCAL_RUNNER` = `false`
   - `GEMINI_API_KEY` = `<optional-gemini-key>`
4. Deploy! Vercel automatically builds and provisions the Next.js App Router application.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
