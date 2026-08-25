# Oracle AI Recommendation Engine Architecture

The **Oracle AI Recommendation Engine** (`src/intelligence/oracle/`) is a platform-agnostic, 100% backend-first orchestration and decision-making layer built on top of all underlying backend systems:
- **Platform Engine** (`@/platforms`)
- **Intelligence Foundation** (`@/intelligence`)
- **Adaptive Practice Engine** (`@/intelligence/adaptive`)
- **Contest Intelligence** (`@/intelligence/contests`)
- **Rating Engine** (`@/intelligence/ratings`)
- **Learning Memory Engine** (`@/intelligence/memory`)

---

## 1. Zero Logic Duplication Architecture

```text
                        Oracle AI Service (Public Entrypoint)
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
Recommendation Orchestrator   Conflict Resolution Engine   What-If Simulation Engine
(Aggregates Engine Recs)      (Resolves Competing Items)    (Projects Future Outcomes)
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │             Engine Orchestration Sub-Layers             │
       ├──────────────┬──────────────┬──────────────┬────────────┤
       │ Memory Engine│Adapt. Engine │Contest Engine│Rating Engine│
       └──────────────┴──────────────┴──────────────┴────────────┘
```

---

## 2. Recommendation Categories

Every recommendation belongs to exactly one category:
1. `Solve Next`: Target weakness repair problems.
2. `Revise`: Overdue spaced repetition concept reviews.
3. `Learn`: New pattern acquisition modules.
4. `Contest`: Speed simulation & weekend contest preparation.
5. `Rating`: Platform rating ladder progression.
6. `Interview`: High-frequency interview coding patterns.
7. `Review`: Mastery consolidation.
8. `Long-Term Goal`: Multi-week milestone targets.

---

## 3. Decision Trace Structure

Every `UnifiedOracleRecommendation` includes explicit `DecisionTrace` metadata:
- `contributingEngine`: Originating backend engine name.
- `engineOutputSummary`: Human-readable output summary.
- `weightApplied`: Active strategy weight applied.
- `contributionScore`: Raw engine score (0-100).
- `finalWeightedScore`: Composed weighted score.

---

## 4. Oracle Public API (`OracleService`)

Production UI components consume Oracle AI through `OracleService`:
- `getDashboardSnapshot(bundle)`: Returns `OracleDashboardSnapshot` model with score composition.
- `getRecommendations(bundle)`: Returns ranked recommendations and conflict resolution reports.
- `getInsights(bundle)`: Returns `OracleInsightReport` with strengths, weaknesses, and trends.
- `getDailyPlan(bundle)`: Returns `DailyStudyPlan` (Morning, Afternoon, Evening plans).
- `getWeeklyPlan(bundle)`: Returns `WeeklyStudyPlan` (7-day schedule).
- `simulateScenario(bundle, scenario)`: Projects What-If scenario outcomes without mutating state.

---

## 5. Unit Test Execution

Run all test suites via:
```bash
npx tsx src/intelligence/tests/run_tests.ts
```
