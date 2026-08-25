/**
 * Platform Connector Summary Model
 */

import { ConnectorCapabilities } from './capability.models';
import { ConnectorHealth } from './health.models';

export interface ConnectorSummary {
  readonly platformId: string;
  readonly name: string;
  readonly isConnected: boolean;
  readonly capabilities: ConnectorCapabilities;
  readonly health: ConnectorHealth;
}
