'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Save, Pin, Code, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/src/context/ToastContext';

interface NoteItem {
  id: string;
  title: string;
  category: string;
  content: string;
  isPinned: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'dsa_personal_user_notes_v1';

export function MyNotesEditor() {
  const { toast } = useToast();
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotes(parsed);
        if (parsed.length > 0) {
          setActiveNoteId(parsed[0].id);
          setTitleInput(parsed[0].title);
          setContentInput(parsed[0].content);
        }
      } else {
        const defaultNotes: NoteItem[] = [
          {
            id: 'n1',
            title: 'Sliding Window Key Invariants',
            category: 'Arrays',
            content: `### Sliding Window Mental Model\nAlways ask: Should I expand, shrink, or both?\n\n\`\`\`ts\nlet left = 0;\nfor (let right = 0; right < nums.length; right++) {\n   windowSum += nums[right];\n   while (windowSum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      windowSum -= nums[left++];\n   }\n}\n\`\`\``,
            isPinned: true,
            updatedAt: new Date().toISOString(),
          },
        ];
        setNotes(defaultNotes);
        setActiveNoteId('n1');
        setTitleInput(defaultNotes[0].title);
        setContentInput(defaultNotes[0].content);
      }
    } catch (e) {
      console.error('Failed to load notes', e);
    }
  }, []);

  const handleSaveNote = () => {
    if (!activeNoteId) return;

    const updated = notes.map((n) => {
      if (n.id === activeNoteId) {
        return { ...n, title: titleInput, content: contentInput, updatedAt: new Date().toISOString() };
      }
      return n;
    });

    setNotes(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    toast('Note saved automatically!', 'success');
  };

  const handleCreateNote = () => {
    const newNote: NoteItem = {
      id: `n-${Date.now()}`,
      title: 'New Personal Note',
      category: 'General',
      content: 'Write your Markdown notes and code observations here...',
      isPinned: false,
      updatedAt: new Date().toISOString(),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    setActiveNoteId(newNote.id);
    setTitleInput(newNote.title);
    setContentInput(newNote.content);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    toast('Created new personal note!', 'success');
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    if (updated.length > 0) {
      setActiveNoteId(updated[0].id);
      setTitleInput(updated[0].title);
      setContentInput(updated[0].content);
    } else {
      setActiveNoteId('');
      setTitleInput('');
      setContentInput('');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    toast('Note deleted', 'info');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', minHeight: '550px' }}>
      
      {/* Left Sidebar Notes List */}
      <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFF' }}>My Personal Notes</span>
          <button
            type="button"
            onClick={handleCreateNote}
            style={{ padding: '4px 8px', borderRadius: '6px', background: '#A855F7', border: 'none', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Plus size={12} /> New
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {notes.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                setActiveNoteId(n.id);
                setTitleInput(n.title);
                setContentInput(n.content);
              }}
              style={{
                padding: '12px',
                borderRadius: '10px',
                background: activeNoteId === n.id ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.03)',
                border: activeNoteId === n.id ? '1px solid #C084FC' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFF', display: 'block' }}>{n.title}</span>
                <span style={{ fontSize: '9px', color: '#94A3B8' }}>{n.category}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(n.id);
                }}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Markdown & Code Editor */}
      <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Note Title..."
            style={{ fontSize: '18px', fontWeight: 800, color: '#FFF', background: 'transparent', border: 'none', outline: 'none', width: '70%' }}
          />
          <button
            type="button"
            onClick={handleSaveNote}
            style={{ padding: '8px 16px', borderRadius: '10px', background: 'linear-gradient(135deg, #A855F7, #7E22CE)', border: 'none', color: '#FFF', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Save size={14} /> Save Note
          </button>
        </div>

        <textarea
          value={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
          placeholder="Type markdown, code snippets, key insights..."
          style={{
            flex: 1,
            width: '100%',
            minHeight: '400px',
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(13, 10, 25, 0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#CBD5E1',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            outline: 'none',
            resize: 'none',
          }}
        />
      </div>

    </div>
  );
}
