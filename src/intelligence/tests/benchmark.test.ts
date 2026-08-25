/**
 * Performance Benchmark & Latency Test
 * Asserts that core engine execution runs in sub-5ms latency.
 */

import { OracleEngine } from '../oracle/engine/oracle.engine';

export function testPerformanceBenchmarks(): void {
  console.log('--- Testing Engine Performance & Latency Benchmarks ---');

  const engine = new OracleEngine();

  const start = performance.now();
  for (let i = 0; i < 50; i++) {
    engine.generateDailyPlan([]);
  }
  const duration = performance.now() - start;
  const avgMs = duration / 50;

  if (avgMs > 5) {
    throw new Error(`Performance benchmark failed! Average execution latency was ${avgMs.toFixed(2)}ms (>5ms threshold).`);
  }

  console.log(`[PASS] Engine performance benchmark verified (${avgMs.toFixed(2)}ms avg latency per execution).`);
}
