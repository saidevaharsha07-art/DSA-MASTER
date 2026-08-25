/**
 * Migration Engine
 * Executes automatic schema migrations and handles rollbacks.
 */

import { MigrationRegistry } from './migration.registry';

export class MigrationEngine {
  public static async migrate(data: Record<string, unknown>, targetVersion?: number): Promise<Record<string, unknown>> {
    let currentVersion = typeof data.schemaVersion === 'number' ? data.schemaVersion : 1;
    const maxVersion = targetVersion || MigrationRegistry.getLatestVersion();

    let migratedData = { ...data };
    const migrations = MigrationRegistry.getMigrations();

    for (const m of migrations) {
      if (m.version > currentVersion && m.version <= maxVersion) {
        migratedData = await m.up(migratedData);
        migratedData.schemaVersion = m.version;
        currentVersion = m.version;
      }
    }

    return migratedData;
  }
}
