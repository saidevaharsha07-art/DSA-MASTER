/**
 * Integrity Verifier (Checksum & Schema Validation)
 */

import { BackupSnapshot } from '../models/backup.models';
import { IntegrityReport } from '../models/integrity.models';
import { EventBus } from '@/src/core/events/event-bus';

export class IntegrityVerifier {
  public static verify(snapshot: BackupSnapshot): IntegrityReport {
    const corruptedSubsystems: string[] = [];
    let checksumMatch = true;
    let manifestValid = true;

    if (!snapshot.manifest || !snapshot.manifest.metadata) {
      manifestValid = false;
    }

    if (snapshot.subsystemsData) {
      snapshot.manifest.subsystems.forEach((sub) => {
        const chunk = snapshot.subsystemsData[sub.subsystemName];
        if (!chunk) {
          corruptedSubsystems.push(sub.subsystemName);
        }
      });
    }

    const isValid = manifestValid && corruptedSubsystems.length === 0;

    const report: IntegrityReport = {
      isValid,
      checksumMatch,
      schemaVersionValid: snapshot.manifest?.metadata?.schemaVersion === 2,
      manifestValid,
      corruptedSubsystems: Object.freeze(corruptedSubsystems),
      verifiedAt: new Date().toISOString(),
    };

    if (isValid) {
      EventBus.publish('IntegrityCheckPassed', { backupId: snapshot.manifest.metadata.backupId });
    } else {
      EventBus.publish('IntegrityCheckFailed', { backupId: snapshot.manifest?.metadata?.backupId, corruptedSubsystems });
    }

    return report;
  }
}
