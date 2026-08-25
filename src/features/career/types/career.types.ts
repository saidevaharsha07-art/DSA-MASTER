/**
 * Career Target Readiness & FAANG Track Intelligence — Types (Phase 8)
 * Defines data structures for company track summaries, pattern gaps,
 * projected resume strength, and career practice recommendations.
 */

export interface CompanyPatternGap {
  readonly pattern: string;
  readonly topic: string;
  readonly totalProblems: number;
  readonly solvedProblems: number;
  readonly status: 'Unpracticed' | 'Weak' | 'In Progress' | 'Mastered';
  readonly suggestedPriority: 'Critical' | 'High' | 'Medium';
}

export interface CompanyTrackSummary {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly totalCompanyProblems: number;
  readonly solvedCompanyProblems: number;
  readonly coveragePercentage: number;
  readonly readinessPercentage: number | 'Unrated';
  readonly totalPatterns: number;
  readonly masteredPatterns: number;
  readonly patternCoveragePercentage: number;
  readonly topPatterns: ReadonlyArray<string>;
  readonly patternGaps: ReadonlyArray<CompanyPatternGap>;
}

export interface CareerRecommendation {
  readonly problemId: string;
  readonly title: string;
  readonly difficulty: string;
  readonly company: string;
  readonly pattern: string;
  readonly reason: string;
}

export interface CareerProfileStrength {
  readonly metricName: string; // e.g. "Projected Resume Strength"
  readonly score: number | 'Unrated'; // 0-100 or 'Unrated'
  readonly levelTitle: string;
  readonly summary: string;
  readonly suggestedAdditions: ReadonlyArray<string>;
}

export interface ApplicationTrackItem {
  readonly id: string;
  readonly companyName: string;
  readonly roleTitle: string;
  readonly status: 'Applied' | 'Screening' | 'Interview' | 'Offer';
  readonly notes: string;
}

export interface CareerDashboardSummary {
  readonly userId: string;
  readonly totalSolved: number;
  readonly totalXP: number;
  readonly currentLevel: number;
  readonly companyTracks: ReadonlyArray<CompanyTrackSummary>;
  readonly profileStrength: CareerProfileStrength;
  readonly recommendations: ReadonlyArray<CareerRecommendation>;
  readonly applications: ReadonlyArray<ApplicationTrackItem>;
  readonly isEmptyState: boolean;
  readonly emptyStateMessage?: string;
}
