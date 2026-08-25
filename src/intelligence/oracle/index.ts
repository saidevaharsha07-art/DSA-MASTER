/**
 * Oracle AI Recommendation Engine — Module Entrypoint
 * Re-exports Oracle models, engines, strategies, and services.
 */

export * from './models/oracle.models';
export * from './models/recommendation.models';
export * from './models/action.models';
export * from './models/insight.models';
export * from './models/dashboard.models';
export * from './models/conflict.models';
export * from './models/confidence.models';
export * from './models/simulation.models';

export * from './strategies/strategy.interface';
export * from './strategies/balanced.strategy';
export * from './strategies/contest.strategy';
export * from './strategies/revision.strategy';
export * from './strategies/interview.strategy';
export * from './strategies/rating.strategy';
export * from './strategies/mastery.strategy';

export * from './engine/prioritization.engine';
export * from './engine/ranking.engine';
export * from './engine/conflict.engine';
export * from './engine/recommendation.orchestrator';
export * from './engine/insight.engine';
export * from './engine/dashboard.engine';
export * from './engine/explanation.engine';
export * from './engine/simulation.engine';
export * from './engine/oracle.engine';

export * from './services/context.service';
export * from './services/oracle.service';
