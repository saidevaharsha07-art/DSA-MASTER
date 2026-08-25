/**
 * LeetCode Platform Loader
 * Decoupled platform loader for LeetCode problem data.
 */

import { IPlatformLoader } from '../interfaces';
import {
  PlatformId,
  PlatformProblem,
  PlatformVersionInfo,
  PlatformValidationReport,
  DatasetHealthReport,
} from '../types';
import { PlatformValidator } from '../validation/platform.validator';

export class LeetCodeLoader implements IPlatformLoader {
  public readonly platformId: PlatformId = 'leetcode';
  private cachedProblems: ReadonlyArray<PlatformProblem> | null = null;

  public load(): ReadonlyArray<PlatformProblem> {
    if (this.cachedProblems) {
      return this.cachedProblems;
    }

    const raw: PlatformProblem[] = [
      {
        id: 'lc-1',
        title: 'Two Sum',
        platform: 'leetcode',
        difficulty: 'Easy',
        rating: 1200,
        topic: 'Arrays',
        pattern: 'Two Pointers / Hash Map',
        url: 'https://leetcode.com/problems/two-sum/',
        solved: true,
        estimatedTime: 15,
        xp: 15,
        metadata: Object.freeze({
          number: 1,
          acceptanceRate: 53.4,
          tags: Object.freeze(['array', 'hash-table']),
          companies: Object.freeze(['Google', 'Amazon', 'Meta']),
        }),
      },
      {
        id: 'lc-3',
        title: 'Longest Substring Without Repeating Characters',
        platform: 'leetcode',
        difficulty: 'Medium',
        rating: 1500,
        topic: 'Strings',
        pattern: 'Sliding Window',
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        solved: false,
        estimatedTime: 20,
        xp: 25,
        metadata: Object.freeze({
          number: 3,
          acceptanceRate: 40.7,
          tags: Object.freeze(['hash-table', 'string', 'sliding-window']),
          companies: Object.freeze(['Amazon', 'Microsoft']),
        }),
      },
      {
        id: 'lc-146',
        title: 'LRU Cache',
        platform: 'leetcode',
        difficulty: 'Medium',
        rating: 1750,
        topic: 'Linked List & Simulation',
        pattern: 'Simulation with Data Structures',
        url: 'https://leetcode.com/problems/lru-cache/',
        solved: false,
        estimatedTime: 30,
        xp: 30,
        metadata: Object.freeze({
          number: 146,
          acceptanceRate: 35.2,
          tags: Object.freeze(['hash-table', 'linked-list', 'design', 'doubly-linked-list']),
          companies: Object.freeze(['Google', 'Facebook', 'Amazon']),
        }),
      },
    ];

    this.cachedProblems = Object.freeze(raw.map((p) => Object.freeze(p)));
    return this.cachedProblems;
  }

  public validate(): PlatformValidationReport {
    const problems = this.load();
    return PlatformValidator.validate(this.platformId, problems);
  }

  public getHealthReport(): DatasetHealthReport {
    const problems = this.load();
    return PlatformValidator.generateHealthReport(this.platformId, problems);
  }

  public async refresh(): Promise<void> {
    this.cachedProblems = null;
    this.load();
  }

  public getVersion(): PlatformVersionInfo {
    return {
      datasetVersion: '1.0.0',
      lastUpdated: '2026-07-29T00:00:00Z',
      platformVersion: '1.0.0',
    };
  }
}
