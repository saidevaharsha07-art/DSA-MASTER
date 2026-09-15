import { CurriculumRepository } from '@/src/curriculum/repository';
import { getProblemDetailInfo } from './problem-detail.service';
import { problemRegistryService } from '../registry';
import { TemplateGenerator } from '../generators';

export class TemplateService {
  public static getTemplate(problemId: string, language: string): string {
    const lang = language.toLowerCase().trim();

    // 1. Try resolving through CurriculumRepository
    const curriculumProblem =
      CurriculumRepository.getProblemBySlug(problemId) ||
      CurriculumRepository.getProblemById(problemId);

    if (curriculumProblem) {
      const detail = getProblemDetailInfo(curriculumProblem);
      if (detail.starterCodes[lang]) {
        return detail.starterCodes[lang];
      }
    }

    // 2. Fallback to problem registry
    const registryProblem = problemRegistryService.getProblemById(problemId);
    if (registryProblem?.functionDefinition) {
      return TemplateGenerator.generate(registryProblem.functionDefinition, lang);
    }

    if (registryProblem?.specialTemplate) {
      return registryProblem.specialTemplate;
    }

    return this.getEmptySkeleton(lang);
  }

  private static getEmptySkeleton(language: string): string {
    const skeletons: Record<string, string> = {
      java: `class Solution {\n    \n}`,
      cpp: `class Solution {\npublic:\n    \n};`,
      c: `int solve() {\n    \n}`,
      python: `class Solution:\n    pass`,
      javascript: `/**\n * @return {void}\n */\nvar solve = function() {\n    \n};`,
      typescript: `function solve(): void {\n    \n};`,
      go: `func solve() {\n    \n}`,
      rust: `impl Solution {\n    pub fn solve() {\n        \n    }\n}`,
      csharp: `public class Solution {\n    public void Solve() {\n        \n    }\n}`,
      kotlin: `class Solution {\n    fun solve() {\n        \n    }\n}`,
    };

    return skeletons[language.toLowerCase()] ?? `// Write your solution here`;
  }
}

