/**
 * Connector Capability Model
 */

export interface ConnectorCapabilities {
  readonly supportsProfiles: boolean;
  readonly supportsContests: boolean;
  readonly supportsSubmissions: boolean;
  readonly supportsRatings: boolean;
  readonly supportsProblemSearch: boolean;
  readonly supportsTags: boolean;
  readonly supportsLanguages: boolean;
  readonly apiVersion: string;
}
