import { MigrationEngine } from '@/src/core/migrations/migration.engine';

export class BackupMigrationEngine {
  public static async migrateSnapshotIfNeeded(snapshotData: Record<string, unknown>, fromVersion: number, toVersion: number = 2): Promise<Record<string, unknown>> {
    if (fromVersion >= toVersion) return snapshotData;
    return MigrationEngine.migrate(snapshotData, toVersion);
  }
}
