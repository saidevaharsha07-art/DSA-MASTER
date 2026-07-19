import { Problem } from "@/types";
export const difficultyRank = (d: string) => ({ Easy: 1, Medium: 2, Hard: 3 })[d] ?? 4;
export const minutes = (v: string) => Number.parseInt(v) || 0;
export const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);
export const displayTopic = (name: string) => decodeURIComponent(name);
export const revisionDate = (days: number) => new Date(Date.now() + days * 86400000).toISOString();
export const problemMatches = (p: Problem, q: string) =>
  JSON.stringify(p).toLowerCase().includes(q.toLowerCase());
