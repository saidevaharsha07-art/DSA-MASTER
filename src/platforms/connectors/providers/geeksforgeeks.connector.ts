/**
 * GeeksforGeeks Official Connector Implementation
 */

import { MockPlatformConnector } from './mock.connector';
import { ConnectorCapabilities } from '../models/capability.models';

export class GeeksForGeeksConnector extends MockPlatformConnector {
  constructor() {
    super();
    this.platformId = 'geeksforgeeks';
    this.name = 'GeeksforGeeks Official Connector';
  }

  public override capabilities(): ConnectorCapabilities {
    return {
      supportsProfiles: true,
      supportsContests: true,
      supportsSubmissions: true,
      supportsRatings: true,
      supportsProblemSearch: true,
      supportsTags: true,
      supportsLanguages: true,
      apiVersion: 'gfg-v1',
    };
  }
}
