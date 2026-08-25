# Platform Engine Architecture & Developer Guide

The **Platform Engine** (`src/platforms/`) is a decoupled, extensible backend abstraction layer that standardizes problem datasets from multiple competitive programming platforms (LeetCode, Codeforces, CodeChef, MentorPick, AtCoder, CSES, HackerRank, SPOJ, GeeksforGeeks).

---

## 1. Module Dependency Diagram

```text
               User Interface (UI)
                       │
                       ▼
                 Problem Arena
                       │
                       ▼
         Platform Engine (Provider Dispatcher)
            ┌──────────┴──────────┐
            ▼                     ▼
    Platform Registry     Platform Cache
            │
            ▼
    Platform Loaders (IPlatformLoader)
     ┌──────┼──────┬──────┬──────┐
     ▼      ▼      ▼      ▼      ▼
  CodeChef CF   LeetCode  API  Database
```

### Strictly Enforced Dependency Direction
`UI -> Problem Arena -> Platform Engine -> Loaders -> Data Sources`

> **Note:** The `src/platforms/` module has zero dependencies on UI components, React state, or application views.

---

## 2. Component Directory Overview

- **`types.ts`**: Core contracts (`PlatformId`, `PlatformProblem`, `PlatformConfig`, `PlatformMetadata`, `DatasetHealthReport`).
- **`interfaces.ts`**: Unified interfaces (`IPlatformLoader`, `IProblemProvider`).
- **`constants.ts`**: Shared limits, supported IDs, difficulty standards, and default cache settings.
- **`errors.ts`**: Custom error hierarchy (`PlatformEngineError`, `PlatformNotFoundError`, `DuplicatePlatformError`, `LoaderError`, `ValidationError`).
- **`logger.ts`**: Configurable internal logging helper (`PlatformLogger`).
- **`registry.ts`**: Immutable Platform Registry singleton (`PlatformRegistry`).
- **`problem.provider.ts`**: Problem query dispatcher with LRU query caching (`ProblemProvider`).
- **`validation/platform.validator.ts`**: Validation pipeline producing `PlatformValidationReport` and `DatasetHealthReport`.
- **`loaders/`**: Platform data source implementations (`CodeChefLoader`, `CodeforcesLoader`, `LeetCodeLoader`).

---

## 3. Error Hierarchy

```text
PlatformEngineError (Base)
├── PlatformNotFoundError     (Requested platform ID is not registered)
├── DuplicatePlatformError    (Attempted to re-register an existing platform)
├── LoaderError               (Dataset loader encountered an unrecoverable failure)
└── ValidationError           (Dataset failed strict validation checks)
```

---

## 4. Cache Lifecycle & Management

The `ProblemProvider` maintains a deterministic query cache:
1. **Cache Key Generation**: Key is generated based on `platform:d=<diff>:t=<topic>:p=<pattern>:s=<status>:l=<limit>:o=<offset>:q=<query>`.
2. **Hit / Miss Tracking**: Metrics tracked automatically (`hits`, `misses`, `entries`, `keys`).
3. **Defensive Copies**: Provider returns `Object.freeze()` frozen problem arrays to prevent caller mutations from polluting cached state.
4. **Cache Control Methods**:
   - `provider.clearCache()`: Clears all query entries.
   - `provider.clearPlatformCache('codechef')`: Invalidates entries for specific platform.
   - `provider.getCacheStats()`: Returns cache performance metrics.

---

## 5. Validation Pipeline & Health Reporting

Every platform loader supports static and runtime validation:

```typescript
import { PlatformValidator } from '@/src/platforms';

// Run validation
const report = PlatformValidator.validate('codechef', problems);
console.log(report.valid, report.errors, report.warnings);

// Generate Dataset Health Report
const health = PlatformValidator.generateHealthReport('codechef', problems);
console.log(`Health Score: ${health.healthScore}%`);
```

Checks performed:
- **Errors**: Missing IDs/titles, duplicate problem IDs, platform mismatch.
- **Warnings**: Duplicate titles, malformed/missing URLs, out-of-range ratings, orphaned metadata.

---

## 6. Onboarding Guide — Adding a New Platform (e.g. AtCoder)

Adding a new platform requires **only 2 steps** without modifying any existing engine logic.

### Step 1: Create the Loader (`src/platforms/loaders/atcoder.loader.ts`)

```typescript
import { IPlatformLoader, PlatformId, PlatformProblem, PlatformValidationReport, PlatformVersionInfo } from '../';
import { PlatformValidator } from '../validation/platform.validator';

export class AtCoderLoader implements IPlatformLoader {
  public readonly platformId: PlatformId = 'atcoder';

  public load(): ReadonlyArray<PlatformProblem> {
    // 1. Fetch raw data from JSON, API, or DB
    // 2. Map raw fields to PlatformProblem contract
    return Object.freeze([/* ... mapped problems ... */]);
  }

  public validate(): PlatformValidationReport {
    return PlatformValidator.validate(this.platformId, this.load());
  }

  public async refresh(): Promise<void> {}

  public getVersion(): PlatformVersionInfo {
    return {
      datasetVersion: '1.0.0',
      lastUpdated: new Date().toISOString(),
      platformVersion: '1.0.0',
    };
  }
}
```

### Step 2: Register in `PlatformRegistry` (`src/platforms/registry.ts`)

```typescript
import { AtCoderLoader } from './loaders/atcoder.loader';

registry.registerPlatform(
  {
    id: 'atcoder',
    displayName: 'AtCoder',
    logo: '/assets/platforms/atcoder.svg',
    themeColor: '#000000',
    websiteUrl: 'https://atcoder.jp',
    status: 'active',
    capabilities: {
      supportsRating: true,
      supportsContests: true,
      supportsEditorial: true,
      supportsSubmissions: true,
    },
    difficultySystem: ['Gray', 'Brown', 'Green', 'Cyan', 'Blue', 'Yellow', 'Orange', 'Red'],
  },
  new AtCoderLoader()
);
```

---

## 7. Best Practices for Implementors

1. **Always Implement `IPlatformLoader`**: Never expose raw dataset formats outside the loader.
2. **Never Return Mutable Arrays**: Always return frozen arrays (`Object.freeze`) or defensive copies.
3. **Use Custom Error Classes**: Throw `LoaderError` or `ValidationError` instead of generic errors.
4. **Preserve Metadata**: Keep original contest IDs, index tags, and editorial URLs inside `metadata`.
