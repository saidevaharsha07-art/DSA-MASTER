/**
 * CodeChef Platform Module — Loader
 * Implements IPlatformLoader interface for Platform Engine.
 * Automatically loads JSON, CSV, or Excel depending on availability (preferring JSON).
 */

import { IPlatformLoader } from '../interfaces';
import {
  PlatformId,
  PlatformProblem,
  PlatformVersionInfo,
  PlatformValidationReport,
  DatasetHealthReport,
} from '../types';
import { CodeChefDatasetProvider } from './dataset';
import { PlatformValidator } from '../validation/platform.validator';
import { logger } from '../logger';

export class CodeChefLoader implements IPlatformLoader {
  public readonly platformId: PlatformId = 'codechef';
  private cachedProblems: ReadonlyArray<PlatformProblem> | null = null;

  public load(): ReadonlyArray<PlatformProblem> {
    if (this.cachedProblems) return this.cachedProblems;

    logger.info(`[CodeChefLoader] Auto-selected dataset source: Static Division Datasets`);

    const codechefProblems = CodeChefDatasetProvider.loadCompleteDataset();
    this.cachedProblems = Object.freeze(codechefProblems);
    logger.info(`[CodeChefLoader] Loaded ${this.cachedProblems.length} normalized CodeChef problems.`);

    return this.cachedProblems;
  }

  public async loadAsync(): Promise<ReadonlyArray<PlatformProblem>> {
    return this.load();
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
    CodeChefDatasetProvider.clearCache();
    this.load();
  }

  public getVersion(): PlatformVersionInfo {
    return {
      datasetVersion: '2.0.0',
      lastUpdated: new Date().toISOString(),
      platformVersion: '1.0.0',
    };
  }
}
