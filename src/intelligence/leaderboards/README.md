# Scalable Leaderboards & Public User Profiles (`src/intelligence/leaderboards/`)

## Architecture
Provider-agnostic Leaderboard Engine and Public Profile System providing deterministic composite ranking, cursor/offset pagination, and public profile summaries.

```text
LeaderboardApi / UI -> LeaderboardService -> LeaderboardEngine -> RankingEngine (Weighted Metrics)
                                                  │
                                                  ├──────► ILeaderboardRepository (Mock, Supabase, Postgres)
                                                  ├──────► ProfileEngine (Sanitizes & excludes private data)
                                                  └──────► EventBus (Auto-updates upon system events)
```

## Features
- **Leaderboard Scopes**: Global, Friends, College, Weekly, Monthly, All Time, Country, City, Kingdom, Contest, Rating, XP, Streak, Memory, Oracle.
- **Weighted Ranking**: Weighted composite score incorporating XP, Rating, Solved Count, Memory Health, Streak, and Achievements.
- **Public Profile Engine**: Aggregates non-sensitive user statistics and showcase badges/titles.
- **Provider Agnostic**: Decoupled repository contract `ILeaderboardRepository` for seamless DB integration.
