"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { z } from "zod";
import type { Problem, UserState } from "@/types";

const empty: UserState = {
  completed: [],
  favorites: [],
  revision: {},
  notes: {},
  awardedXp: [],
  xp: 0,
  dailyGoal: 3,
};

const ProblemSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  topic: z.string(),
  pattern: z.string(),
  estimatedTime: z.string(),
  acceptance: z.string(),
  companies: z.array(z.string()),
  tags: z.array(z.string()),
  url: z.string().url(),
  resources: z.record(z.string()).optional(),
});

const StoredStateSchema = z.object({
  completed: z.array(z.number().int()).optional(),
  favorites: z.array(z.number().int()).optional(),
  revision: z.record(z.string()).optional(),
  notes: z.record(z.string()).optional(),
  awardedXp: z.array(z.number().int()).optional(),
  xp: z.number().int().nonnegative().optional(),
  dailyGoal: z.number().int().positive().optional(),
});

type Roadmap = {
  problems: Problem[];
  state: UserState;
  ready: boolean;
  error: string | null;
  retry: () => void;
  toggle: (key: "completed" | "favorites", id: number) => void;
  schedule: (id: number, days: number) => void;
  markRevised: (id: number) => void;
  note: (id: number, value: string) => void;
  search: (query: string) => Problem[];
  setDailyGoal: (value: number) => void;
};

const RoadmapContext = createContext<Roadmap | null>(null);

const uniqueKnownIds = (ids: number[], validIds: Set<number>) => [
  ...new Set(ids.filter((id) => validIds.has(id))),
];

function stateFromStorage(raw: string | null, validIds: Set<number>): UserState {
  if (!raw) return empty;

  try {
    const parsed = StoredStateSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return empty;

    const value = parsed.data;
    const completed = uniqueKnownIds(value.completed ?? [], validIds);
    const awardedXp = uniqueKnownIds(value.awardedXp ?? completed, validIds);
    const revision = Object.fromEntries(
      Object.entries(value.revision ?? {}).filter(
        ([id, date]) => validIds.has(Number(id)) && !Number.isNaN(Date.parse(date)),
      ),
    );
    const notes = Object.fromEntries(
      Object.entries(value.notes ?? {}).filter(
        ([id, note]) => validIds.has(Number(id)) && typeof note === "string",
      ),
    );

    return {
      ...empty,
      ...value,
      completed,
      favorites: uniqueKnownIds(value.favorites ?? [], validIds),
      revision,
      notes,
      awardedXp,
      xp: value.xp ?? awardedXp.length * 10,
    };
  } catch {
    return empty;
  }
}

export function RoadmapProvider({ children }: { children: React.ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [state, setState] = useState(empty);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setReady(false);
    setError(null);

    try {
      const response = await fetch("/data/problems.json");
      if (!response.ok) {
        throw new Error(`The problem catalogue could not be loaded (${response.status}).`);
      }

      const result = ProblemSchema.array().safeParse(await response.json());
      if (!result.success) {
        throw new Error("The problem catalogue has an invalid format.");
      }

      const validIds = new Set(result.data.map((problem) => problem.id));
      setProblems(result.data);
      setState(stateFromStorage(localStorage.getItem("dsa-state"), validIds));
    } catch (cause) {
      setProblems([]);
      setState(empty);
      setError(
        cause instanceof Error ? cause.message : "The problem catalogue could not be loaded.",
      );
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (ready && !error) {
      localStorage.setItem("dsa-state", JSON.stringify(state));
    }
  }, [state, ready, error]);

  const value = useMemo(
    () => ({
      problems,
      state,
      ready,
      error,
      retry: load,
      toggle: (key: "completed" | "favorites", id: number) =>
        setState((current) => {
          const items = current[key];
          const hasItem = items.includes(id);

          if (key === "favorites") {
            return {
              ...current,
              favorites: hasItem ? items.filter((item) => item !== id) : [...items, id],
            };
          }

          if (hasItem) {
            return { ...current, completed: items.filter((item) => item !== id) };
          }

          const firstCompletion = !current.awardedXp.includes(id);
          return {
            ...current,
            completed: [...items, id],
            awardedXp: firstCompletion ? [...current.awardedXp, id] : current.awardedXp,
            xp: firstCompletion ? current.xp + 10 : current.xp,
          };
        }),
      schedule: (id: number, days: number) =>
        setState((current) => ({
          ...current,
          revision: {
            ...current.revision,
            [id]: new Date(Date.now() + days * 86_400_000).toISOString(),
          },
        })),
      markRevised: (id: number) =>
        setState((current) => {
          const { [id]: _, ...revision } = current.revision;
          return { ...current, revision };
        }),
      note: (id: number, value: string) =>
        setState((current) => ({
          ...current,
          notes: { ...current.notes, [id]: value },
        })),
      search: (query: string) =>
        query
          ? new Fuse(problems, {
              keys: ["id", "title", "topic", "difficulty", "pattern", "tags", "companies"],
              threshold: 0.32,
            })
              .search(query)
              .map((result) => result.item)
          : problems,
      setDailyGoal: (value: number) =>
        setState((current) => ({
          ...current,
          dailyGoal: value,
        })),
    }),
    [error, load, problems, ready, state],
  );

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
}

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) throw new Error("RoadmapProvider missing");
  return context;
};
