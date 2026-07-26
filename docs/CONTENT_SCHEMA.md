# Content Engine Schema

The Universal Content Engine uses Zod schemas to ensure strict type safety across the application. All content resides in `src/content/`.

## Pattern Schema
A pattern represents a core concept (e.g., Prefix Sum, Sliding Window).

```ts
type PatternModule = {
  id: string; // 'pattern.prefix-sum'
  slug: string;
  title: string;
  phaseId: string;
  description: string;
  resources: {
    notes: {
      markdownSections: { heading: string, content: string }[];
      interviewTips: string[];
    }
  };
  aiMetadata: {
    recognitionSignals: string[];
    commonMisconceptions: string[];
  };
};
```

## Problem Schema
A problem is a specific LeetCode or Codeforces question linked to a Pattern.

```ts
type ProblemModule = {
  id: string; // 'problem.lc-1480'
  slug: string;
  title: string;
  patternId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  complexity: { time: string, space: string };
  companies: string[];
  intuition: string;
  bruteForceIdea: string;
  optimalIdea: string;
  hints: string[];
  commonMistakes: string[];
  edgeCases: string[];
  template: { language: string, code: string }[];
};
```
