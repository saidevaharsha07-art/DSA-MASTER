# Offline-First Cloud Sync Engine (`src/lib/sync/`)

## Architecture
Provider-agnostic, offline-first synchronization engine designed for seamless local-first operation and cloud persistence.

```text
SyncApi / UI -> SyncService -> SyncManager -> Queue & Retry Engine
                                  │
                                  ├──────► ConflictService (Newest Wins, Highest XP Wins, Array Merge)
                                  ├──────► ISyncProvider (Local, Mock Cloud, Firebase, Supabase)
                                  └──────► EventBus (SyncStarted, SyncCompleted, ConflictDetected)
```

## Features
- **Offline First**: All actions queued in `SyncQueue` and replayed upon network reconnection.
- **Provider Agnostic**: Operates via `ISyncProvider` contract. Supports switching between Local, Mock Cloud, Firebase, Supabase, and Custom REST backends.
- **Conflict Resolution**: Deterministic strategies (`newest_wins`, `highest_xp_wins`, `merge_arrays`).
- **Telemetry**: Measures sync duration, bytes transferred, queue depth, and conflict reports.
