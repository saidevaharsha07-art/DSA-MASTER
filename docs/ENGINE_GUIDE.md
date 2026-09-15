# Engine Guide

Engines are the brain of DSA CRACKER. They contain all business logic and orchestrate data flow. UI components should only read from engines, never manipulate raw data directly.

## 1. Curriculum Engine
`src/engines/curriculum/`
- **Role**: Serves static, validated content.
- **Responsibility**: Provides Patterns, Problems, and Phases. It is a read-only data source.

## 2. Session Engine
`src/engines/session/`
- **Role**: The conductor of the learning cycle.
- **Responsibility**: Tracks when a study session starts and ends. Tallies solved problems and computes session durations.

## 3. Thinking Engine
`src/engines/thinking/`
- **Role**: Manages the mandatory pre-coding "Thinking Phase".
- **Responsibility**: Stores predictions, evaluates them against the optimal pattern, and handles post-solve reflections.

## 4. Achievement Engine
`src/engines/achievements/`
- **Role**: Gamification.
- **Responsibility**: Listens to the Event Bus (e.g., `ProblemSolved`, `PredictionSubmitted`) and unlocks badges asynchronously without blocking the UI flow.

## 5. Visualizer Engine
`src/engines/visualizer/`
- **Role**: Algorithm simulation.
- **Responsibility**: Provides step-by-step state frames for patterns, allowing the UI to replay algorithms visually.
