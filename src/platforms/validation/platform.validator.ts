/**
 * Platform Engine — Validator & Health Reporting
 * Structured validation engine and dataset health generator.
 */

import {
  PlatformId,
  PlatformProblem,
  PlatformValidationReport,
  PlatformValidationError,
  DatasetHealthReport,
} from '../types';
import { VALIDATION_LIMITS } from '../constants';
import { logger } from '../logger';

export class PlatformValidator {
  /**
   * Validates an array of PlatformProblem objects and produces a structured report.
   */
  public static validate(
    platformId: PlatformId,
    problems: ReadonlyArray<PlatformProblem>
  ): PlatformValidationReport {
    const errors: PlatformValidationError[] = [];
    const warnings: PlatformValidationError[] = [];
    const duplicateIds: string[] = [];
    const invalidUrls: string[] = [];

    const seenIds = new Set<string>();
    const seenTitles = new Map<string, string>();
    const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/i;

    if (!problems || !Array.isArray(problems) || problems.length === 0) {
      errors.push({
        problemId: 'N/A',
        field: 'dataset',
        message: `Dataset for platform '${platformId}' is empty or invalid.`,
        severity: 'error',
      });

      return {
        valid: false,
        platform: platformId,
        totalProblems: 0,
        duplicateIds: [],
        invalidUrls: [],
        warnings,
        errors,
        summary: `Validation failed: Dataset for '${platformId}' is empty.`,
      };
    }

    for (let i = 0; i < problems.length; i++) {
      const p = problems[i];
      const pid = p?.id || `row_${i + 1}`;

      // Check ID
      if (!p.id || typeof p.id !== 'string' || p.id.trim() === '') {
        errors.push({
          problemId: pid,
          field: 'id',
          message: 'Problem missing required unique ID.',
          severity: 'error',
        });
      } else {
        if (seenIds.has(p.id)) {
          duplicateIds.push(p.id);
          errors.push({
            problemId: p.id,
            field: 'id',
            message: `Duplicate problem ID '${p.id}' found.`,
            severity: 'error',
          });
        } else {
          seenIds.add(p.id);
        }
      }

      // Check Title & Duplicate Titles (Warning)
      if (!p.title || typeof p.title !== 'string' || p.title.trim() === '') {
        errors.push({
          problemId: pid,
          field: 'title',
          message: 'Problem title is missing or empty.',
          severity: 'error',
        });
      } else {
        const normTitle = p.title.trim().toLowerCase();
        if (seenTitles.has(normTitle)) {
          warnings.push({
            problemId: pid,
            field: 'title',
            message: `Duplicate problem title '${p.title}' (same as '${seenTitles.get(normTitle)}').`,
            severity: 'warning',
          });
        } else {
          seenTitles.set(normTitle, p.id);
        }
      }

      // Check Platform
      if (p.platform !== platformId) {
        errors.push({
          problemId: pid,
          field: 'platform',
          message: `Problem platform '${p.platform}' does not match loader platform '${platformId}'.`,
          severity: 'error',
        });
      }

      // Check URL
      if (!p.url || !urlPattern.test(p.url)) {
        invalidUrls.push(p.url || 'missing');
        warnings.push({
          problemId: pid,
          field: 'url',
          message: `Malformed or missing URL: '${p.url}'.`,
          severity: 'warning',
        });
      }

      // Check Difficulty
      if (!p.difficulty || typeof p.difficulty !== 'string') {
        warnings.push({
          problemId: pid,
          field: 'difficulty',
          message: 'Difficulty tier missing or malformed.',
          severity: 'warning',
        });
      }

      // Check Rating
      if (typeof p.rating === 'number') {
        if (p.rating < VALIDATION_LIMITS.minRating || p.rating > VALIDATION_LIMITS.maxRating) {
          warnings.push({
            problemId: pid,
            field: 'rating',
            message: `Out of range rating '${p.rating}'. Expected range [0, 4000].`,
            severity: 'warning',
          });
        }
      }

      // Check Orphaned Metadata (Warning)
      if (!p.metadata || Object.keys(p.metadata).length === 0) {
        warnings.push({
          problemId: pid,
          field: 'metadata',
          message: 'Orphaned or empty metadata object.',
          severity: 'warning',
        });
      }
    }

    const valid = errors.length === 0;
    const summary = valid
      ? `[OK] Platform '${platformId}' dataset verified successfully (${problems.length} problems, ${warnings.length} warnings).`
      : `[FAILED] Platform '${platformId}' dataset validation failed (${errors.length} errors, ${warnings.length} warnings).`;

    return {
      valid,
      platform: platformId,
      totalProblems: problems.length,
      duplicateIds: Array.from(new Set(duplicateIds)),
      invalidUrls: Array.from(new Set(invalidUrls)),
      warnings,
      errors,
      summary,
    };
  }

  /**
   * Generates a comprehensive dataset health summary report.
   */
  public static generateHealthReport(
    platformId: PlatformId,
    problems: ReadonlyArray<PlatformProblem>
  ): DatasetHealthReport {
    const valReport = this.validate(platformId, problems);
    const seenTitles = new Set<string>();
    const duplicateTitlesSet = new Set<string>();
    const malformedRows: number[] = [];

    let validProblemsCount = 0;
    let skippedProblemsCount = 0;

    for (let i = 0; i < problems.length; i++) {
      const p = problems[i];
      if (!p.id || !p.title || !p.url) {
        skippedProblemsCount++;
        malformedRows.push(i + 1);
        continue;
      }

      validProblemsCount++;

      const tKey = p.title.toLowerCase().trim();
      if (seenTitles.has(tKey)) {
        duplicateTitlesSet.add(p.title);
      } else {
        seenTitles.add(tKey);
      }
    }

    const total = problems.length;
    const errorPenalties = valReport.errors.length * 10;
    const warningPenalties = valReport.warnings.length * 0.5;
    const rawScore = total > 0 ? 100 - (errorPenalties + warningPenalties) / (total * 0.1) : 0;
    const healthScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    const summary = `Dataset Health Report for '${platformId}': Health Score ${healthScore}%, ${validProblemsCount}/${total} valid problems.`;
    logger.info(summary);

    return {
      platform: platformId,
      totalProblems: total,
      validProblems: validProblemsCount,
      skippedProblems: skippedProblemsCount,
      warningsCount: valReport.warnings.length,
      errorsCount: valReport.errors.length,
      duplicateIds: valReport.duplicateIds,
      duplicateTitles: Array.from(duplicateTitlesSet),
      malformedRows,
      healthScore,
      summary,
    };
  }
}
