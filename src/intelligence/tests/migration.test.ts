/**
 * Unit Test: Versioned Data Migrations Engine
 */

import { MigrationRegistry } from '@/src/core/migrations/migration.registry';
import { MigrationEngine } from '@/src/core/migrations/migration.engine';

export async function testMigrations(): Promise<void> {
  console.log('--- Testing Versioned Data Migrations Engine ---');

  MigrationRegistry.register({
    version: 2,
    description: 'Add default user preferences',
    up: (data) => ({ ...data, theme: 'dark' }),
    down: (data) => {
      const copy = { ...data };
      delete copy.theme;
      return copy;
    },
  });

  const rawData = { schemaVersion: 1, userId: 'm-user' };
  const migrated = await MigrationEngine.migrate(rawData, 2);

  if (migrated.schemaVersion !== 2 || migrated.theme !== 'dark') {
    throw new Error('Data migration engine failed to execute forward migration!');
  }

  console.log('[PASS] Forward schema migration verified (v1 -> v2).');
}
