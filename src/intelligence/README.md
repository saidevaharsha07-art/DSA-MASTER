# Intelligence, Adaptive Practice & Contest Engine Architecture

The **Intelligence Suite** (`src/intelligence/`) is a backend-only intelligence system powering personalized practice sessions, adaptive difficulty progression, contest analytics, cross-platform rating normalization, and rating predictions.

---

## 1. Full Dependency Flow Architecture

```text
                        UI Layer (Future Phase 3.6)
                                    │
                                    ▼
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
Practice Scheduler            Contest Engine               Rating Engine
(Multi-Horizon Plans)      (Contest Analytics)       (Rating Normalization)
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    │
                                    ▼
                              Adaptive Engine
                    (Strategy Pattern & Constraints)
                                    │
                                    ▼
                      Intelligence Foundation Layer
                     (Profile, Analyzers, Storage, Stats)
                                    │
                                    ▼
                             Platform Engine
                         (src/platforms/ Provider)
```

### Strictly Enforced Rule
`UI -> Contest Engine & Rating Engine -> Adaptive Engine -> Intelligence Foundation -> Platform Engine`

> **Note:** Zero UI components or React state exist in `src/intelligence/`. It is 100% backend-only.

---

## 2. Component Structure Overview

### Contest Intelligence (`src/intelligence/contests/`)
- **`contest.models.ts`**: Platform-agnostic `ContestRecord`, `ContestLifecycleState` (`upcoming`, `registered`, `active`, `completed`, `analyzed`), and `ContestSnapshot`.
- **`contest.history.ts`**: Storage tracker and immutable snapshot recorder.
- **`contest.performance.ts`**: `ContestPerformanceCalculator` generating structured `ContestPerformanceTrend`.
- **`contest.analyzer.ts`**: Pure stateless analyzer calculating ranks, percentiles, and net rating gains.
- **`contest.readiness.ts`**: `ContestReadinessEvaluator` returning expressive `ContestReadinessReport`.
- **`contest.recommendations.ts`**: `ContestRecommendationEngine` producing explainable contest cards.
- **`contest.statistics.ts`**: `ContestStatisticsGenerator` producing `ContestStatisticsSummary`.
- **`contest.engine.ts`**: Main facade orchestrating contest analytics.

### Rating Engine & Predictor (`src/intelligence/ratings/`)
- **`rating.models.ts`**: `NormalizedRating` (0-100 score, division, percentile) and `RatingPredictionReport`.
- **`rating.progression.ts`**: Cross-platform rating normalizer (Codeforces 800-3500, CodeChef 1000-2800, LeetCode 1200-3300, AtCoder 0-4000).
- **`rating.predictor.ts`**: `RatingPredictor` deterministically estimating future ratings based on moving average delta and solve speed.
- **`rating.statistics.ts`**: `RatingStatisticsGenerator` computing rating distribution.
- **`rating.engine.ts`**: Main rating engine facade.

---

## 3. Rating Normalization Matrix

| Platform | Rating Scale | Normalized Score (0-100) | Division Mapping |
| :--- | :--- | :--- | :--- |
| **Codeforces** | 800 – 3500 | `(rating - 800) / 2700 * 100` | Newbie, Pupil, Specialist, Expert, CM, Master |
| **CodeChef** | 1000 – 2800 | `(rating - 1000) / 1800 * 100` | 1★, 2★, 3★, 4★, 5★+ |
| **LeetCode** | 1200 – 3300 | `(rating - 1200) / 2100 * 100` | Knight Track, Knight, Guardian |
| **Generic** | 0 – 3000 | `rating / 3000 * 100` | Open Division |

---

## 4. Extension Points for Future Phases

- **Phase 3.4 — Learning Memory & Forgetting Engine**: Spaced repetition decay rates.
- **Phase 3.5 — Oracle AI Recommendation Engine**: AI contest coaching and prompt generation.
- **Phase 3.6 — UI Integration**: UI binding for contest performance cards, readiness gauges, and rating prediction graphs.
- **Phase 4 — Live Platform APIs**: Live sync for Codeforces/CodeChef/LeetCode contest calendars and auto-fetching ranklists.

---

## 5. Unit Test Execution

Run all test suites via:
```bash
npx tsx src/intelligence/tests/run_tests.ts
```
