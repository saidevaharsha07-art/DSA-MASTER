/**
 * Core Connector Service API
 */

import { ConnectorManager } from './connector.manager';
import { ConnectorRegistry } from '../providers/connector.registry';
import { ConnectorSearchQuery } from '../models/request.models';
import { ConnectorPaginatedResponse, PlatformUserProfile } from '../models/response.models';
import { PlatformProblem } from '@/src/platforms/types';
import { RateLimitService } from './rate-limit.service';
import { EventBus } from '@/src/core/events/event-bus';

export class ConnectorService {
  private manager: ConnectorManager;

  constructor(manager?: ConnectorManager) {
    this.manager = manager || new ConnectorManager();
  }

  public getManager(): ConnectorManager {
    return this.manager;
  }

  public async searchProblems(platformId: string, query: ConnectorSearchQuery): Promise<ConnectorPaginatedResponse<PlatformProblem>> {
    const connector = ConnectorRegistry.getConnector(platformId);
    if (!connector) {
      throw new Error(`[ConnectorService] Connector for platform '${platformId}' not registered.`);
    }

    const allowed = await RateLimitService.acquireToken(platformId);
    if (!allowed) {
      throw new Error(`[ConnectorService] Rate limit exceeded for platform '${platformId}'.`);
    }

    EventBus.publish('ConnectorRequestStarted', { platformId, query });
    const start = performance.now();
    try {
      const res = await connector.searchProblems(query);
      EventBus.publish('ConnectorRequestFinished', { platformId, durationMs: performance.now() - start });
      return res;
    } catch (err) {
      EventBus.publish('ConnectorFailure', { platformId, error: String(err) });
      throw err;
    }
  }

  public async fetchProfile(platformId: string, handle: string): Promise<PlatformUserProfile | null> {
    const connector = ConnectorRegistry.getConnector(platformId);
    if (!connector) return null;
    return connector.fetchProfile(handle);
  }
}
