# Learning Memory & Forgetting Engine Architecture

The **Learning Memory Engine** (`src/intelligence/memory/`) is a platform-agnostic, backend-only system modeling concept-level retention, Ebbinghaus forgetting curves, spaced repetition stability growth, review scheduling, and prioritized revision queues.

---

## 1. Memory Lifecycle & State Machine

```text
                  [ New ]
                     │ (First Review)
                     ▼
                [ Learning ]
                     │ (2+ Reviews)
                     ▼
              [ Reinforcing ]
                     │ (Stability > 14d, Mastery >= 85)
                     ▼
           ┌─────►[ Stable ]◄─────┐
           │         │            │
 (Success) │         │ (Decay/WA) │ (Success)
           │         ▼            │
           └─── [ At Risk ] ──────┘
                     │ (Recall < 30%)
                     ▼
               [ Forgotten ]
```

### Concept Memory States:
- **`New`**: Newly added concept, 0 reviews completed.
- **`Learning`**: 1–2 reviews, initial memory trace being built.
- **`Reinforcing`**: 3+ reviews, stability increasing ($2.5\times$ multiplier).
- **`Stable`**: Stability $\ge 14$ days, high recall probability ($\ge 80\%$).
- **`Mastered`**: Mastery score $\ge 85$, stability $\ge 30$ days.
- **`AtRisk`**: Recall probability $< 60\%$, overdue review window.
- **`Forgotten`**: Review failed or recall probability $< 30\%$.

---

## 2. Ebbinghaus Forgetting Decay Formula

$$\text{Recall}(t) = e^{-\frac{\Delta t}{S}}$$

- $\Delta t$: Days elapsed since last review.
- $S$: Concept stability score in days.
- **Forgetting Risk**: $\text{Risk} = \min(100, \max(0, \text{Math.round}((1 - \text{Recall}(t)) \times 100)))$.

---

## 3. Spaced Repetition Stability Growth

- **Review Outcome = Success**:
  $$S_{\text{new}} = S_{\text{old}} \times 2.5 \times \left(1 + \frac{100 - \text{Mastery}}{200}\right)$$
- **Review Outcome = Failure**:
  $$S_{\text{new}} = \max(1.0, S_{\text{old}} \times 0.5)$$

---

## 4. Oracle AI Extension Points (`MemoryService` & `MemoryEngine`)

Future Oracle AI modules (Phase 3.6) consume the following public APIs:
- `getMemoryHealth(userId)`: Returns overall memory health report.
- `getReviewQueue(userId)`: Returns prioritized explainable revision items.
- `getRevisionRecommendations(userId)`: Returns `ReviewExplanation` objects with human-readable rationale.
- `getReviewHistory(userId)`: Returns immutable `ReviewEvent` logs.
- `getTimeline(userId, conceptId)`: Returns historical memory strength & stability snapshots.

---

## 5. Unit Test Execution

Run all test suites via:
```bash
npx tsx src/intelligence/tests/run_tests.ts
```
