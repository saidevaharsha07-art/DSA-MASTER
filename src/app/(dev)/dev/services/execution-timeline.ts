/**
 * Dev Tools Suite — Execution Timeline Tracker
 * Records developer interactions, timestamps, and execution durations in real time.
 */

export interface TimelineLogEntry {
  readonly id: string;
  readonly timestamp: string; // HH:MM:SS
  readonly action: string;
  readonly module: string;
  readonly durationMs: number;
  readonly status: 'success' | 'warning' | 'error';
  readonly details?: string;
}

export class DevExecutionTimeline {
  private static instance: DevExecutionTimeline;
  private logs: TimelineLogEntry[] = [];

  private constructor() {
    this.addLog('Initialized Developer Tools Suite', 'System', 0, 'success');
  }

  public static getInstance(): DevExecutionTimeline {
    if (!DevExecutionTimeline.instance) {
      DevExecutionTimeline.instance = new DevExecutionTimeline();
    }
    return DevExecutionTimeline.instance;
  }

  public addLog(
    action: string,
    module: string,
    durationMs: number = 0,
    status: 'success' | 'warning' | 'error' = 'success',
    details?: string
  ): void {
    const entry: TimelineLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action,
      module,
      durationMs,
      status,
      details,
    };
    this.logs.unshift(entry);
    if (this.logs.length > 100) this.logs.pop();
  }

  public getLogs(): ReadonlyArray<TimelineLogEntry> {
    return Object.freeze([...this.logs]);
  }

  public clear(): void {
    this.logs = [];
    this.addLog('Cleared Execution Timeline', 'System', 0, 'success');
  }
}

export const timeline = DevExecutionTimeline.getInstance();
