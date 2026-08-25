/**
 * Backup Snapshot & Core Models
 */

import { BackupManifest } from './manifest.models';

export interface SubsystemSnapshot<T = unknown> {
  readonly subsystemName: string;
  readonly payload: T;
  readonly recordCount: number;
}

export interface BackupSnapshot {
  readonly manifest: BackupManifest;
  readonly subsystemsData: Record<string, SubsystemSnapshot>;
}
