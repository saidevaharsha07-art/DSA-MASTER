'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, Map, Code2, BookOpen, RotateCcw, BarChart3, Terminal, FileText, ChevronRight } from 'lucide-react';
import { curriculumEngine } from '@/src/engines/curriculum';
import { colors, radius, shadows, typography, zIndex } from '@/src/design';
import { Badge } from '@/src/components/ui';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle with Cmd/Ctrl + K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  const quickActions = [
    { id: 'nav-journey', title: 'Open Learning Journey', type: 'Command', icon: <Map size={16} />, action: () => router.push('/journey') },
    { id: 'nav-practice', title: 'Start Practice Session', type: 'Command', icon: <Terminal size={16} />, action: () => router.push('/practice') },
    { id: 'nav-revision', title: 'Review Due Items', type: 'Command', icon: <RotateCcw size={16} />, action: () => router.push('/revision') },
    { id: 'nav-knowledge', title: 'Search Notes', type: 'Command', icon: <BookOpen size={16} />, action: () => router.push('/knowledge') },
    { id: 'nav-analytics', title: 'View Analytics', type: 'Command', icon: <BarChart3 size={16} />, action: () => router.push('/analytics') },
  ];

  const roadmapProblems = curriculumEngine.getAllProblems();
  const patterns = curriculumEngine.getAllPatterns();
  
  // Mock some notes for search
  const notes = [
    { id: 'note-1', title: 'My notes on Sliding Window', type: 'Note', icon: <FileText size={16} />, action: () => router.push('/knowledge') },
    { id: 'note-2', title: 'How to handle Edge Cases in Hash Maps', type: 'Note', icon: <FileText size={16} />, action: () => router.push('/knowledge') }
  ];

  const allItems = [
    ...quickActions,
    ...patterns.map(p => ({
      id: p.id,
      title: p.title,
      type: 'Pattern',
      icon: <BookOpen size={16} />,
      action: () => router.push(`/topic/${p.slug}`)
    })),
    ...roadmapProblems.map(p => ({
      id: p.id,
      title: p.title,
      type: 'Problem',
      icon: <Code2 size={16} />,
      action: () => router.push(`/practice/${p.slug}`)
    })),
    ...notes
  ];
  
  const searchResults = allItems
    .filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => (i + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => (i - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter' && searchResults[activeIndex]) {
      e.preventDefault();
      searchResults[activeIndex].action();
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: zIndex.modal }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed', top: '20vh', left: '50%', width: '90%', maxWidth: '640px',
              background: colors.card, border: `1px solid ${colors.border}`, borderRadius: radius.xl,
              boxShadow: shadows.xl, zIndex: zIndex.modal + 1, overflow: 'hidden',
              display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
              <Search size={20} color={colors.muted} style={{ marginRight: '16px' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search problems, patterns, notes, or commands..."
                style={{
                  flex: 1, background: 'transparent', border: 'none', color: colors.foreground,
                  fontSize: typography.fontSize.body, fontFamily: typography.fontFamily.sans, outline: 'none'
                }}
              />
              <Badge variant="outline" style={{ fontSize: '10px' }}>ESC</Badge>
            </div>

            <div style={{ padding: '12px', maxHeight: '400px', overflowY: 'auto' }}>
              {searchResults.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: colors.muted, fontSize: typography.fontSize.caption }}>
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                searchResults.map((result, i) => (
                  <div
                    key={result.id}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => { result.action(); setIsOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px',
                      borderRadius: radius.md, cursor: 'pointer',
                      background: i === activeIndex ? colors.mutedBg : 'transparent',
                      color: i === activeIndex ? colors.foreground : colors.muted,
                      transition: 'background 0.1s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ color: i === activeIndex ? colors.primary : 'inherit' }}>{result.icon}</div>
                      <span style={{ fontSize: typography.fontSize.caption, fontWeight: i === activeIndex ? 600 : 500 }}>{result.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: typography.fontSize.label, color: colors.muted }}>{result.type}</span>
                      {i === activeIndex && <ChevronRight size={16} color={colors.muted} />}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div style={{ padding: '8px 16px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: '16px', background: colors.mutedBg }}>
              <span style={{ fontSize: typography.fontSize.label, color: colors.muted }}>↑↓ to navigate</span>
              <span style={{ fontSize: typography.fontSize.label, color: colors.muted }}>↵ to select</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
