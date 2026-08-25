/**
 * System Version Information
 */

export interface VersionInfo {
  readonly appVersion: string;
  readonly architectureVersion: string;
  readonly curriculumVersion: string;
  readonly databaseVersion: string;
  readonly migrationVersion: number;
  readonly apiVersion: string;
}

export const CURRENT_VERSION_INFO: VersionInfo = {
  appVersion: '5.10.0',
  architectureVersion: '5.0-Production-Ready',
  curriculumVersion: '2026.1',
  databaseVersion: '2.0',
  migrationVersion: 2,
  apiVersion: 'v1',
};
