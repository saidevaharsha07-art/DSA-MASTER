/**
 * Public Platform Connector API Facade
 */

import { Container } from '@/src/core/container/container';
import { ConnectorService } from '../services/connector.service';
import { ConnectorSearchQuery } from '../models/request.models';
import { ConnectorPaginatedResponse, PlatformUserProfile } from '../models/response.models';
import { PlatformProblem } from '@/src/platforms/types';

export class ConnectorApi {
  private static get service(): ConnectorService {
    if (!Container.has('ConnectorService')) {
      Container.registerSingleton('ConnectorService', new ConnectorService());
    }
    return Container.resolve<ConnectorService>('ConnectorService');
  }

  public static async searchProblems(platformId: string, query: ConnectorSearchQuery): Promise<ConnectorPaginatedResponse<PlatformProblem>> {
    return this.service.searchProblems(platformId, query);
  }

  public static async fetchProfile(platformId: string, handle: string): Promise<PlatformUserProfile | null> {
    return this.service.fetchProfile(platformId, handle);
  }
}
