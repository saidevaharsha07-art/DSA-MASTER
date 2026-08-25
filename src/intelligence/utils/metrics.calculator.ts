/**
 * Analytical Utilities — Metrics Calculator
 * Helper functions for accuracy, moving averages, and frequency counts.
 */

import { PracticeAttempt } from '../models/practice-history';

export function calculateAccuracy(attempts: ReadonlyArray<PracticeAttempt>): number {
  if (!attempts || attempts.length === 0) return 0.0;
  const accepted = attempts.filter((a) => a.status === 'accepted').length;
  return Number((accepted / attempts.length).toFixed(2));
}

export function groupAttemptsByTopic(attempts: ReadonlyArray<PracticeAttempt>): Map<string, PracticeAttempt[]> {
  const map = new Map<string, PracticeAttempt[]>();
  for (const a of attempts) {
    const t = a.topic || 'General';
    if (!map.has(t)) map.set(t, []);
    map.get(t)!.push(a);
  }
  return map;
}

export function groupAttemptsByPattern(attempts: ReadonlyArray<PracticeAttempt>): Map<string, PracticeAttempt[]> {
  const map = new Map<string, PracticeAttempt[]>();
  for (const a of attempts) {
    const p = a.pattern || 'General';
    if (!map.has(p)) map.set(p, []);
    map.get(p)!.push(a);
  }
  return map;
}

export function groupAttemptsByDifficulty(attempts: ReadonlyArray<PracticeAttempt>): Map<string, PracticeAttempt[]> {
  const map = new Map<string, PracticeAttempt[]>();
  for (const a of attempts) {
    const d = a.difficulty || 'Medium';
    if (!map.has(d)) map.set(d, []);
    map.get(d)!.push(a);
  }
  return map;
}
