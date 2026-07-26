# Event Bus Reference

All cross-domain communication should go through the `eventBus` (`src/core/events`). This allows the architecture to scale seamlessly.

## Core Events

### `ProblemSolved`
Fired when a user successfully passes all test cases for a problem.
- **Payload**: `{ problemId: string, patternId: string, timeTakenSeconds: number }`
- **Subscribers**: `SessionEngine` (to track session progress), `AchievementEngine` (to grant First Solve).

### `ReflectionAdded`
Fired when a user completes the post-solve reflection.
- **Payload**: `{ problemId, patternId, concept, reflectionText }`
- **Subscribers**: `AchievementEngine`.

### `PredictionSubmitted`
Fired when the user commits their thinking phase.
- **Payload**: `{ problemId, predictedPatternId, predictedComplexity, confidence, correctPattern }`
- **Subscribers**: `AchievementEngine`.

### `SessionStarted` & `SessionFinished`
Orchestrated by the `SessionEngine` to track a learning cycle.

## How to Subscribe

```ts
import { eventBus } from '@/src/core/events';

eventBus.subscribe('ProblemSolved', (event) => {
  console.log('User solved:', event.payload.problemId);
});
```
