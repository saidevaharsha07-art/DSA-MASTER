import { PersonalNote } from '../types';

const NOTES_STORAGE_KEY = 'dsa_player_notes_v1';

class NotesService {
  private notes: Record<string, PersonalNote> = {};

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(NOTES_STORAGE_KEY);
      if (stored) {
        this.notes = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load player notes', e);
    }
  }

  public saveNote(problemId: string, title: string, content: string, folder = 'Default', tags: string[] = []): PersonalNote {
    const existing = this.notes[problemId];
    const now = new Date().toISOString();

    const note: PersonalNote = {
      id: existing?.id || `note-${Date.now()}`,
      problemId,
      title,
      content,
      folder,
      tags,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    this.notes[problemId] = note;
    this.persist();
    return note;
  }

  public getNote(problemId: string): PersonalNote | null {
    return this.notes[problemId] || null;
  }

  public exportNoteAsMarkdown(problemId: string): string {
    const note = this.getNote(problemId);
    if (!note) return '';
    return `# ${note.title}\n\n*Updated: ${new Date(note.updatedAt).toLocaleDateString()}*\n\n${note.content}`;
  }

  private persist() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(this.notes));
    } catch (e) {
      console.error('Failed to persist player notes', e);
    }
  }
}

export const notesService = new NotesService();
