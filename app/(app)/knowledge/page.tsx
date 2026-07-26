'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Search } from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';

// Import AAA Knowledge Components for Level 1 Kingdom Selection Screen
import { KnowledgeHero } from '@/components/knowledge/KnowledgeHero';
import { KingdomGrid } from '@/components/knowledge/KingdomGrid';
import { KnowledgeGraphNodes } from '@/components/knowledge/KnowledgeGraphNodes';
import { MyNotesEditor } from '@/components/knowledge/MyNotesEditor';

export default function KnowledgeCodexPage() {
  const [activeTab, setActiveTab] = useState<'kingdoms' | 'my-notes'>('kingdoms');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedPatternIds, setBookmarkedPatternIds] = useState<string[]>(['pattern.array-fundamentals', 'pattern.sliding-window']);

  // Master Categories (All 25 Kingdoms)
  const allCategories = useMemo(() => CurriculumRepository.getAllCategories(), []);

  const handleToggleBookmark = (patternId: string) => {
    if (bookmarkedPatternIds.includes(patternId)) {
      setBookmarkedPatternIds(bookmarkedPatternIds.filter((id) => id !== patternId));
    } else {
      setBookmarkedPatternIds([...bookmarkedPatternIds, patternId]);
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#09090B', display: 'flex', flexDirection: 'column', gap: '28px', padding: '0 24px 40px 24px', fontFamily: 'var(--font-sans, sans-serif)' }}>
      
      {/* 1. AAA HERO SECTION */}
      <KnowledgeHero />

      {/* 2. TAB SELECTION BAR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('kingdoms')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            background: activeTab === 'kingdoms' ? 'linear-gradient(135deg, #A855F7, #7E22CE)' : 'rgba(255,255,255,0.04)',
            border: activeTab === 'kingdoms' ? 'none' : '1px solid rgba(255,255,255,0.08)',
            color: activeTab === 'kingdoms' ? '#FFFFFF' : '#94A3B8',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'kingdoms' ? '0 4px 16px rgba(168, 85, 247, 0.4)' : 'none',
          }}
        >
          <BookOpen size={16} /> 25 Kingdoms Codex
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my-notes')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            background: activeTab === 'my-notes' ? 'linear-gradient(135deg, #A855F7, #7E22CE)' : 'rgba(255,255,255,0.04)',
            border: activeTab === 'my-notes' ? 'none' : '1px solid rgba(255,255,255,0.08)',
            color: activeTab === 'my-notes' ? '#FFFFFF' : '#94A3B8',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'my-notes' ? '0 4px 16px rgba(168, 85, 247, 0.4)' : 'none',
          }}
        >
          <FileText size={16} /> My Personal Notes
        </button>
      </div>

      {activeTab === 'kingdoms' ? (
        <>
          {/* 3. SEARCH BAR */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', color: '#C084FC', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search topics, patterns, algorithms, or kingdoms (e.g. Array, Sliding Window, DP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                borderRadius: '16px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                background: '#11111A',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            />
          </div>

          {/* 4. LEVEL 1: 25 KINGDOMS GRID (5 Columns x 5 Rows) */}
          <KingdomGrid
            categories={allCategories}
            searchQuery={searchQuery}
          />

          {/* 5. CONNECTED KNOWLEDGE PROGRESSION PIPELINE */}
          <KnowledgeGraphNodes />
        </>
      ) : (
        /* MY PERSONAL NOTES TAB */
        <MyNotesEditor />
      )}

    </div>
  );
}
