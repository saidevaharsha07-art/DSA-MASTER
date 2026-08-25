/**
 * Platform Engine Module
 * Unified public entrypoint re-exporting platform types, interfaces, constants, errors, loggers, registry, provider, loaders, and validators.
 *
 * Usage:
 *   import { ProblemProvider, PlatformRegistry, PlatformId, PlatformProblem, PlatformValidator } from "@/src/platforms";
 *   import { codechefPlatform } from "@/src/platforms/codechef";
 */

export * from './types';
export * from './interfaces';
export * from './constants';
export * from './errors';
export * from './logger';
export * from './registry';
export * from './problem.provider';
export * from './validation/platform.validator';

export * from './loaders/codeforces.loader';
export * from './loaders/leetcode.loader';
export * from './codechef';
