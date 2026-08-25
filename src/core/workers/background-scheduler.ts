/**
 * Background Scheduler Infrastructure
 * Manages periodic review recalculation, recommendation refresh, cache cleanup, telemetry flushing, and offline sync.
 */

export interface ScheduledTask {
  readonly id: string;
  readonly name: string;
  readonly intervalMs: number;
  readonly handler: () => void | Promise<void>;
}

export class BackgroundScheduler {
  private static tasks: Map<string, ScheduledTask> = new Map();
  private static intervals: Map<string, NodeJS.Timeout> = new Map();

  public static schedule(task: ScheduledTask): void {
    if (this.intervals.has(task.id)) {
      clearInterval(this.intervals.get(task.id)!);
    }

    this.tasks.set(task.id, task);
    const interval = setInterval(async () => {
      try {
        await task.handler();
      } catch (err) {
        console.error(`[BackgroundScheduler] Error executing task '${task.id}':`, err);
      }
    }, task.intervalMs);

    this.intervals.set(task.id, interval);
  }

  public static stop(taskId: string): void {
    if (this.intervals.has(taskId)) {
      clearInterval(this.intervals.get(taskId)!);
      this.intervals.delete(taskId);
    }
  }

  public static stopAll(): void {
    for (const interval of Array.from(this.intervals.values())) {
      clearInterval(interval);
    }
    this.intervals.clear();
  }
}
