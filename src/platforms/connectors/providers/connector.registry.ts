/**
 * Connector Registry
 */

import { IPlatformConnector } from './connector.interface';

export class ConnectorRegistry {
  private static connectors: Map<string, IPlatformConnector> = new Map();

  public static register(connector: IPlatformConnector): void {
    this.connectors.set(connector.platformId, connector);
  }

  public static getConnector(platformId: string): IPlatformConnector | undefined {
    return this.connectors.get(platformId);
  }

  public static getAllConnectors(): ReadonlyArray<IPlatformConnector> {
    return Array.from(this.connectors.values());
  }

  public static clear(): void {
    this.connectors.clear();
  }
}
