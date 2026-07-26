import { BookmarkItem } from '../types';

const BOOKMARKS_STORAGE_KEY = 'dsa_player_bookmarks_v1';

class BookmarksService {
  private bookmarks: BookmarkItem[] = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        this.bookmarks = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
  }

  public toggleBookmark(type: BookmarkItem['type'], targetId: string, folder = 'Favorites'): boolean {
    const existingIndex = this.bookmarks.findIndex((b) => b.type === type && b.targetId === targetId);

    if (existingIndex >= 0) {
      this.bookmarks.splice(existingIndex, 1);
      this.persist();
      return false; // Removed
    } else {
      this.bookmarks.push({
        id: `bm-${Date.now()}`,
        type,
        targetId,
        folder,
        createdAt: new Date().toISOString(),
      });
      this.persist();
      return true; // Added
    }
  }

  public isBookmarked(type: BookmarkItem['type'], targetId: string): boolean {
    return this.bookmarks.some((b) => b.type === type && b.targetId === targetId);
  }

  public getBookmarksByFolder(folder: string): BookmarkItem[] {
    return this.bookmarks.filter((b) => b.folder === folder);
  }

  private persist() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(this.bookmarks));
    } catch (e) {
      console.error('Failed to persist bookmarks', e);
    }
  }
}

export const bookmarksService = new BookmarksService();
