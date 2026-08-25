/**
 * Offline Action Queue
 * Stores actions locally when network is unavailable and replays upon reconnection.
 */

export interface PendingAction {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
  readonly createdAt: string;
}

export class OfflineActionQueue {
  private static queue: PendingAction[] = [];

  public static enqueue(type: string, payload: unknown): void {
    const action: PendingAction = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      payload,
      createdAt: new Date().toISOString(),
    };
    this.queue.push(action);
  }

  public static getPending(): ReadonlyArray<PendingAction> {
    return Object.freeze([...this.queue]);
  }

  public static clear(): void {
    this.queue = [];
  }

  public static async replay(handler: (action: PendingAction) => Promise<void>): Promise<number> {
    const pending = [...this.queue];
    this.queue = [];
    let count = 0;
    for (const act of pending) {
      try {
        await handler(act);
        count++;
      } catch (err) {
        console.error(`[OfflineQueue] Error replaying action '${act.id}':`, err);
      }
    }
    return count;
  }
}
