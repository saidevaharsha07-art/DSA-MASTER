/**
 * Intelligence Layer Module
 * Unified public entrypoint re-exporting models, domain rules, analyzers, recommendation engines,
 * adaptive engines, contest intelligence, rating engines, practice schedulers, learning memory engine, Oracle AI, services, and storage.
 *
 * Usage:
 *   import { OracleService, MemoryEngine, ContestEngine, RatingEngine, AdaptiveEngine } from "@/intelligence";
 */

export * from './models/learning-profile';
export * from './models/practice-history';
export * from './models/weakness';
export * from './models/recommendation';
export * from './models/contest';

export * from './domain/scoring.rules';
export * from './domain/mastery.rules';
export * from './domain/streak.rules';

export * from './analyzers/weakness.analyzer';
export * from './analyzers/strength.analyzer';
export * from './analyzers/topic.analyzer';
export * from './analyzers/difficulty.analyzer';

export * from './recommendations/recommendation.engine';
export * from './recommendations/practice.engine';
export * from './recommendations/next-problem.engine';

export * from './adaptive/adaptive.session';
export * from './adaptive/adaptive.explanation';
export * from './adaptive/adaptive.constraints';
export * from './adaptive/adaptive.progression';
export * from './adaptive/adaptive.selector';
export * from './adaptive/adaptive.engine';

export * from './adaptive/strategies/strategy.interface';
export * from './adaptive/strategies/weakness-first.strategy';
export * from './adaptive/strategies/balanced.strategy';
export * from './adaptive/strategies/revision.strategy';
export * from './adaptive/strategies/contest-prep.strategy';
export * from './adaptive/strategies/rating-climb.strategy';
export * from './adaptive/strategies/topic-mastery.strategy';
export * from './adaptive/strategies/pattern-mastery.strategy';

export * from './sessions/session.builder';
export * from './sessions/session.evaluator';
export * from './sessions/session.summary';
export * from './sessions/session.history';
export * from './sessions/recommendation.history';

export * from './scheduler/daily.plan';
export * from './scheduler/weekly.plan';
export * from './scheduler/practice.scheduler';

export * from './contests/contest.models';
export * from './contests/contest.utils';
export * from './contests/contest.history';
export * from './contests/contest.performance';
export * from './contests/contest.analyzer';
export * from './contests/contest.statistics';
export * from './contests/contest.readiness';
export * from './contests/contest.recommendations';
export * from './contests/contest.engine';

export * from './ratings/rating.models';
export * from './ratings/rating.progression';
export * from './ratings/rating.predictor';
export * from './ratings/rating.statistics';
export * from './ratings/rating.engine';

export * from './memory';
export * from './oracle';

export * from './storage/intelligence.storage';
export * from './services/profile.service';
export * from './services/statistics.service';
export * from './services/intelligence.service';

export * from './utils/metrics.calculator';
export * from './utils/data-helpers';
export * from './onboarding';
