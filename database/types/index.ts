/**
 * DSA Magna — Database Domain Types
 * TypeScript definitions mapping 1:1 with PostgreSQL tables in Supabase.
 */

export interface ProfileRecord {
  id: string; // UUID references auth.users(id)
  username: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProgressRecord {
  id: string; // UUID
  user_id: string;
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  daily_goal: number;
  completed_problem_ids: string[];
  completed_legacy_ids: string[];
  favorites: string[];
  notes: Record<string, string>;
  last_active_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubmissionRecord {
  id: string; // UUID
  user_id: string;
  problem_id: string;
  platform: 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks';
  language: string;
  verdict:
    | 'Accepted'
    | 'Wrong Answer'
    | 'Time Limit Exceeded'
    | 'Compilation Error'
    | 'Compile Error'
    | 'Runtime Error'
    | 'Memory Limit Exceeded';
  runtime_ms: number;
  memory_mb: number;
  testcases_passed: number;
  testcases_total: number;
  xp_earned: number;
  code_snapshot: string;
  submitted_at: string;
}

export interface DraftRecord {
  id: string; // UUID
  user_id: string;
  problem_id: string;
  language: string;
  code: string;
  updated_at: string;
}

export interface ActivityRecord {
  id: string; // UUID
  user_id: string;
  action: string;
  problem_id?: string | null;
  platform?: string | null;
  xp_earned?: number;
  duration_seconds?: number;
  topic?: string | null;
  pattern?: string | null;
  difficulty?: string | null;
  timestamp: string;
}

export interface MemoryProgressRecord {
  id: string; // UUID
  user_id: string;
  concept_id: string;
  topic: string;
  pattern: string;
  state: 'New' | 'Learning' | 'Review' | 'Mastered';
  mastery_score: number;
  memory_strength: number;
  stability_score: number;
  retention_rate: number;
  forgetting_risk: number;
  review_count: number;
  successful_reviews: number;
  failed_reviews: number;
  first_learned: string;
  last_reviewed: string;
  next_review: string;
}

export interface UserSettingsRecord {
  id: string; // UUID
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  accent_color: string;
  editor_font_size: number;
  editor_font_family: string;
  editor_word_wrap: 'on' | 'off';
  editor_minimap: boolean;
  handles: Record<string, string>;
  updated_at: string;
}

export interface UserOnboardingRecord {
  id: string; // UUID
  user_id: string;
  status:
    | 'ONBOARDING_NOT_STARTED'
    | 'ONBOARDING_IN_PROGRESS'
    | 'ONBOARDING_COMPLETED'
    | 'ONBOARDING_SKIPPED';
  current_step: number;
  self_reported_level?: string | null;
  learning_goal?: string | null;
  selected_topics: string[];
  assessment_score?: number | null;
  assessment_evidence: any[];
  assessment_result?: any | null;
  first_mission?: any | null;
  completed_at?: string | null;
  skipped_at?: string | null;
  created_at: string;
  updated_at: string;
}
