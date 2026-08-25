/**
 * Fully Functional Mock Platform Connector
 */

import { IPlatformConnector } from './connector.interface';
import { ConnectorCapabilities } from '../models/capability.models';
import { ConnectorHealth } from '../models/health.models';
import { ConnectorSearchQuery } from '../models/request.models';
import { ConnectorPaginatedResponse, PlatformUserProfile, PlatformSubmission } from '../models/response.models';
import { PlatformProblem } from '@/src/platforms/types';
import { ContestRecord } from '@/src/intelligence/contests/contest.models';

export class MockPlatformConnector implements IPlatformConnector {
  public platformId: string = 'mock';
  public name: string = 'Mock Platform Connector';
  private connected = true;

  public async connect(): Promise<boolean> {
    this.connected = true;
    return true;
  }

  public async disconnect(): Promise<void> {
    this.connected = false;
  }

  public async health(): Promise<ConnectorHealth> {
    return {
      platformId: this.platformId,
      isConnected: this.connected,
      latencyMs: 5,
      uptimePercentage: 100,
      lastSuccessAt: new Date().toISOString(),
      errorCount: 0,
    };
  }

  public capabilities(): ConnectorCapabilities {
    return {
      supportsProfiles: true,
      supportsContests: true,
      supportsSubmissions: true,
      supportsRatings: true,
      supportsProblemSearch: true,
      supportsTags: true,
      supportsLanguages: true,
      apiVersion: '1.0.0-mock',
    };
  }

  public async searchProblems(query: ConnectorSearchQuery): Promise<ConnectorPaginatedResponse<PlatformProblem>> {
    const mockProblems: PlatformProblem[] = [
      { id: 'MOCK-101', title: 'Mock Two Sum', platform: 'leetcode', difficulty: 'Easy', rating: 800, topic: 'Arrays', pattern: 'Two Pointers', url: 'https://mock.com/101', solved: false, metadata: {} },
      { id: 'MOCK-102', title: 'Mock Reverse String', platform: 'leetcode', difficulty: 'Easy', rating: 800, topic: 'Strings', pattern: 'Two Pointers', url: 'https://mock.com/102', solved: true, metadata: {} },
    ];
    return {
      items: Object.freeze(mockProblems),
      page: query.page || 1,
      pageSize: query.pageSize || 10,
      totalItems: 2,
      hasMore: false,
    };
  }

  public async fetchProblem(problemId: string): Promise<PlatformProblem | null> {
    return { id: problemId, title: 'Mock Problem', platform: 'leetcode', difficulty: 'Medium', rating: 1200, topic: 'DP', pattern: 'Memoization', url: 'https://mock.com', solved: false, metadata: {} };
  }

  public async fetchProfile(handle: string): Promise<PlatformUserProfile | null> {
    return {
      platformUserId: 'mock-user-1',
      handle,
      rating: 1600,
      maxRating: 1750,
      rankTitle: 'Expert Coder',
      solvedCount: 150,
      profileUrl: 'https://mock.com/profile',
    };
  }

  public async fetchContestHistory(): Promise<ReadonlyArray<ContestRecord>> {
    return Object.freeze([
      {
        id: 'rec-mock-1',
        platform: 'leetcode',
        contestId: 'mock-round-1',
        name: 'Mock Weekly Contest 10',
        date: new Date().toISOString(),
        durationMinutes: 90,
        lifecycleState: 'completed',
        rank: 120,
        totalParticipants: 5000,
        ratingBefore: 1550,
        ratingAfter: 1600,
        ratingChange: 50,
        solvedCount: 3,
        attemptedCount: 4,
        penaltiesMinutes: 0,
      },
    ]);
  }

  public async fetchSubmissions(): Promise<ReadonlyArray<PlatformSubmission>> {
    return Object.freeze([
      { submissionId: 'sub-m1', problemId: 'MOCK-101', status: 'accepted', language: 'cpp', timestamp: new Date().toISOString(), executionTimeMs: 15 },
    ]);
  }

  public async ping(): Promise<number> {
    return 5;
  }
}
