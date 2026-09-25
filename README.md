# DSA Magna

> An interactive, offline-first platform for mastering Data Structures & Algorithms.  
> Unifies 4,000 algorithmic problems across 25 learning areas and 5 curriculum bands, featuring structured problem-solving phases, step-by-step visualizers, spaced repetition review, and an AI mentor.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live Production URL**: [https://dsa-master-7boq.vercel.app](https://dsa-master-7boq.vercel.app)  
**GitHub Repository**: [https://github.com/saidevaharsha07-art/DSA-MASTER](https://github.com/saidevaharsha07-art/DSA-MASTER)

---

## 🏛️ System Architecture

DSA Magna is organized into decoupled domains:

```
dsa-magna/
├── app/                  # Next.js App Router (pages, layouts, thin route handlers)
│   ├── (app)/            # Authenticated product application shell
│   │   ├── dashboard/    # Learner command center & analytics
│   │   ├── journey/      # Vertical interactive curriculum map
│   │   ├── practice/     # Problem solving & IDE experience
│   │   ├── interview/    # AI mock interview simulator
│   │   ├── visualizer/   # Step-by-step algorithm visualizer
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
├── database/             # Relational data documentation & reference
│   ├── schema/           # Architectural reference mirror of the schema
│   ├── migrations/       # Versioned migration baselines
│   ├── docs/             # Data dictionary and entity-relationship documentation
│   ├── types/            # Strongly-typed TypeScript database entities
│   └── seeds/            # Initial dataset definitions and seed instructions
├── supabase/             # Canonical Supabase CLI operational directory
│   └── schema.sql        # Active source of truth applied to live Supabase database
├── src/                  # Feature slices, curriculum catalog, and shared state
│   ├── features/         # Modular feature views and controllers
│   ├── curriculum/       # 4,000 problem catalog across 25 learning areas and 5 bands
│   └── services/         # Client-side storage and audio services
└── public/               # Static assets, branding logos, and service worker manifests
```

---

## ✨ Features

- **4,000 Problem Unified Curriculum**: Structured into 5 Curriculum Bands across 25 Learning Areas (Arrays, Two Pointers, Trees, Graphs, Dynamic Programming, and more) with exact difficulty ratings and topic tags.
- **Vertical Interactive Journey Map**: Visual roadmap navigating learners through progressive milestones with checkpoints, learning area progress, and completion indicators.
- **Monaco-Powered Practice IDE**: Multi-language code editor supporting C++, Java, and Python with customizable keyboard shortcuts, syntax highlighting, and theme support.
- **Structured Problem-Solving (Thinking & Reflection Phases)**:
  - *Thinking Phase*: Guided step to deconstruct constraints, identify edge cases, and commit to time/space bounds before coding.
  - *Reflection Phase*: Post-solution review capturing lessons learned, key takeaways, and personal pitfalls.
- **Step-by-Step Algorithm Visualizer**: Interactive animation to step through array and pointer movements visually.
- **AI Mentor Coaching Center**: Contextual problem hints powered by Google Gemini API with built-in offline guidance when disconnected or when API keys are omitted.
- **Mock Interview Simulator**: Timed technical and behavioral interview sessions featuring audio-synthesized question delivery and post-interview evaluation scorecards.
- **Spaced Repetition Memory Command Center**: Built on the SM-2 algorithm to schedule targeted problem reviews so you retain concepts over time.
- **Contest Performance Hub**: Live profile tracking across CodeChef, Codeforces, and LeetCode with submission history and contest rating trajectories.
- **Career Readiness Engine**: Target company pattern packs and role readiness assessments evaluating readiness against benchmark standards.
- **Customizable Themes & Accents**: High-contrast Dark and Light modes with 5 custom accent color choices (Emerald, Ocean Blue, Royal Purple, Golden, Rose Pink).
- **Offline-First Resilience**: Practice immediately with zero login friction. State is stored locally in the browser with one-click Supabase cloud backup when authenticated.

---

## ⚡ Code Execution Policy (First Free Release)

> **Important**: Live code execution is not enabled in the first free release. The Run/Submit interface is present, but real code execution infrastructure is planned for a future release.

- The platform does not execute untrusted user code on the host server and does not spawn unauthenticated local processes in production.
- When selecting "Run", the UI displays an explicit notification that execution is held in an unavailable state until dedicated sandbox infrastructure is provisioned.
- Learners can safely explore problems, write solutions, test the Thinking Phase, and track progress risk-free.

---

## 🗄️ Database Architecture & Source of Truth

- **Operational Source of Truth**: **`supabase/schema.sql`** at the repository root is the active schema executed by the Supabase CLI (`supabase db reset`, `supabase db push`) and applied to the production database.
- **Documentation Mirror**: **`database/schema/schema.sql`** and **`database/docs/SCHEMA.md`** provide the architectural reference, entity-relationship descriptions, and TypeScript definitions (`database/types/index.ts`).
- All user tables enforce strict PostgreSQL **Row-Level Security (RLS)** ensuring users only access their own data.

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

DSA Magna deploys out-of-the-box on Vercel:

1. Push changes to GitHub `main` branch.
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
