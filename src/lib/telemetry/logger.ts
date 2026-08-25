/**
 * Structured Logger & Execution Timings
 */

import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export class Logger {
  public static log(level: LogLevel, tag: string, message: string, meta?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] [${tag}] ${message}`;
    if (level === 'ERROR') {
      console.error(formatted, meta || '');
    } else if (level === 'WARN') {
      console.warn(formatted, meta || '');
    } else {
      console.log(formatted, meta || '');
    }
  }

  public static async measureTime<T>(tag: string, operation: () => Promise<T> | T): Promise<T> {
    const start = performance.now();
    try {
      return await operation();
    } finally {
      const duration = performance.now() - start;
      MetricsCollector.record(`execution_${tag}`, duration, 'ms');
      this.log('INFO', tag, `Executed in ${duration.toFixed(2)}ms`);
    }
  }
}
