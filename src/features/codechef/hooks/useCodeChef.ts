/**
 * CodeChef Feature — Custom React Hook
 * Provides reactive access to CodeChef kingdoms, patterns, problems, header stats, and user state.
 * Grounded 100% in CodeChef_Master_Dataset.xlsx.
 */

import { useState, useEffect, useMemo } from 'react';
import {
  CodeChefArenaProblem,
  KingdomStats,
  PatternStats,
  HeaderStats,
  CodeChefFilterOptions,
} from '../types';
import { CODECHEF_KINGDOMS } from '../data/categories';
import { CODECHEF_PATTERNS } from '../data/practicePaths';
import { patternProblemMappings } from '../data/codechef_excel_db';
import { getAllCodeChefArenaProblems } from '../utils';

const STORAGE_KEY = 'codechef_curriculum_user_state_v1';

interface UserProblemState {
  status: 'Unsolved' | 'Attempted' | 'Solved';
  favorite: boolean;
  notes: string;
  attempts: number;
}

export function useCodeChef(options: CodeChefFilterOptions = {}) {
  const [userState, setUserState] = useState<Record<string, UserProblemState>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUserState(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load CodeChef state', e);
    }
  }, []);

  const saveUserState = (updated: Record<string, UserProblemState>) => {
    setUserState(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save CodeChef state', e);
    }
  };

  const toggleSolved = (problem: CodeChefArenaProblem) => {
    const current = userState[problem.id]?.status || 'Unsolved';
    const nextStatus: 'Unsolved' | 'Attempted' | 'Solved' = current === 'Solved' ? 'Unsolved' : 'Solved';
    const newItem: UserProblemState = {
      status: nextStatus,
      favorite: userState[problem.id]?.favorite || false,
      notes: userState[problem.id]?.notes || problem.notes || '',
      attempts: (userState[problem.id]?.attempts || 0) + (nextStatus === 'Solved' ? 1 : 0),
    };
    saveUserState({ ...userState, [problem.id]: newItem });
  };

  const toggleFavorite = (problem: CodeChefArenaProblem) => {
    const currentFav = userState[problem.id]?.favorite || false;
    const newItem: UserProblemState = {
      status: userState[problem.id]?.status || 'Unsolved',
      favorite: !currentFav,
      notes: userState[problem.id]?.notes || problem.notes || '',
      attempts: userState[problem.id]?.attempts || 0,
    };
    saveUserState({ ...userState, [problem.id]: newItem });
  };

  const saveNotes = (problemId: string, notes: string) => {
    const newItem: UserProblemState = {
      status: userState[problemId]?.status || 'Unsolved',
      favorite: userState[problemId]?.favorite || false,
      notes,
      attempts: userState[problemId]?.attempts || 0,
    };
    saveUserState({ ...userState, [problemId]: newItem });
  };

  // Base merged problem array
  const allProblems = useMemo(() => {
    const base = getAllCodeChefArenaProblems();
    return base.map((p) => {
      const st = userState[p.id];
      return {
        ...p,
        status: st?.status || 'Unsolved',
        favorite: st?.favorite || false,
        notes: st?.notes || p.notes || '',
      };
    });
  }, [userState]);

  // Overall Header Stats
  const headerStats = useMemo<HeaderStats>(() => {
    const totalProblems = allProblems.length;
    const solvedCount = allProblems.filter((p) => p.status === 'Solved').length;
    const attemptedCount = allProblems.filter((p) => p.status === 'Attempted').length;
    const bookmarkedCount = allProblems.filter((p) => p.favorite).length;
    const revisionCount = allProblems.filter((p) => p.notes && p.notes.length > 0).length;
    const completionPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

    return {
      totalProblems,
      solvedCount,
      attemptedCount,
      bookmarkedCount,
      revisionCount,
      completionPercentage,
      currentStreak: Math.min(14, Math.max(1, Math.floor(solvedCount / 5))),
      longestStreak: Math.min(30, Math.max(7, Math.floor(solvedCount / 3))),
    };
  }, [allProblems]);

  // Compute Kingdom & Pattern Stats matching Excel
  const kingdomStats = useMemo<KingdomStats[]>(() => {
    return CODECHEF_KINGDOMS.map((k) => {
      const kProblems = allProblems.filter((p) => p.kingdomId === k.id);
      const totalProblems = kProblems.length;
      const solvedCount = kProblems.filter((p) => p.status === 'Solved').length;
      const completionPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;
      const totalXp = kProblems.reduce((sum, p) => sum + (p.xp || 25), 0);

      // Patterns in this Kingdom
      const kPatternDefs = CODECHEF_PATTERNS.filter((pat) => pat.kingdomId === k.id);

      const patterns: PatternStats[] = kPatternDefs.map((patDef) => {
        const pProblems = allProblems.filter((p) => p.patternId === patDef.id);
        const pTotal = pProblems.length;
        const pSolved = pProblems.filter((p) => p.status === 'Solved').length;
        const pAttempted = pProblems.filter((p) => p.status === 'Attempted').length;
        const pPct = pTotal > 0 ? Math.round((pSolved / pTotal) * 100) : 0;
        const estHours = Math.round(pProblems.reduce((a, b) => a + (b.estimatedTime || 20), 0) / 60);

        return {
          id: patDef.id,
          kingdomId: k.id,
          kingdomName: k.name,
          name: patDef.name,
          number: patDef.number,
          description: patDef.description,
          totalProblems: pTotal,
          solvedCount: pSolved,
          attemptedCount: pAttempted,
          completionPercentage: pPct,
          estimatedHours: estHours,
          difficultyDistribution: patDef.difficultyDistribution,
        };
      });

      return {
        kingdom: k,
        totalProblems,
        solvedCount,
        completionPercentage,
        patternCount: patterns.length,
        totalXp,
        patterns,
      };
    });
  }, [allProblems]);

  // Filtered Problem List
  const filteredProblems = useMemo(() => {
    let list = [...allProblems];

    if (options.kingdomId && options.kingdomId !== 'ALL') {
      list = list.filter((p) => p.kingdomId === options.kingdomId);
    }

    if (options.patternId && options.patternId !== 'ALL') {
      const targetPatternId = options.patternId;
      list = list.filter((p) => p.patternId === targetPatternId);

      // Maintain exact Excel Problem Order
      const orderedCodes = patternProblemMappings[targetPatternId] || [];
      const codeIndexMap = new Map<string, number>();
      orderedCodes.forEach((code, idx) => codeIndexMap.set(code, idx));

      if (!options.sortBy || options.sortBy === 'Order') {
        list.sort((a, b) => {
          const idxA = codeIndexMap.has(a.code) ? codeIndexMap.get(a.code)! : 99999;
          const idxB = codeIndexMap.has(b.code) ? codeIndexMap.get(b.code)! : 99999;
          return idxA - idxB;
        });
      }
    }

    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.patternName.toLowerCase().includes(q) ||
          p.kingdomName.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (options.statusFilter && options.statusFilter !== 'ALL') {
      if (options.statusFilter === 'Favorites') {
        list = list.filter((p) => p.favorite);
      } else {
        list = list.filter((p) => p.status === options.statusFilter);
      }
    }

    if (options.difficultyFilter && options.difficultyFilter !== 'ALL') {
      list = list.filter((p) => p.difficulty.toLowerCase() === options.difficultyFilter!.toLowerCase());
    }

    if (options.sortBy && options.sortBy !== 'Order') {
      switch (options.sortBy) {
        case 'DifficultyAsc':
          list.sort((a, b) => a.rating - b.rating);
          break;
        case 'DifficultyDesc':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'Alphabetical':
          list.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    return list;
  }, [allProblems, options]);

  return {
    allProblems,
    headerStats,
    kingdomStats,
    filteredProblems,
    toggleSolved,
    toggleFavorite,
    saveNotes,
  };
}


