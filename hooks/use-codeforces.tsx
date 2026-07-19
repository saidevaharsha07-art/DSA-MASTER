"use client";
import { useEffect, useState } from "react";
type State = { completed: string[]; favorites: string[] };
const empty: State = { completed: [], favorites: [] };
export function useCodeforces() {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("dsa-codeforces-state") || "null");
      if (saved && Array.isArray(saved.completed) && Array.isArray(saved.favorites))
        setState(saved);
    } finally {
      setReady(true);
    }
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("dsa-codeforces-state", JSON.stringify(state));
  }, [ready, state]);
  const toggle = (key: keyof State, id: string) =>
    setState((current) => ({
      ...current,
      [key]: current[key].includes(id)
        ? current[key].filter((item) => item !== id)
        : [...current[key], id],
    }));
  return { state, ready, toggle };
}
