import { ProblemDNA } from '../types';
import { validateProblemDNA } from '../validation';
import { problemRegistry, problemList } from '../registry';

export async function getProblem(id: string): Promise<ProblemDNA> {
  const loader = problemRegistry[id];
  if (!loader) {
    throw new Error(`Problem ${id} not found in registry`);
  }
  const mod = await loader();
  return validateProblemDNA(mod.default);
}

export async function getAllProblems(): Promise<ProblemDNA[]> {
  const promises = problemList.map(id => getProblem(id));
  return Promise.all(promises);
}

export async function getProblemsByPattern(patternId: string): Promise<ProblemDNA[]> {
  const all = await getAllProblems();
  return all.filter(p => p.patterns.includes(patternId) || p.subPatterns.includes(patternId));
}

export async function getProblemsByDifficulty(difficulty: ProblemDNA['difficulty']): Promise<ProblemDNA[]> {
  const all = await getAllProblems();
  return all.filter(p => p.difficulty === difficulty);
}

export async function getProblemsByCompany(company: string): Promise<ProblemDNA[]> {
  const all = await getAllProblems();
  return all.filter(p => 
    p.interview.companies.some(c => c.company.toLowerCase() === company.toLowerCase())
  );
}

export async function getRelatedProblems(id: string): Promise<ProblemDNA[]> {
  const problem = await getProblem(id);
  const promises = problem.relatedProblems.map(rid => getProblem(rid).catch(() => null));
  const results = await Promise.all(promises);
  return results.filter((p): p is ProblemDNA => p !== null);
}

export interface SearchFilters {
  title?: string;
  pattern?: string;
  company?: string;
  recognitionSignal?: string;
  difficulty?: ProblemDNA['difficulty'];
  mentalModel?: string;
}

export async function searchProblems(filters: SearchFilters): Promise<ProblemDNA[]> {
  let results = await getAllProblems();
  
  if (filters.title) {
    const q = filters.title.toLowerCase();
    results = results.filter(p => p.title.toLowerCase().includes(q));
  }
  
  if (filters.pattern) {
    const q = filters.pattern.toLowerCase();
    results = results.filter(p => 
      p.patterns.some(pat => pat.toLowerCase().includes(q)) || 
      p.subPatterns.some(pat => pat.toLowerCase().includes(q))
    );
  }
  
  if (filters.company) {
    const q = filters.company.toLowerCase();
    results = results.filter(p => 
      p.interview.companies.some(c => c.company.toLowerCase().includes(q))
    );
  }
  
  if (filters.recognitionSignal) {
    const q = filters.recognitionSignal.toLowerCase();
    results = results.filter(p => 
      p.recognitionSignals.some(s => 
        s.description.toLowerCase().includes(q) || 
        s.keywords.some(k => k.toLowerCase().includes(q))
      )
    );
  }
  
  if (filters.difficulty) {
    results = results.filter(p => p.difficulty === filters.difficulty);
  }
  
  if (filters.mentalModel) {
    const q = filters.mentalModel.toLowerCase();
    results = results.filter(p => p.mentalModel.toLowerCase().includes(q));
  }
  
  return results;
}
