/**
 * Core Infrastructure Module Entrypoint
 */

export * from './plugins/plugin.interface';
export * from './plugins/plugin.registry';
export * from './plugins/plugin.manager';

export * from './container/container';
export * from './container/service-registry';

export * from './events/event-bus';

export * from './storage/storage-provider.interface';
export * from './storage/memory.storage';
export * from './storage/local.storage';
export * from './storage/indexeddb.storage';

export * from './repositories/profile.repository';
export * from './repositories/problem.repository';
export * from './repositories/contest.repository';
export * from './repositories/memory.repository';

export * from './migrations/migration.interface';
export * from './migrations/migration.registry';
export * from './migrations/migration.engine';

export * from './metrics/metrics.collector';
export * from './workers/background-scheduler';
