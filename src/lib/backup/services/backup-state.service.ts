/**
 * Observable Backup State Store
 */

import { BackupMetadata } from '../models/metadata.models';

export interface BackupStateSnapshot {
  readonly backups: ReadonlyArray<BackupMetadata>;
  readonly lastBackupAt?: string;
  readonly isBackingUp: boolean;
  readonly isRestoring: boolean;
}

export class BackupStateService {
  private state: BackupStateSnapshot = {
    backups: [],
    isBackingUp: false,
    isRestoring: false,
  };

  private listeners: Set<(state: BackupStateSnapshot) => void> = new Set();

  public getState(): BackupStateSnapshot {
    return this.state;
  }

  public setState(next: Partial<BackupStateSnapshot>): void {
    this.state = Object.freeze({ ...this.state, ...next });
    this.listeners.forEach((l) => l(this.state));
  }

  public subscribe(listener: (state: BackupStateSnapshot) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
