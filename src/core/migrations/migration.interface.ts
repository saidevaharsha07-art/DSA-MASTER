/**
 * Versioned Data Migrations — Interface Contract
 */

export interface IMigration {
  readonly version: number;
  readonly description: string;
  up(data: Record<string, unknown>): Promise<Record<string, unknown>> | Record<string, unknown>;
  down(data: Record<string, unknown>): Promise<Record<string, unknown>> | Record<string, unknown>;
}
