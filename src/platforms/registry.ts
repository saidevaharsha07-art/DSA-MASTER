/**
 * Platform Registry
 * Central single source of truth for competitive programming platform registrations,
 * metadata, capabilities, and loader dispatch.
 */

import { IPlatformLoader } from './interfaces';
import { PlatformId, PlatformConfig } from './types';
import { DuplicatePlatformError } from './errors';
import { logger } from './logger';
import { CodeChefLoader } from './loaders/codechef.loader';
import { CodeforcesLoader } from './loaders/codeforces.loader';
import { LeetCodeLoader } from './loaders/leetcode.loader';

export class PlatformRegistry {
  private static instance: PlatformRegistry;
  private configs: Map<PlatformId, Readonly<PlatformConfig>> = new Map();
  private loaders: Map<PlatformId, IPlatformLoader> = new Map();

  private constructor() {
    this.registerDefaults();
  }

  public static getInstance(): PlatformRegistry {
    if (!PlatformRegistry.instance) {
      PlatformRegistry.instance = new PlatformRegistry();
    }
    return PlatformRegistry.instance;
  }

  /**
   * Reset instance for testing purposes.
   */
  public static resetInstance(): void {
    PlatformRegistry.instance = new PlatformRegistry();
  }

  /**
   * Register a platform configuration and its corresponding data loader.
   * Throws DuplicatePlatformError if already registered unless overwrite is set to true.
   */
  public registerPlatform(
    config: PlatformConfig,
    loader: IPlatformLoader,
    overwrite: boolean = false
  ): void {
    if (!config || !config.id) {
      throw new Error('[PlatformRegistry] Invalid platform configuration.');
    }
    if (!loader) {
      throw new Error(`[PlatformRegistry] No loader provided for platform '${config.id}'.`);
    }

    if (this.hasPlatform(config.id) && !overwrite) {
      throw new DuplicatePlatformError(config.id);
    }

    const frozenConfig = Object.freeze({
      ...config,
      capabilities: Object.freeze({ ...config.capabilities }),
      difficultySystem: Object.freeze([...config.difficultySystem]),
    });

    this.configs.set(config.id, frozenConfig);
    this.loaders.set(config.id, loader);

    logger.info(`[PlatformRegistry] Registered platform '${config.id}' (${config.displayName}).`);
  }

  /**
   * Unregister a platform by ID.
   */
  public unregisterPlatform(id: PlatformId): boolean {
    const removedConfig = this.configs.delete(id);
    const removedLoader = this.loaders.delete(id);
    if (removedConfig || removedLoader) {
      logger.info(`[PlatformRegistry] Unregistered platform '${id}'.`);
      return true;
    }
    return false;
  }

  /**
   * Check if a platform is registered.
   */
  public hasPlatform(id: PlatformId): boolean {
    return this.configs.has(id) && this.loaders.has(id);
  }

  /**
   * Get metadata configuration for a platform.
   */
  public getPlatformConfig(id: PlatformId): Readonly<PlatformConfig> | undefined {
    return this.configs.get(id);
  }

  /**
   * Get all registered platform configurations.
   */
  public getAllPlatformConfigs(): ReadonlyArray<Readonly<PlatformConfig>> {
    return Object.freeze(Array.from(this.configs.values()));
  }

  /**
   * Get loader for a registered platform.
   */
  public getLoader(id: PlatformId): IPlatformLoader | undefined {
    return this.loaders.get(id);
  }

  /**
   * Pre-register default core platforms.
   */
  private registerDefaults(): void {
    // 1. CodeChef
    this.registerPlatform(
      {
        id: 'codechef',
        displayName: 'CodeChef',
        logo: '/assets/platforms/codechef.svg',
        themeColor: '#5B4636',
        websiteUrl: 'https://www.codechef.com',
        status: 'active',
        capabilities: {
          supportsRating: true,
          supportsContests: true,
          supportsEditorial: true,
          supportsSubmissions: true,
          supportsCustomTestcases: true,
        },
        difficultySystem: ['Beginner', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard', 'Expert'],
      },
      new CodeChefLoader(),
      true
    );

    // 2. Codeforces
    this.registerPlatform(
      {
        id: 'codeforces',
        displayName: 'Codeforces',
        logo: '/assets/platforms/codeforces.svg',
        themeColor: '#1F85DE',
        websiteUrl: 'https://codeforces.com',
        status: 'active',
        capabilities: {
          supportsRating: true,
          supportsContests: true,
          supportsEditorial: true,
          supportsSubmissions: true,
          supportsCustomTestcases: true,
        },
        difficultySystem: ['Easy', 'Easy+', 'Medium', 'Medium+', 'Hard', 'Hard+', 'Expert', 'Master'],
      },
      new CodeforcesLoader(),
      true
    );

    // 3. LeetCode
    this.registerPlatform(
      {
        id: 'leetcode',
        displayName: 'LeetCode',
        logo: '/assets/platforms/leetcode.svg',
        themeColor: '#FFA116',
        websiteUrl: 'https://leetcode.com',
        status: 'active',
        capabilities: {
          supportsRating: true,
          supportsContests: true,
          supportsEditorial: true,
          supportsSubmissions: true,
          supportsCustomTestcases: true,
        },
        difficultySystem: ['Easy', 'Medium', 'Hard'],
      },
      new LeetCodeLoader(),
      true
    );

    // 4. MentorPick (Placeholder / Planned)
    this.registerPlatform(
      {
        id: 'mentorpick',
        displayName: 'MentorPick',
        logo: '/assets/platforms/mentorpick.svg',
        themeColor: '#6366F1',
        websiteUrl: 'https://mentorpick.com',
        status: 'planned',
        capabilities: {
          supportsRating: false,
          supportsContests: true,
          supportsEditorial: true,
          supportsSubmissions: true,
        },
        difficultySystem: ['Easy', 'Medium', 'Hard'],
      },
      {
        platformId: 'mentorpick',
        load: () => Object.freeze([]),
        validate: () => ({
          valid: true,
          platform: 'mentorpick',
          totalProblems: 0,
          duplicateIds: [],
          invalidUrls: [],
          warnings: [],
          errors: [],
          summary: 'Placeholder loader for MentorPick.',
        }),
        refresh: async () => {},
        getVersion: () => ({ datasetVersion: '0.0.1', lastUpdated: '', platformVersion: '0.0.1' }),
      },
      true
    );
  }
}
