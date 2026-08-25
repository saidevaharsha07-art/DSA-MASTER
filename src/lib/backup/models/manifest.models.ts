/**
 * Backup Manifest Model
 */

import { BackupMetadata } from './metadata.models';

export interface SubsystemChunkInfo {
  readonly subsystemName: string;
  readonly recordCount: number;
  readonly checksum: string;
}

export interface BackupManifest {
  readonly metadata: BackupMetadata;
  readonly subsystems: ReadonlyArray<SubsystemChunkInfo>;
  readonly compressionAlgorithm: 'none' | 'gzip' | 'brotli' | 'zstd';
}
