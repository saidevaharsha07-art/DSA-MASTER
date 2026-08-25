/**
 * Migration Registry
 */

import { IMigration } from './migration.interface';

export class MigrationRegistry {
  private static migrations: Map<number, IMigration> = new Map();

  public static register(migration: IMigration): void {
    this.migrations.set(migration.version, migration);
  }

  public static getMigrations(): ReadonlyArray<IMigration> {
    return Array.from(this.migrations.values()).sort((a, b) => a.version - b.version);
  }

  public static getLatestVersion(): number {
    const versions = Array.from(this.migrations.keys());
    return versions.length > 0 ? Math.max(...versions) : 1;
  }
}
