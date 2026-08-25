# Official Platform Connectors & Intelligent Gateway (`src/platforms/connectors/`)

## Architecture
Provider-agnostic platform gateway providing standardized problem search, profile fetch, contest history, rate limiting, and capability detection.

```text
ConnectorApi / UI -> ConnectorService -> ConnectorRegistry -> IPlatformConnector (Mock, Codeforces, LeetCode, CodeChef, MentorPick)
                                               │
                                               ├──────► RateLimitService (Token Bucket & Burst Control)
                                               ├──────► HealthService & MetricsCollector
                                               └──────► EventBus (ConnectorRequestStarted, ConnectorRequestFinished)
```

## Features
- **Standardized Contract**: `IPlatformConnector` exposes uniform `searchProblems`, `fetchProblem`, `fetchProfile`, and `fetchContestHistory` methods.
- **Capability Matrix**: Dynamic capability detection per connector (`supportsSubmissions`, `supportsRatings`, `apiVersion`).
- **Token Bucket Rate Limiting**: Provider-independent burst control preventing API bans.
- **Mock & Plugin Integration**: Mock Connector fully functional for testing; all connectors registered dynamically via `PluginManager`.
