export interface AIContext {
  problemSlug?: string;
  userCode?: string;
  language?: string;
  currentKingdom?: string;
  userLevel?: number;
}

export interface AIProvider {
  id: string;
  name: string;
  generate(prompt: string, context?: AIContext): Promise<string>;
  stream?(prompt: string, context?: AIContext): AsyncIterable<string>;
}
