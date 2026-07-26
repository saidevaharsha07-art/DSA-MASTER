# Content Guide

Welcome to the Universal Content Engine. This guide explains how to add and edit content for the DSA Master Roadmap.

## 1. Folder Structure
All raw content lives in `src/content`. It is strictly organized by Curriculum Phase -> Topic -> Module.
```
src/content/
└── phases/
    └── phase-01/
        └── arrays/
            ├── patterns/
            │   ├── prefix-sum.ts
            │   └── index.ts (Barrel export)
            └── problems/
                ├── lc-1.ts
                └── index.ts (Barrel export)
```

## 2. Naming & ID Conventions (V2)
- **Patterns**: ID must be `pattern.[slug]` (e.g., `pattern.prefix-sum`).
- **Problems**: ID must be `problem.[slug]` (e.g., `problem.lc-1` or `problem.cf-1234`).
- **File Names**: Match the slug exactly (`prefix-sum.ts`).

## 3. Creating a New Pattern
1. Create `[slug].ts` in the appropriate `patterns/` folder.
2. Export a typed `PatternModule` object (refer to `src/types/content.ts` for the Zod schema).
3. Ensure all inline resources (notes, quiz, flashcards, cheatsheet) are fully populated.
4. Add the export to the adjacent `index.ts` barrel file.

## 4. Creating a New Problem
1. Create `[slug].ts` in the appropriate `problems/` folder.
2. Export a typed `ProblemModule`.
3. Add the pattern ID to the `patterns` array to establish the two-way relationship.
4. Add the export to the adjacent `index.ts` barrel file.

## 5. Validation
Before committing, always run:
```bash
npm run validate-content
```
This will catch broken relationships, invalid IDs, missing metadata, and schema violations.
