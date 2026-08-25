/**
 * CodeChef Platform Module — Search Engine & Filter Engine
 * High-performance search and filtering engine for CodeChef dataset.
 */

import { CodeChefProblem, CodeChefFilterOptions, CodeChefSearchOptions } from './types';
import { CodeChefDatasetProvider } from './dataset';
import { parseCodeChefRating } from './difficulty';

export class CodeChefSearchEngine {
  public static search(options: CodeChefSearchOptions = {}): ReadonlyArray<CodeChefProblem> {
    const problems = CodeChefDatasetProvider.loadCompleteDataset();
    let filtered = [...problems];

    // 1. Search Query (Title, Code, Tags, Section, Path, Company, Topic)
    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.trim().toLowerCase();
      const fields = options.searchBy || [
        'code',
        'title',
        'difficulty',
        'rating',
        'tags',
        'path',
        'section',
        'company',
        'topic',
      ];

      filtered = filtered.filter((p) => {
        const meta = p.metadata;
        if (fields.includes('code') && String(p.id).toLowerCase().includes(q)) return true;
        if (fields.includes('title') && String(p.title).toLowerCase().includes(q)) return true;
        if (fields.includes('difficulty') && String(p.difficulty).toLowerCase().includes(q)) return true;
        if (fields.includes('rating') && String(p.rating).includes(q)) return true;
        if (fields.includes('section') && String(meta.section).toLowerCase().includes(q)) return true;
        if (fields.includes('path') && String(meta.practicePath).toLowerCase().includes(q)) return true;
        if (fields.includes('company') && String(meta.company).toLowerCase().includes(q)) return true;
        if (fields.includes('topic') && (String(meta.interviewTopic).toLowerCase().includes(q) || String(p.pattern).toLowerCase().includes(q))) return true;
        if (fields.includes('tags') && meta.tags.some((t) => String(t).toLowerCase().includes(q))) return true;
        return false;
      });
    }

    // 2. Section Filter
    if (options.section && options.section !== 'All') {
      const s = options.section.toLowerCase();
      filtered = filtered.filter((p) => String(p.metadata.section).toLowerCase().includes(s));
    }

    // 3. Practice Path Filter
    if (options.practicePath && options.practicePath !== 'All') {
      const pathQ = options.practicePath.toLowerCase();
      filtered = filtered.filter((p) => String(p.metadata.practicePath).toLowerCase().includes(pathQ));
    }

    // 4. Star Path Filter
    if (options.starPath && options.starPath !== 'All') {
      const starQ = options.starPath.toLowerCase();
      filtered = filtered.filter((p) => String(p.metadata.starPath).toLowerCase().includes(starQ));
    }

    // 5. Company Filter
    if (options.company && options.company !== 'All') {
      const compQ = options.company.toLowerCase();
      filtered = filtered.filter((p) => String(p.metadata.company).toLowerCase().includes(compQ));
    }

    // 6. Interview Category & Topic Filter
    if (options.interviewCategory && options.interviewCategory !== 'All') {
      const catQ = options.interviewCategory.toLowerCase();
      filtered = filtered.filter((p) => String(p.metadata.interviewCategory).toLowerCase().includes(catQ));
    }
    if (options.interviewTopic && options.interviewTopic !== 'All') {
      const topQ = options.interviewTopic.toLowerCase();
      filtered = filtered.filter((p) => String(p.metadata.interviewTopic).toLowerCase().includes(topQ));
    }

    // 7. Difficulty Rating & Bounds Filter
    if (options.difficultyRating !== undefined && options.difficultyRating !== 'All') {
      const targetRating = parseCodeChefRating(options.difficultyRating);
      filtered = filtered.filter((p) => parseCodeChefRating(p.rating) === targetRating);
    }
    if (options.minRating !== undefined) {
      filtered = filtered.filter((p) => parseCodeChefRating(p.rating) >= options.minRating!);
    }
    if (options.maxRating !== undefined) {
      filtered = filtered.filter((p) => parseCodeChefRating(p.rating) <= options.maxRating!);
    }

    // 8. Difficulty Label Filter
    if (options.difficultyLabel && options.difficultyLabel !== 'All') {
      const labelQ = options.difficultyLabel.toLowerCase();
      filtered = filtered.filter((p) => String(p.difficulty).toLowerCase().includes(labelQ));
    }

    // 9. Kingdom & Pattern Filter
    if (options.kingdom && options.kingdom !== 'All') {
      const kQ = options.kingdom.toLowerCase();
      filtered = filtered.filter((p) => String(p.topic).toLowerCase().includes(kQ));
    }
    if (options.pattern && options.pattern !== 'All') {
      const patQ = options.pattern.toLowerCase();
      filtered = filtered.filter((p) => String(p.pattern).toLowerCase().includes(patQ));
    }

    // 10. Tags Filter
    if (options.tags && options.tags.length > 0) {
      const targetTags = options.tags.map((t) => String(t).toLowerCase());
      filtered = filtered.filter((p) =>
        targetTags.every((tt) => p.metadata.tags.some((pt) => String(pt).toLowerCase().includes(tt)))
      );
    }

    // 11. Problem Status Filter
    if (options.status && options.status !== 'all') {
      if (options.status === 'solved') {
        filtered = filtered.filter((p) => p.solved);
      } else if (options.status === 'unsolved') {
        filtered = filtered.filter((p) => !p.solved);
      }
    }

    // 12. Sorting
    const sortBy = options.sortBy || 'rating';
    const sortOrder = options.sortOrder || 'asc';
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'rating') {
        comparison = parseCodeChefRating(a.rating) - parseCodeChefRating(b.rating);
      } else if (sortBy === 'title') {
        comparison = String(a.title).localeCompare(String(b.title));
      } else if (sortBy === 'code') {
        comparison = String(a.id).localeCompare(String(b.id));
      } else if (sortBy === 'difficulty') {
        comparison = String(a.difficulty).localeCompare(String(b.difficulty));
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // 13. Pagination
    if (options.offset !== undefined || options.limit !== undefined) {
      const start = options.offset || 0;
      const end = options.limit !== undefined ? start + options.limit : filtered.length;
      filtered = filtered.slice(start, end);
    }

    return Object.freeze(filtered);
  }
}
