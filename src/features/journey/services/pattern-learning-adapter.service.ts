/**
 * DSA MASTER — Pattern Learning 2.0 Adapter Service
 * Single source of truth for Pattern Concept Academy pages.
 * Integrates canonical curriculum graph, real user progress, mistake intelligence,
 * SRS revision queues, and code template bundles.
 */

import { CurriculumRepository } from '@/src/curriculum/repository';
import { CategoryModel, SubtopicModel, PatternModel, ProblemModel } from '@/src/curriculum/types';
import { PracticeEngineService, MistakeReviewItem } from '@/src/features/practice/services/practice-engine.service';
import { RevisionAdapterService } from '@/src/features/revision/services/revision-adapter.service';
import { RevisionData } from '@/src/curriculum/types';
import { getPatternTemplateBundle, PatternTemplateBundle } from '@/src/curriculum/data/pattern-templates.data';
import { activityStoreService } from '@/src/services/activity/activity-store.service';

export type PatternRevisionItem = ProblemModel & { revisionData: RevisionData };
export type PatternMasteryState = 'Not Started' | 'Learning' | 'Developing' | 'Strong' | 'Needs Revision';

export interface RelatedPatternLink {
  readonly slug: string;
  readonly title: string;
  readonly subtopicSlug: string;
  readonly areaSlug: string;
  readonly difficulty: 'Easy' | 'Medium' | 'Hard';
  readonly url: string;
}

export interface PatternCuratedProblems {
  readonly learn: ProblemModel[];
  readonly practice: ProblemModel[];
  readonly master: ProblemModel[];
  readonly all: ProblemModel[];
}

export interface PatternLearningDetail {
  readonly pattern: PatternModel;
  readonly category: CategoryModel;
  readonly subtopic: SubtopicModel;

  // Real Telemetry & Mastery State (Requirements 3 & 4)
  readonly masteryState: PatternMasteryState;
  readonly solvedCount: number;
  readonly totalAvailable: number;
  readonly solvedPercentage: number;
  readonly accuracyPercent: number | null;
  readonly recentAttemptsCount: number;

  // Mistake Connection (Requirement 6)
  readonly hasMistakes: boolean;
  readonly mistakesCount: number;
  readonly mistakesList: MistakeReviewItem[];
  readonly mistakePracticeUrl: string;

  // Revision Connection (Requirement 7)
  readonly hasDueRevision: boolean;
  readonly dueRevisionCount: number;
  readonly revisionItems: PatternRevisionItem[];
  readonly revisionPracticeUrl: string;

  // Code Template Bundle (Requirement 11)
  readonly templateBundle: PatternTemplateBundle;

  // Canonical Related Concepts Graph (Requirement 8)
  readonly prerequisites: RelatedPatternLink[];
  readonly relatedPatterns: RelatedPatternLink[];
  readonly nextPatterns: RelatedPatternLink[];

  // Curated Problems & Practice Links (Requirements 2 & 5)
  readonly curatedProblems: PatternCuratedProblems;
  readonly practiceUrl: string;
  readonly easyPracticeUrl: string;
  readonly mediumPracticeUrl: string;
  readonly hardPracticeUrl: string;
}

export class PatternLearningAdapterService {
  /**
   * Retrieves complete pattern learning state for a given area, subtopic, and pattern.
   */
  public static getPatternLearningDetail(
    areaSlug: string,
    subtopicSlug: string,
    patternSlug: string,
    userId = 'default_user'
  ): PatternLearningDetail | null {
    const category = CurriculumRepository.getCategoryBySlug(areaSlug);
    if (!category) return null;

    const subtopic = CurriculumRepository.getSubtopicBySlug(subtopicSlug);
    if (!subtopic) return null;

    const allPatterns = CurriculumRepository.getAllPatterns();
    const pattern = allPatterns.find(
      (p) =>
        p.slug === patternSlug ||
        p.id === patternSlug ||
        p.id === `pattern.${patternSlug}` ||
        p.slug.toLowerCase() === patternSlug.toLowerCase()
    );
    if (!pattern) return null;

    const cleanUserId = userId || 'guest-user';
    const allProblems = CurriculumRepository.getAllProblems();

    // 1. Filter problems for this pattern
    const patternProblems = allProblems.filter(
      (p) =>
        p.patternSlug === pattern.slug ||
        p.patternId === pattern.id ||
        p.patternTitle === pattern.title
    );

    // 2. Compute solved metrics using real progress
    const solvedProblems = patternProblems.filter((p) =>
      PracticeEngineService.isProblemSolved(p, cleanUserId)
    );
    const solvedCount = solvedProblems.length;
    const totalAvailable = patternProblems.length;
    const solvedPercentage = totalAvailable > 0 ? Math.round((solvedCount / totalAvailable) * 100) : 0;

    // 3. Compute accuracy & attempts from real telemetry
    const history = PracticeEngineService.getPracticeHistory(cleanUserId);
    const patternAttempts = history.filter(
      (h) => h.pattern === pattern.title || h.pattern === pattern.slug
    );
    const recentAttemptsCount = patternAttempts.length;

    let accuracyPercent: number | null = null;
    if (patternAttempts.length > 0) {
      const accepted = patternAttempts.filter((a) => a.status === 'accepted').length;
      accuracyPercent = Math.round((accepted / patternAttempts.length) * 100);
    }

    // 4. Mistake Intelligence Connection (Requirement 6)
    const allMistakes = PracticeEngineService.getMistakeReviewProblems(cleanUserId);
    const patternMistakes = allMistakes.filter(
      (m) =>
        m.problem.patternSlug === pattern.slug ||
        m.problem.patternId === pattern.id ||
        m.problem.patternTitle === pattern.title
    );
    const hasMistakes = patternMistakes.length > 0;
    const mistakesCount = patternMistakes.length;
    const mistakePracticeUrl = `/practice?mode=mistakes&pattern=${encodeURIComponent(pattern.slug)}`;

    // 5. Revision Queue Connection (Requirement 7)
    const revisionSummary = RevisionAdapterService.getRevisionSummary(cleanUserId);
    const dueToday = revisionSummary.dueTodayProblems || [];
    const patternDueRevisions = dueToday.filter(
      (r) =>
        r.patternSlug === pattern.slug ||
        r.patternId === pattern.id ||
        r.patternTitle === pattern.title
    );
    const hasDueRevision = patternDueRevisions.length > 0;
    const dueRevisionCount = patternDueRevisions.length;
    const revisionPracticeUrl = `/practice?mode=mistakes&pattern=${encodeURIComponent(pattern.slug)}`;

    // 6. Real Mastery State (Requirement 3: strictly authentic)
    let masteryState: PatternMasteryState = 'Not Started';
    if (hasDueRevision && solvedCount > 0) {
      masteryState = 'Needs Revision';
    } else if (solvedCount === 0) {
      masteryState = 'Not Started';
    } else if (solvedCount >= 8 || solvedPercentage >= 75) {
      masteryState = 'Strong';
    } else if (solvedCount >= 3) {
      masteryState = 'Developing';
    } else {
      masteryState = 'Learning';
    }

    // 7. Canonical Code Templates (Requirement 11)
    const templateBundle = getPatternTemplateBundle(pattern.slug, pattern.title);

    // 8. Canonical Related Concepts Graph (Requirement 8)
    const subtopicPatterns = allPatterns.filter(
      (p) => p.subtopicSlug === subtopic.slug || p.subtopicId === subtopic.id
    ).sort((a, b) => (a.order || 0) - (b.order || 0));

    const currentIdx = subtopicPatterns.findIndex((p) => p.slug === pattern.slug || p.id === pattern.id);

    // Prerequisites: patterns prior in this subtopic or related
    const prerequisites: RelatedPatternLink[] = [];
    if (currentIdx > 0) {
      const prev = subtopicPatterns[currentIdx - 1];
      prerequisites.push({
        slug: prev.slug,
        title: prev.title,
        subtopicSlug: subtopic.slug,
        areaSlug: category.slug,
        difficulty: prev.difficulty,
        url: `/journey/${category.slug}/${subtopic.slug}/${prev.slug}`,
      });
    }

    // Related patterns: resolved from pattern.relatedPatternIds
    const relatedPatterns: RelatedPatternLink[] = [];
    if (pattern.relatedPatternIds && pattern.relatedPatternIds.length > 0) {
      for (const relId of pattern.relatedPatternIds) {
        const found = allPatterns.find(
          (p) => p.id === relId || p.slug === relId.replace('pattern.', '')
        );
        if (found && found.slug !== pattern.slug) {
          const relSubtopic = found.subtopicSlug || subtopic.slug;
          const relCat = found.categorySlug || category.slug;
          relatedPatterns.push({
            slug: found.slug,
            title: found.title,
            subtopicSlug: relSubtopic,
            areaSlug: relCat,
            difficulty: found.difficulty,
            url: `/journey/${relCat}/${relSubtopic}/${found.slug}`,
          });
        }
      }
    }

    // Next patterns: subsequent patterns in this subtopic
    const nextPatterns: RelatedPatternLink[] = [];
    if (currentIdx >= 0 && currentIdx < subtopicPatterns.length - 1) {
      const next = subtopicPatterns[currentIdx + 1];
      nextPatterns.push({
        slug: next.slug,
        title: next.title,
        subtopicSlug: subtopic.slug,
        areaSlug: category.slug,
        difficulty: next.difficulty,
        url: `/journey/${category.slug}/${subtopic.slug}/${next.slug}`,
      });
    }

    // 9. Curated Problems Tiers
    const learn = patternProblems.filter(
      (p) => p.level === 'Learn' || p.difficulty === 'Easy'
    );
    const practice = patternProblems.filter(
      (p) => p.level === 'Practice' || p.difficulty === 'Medium' || !p.difficulty
    );
    const master = patternProblems.filter(
      (p) => p.level === 'Master' || p.difficulty === 'Hard'
    );

    const curatedProblems: PatternCuratedProblems = {
      learn,
      practice,
      master,
      all: patternProblems,
    };

    // 10. Smart Practice URLs
    const practiceUrl = `/practice?area=${encodeURIComponent(category.slug)}&subtopic=${encodeURIComponent(subtopic.slug)}&pattern=${encodeURIComponent(pattern.slug)}`;
    const easyPracticeUrl = `${practiceUrl}&difficulty=easy`;
    const mediumPracticeUrl = `${practiceUrl}&difficulty=medium`;
    const hardPracticeUrl = `${practiceUrl}&difficulty=hard`;

    return {
      pattern,
      category,
      subtopic,
      masteryState,
      solvedCount,
      totalAvailable,
      solvedPercentage,
      accuracyPercent,
      recentAttemptsCount,
      hasMistakes,
      mistakesCount,
      mistakesList: patternMistakes,
      mistakePracticeUrl,
      hasDueRevision,
      dueRevisionCount,
      revisionItems: patternDueRevisions,
      revisionPracticeUrl,
      templateBundle,
      prerequisites,
      relatedPatterns,
      nextPatterns,
      curatedProblems,
      practiceUrl,
      easyPracticeUrl,
      mediumPracticeUrl,
      hardPracticeUrl,
    };
  }
}
