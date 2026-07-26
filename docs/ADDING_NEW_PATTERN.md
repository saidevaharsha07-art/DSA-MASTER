# Adding a New Pattern

To add a new algorithmic pattern to DSA Master Roadmap, you must follow the Engine-Driven data model. Do NOT add hardcoded JSX components for new patterns.

## Step 1: Create the Pattern Module
1. Navigate to `src/content/phase-XX/` (where XX is the phase number).
2. Create a new folder for the topic if it doesn't exist (e.g., `graphs/`).
3. Inside, create `patterns/your-pattern-name.ts`.
4. Export a valid `PatternModule` object (refer to `CONTENT_SCHEMA.md`).
5. Ensure you populate `aiMetadata` (recognition signals, common misconceptions).

## Step 2: Create the Problems
1. Inside the topic folder, create `problems/lc-XXXX.ts`.
2. Export a valid `ProblemModule` object linked to your new Pattern ID.
3. Add the hints, common mistakes, and edge cases.

## Step 3: Register in Hybrid Registry
1. Add exports for your new pattern and problems in the topic's `index.ts`.
2. Import that topic in `src/registry/index.ts` and add it to the global array.

## Step 4 (Optional): Add Interactive Visualization
If the pattern requires a visualizer:
1. Open `src/engines/visualizer/index.ts`.
2. Add a new `VisualizationData` entry to the `mockVisualizations` object using one of the newly added problem IDs.
3. Map out the `frames` step-by-step.

The UI will automatically render the pattern in the Knowledge Hub, Journey Map, and Problem Arena!
