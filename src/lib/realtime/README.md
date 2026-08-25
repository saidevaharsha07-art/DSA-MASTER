# Real-Time Update Layer & Reactive Event Streaming (`src/lib/realtime/`)

## Architecture
Provider-agnostic, reactive event streaming, channel management, presence tracking, and replay framework. Listens to application system events over `EventBus` and broadcasts them across channels.

```text
EventBus Event (ProblemSolved, MemoryReviewed, SyncCompleted)
                    │
                    ▼
          RealtimeService -> ChannelManager & StreamRouter
                                   │
                                   ├──────► ReplayQueue (Ordering & Deduplication)
                                   ├──────► HeartbeatManager & PresenceState
                                   └──────► IRealtimeProvider (Local, WebSocket, SSE, Firebase, Supabase)
```

## Features
- **Channel Isolation**: Independent streaming channels (`practice`, `memory`, `contest`, `achievements`, `notifications`, `sync`, `backup`, `leaderboards`, etc.).
- **Ordering & Replay**: `ReplayQueue` ensures strict sequence number ordering and deduplication during reconnects.
- **Heartbeat & Presence**: Real-time ping/pong latency tracking and user presence states (`online`, `offline`, `idle`, `syncing`).
- **Provider Agnostic**: Modular provider stubs ready for WebSocket, SSE, Firebase Realtime, or Supabase Broadcast.
