# System Dependency Graph

```text
Production UI Routes (app)
        │
        ▼
AppBackendProvider (Context)
        │
        ├──────────────────────► IoC Container (`src/core/container/`)
        ├──────────────────────► Event Bus (`src/core/events/`)
        ├──────────────────────► Feature Flags (`src/config/`)
        │
        ▼
API Layer (`src/api/`)
        │
        ├──────────────────────► Repositories (`src/core/repositories/`)
        │                               │
        │                               ▼
        │                      Storage Providers (`src/core/storage/`)
        ▼
Oracle Service (`src/intelligence/oracle/`)
        │
        ├──────────────────────► Memory Engine (`src/intelligence/memory/`)
        ├──────────────────────► Contest Engine (`src/intelligence/contests/`)
        ├──────────────────────► Rating Engine (`src/intelligence/ratings/`)
        └──────────────────────► Adaptive Engine (`src/intelligence/adaptive/`)
                                        │
                                        ▼
                               Platform Engine (`src/platforms/`)
```
