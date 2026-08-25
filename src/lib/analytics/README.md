# Anonymous Product Analytics Engine (`src/lib/analytics/`)

## Architecture
100% Event-driven, decoupled anonymous analytics and telemetry engine. Listens exclusively over `EventBus` without direct engine coupling.

```text
EventBus Event (ProblemSolved, MemoryReviewed, SyncCompleted)
                    │
                    ▼
          AnalyticsService -> AnalyticsConsentService (Anonymizes User ID)
                                      │
                                      ├──────► AnalyticsCollector (Batching & Debouncing Buffer)
                                      ├──────► FunnelEngine & KPIEngine (Derived Metrics)
                                      └──────► LocalAnalyticsProvider / Stubs (Firebase, PostHog, Mixpanel)
```

## Features
- **Event-Driven**: Consumes telemetry events exclusively via `EventBus`.
- **Privacy First**: `AnalyticsConsentService` anonymizes all user IDs and strips PII before buffering.
- **Derived KPIs**: Calculates average solve time, weekly retention, growth rate, and funnel conversion rates.
- **Provider Stubs**: Prepared for PostHog, Firebase Analytics, Mixpanel, and OpenTelemetry without code rewrites.
