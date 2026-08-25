/**
 * Connector Health & Latency Monitoring Service
 */

import { IPlatformConnector } from '../providers/connector.interface';
import { ConnectorHealth } from '../models/health.models';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

export class HealthService {
  public static async evaluateHealth(connector: IPlatformConnector): Promise<ConnectorHealth> {
    const start = performance.now();
    let isConnected = false;
    let errorCount = 0;

    try {
      const pingMs = await connector.ping();
      isConnected = pingMs >= 0;
    } catch {
      errorCount++;
    }

    const latencyMs = Math.round(performance.now() - start);
    MetricsCollector.record(`connector_latency_${connector.platformId}`, latencyMs, 'ms');

    return {
      platformId: connector.platformId,
      isConnected,
      latencyMs,
      uptimePercentage: isConnected ? 100 : 0,
      lastSuccessAt: isConnected ? new Date().toISOString() : undefined,
      lastFailureAt: !isConnected ? new Date().toISOString() : undefined,
      errorCount,
    };
  }
}
