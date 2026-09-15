import { TemplateService } from '@/src/problems/services/template.service';

export interface StarterCodeMap {
  typescript: string;
  javascript: string;
  python: string;
  java: string;
  cpp: string;
  c: string;
  go: string;
  rust: string;
  csharp: string;
  kotlin: string;
}

/**
 * Generate clean, problem-aware starter template code via TemplateService.
 */
export function getStarterCode(problemTitle: string, problemSlug: string): StarterCodeMap {
  return {
    typescript: TemplateService.getTemplate(problemSlug, 'typescript'),
    javascript: TemplateService.getTemplate(problemSlug, 'javascript'),
    python: TemplateService.getTemplate(problemSlug, 'python'),
    java: TemplateService.getTemplate(problemSlug, 'java'),
    cpp: TemplateService.getTemplate(problemSlug, 'cpp'),
    c: TemplateService.getTemplate(problemSlug, 'c'),
    go: TemplateService.getTemplate(problemSlug, 'go'),
    rust: TemplateService.getTemplate(problemSlug, 'rust'),
    csharp: TemplateService.getTemplate(problemSlug, 'csharp'),
    kotlin: TemplateService.getTemplate(problemSlug, 'kotlin'),
  };
}
