import { problemRegistryService } from '../registry';
import { TemplateGenerator } from '../generators';

export class TemplateService {
  public static getTemplate(problemId: string, language: string): string {
    const problem = problemRegistryService.getProblemById(problemId);

    if (!problem) {
      return this.getEmptySkeleton(language);
    }

    if (problem.functionDefinition) {
      return TemplateGenerator.generate(problem.functionDefinition, language.toLowerCase());
    }

    if (problem.specialTemplate) {
      return problem.specialTemplate;
    }

    return this.getEmptySkeleton(language);
  }

  private static getEmptySkeleton(language: string): string {
    const skeletons: Record<string, string> = {
      java: `class Solution {\n\n}`,
      cpp: `class Solution {\n\n};`,
      python: `class Solution:\n    pass`,
      javascript: `// Write your solution here`,
      typescript: `// Write your solution here`,
    };

    return skeletons[language.toLowerCase()] ?? `// Write your solution here`;
  }
}
