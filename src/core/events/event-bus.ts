/**
 * Decoupled Pub/Sub Application Event Bus
 * Allows engines, repositories, workers, and UI to communicate through events.
 */

export type AppEventType =
  | 'ProfileUpdated'
  | 'ProblemOpened'
  | 'AttemptStarted'
  | 'CodeRun'
  | 'ProblemSolved'
  | 'ProblemFailed'
  | 'FavoriteToggled'
  | 'NoteSaved'
  | 'MemoryReviewed'
  | 'MemoryUpdated'
  | 'ContestCompleted'
  | 'RecommendationGenerated'
  | 'StrategyChanged'
  | 'UserSignedIn'
  | 'UserSignedOut'
  | 'SessionRestored'
  | 'SessionExpired'
  | 'AccountLinked'
  | 'AccountUnlinked'
  | 'PermissionChanged'
  | 'SyncStarted'
  | 'SyncCompleted'
  | 'SyncFailed'
  | 'PlatformSyncStarted'
  | 'PlatformSynced'
  | 'PlatformSyncFailed'
  | 'SyncRetryScheduled'
  | 'ConflictDetected'
  | 'ConflictResolved'
  | 'ReplayStarted'
  | 'ReplayFinished'
  | 'ReplayCompleted'
  | 'ConnectorConnected'
  | 'ConnectorDisconnected'
  | 'ConnectorHealthChanged'
  | 'ConnectorRequestStarted'
  | 'ConnectorRequestFinished'
  | 'ConnectorFailure'
  | 'RateLimitReached'
  | 'RecommendationCompleted'
  | 'SessionFinished'
  | 'PracticeSessionUpdated'
  | 'StudyPlanUpdated'
  | 'RatingChanged'
  | 'KingdomCompleted'
  | 'BossDefeated'
  | 'AchievementUnlocked'
  | 'BadgeEarned'
  | 'TitleUnlocked'
  | 'RewardGranted'
  | 'LeaderboardUpdated'
  | 'NotificationCreated'
  | 'NotificationDelivered'
  | 'ReminderTriggered'
  | 'NotificationRead'
  | 'NotificationDismissed'
  | 'BackupStarted'
  | 'BackupCompleted'
  | 'BackupFailed'
  | 'RestoreStarted'
  | 'RestoreCompleted'
  | 'RestoreFailed'
  | 'IntegrityCheckPassed'
  | 'IntegrityCheckFailed'
  | 'RealtimeConnected'
  | 'RealtimeDisconnected'
  | 'ChannelSubscribed'
  | 'ChannelUnsubscribed'
  | 'HeartbeatLost'
  | 'HeartbeatRecovered'
  | 'StreamEventReceived'
  | 'InterviewStarted'
  | 'InterviewQuestionAttempted'
  | 'InterviewQuestionCompleted'
  | 'InterviewCompleted'
  | 'OnboardingStarted'
  | 'OnboardingStepCompleted'
  | 'OnboardingAssessmentStarted'
  | 'OnboardingAssessmentCompleted'
  | 'OnboardingSkipped'
  | 'OnboardingCompleted'
  | 'FirstMissionStarted'
  | 'FirstMissionCompleted';

export interface AppEvent<T = unknown> {
  readonly id: string;
  readonly type: AppEventType;
  readonly timestamp: string;
  readonly payload: T;
}

export type EventCallback<T = unknown> = (event: AppEvent<T>) => void;

export class EventBus {
  private static subscribers: Map<AppEventType, Set<EventCallback<any>>> = new Map();
  private static globalSubscribers: Set<(event: AppEvent<any>) => void> = new Set();

  public static subscribe<T = unknown>(type: AppEventType, callback: EventCallback<T>): () => void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    const callbacks = this.subscribers.get(type)!;
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);
    };
  }

  public static subscribeAll(callback: (event: AppEvent<any>) => void): () => void {
    this.globalSubscribers.add(callback);
    return () => {
      this.globalSubscribers.delete(callback);
    };
  }

  public static publish<T = unknown>(type: AppEventType, payload: T): void {
    const event: AppEvent<T> = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      timestamp: new Date().toISOString(),
      payload,
    };

    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(event);
        } catch (err) {
          console.error(`[EventBus] Error handling event '${type}':`, err);
        }
      });
    }

    this.globalSubscribers.forEach((cb) => {
      try {
        cb(event);
      } catch (err) {
        console.error(`[EventBus] Error handling global event '${type}':`, err);
      }
    });
  }

  public static clearSubscribers(): void {
    this.subscribers.clear();
    this.globalSubscribers.clear();
  }

  public static clear(): void {
    this.clearSubscribers();
  }
}
