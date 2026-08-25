# Versioned Backup, Restore & Data Integrity System (`src/lib/backup/`)

## Architecture
Provider-agnostic, versioned backup, restore, compression, and integrity verification framework for disaster recovery and multi-device cloud synchronization.

```text
BackupApi / UI -> BackupService -> BackupEngine -> SnapshotBuilder (Auth, Profile, Memory, Contest, Achievements...)
                                        │
                                        ├──────► CompressionService & IntegrityVerifier (Checksum Validation)
                                        ├──────► BackupMigrationEngine (Forward Schema Upgrades v1 -> v2)
                                        ├──────► IBackupProvider (Local Disk, Firebase, Supabase, S3, GDrive)
                                        └──────► EventBus (BackupStarted, BackupCompleted, IntegrityCheckPassed)
```

## Features
- **Comprehensive Coverage**: Captures Auth, Profile, XP, Memory, Oracle, Contests, Achievements, Leaderboards, Notifications, and Analytics.
- **Restore Modes**: Full, Partial, Merge, Preview, Dry Run.
- **Integrity Verification**: Checksum matching, schema version checking, and corruption detection (`IntegrityReport`).
- **Provider Agnostic**: Modular backup provider interfaces supporting Local, Firebase, Supabase, S3, Google Drive, and OneDrive.
