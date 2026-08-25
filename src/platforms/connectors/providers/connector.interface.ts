/**
 * Platform Connector Standard Interface Contract
 */

import { ConnectorCapabilities } from '../models/capability.models';
import { ConnectorHealth } from '../models/health.models';
import { ConnectorSearchQuery } from '../models/request.models';
import { ConnectorPaginatedResponse, PlatformUserProfile, PlatformSubmission } from '../models/response.models';
import { PlatformProblem } from '@/src/platforms/types';
import { ContestRecord } from '@/src/intelligence/contests/contest.models';

export interface IPlatformConnector {
  readonly platformId: string;
  readonly name: string;
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  health(): Promise<ConnectorHealth>;
  capabilities(): ConnectorCapabilities;
  searchProblems(query: ConnectorSearchQuery): Promise<ConnectorPaginatedResponse<PlatformProblem>>;
  fetchProblem(problemId: string): Promise<PlatformProblem | null>;
  fetchProfile(handle: string): Promise<PlatformUserProfile | null>;
  fetchContestHistory(handle: string): Promise<ReadonlyArray<ContestRecord>>;
  fetchSubmissions(handle: string): Promise<ReadonlyArray<PlatformSubmission>>;
  ping(): Promise<number>;
}
