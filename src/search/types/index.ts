export type SearchResultType =
  | 'pattern'
  | 'problem'
  | 'lesson'
  | 'note'
  | 'template'
  | 'video'
  | 'article'
  | 'company'
  | 'tag';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  category: string;
  breadcrumb: string[];
  preview: string;
  url: string;
  shortcut?: string;
  score?: number;
  tags?: string[];
}
