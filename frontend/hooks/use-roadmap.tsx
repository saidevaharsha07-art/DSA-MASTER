"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { z } from "zod";
import type { Problem, UserState } from "@frontend/types";
import { progressService } from "@/src/services/progress/progress.service";
import { EventBus } from "@/src/core/events/event-bus";

const empty: UserState = {
  completed: [],
  favorites: [],
  revision: {},
  notes: {},
  awardedXp: [],
  xp: 0,
  dailyGoal: 3,
  completedProblemIds: [],
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
  completedProblemIds: z.array(z.string()).optional(),
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

import { useActiveUser } from "@/src/hooks/useActiveUser";

export function RoadmapProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useActiveUser();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [state, setState] = useState<UserState>(() => progressService.getState(userId));
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncStateFromService = useCallback(() => {
    setState(progressService.getState(userId));
  }, [userId]);

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

      setProblems(result.data);
      syncStateFromService();
    } catch (cause) {
      setProblems([]);
      syncStateFromService();
      setError(
        cause instanceof Error ? cause.message : "The problem catalogue could not be loaded.",
      );
    } finally {
      setReady(true);
    }
  }, [syncStateFromService]);

  useEffect(() => {
    void load();
    const unsub = EventBus.subscribe('ProblemSolved', () => {
      syncStateFromService();
    });
    return () => unsub();
  }, [load, syncStateFromService, userId]);

  const value = useMemo(
    () => ({
      problems,
      state,
      ready,
      error,
      retry: load,
      toggle: (key: "completed" | "favorites", id: number) => {
        const next = progressService.toggle(key, id, userId);
        setState(next);
      },
      schedule: (id: number, days: number) => {
        const next = progressService.schedule(id, days, userId);
        setState(next);
      },
      markRevised: (id: number) => {
        const next = progressService.markRevised(id, userId);
        setState(next);
      },
      note: (id: number, value: string) => {
        const next = progressService.note(id, value, userId);
        setState(next);
      },
      search: (query: string) =>
        query
          ? new Fuse(problems, {
              keys: ["id", "title", "topic", "difficulty", "pattern", "tags", "companies"],
              threshold: 0.32,
            })
              .search(query)
              .map((result) => result.item)
          : problems,
      setDailyGoal: (value: number) => {
        const next = progressService.setDailyGoal(value, userId);
        setState(next);
      },
    }),
    [error, load, problems, ready, state, userId],
  );

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
}

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) throw new Error("RoadmapProvider missing");
  return context;
};
