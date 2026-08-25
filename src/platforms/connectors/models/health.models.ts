/**
 * Health Status & Diagnostics Model
 */

export interface ConnectorHealth {
  readonly platformId: string;
  readonly isConnected: boolean;
  readonly latencyMs: number;
  readonly uptimePercentage: number;
  readonly lastSuccessAt?: string;
  readonly lastFailureAt?: string;
  readonly errorCount: number;
}
