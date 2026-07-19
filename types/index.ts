export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  topic: string;
  pattern: string;
  estimatedTime: string;
  acceptance: string;
  companies: string[];
  tags: string[];
  url: string;
  resources?: Record<string, string>;
}

export interface UserState {
  completed: number[];
  favorites: number[];
  revision: Record<number, string>;
  notes: Record<number, string>;
  awardedXp: number[];
  xp: number;
  dailyGoal: number;
}

export const TOPICS = [
  "Arrays",
  "Strings",
  "Hashing",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Prefix Sum",
];
