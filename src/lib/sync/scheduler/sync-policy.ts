/**
 * Sync Scheduling Policy & Intervals
 */

export class SyncPolicy {
  public static readonly DEFAULT_BACKGROUND_INTERVAL_MS = 60000; // 1 minute
  public static readonly MAX_RETRY_ATTEMPTS = 5;

  public static shouldSyncInBackground(lastSyncAt?: string): boolean {
    if (!lastSyncAt) return true;
    const elapsed = Date.now() - new Date(lastSyncAt).getTime();
    return elapsed >= this.DEFAULT_BACKGROUND_INTERVAL_MS;
  }
}
