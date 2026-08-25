/**
 * Serializer Service
 */

import { BackupSnapshot } from '../models/backup.models';

export class SerializerService {
  public static serialize(snapshot: BackupSnapshot): string {
    return JSON.stringify(snapshot);
  }

  public static deserialize(rawJson: string): BackupSnapshot {
    return JSON.parse(rawJson) as BackupSnapshot;
  }
}
