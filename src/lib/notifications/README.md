# Unified Notifications & Reminder Framework (`src/lib/notifications/`)

## Architecture
Event-driven, provider-agnostic notification and reminder engine unifying in-app feeds, browser push, reminders, priorities, and user delivery preferences.

```text
EventBus Event (AchievementUnlocked, ContestCompleted)
                    │
                    ▼
          NotificationService -> PreferenceService (Filters Category & DND)
                                      │
                                      ├──────► DeliveryEngine (Priority Queue Sorting)
                                      ├──────► INotificationProvider (InApp, Browser Mock, Email/Push Stubs)
                                      └──────► EventBus (NotificationCreated, NotificationDelivered)
```

## Features
- **Provider Agnostic**: Operates over `INotificationProvider` supporting InApp, Browser (Mock), Email, Push, Slack, and Discord.
- **Priority Queueing**: Orders dispatch by priority (`Critical`, `High`, `Medium`, `Low`, `Silent`).
- **Reminder Scheduler**: Configurable recurring reminders (`hourly`, `daily`, `weekly`, `monthly`).
- **User Preferences**: Category filtering, Do Not Disturb, andQuiet Hours settings.
