import { ProblemModel } from '../models';

export interface ValidationIssue {
  problemId: string;
  severity: 'WARNING' | 'ERROR';
  message: string;
}

export class TemplateValidator {
  public static validateProblem(problem: ProblemModel): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // 1. Missing function definition
    if (!problem.functionDefinition) {
      issues.push({
        problemId: problem.id,
        severity: 'WARNING',
        message: `Missing functionDefinition metadata. Will fall back to empty language skeleton.`,
      });
      return issues;
    }

    const { name, parameters, returnType } = problem.functionDefinition;

    // 2. Suspicious function names (e.g. twoSum on non-Two Sum problem)
    if (name === 'twoSum' && !problem.id.includes('two-sum') && !problem.title.toLowerCase().includes('two sum')) {
      issues.push({
        problemId: problem.id,
        severity: 'ERROR',
        message: `Function name '${name}' conflicts with problem title '${problem.title}'.`,
      });
    }

    // 3. Missing parameters (e.g. removeDuplicates missing nums)
    if (problem.title.toLowerCase().includes('duplicate') && parameters.length === 0) {
      issues.push({
        problemId: problem.id,
        severity: 'ERROR',
        message: `Problem '${problem.title}' requires array parameter 'nums' but parameters array is empty.`,
      });
    }

    // 4. Return type check
    if (!returnType) {
      issues.push({
        problemId: problem.id,
        severity: 'ERROR',
        message: `Missing returnType in functionDefinition for problem '${problem.title}'.`,
      });
    }

    return issues;
  }

  public static validateRegistry(problems: ProblemModel[]): ValidationIssue[] {
    return problems.flatMap((p) => this.validateProblem(p));
  }
}
