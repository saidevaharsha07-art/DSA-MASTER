/**
 * Dev Tools Suite — Engine Status Service
 * Tracks engine metrics, active state (Running/Idle/Error), execution count, and average duration.
 */

export interface EngineMetric {
  readonly name: string;
  readonly version: string;
  readonly status: 'Running' | 'Idle' | 'Error';
  readonly lastRefresh: string;
  readonly totalExecutions: number;
  readonly avgExecutionTimeMs: number;
}

export class EngineStatusService {
  private static instance: EngineStatusService;
  private metrics: Map<string, EngineMetric> = new Map();

  private constructor() {
    this.initDefaultMetrics();
  }

  public static getInstance(): EngineStatusService {
    if (!EngineStatusService.instance) {
      EngineStatusService.instance = new EngineStatusService();
    }
    return EngineStatusService.instance;
  }

  public getMetrics(): ReadonlyArray<EngineMetric> {
    return Object.freeze(Array.from(this.metrics.values()));
  }

  public recordExecution(engineName: string, durationMs: number, success: boolean = true): void {
    const existing = this.metrics.get(engineName);
    if (!existing) return;

    const total = existing.totalExecutions + 1;
    const avgTime = Number((((existing.avgExecutionTimeMs * existing.totalExecutions) + durationMs) / total).toFixed(1));

    this.metrics.set(engineName, {
      ...existing,
      status: success ? 'Idle' : 'Error',
      lastRefresh: new Date().toLocaleTimeString(),
      totalExecutions: total,
      avgExecutionTimeMs: avgTime,
    });
  }

  public setStatus(engineName: string, status: 'Running' | 'Idle' | 'Error'): void {
    const existing = this.metrics.get(engineName);
    if (!existing) return;
    this.metrics.set(engineName, {
      ...existing,
      status,
      lastRefresh: new Date().toLocaleTimeString(),
    });
  }

  private initDefaultMetrics(): void {
    const now = new Date().toLocaleTimeString();
    this.metrics.set('Platform Engine', {
      name: 'Platform Engine',
      version: '2.5.0',
      status: 'Idle',
      lastRefresh: now,
      totalExecutions: 14,
      avgExecutionTimeMs: 1.2,
    });
    this.metrics.set('Intelligence Service', {
      name: 'Intelligence Service',
      version: '3.1.0',
      status: 'Idle',
      lastRefresh: now,
      totalExecutions: 8,
      avgExecutionTimeMs: 3.4,
    });
    this.metrics.set('Adaptive Engine', {
      name: 'Adaptive Engine',
      version: '3.2.0',
      status: 'Idle',
      lastRefresh: now,
      totalExecutions: 6,
      avgExecutionTimeMs: 4.8,
    });
    this.metrics.set('Contest Intelligence', {
      name: 'Contest Intelligence',
      version: '3.3.0',
      status: 'Idle',
      lastRefresh: now,
      totalExecutions: 5,
      avgExecutionTimeMs: 2.1,
    });
  }
}
