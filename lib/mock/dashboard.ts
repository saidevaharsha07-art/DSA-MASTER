export interface UserData {
  name: string;
  currentPhase: string;
  currentTopic: string;
  currentPattern: string;
  quote: string;
  progressPct: number;
  totalXp: number;
}

export interface MissionData {
  id: string;
  type: "learn" | "practice" | "revise";
  title: string;
  meta: string;
  isCompleted: boolean;
}

export interface SkillData {
  name: string;
  pct: number;
  status: string;
  color: string;
}

export interface ActivityData {
  id: string;
  type: "completed" | "mastered" | "started";
  title: string;
  meta: string;
  time: string;
}

export interface RecommendationData {
  pattern: string;
  target: string;
  reason: string;
}

export interface RevisionData {
  id: number;
  title: string;
  topic: string;
  lastSeen: string;
  score: number;
  difficulty: string;
}

export interface DashboardData {
  user: UserData;
  missions: MissionData[];
  skills: SkillData[];
  activities: ActivityData[];
  recommendation: RecommendationData;
  revisions: RevisionData[];
}

export const mockDashboardData: DashboardData = {
  user: {
    name: "John Doe",
    currentPhase: "Phase 2 - Arrays & Hashing",
    currentTopic: "Arrays & Hashing",
    currentPattern: "Prefix Sum",
    quote: "Algorithms are instructions for solutions. Write them with clarity.",
    progressPct: 72,
    totalXp: 2450,
  },
  missions: [
    { id: "m1", type: "learn", title: "Learn: Prefix Sum Fundamentals", meta: "15 mins", isCompleted: true },
    { id: "m2", type: "practice", title: "Practice: LC 1480 Running Sum", meta: "20 mins", isCompleted: false },
    { id: "m3", type: "revise", title: "Revise: HashMap Frequency Counting", meta: "10 mins", isCompleted: false },
  ],
  skills: [
    { name: "Arrays & Hashing", pct: 92, status: "Advanced", color: "var(--easy-fg)" },
    { name: "Strings & Matching", pct: 65, status: "Intermediate", color: "var(--medium-fg)" },
    { name: "Trees & Binary Trees", pct: 40, status: "Elementary", color: "var(--primary)" },
    { name: "Graphs & BFS/DFS", pct: 30, status: "Elementary", color: "var(--primary)" },
    { name: "Dynamic Programming", pct: 15, status: "Novice", color: "var(--hard-fg)" },
  ],
  activities: [
    { id: "a1", type: "completed", title: "Completed: LC 724 Pivot Index", meta: "Easy · Time: 14 mins", time: "2 hours ago" },
    { id: "a2", type: "mastered", title: "Mastered: Traversal Pattern", meta: "Topic: Arrays & Hashing", time: "1 day ago" },
    { id: "a3", type: "started", title: "Started: Prefix Sum Concept", meta: "Phase 2 curriculum", time: "2 days ago" },
  ],
  recommendation: {
    pattern: "Difference Array",
    target: "LC 1094: Car Pooling",
    reason: "Your Prefix Sum accuracy is 88%. Difference Array builds on the same cumulative sum intuition.",
  },
  revisions: [
    { id: 1, title: "Prefix Sum", topic: "Arrays & Hashing", lastSeen: "7 days ago", score: 78, difficulty: "Medium" },
    { id: 2, title: "Two Pointer Loop", topic: "Arrays & Hashing", lastSeen: "14 days ago", score: 85, difficulty: "Easy" },
    { id: 3, title: "Sliding Window", topic: "Strings", lastSeen: "30 days ago", score: 62, difficulty: "Medium" },
  ],
};
