/**
 * MentorPick Connector Implementation
 */

import { MockPlatformConnector } from './mock.connector';
import { ConnectorCapabilities } from '../models/capability.models';

export class MentorPickConnector extends MockPlatformConnector {
  constructor() {
    super();
    this.platformId = 'mentorpick';
    this.name = 'MentorPick Official Connector';
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
      apiVersion: 'mp-v1',
    };
  }
}
