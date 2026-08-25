# Developer Tools Suite Architecture & Developer Guide

The **Developer Tools Suite** (`app/(dev)/dev/`) is an internal, modular developer application designed to visually inspect, test, simulate, and debug all backend engines:
- **Platform Engine** (`@/platforms`)
- **Intelligence Foundation** (`@/intelligence`)
- **Adaptive Practice Engine** (`@/intelligence/adaptive`)
- **Contest Intelligence & Rating Engine** (`@/intelligence/contests`, `@/intelligence/ratings`)

---

## 1. Directory & Route Mapping

| Route | Inspection Purpose | Backend Service Consumed |
| :--- | :--- | :--- |
| `/dev` | Overview Dashboard & Engine Status Header | `EngineStatusService`, `DevExecutionTimeline` |
| `/dev/platforms` | Registered platform loaders, health scores, & cache stats | `PlatformRegistry`, `PlatformValidator`, `ProblemProvider` |
| `/dev/datasets` | Read-only dataset problem search & raw JSON metadata | `ProblemProvider.getPlatformProblems()` |
| `/dev/profile` | Interactive solve/failure simulator & preset profile selector | `ProfileService`, `DevMockDataManager` |
| `/dev/intelligence` | Real-time output of weakness/strength analyzers | `WeaknessAnalyzer`, `StrengthAnalyzer` |
| `/dev/adaptive` | Strategy selector (7 strategies) & session evaluator | `AdaptiveEngine`, `SessionEvaluator` |
| `/dev/scheduler` | Multi-horizon practice schedule preview | `PracticeScheduler` |
| `/dev/contest` | Contest record entry, readiness reports, & recommendations | `ContestEngine`, `ContestReadinessEvaluator` |
| `/dev/ratings` | Cross-platform rating normalizers & deterministic predictor | `RatingEngine`, `RatingPredictor` |
| `/dev/recommendations` | Explainable recommendation cards & confidence meters | `RecommendationEngine` |
| `/dev/dependencies` | One-way architecture dependency graph viewer | Static Architecture Map |
| `/dev/diagnostics` | Error simulator, cache flush, & diagnostics JSON export | `DevErrorSimulator`, `DevPerformanceMonitor` |

---

## 2. Dev Mock Data Architecture

Mock profiles and contest histories are centrally managed by `DevMockDataManager` (`src/app/(dev)/dev/services/mock-data.manager.ts`).

Presets available:
1. `Beginner`: 5 solved problems, Arrays & Math focus, 3-day streak.
2. `Intermediate`: 11 solved problems across CodeChef, Codeforces, & LeetCode.
3. `Advanced`: High solve count, mastered Arrays/Strings, 7-day streak.
4. `Empty`: New user profile slate (0 solves, 0 XP).

---

## 3. How to Add a New Inspection Page

1. Create a new route folder in `src/app/(dev)/dev/your-module/page.tsx`.
2. Wrap your component to consume `useDev()` context for mock state.
3. Use shared UI components from `@/src/app/(dev)/dev/components/`:
   - `MetricCard`
   - `InfoCard`
   - `StatusBadge`
   - `JSONViewer`
   - `InspectorPanel`
4. Register the route link in `src/app/(dev)/dev/layout.tsx` `navItems`.

---

## 4. Debugging & Simulation Workflow

- **Flushing Caches**: Click `Flush Query Cache` on `/dev/diagnostics` or `/dev/platforms`.
- **Testing Edge Cases**: Select an error scenario on `/dev/diagnostics` (e.g., `UnknownPlatform` or `InvalidUrl`).
- **Inspecting Models**: Use `JSONViewer` on any page to view raw TypeScript model structures with copy and collapse controls.
