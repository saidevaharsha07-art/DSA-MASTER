# Event-Driven Achievement Engine (`src/intelligence/achievements/`)

## Architecture
100% Event-driven achievement and progression engine. Subscribes strictly to `EventBus` signals without polling or direct coupling to UI or other engines.

```text
EventBus Event (e.g. ProblemSolved, StreakChanged)
                    │
                    ▼
          AchievementService -> AchievementEngine -> RuleRegistry (IAchievementRule)
                                      │
                                      ├──────► ProgressEngine & State Updates
                                      ├──────► RewardEngine (Badges, Titles, XP, Coins)
                                      └──────► NotificationEngine -> EventBus (AchievementUnlocked)
```

## Features
- **Event-Driven**: Never polls data or imports UI components.
- **Rule Architecture**: Independent modular rules implementing `IAchievementRule` (no giant if-else branches).
- **Rarity System**: Common, Rare, Epic, Legendary, Mythic.
- **Rewards**: XP, Coins, Badges, Titles, Cosmetic Borders, Avatars.
- **Immutable Store**: Backed by `IStorageProvider` and `AchievementStateService`.
