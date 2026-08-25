/**
 * Codeforces Platform Loader
 * Loads and normalizes Codeforces dataset into PlatformProblem[] contract.
 */

import { IPlatformLoader } from '../interfaces';
import {
  PlatformId,
  PlatformProblem,
  PlatformVersionInfo,
  PlatformValidationReport,
  DatasetHealthReport,
  RawCodeforcesProblem,
} from '../types';
import { PlatformValidator } from '../validation/platform.validator';
import { LoaderError } from '../errors';
import { logger } from '../logger';
import codeforcesRawData from '@/src/data/codeforces.json';

export class CodeforcesLoader implements IPlatformLoader {
  public readonly platformId: PlatformId = 'codeforces';
  private cachedProblems: ReadonlyArray<PlatformProblem> | null = null;

  public load(): ReadonlyArray<PlatformProblem> {
    if (this.cachedProblems) {
      return this.cachedProblems;
    }

    try {
      const rawList = codeforcesRawData as RawCodeforcesProblem[];
      if (!Array.isArray(rawList)) {
        throw new LoaderError('codeforces', 'Raw dataset is not an array.');
      }

      const problems: PlatformProblem[] = [];

      for (let i = 0; i < rawList.length; i++) {
        try {
          const item = rawList[i];
          if (!item || typeof item !== 'object') {
            logger.warn(`[CodeforcesLoader] Skipping null/invalid item at index ${i}`);
            continue;
          }

          const prob = this.mapRawToProblem(item, i);
          problems.push(Object.freeze(prob));
        } catch (itemErr: unknown) {
          const msg = itemErr instanceof Error ? itemErr.message : String(itemErr);
          logger.warn(`[CodeforcesLoader] Failed to parse item at index ${i}: ${msg}`);
        }
      }

      this.cachedProblems = Object.freeze(problems);
      logger.info(`[CodeforcesLoader] Loaded ${this.cachedProblems.length} problems successfully.`);
      return this.cachedProblems;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`[CodeforcesLoader] Error loading dataset: ${msg}`);
      throw new LoaderError('codeforces', msg, err instanceof Error ? err : undefined);
    }
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
      lastUpdated: '2026-07-29T16:30:00Z',
      platformVersion: '1.0.0',
    };
  }

  private mapRawToProblem(item: RawCodeforcesProblem, index: number): PlatformProblem {
    const code = item.id || (item.contestId && item.index ? `${item.contestId}${item.index}` : `CF_ROW_${index + 1}`);
    const title = item.title || item.name || 'Untitled Codeforces Problem';

    return {
      id: code,
      title: title,
      platform: 'codeforces',
      difficulty: item.difficulty || 'Medium',
      rating: typeof item.rating === 'number' ? item.rating : 'UNKNOWN',
      topic: item.kingdom || item.category || 'General',
      pattern: item.pattern || item.subtopic || 'General',
      url: item.url || `https://codeforces.com/problemset/problem/${item.contestId}/${item.index}`,
      solved: item.status === 'Solved',
      estimatedTime: typeof item.estimatedTime === 'number' ? item.estimatedTime : 40,
      xp: typeof item.xp === 'number' ? item.xp : 35,
      metadata: Object.freeze({
        contestId: item.contestId,
        index: item.index,
        tags: Object.freeze(Array.isArray(item.tags) ? item.tags : []),
        notes: item.notes || '',
        rawKingdom: item.kingdom,
        rawPattern: item.pattern,
      }),
    };
  }
}
