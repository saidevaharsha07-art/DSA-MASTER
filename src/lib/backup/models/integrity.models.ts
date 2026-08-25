/**
 * Integrity Report Model
 */

export interface IntegrityReport {
  readonly isValid: boolean;
  readonly checksumMatch: boolean;
  readonly schemaVersionValid: boolean;
  readonly manifestValid: boolean;
  readonly corruptedSubsystems: ReadonlyArray<string>;
  readonly verifiedAt: string;
}
