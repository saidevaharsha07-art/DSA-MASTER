/**
 * CodeChef Platform Module — Parser
 * Normalizes raw JSON / CSV / Excel records into PlatformProblem schema.
 */

import { CodeChefRawRecord, CodeChefProblem } from './types';
import { parseCodeChefRating, getCodeChefDifficultyLabel } from './difficulty';

export class CodeChefParser {
  public static parseRecord(raw: CodeChefRawRecord, index: number = 0): CodeChefProblem {
    const code = (
      raw.problemCode ||
      raw.id ||
      raw.code ||
      `CC_${index + 1}`
    ).toString().trim().toUpperCase();

    const title = (
      raw.title ||
      raw.name ||
      code
    ).toString().trim();

    const rating = parseCodeChefRating(raw.rating);

    let difficultyLabel = '';
    if (typeof raw.difficulty === 'string' && raw.difficulty.trim() && isNaN(Number(raw.difficulty))) {
      difficultyLabel = raw.difficulty.trim();
    } else {
      difficultyLabel = getCodeChefDifficultyLabel(rating);
    }

    const section = (raw.section || 'General Practice').toString().trim();
    const practicePath = (raw.practicePath || 'Practice').toString().trim();
    const starPath = (raw.starPath || '1-Star Path').toString().trim();
    const company = (raw.company || 'General Tech').toString().trim();
    const interviewTopic = (raw.interviewTopic || raw.pattern || 'General').toString().trim();
    const interviewCategory = (raw.interviewCategory || 'General').toString().trim();

    const kingdom = (raw.kingdom || 'Kingdom of Arrays').toString().trim();
    const pattern = (raw.pattern || 'Array Traversal').toString().trim();

    let parsedTags: string[] = [];
    if (Array.isArray(raw.tags)) {
      parsedTags = raw.tags.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof raw.tags === 'string' && raw.tags.trim()) {
      parsedTags = raw.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }
    if (parsedTags.length === 0) {
      parsedTags = [kingdom, pattern, section];
    }

    const url = (
      raw.url ||
      `https://www.codechef.com/problems/${code}`
    ).toString().trim();

    const solved = Boolean(raw.solved || raw.status === 'Solved');
    const estimatedTime = typeof raw.estimatedTime === 'number' ? raw.estimatedTime : 30;
    const xp = typeof raw.xp === 'number' ? raw.xp : Math.max(10, Math.floor(rating / 50));
    const notes = typeof raw.notes === 'string' ? raw.notes : '';

    return Object.freeze({
      id: code,
      title,
      platform: 'codechef' as const,
      difficulty: difficultyLabel,
      rating,
      topic: kingdom,
      pattern,
      url,
      solved,
      estimatedTime,
      xp,
      metadata: Object.freeze({
        problemCode: code,
        section,
        practicePath,
        starPath,
        company,
        interviewTopic,
        interviewCategory,
        tags: Object.freeze(parsedTags),
        kingdom,
        pattern,
        notes,
        rawKingdom: kingdom,
        rawPattern: pattern,
      }),
    });
  }

  public static parseBatch(records: CodeChefRawRecord[]): CodeChefProblem[] {
    if (!Array.isArray(records)) return [];
    return records.map((rec, i) => this.parseRecord(rec, i));
  }
}
