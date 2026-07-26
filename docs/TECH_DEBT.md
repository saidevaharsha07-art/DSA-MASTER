# Technical Debt & Refactoring Notes

## Sprint 4: UI Engine Integration & Mock Data Removal

This document tracks technical debt accumulated or identified during the refactoring of all UI components to use the Universal Content Engine.

### 1. Memory Engine Stub
- **Status:** Temporary
- **Description:** The `src/engines/memory/index.ts` is currently a static mock returning hardcoded user progression data. 
- **Required Action:** In a future sprint (Sprint 6 or 7), this must be connected to an actual local database (e.g., IndexedDB, SQLite, or an API backend) to persist user state, completed problems, and revision tracking.

### 2. Journey Map Hardcoded Positions
- **Status:** Sub-optimal
- **Description:** The `InteractiveMap` component in `components/journey/InteractiveMap.tsx` has hardcoded `x` and `y` coordinates for the SVG nodes.
- **Required Action:** We should use an auto-layout library (like dagre or Elkjs) or generate the coordinates programmatically to handle scale when the curriculum grows to hundreds of patterns.

### 3. Command Palette Search Engine
- **Status:** Naive Implementation
- **Description:** `CommandPalette.tsx` currently does a basic `.includes()` substring search over the entire list of problems returned by `curriculumEngine.getAllProblems()`.
- **Required Action:** Implement a proper fuzzy search (e.g., Fuse.js) or a precomputed `search-index.json` to handle typos and provide better ranking.

### 4. Code Execution Environment
- **Status:** UI Only
- **Description:** The Problem Arena (`app/(app)/practice/[slug]/page.tsx`) currently renders a static code template but cannot actually compile or execute code.
- **Required Action:** Integrate a code execution backend (like Judge0) or a WebAssembly-based execution environment in a future sprint.

### 5. Missing Error/Loading States
- **Status:** Pending (Sprint 4 Phase 13/14)
- **Description:** We have removed hard mock errors but have not fully implemented `loading.tsx` and `error.tsx` for Next.js boundaries across all routes. 
- **Required Action:** Add standard `loading.tsx` skeletons and `error.tsx` recovery boundaries.

---
*Generated at the conclusion of Sprint 4.*
