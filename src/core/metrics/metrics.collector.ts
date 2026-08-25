/**
 * Metrics & Observability Collector
 * High-resolution tracking of engine execution time, cache hit ratio, memory usage, recommendation latency, render counts, and repository calls.
 */

export interface MetricSample {
  readonly name: string;
  readonly value: number;
  readonly unit: string;
  readonly timestamp: string;
}

export class MetricsCollector {
  private static samples: MetricSample[] = [];
  private static renderCounts: Map<string, number> = new Map();

  public static record(name: string, value: number, unit: string = 'ms'): void {
    this.samples.push({
      name,
      value,
      unit,
      timestamp: new Date().toISOString(),
    });
  }

  public static recordRender(componentName: string): void {
    const current = this.renderCounts.get(componentName) || 0;
    this.renderCounts.set(componentName, current + 1);
  }

  public static getRenderCounts(): Record<string, number> {
    const res: Record<string, number> = {};
    for (const [k, v] of Array.from(this.renderCounts.entries())) {
      res[k] = v;
    }
    return res;
  }

  public static getSamples(name?: string): ReadonlyArray<MetricSample> {
    return name ? this.samples.filter((s) => s.name === name) : this.samples;
  }

  public static clear(): void {
    this.samples = [];
    this.renderCounts.clear();
  }
}
