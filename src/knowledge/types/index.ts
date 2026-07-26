export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'callout'
  | 'warning'
  | 'info'
  | 'story'
  | 'mental_model'
  | 'visualization'
  | 'interactive_quiz'
  | 'code'
  | 'table'
  | 'formula'
  | 'timeline'
  | 'checklist'
  | 'accordion'
  | 'image'
  | 'video'
  | 'interview_tip'
  | 'real_world_example'
  | 'common_mistake'
  | 'challenge_question'
  | 'summary';

export interface BlockAnimations {
  entrance?: 'fade' | 'slide-up' | 'slide-right' | 'zoom';
  delay?: number;
}

export interface BlockVisibility {
  requiresMastery?: number;
  requiresPreviousBlock?: string;
}

export interface BaseBlock<T = any> {
  id: string;
  type: BlockType;
  order: number;
  content: T;
  metadata?: Record<string, any>;
  animations?: BlockAnimations;
  visibilityRules?: BlockVisibility;
}

// ---------------------------------------------------------
// SPECIFIC BLOCK TYPES
// ---------------------------------------------------------

export type HeadingBlock = BaseBlock<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}>;

export type ParagraphBlock = BaseBlock<{
  text: string;
}>;

export type CalloutBlock = BaseBlock<{
  title?: string;
  text: string;
  variant: 'info' | 'warning' | 'success' | 'danger';
}>;

export type StoryBlock = BaseBlock<{
  character: string;
  dialogue: string;
}>;

export type MentalModelBlock = BaseBlock<{
  analogy: string;
  explanation: string;
}>;

export type CodeBlock = BaseBlock<{
  language: string;
  code: string;
  fileName?: string;
  highlights?: number[];
}>;

export type ChecklistBlock = BaseBlock<{
  title?: string;
  items: Array<{ id: string; text: string; completed?: boolean }>;
}>;

export type AccordionBlock = BaseBlock<{
  items: Array<{ id: string; title: string; content: string }>;
}>;

export type MediaBlock = BaseBlock<{
  url: string;
  altText: string;
  caption?: string;
}>;

export type InteractiveQuizBlock = BaseBlock<{
  question: string;
  options: Array<{ id: string; text: string; isCorrect: boolean }>;
  explanation: string;
}>;

export type GenericBlock = BaseBlock<any>;

export type LessonBlock =
  | HeadingBlock
  | ParagraphBlock
  | CalloutBlock
  | StoryBlock
  | MentalModelBlock
  | CodeBlock
  | ChecklistBlock
  | AccordionBlock
  | MediaBlock
  | InteractiveQuizBlock
  | GenericBlock; // Fallback for unsupported/generic types

export interface Lesson {
  id: string;
  title: string;
  blocks: LessonBlock[];
}
