/**
 * Request Models
 */

export interface ConnectorSearchQuery {
  readonly keyword?: string;
  readonly difficulty?: string;
  readonly topic?: string;
  readonly page?: number;
  readonly pageSize?: number;
}
