import { ProblemModel } from '../models';

export interface TemplateRemovalIssue {
  problemId: string;
  error: string;
}

export class TemplateRemovalValidator {
  public static validateNoStoredTemplates(problem: ProblemModel): TemplateRemovalIssue | null {
    // Check if deprecated templates field exists
    if ((problem as any).templates) {
      return {
        problemId: problem.id,
        error: `Problem '${problem.id}' contains deprecated 'templates' field. Remove it and rely solely on 'functionDefinition'.`,
      };
    }
    return null;
  }

  public static validateRegistryCleanliness(problems: ProblemModel[]): TemplateRemovalIssue[] {
    const issues: TemplateRemovalIssue[] = [];
    for (const p of problems) {
      const issue = this.validateNoStoredTemplates(p);
      if (issue) issues.push(issue);
    }
    return issues;
  }
}
