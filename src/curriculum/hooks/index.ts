'use client';

import { useMemo } from 'react';
import { CurriculumRepository } from '../repository';
import { CurriculumService } from '../services';
import { FilterOptions } from '../types';

export function useCurriculum() {
  const categories = useMemo(() => CurriculumRepository.getAllCategories(), []);
  const kingdoms = useMemo(() => CurriculumRepository.getAllKingdoms(), []);
  const patterns = useMemo(() => CurriculumRepository.getAllPatterns(), []);
  const problems = useMemo(() => CurriculumRepository.getAllProblems(), []);

  return { categories, kingdoms, patterns, problems };
}

export function useCategory(categorySlug: string) {
  const category = useMemo(() => CurriculumRepository.getCategoryBySlug(categorySlug), [categorySlug]);
  const kingdom = useMemo(() => CurriculumRepository.getKingdomBySlug(categorySlug), [categorySlug]);
  const patterns = useMemo(() => CurriculumRepository.getPatternsByCategory(categorySlug), [categorySlug]);
  const problems = useMemo(() => CurriculumRepository.getProblemsByCategory(categorySlug), [categorySlug]);

  return { category, kingdom, patterns, problems };
}

export function usePattern(patternSlug: string) {
  const pattern = useMemo(() => CurriculumRepository.getPatternBySlug(patternSlug), [patternSlug]);
  const problems = useMemo(() => CurriculumRepository.getProblemsByPattern(patternSlug), [patternSlug]);

  const learnProblems = useMemo(() => problems.filter(p => p.level === 'Learn'), [problems]);
  const practiceProblems = useMemo(() => problems.filter(p => p.level === 'Practice'), [problems]);
  const masterProblems = useMemo(() => problems.filter(p => p.level === 'Master'), [problems]);

  return { pattern, problems, learnProblems, practiceProblems, masterProblems };
}

export function useProblem(problemSlug: string) {
  const problem = useMemo(() => CurriculumRepository.getProblemBySlug(problemSlug), [problemSlug]);
  const pattern = useMemo(() => problem ? CurriculumRepository.getPatternBySlug(problem.patternSlug) : undefined, [problem]);
  const category = useMemo(() => problem ? CurriculumRepository.getCategoryBySlug(problem.categorySlug) : undefined, [problem]);
  
  const relatedProblems = useMemo(() => {
    if (!problem) return [];
    return CurriculumRepository.getProblemsByPattern(problem.patternSlug).filter(p => p.id !== problem.id);
  }, [problem]);

  return { problem, pattern, category, relatedProblems };
}

export function useKnowledgeGraph() {
  const graphData = useMemo(() => CurriculumService.generateKnowledgeGraph(), []);
  return graphData;
}

export function usePracticeArena(filters: FilterOptions = {}, solvedProblemIds: string[] = []) {
  const filteredProblems = useMemo(() => {
    return CurriculumRepository.filterProblems(filters, solvedProblemIds);
  }, [filters, solvedProblemIds]);

  return { filteredProblems, totalCount: filteredProblems.length };
}
