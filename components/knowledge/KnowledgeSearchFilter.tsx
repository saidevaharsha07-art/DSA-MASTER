'use client';

import React from 'react';
import { Search, Filter, Bookmark, SlidersHorizontal } from 'lucide-react';
import { CategoryModel } from '@/src/curriculum/types';

interface KnowledgeSearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategorySlug: string;
  onCategoryChange: (cat: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (diff: string) => void;
  showOnlyBookmarked: boolean;
  onToggleBookmarked: () => void;
  categories: CategoryModel[];
}

export function KnowledgeSearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategorySlug,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  showOnlyBookmarked,
  onToggleBookmarked,
  categories,
}: KnowledgeSearchFilterProps) {
  return (
    <div style={{ padding: '18px 24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Search Input */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search size={18} style={{ position: 'absolute', left: '14px', color: '#C084FC', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search 114+ patterns by topic, algorithm, kingdom, concept, or interview tag..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px 12px 44px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.04)',
            color: '#FFFFFF',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      {/* Filter Dropdowns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr auto', gap: '12px', alignItems: 'center' }}>
        
        {/* Kingdom Dropdown */}
        <div>
          <select
            value={selectedCategorySlug}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', fontSize: '12px', outline: 'none' }}
          >
            <option value="all">All 25 Kingdoms / Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.order}. {c.title} ({c.kingdomTitle})</option>
            ))}
          </select>
        </div>

        {/* Difficulty Dropdown */}
        <div>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', fontSize: '12px', outline: 'none' }}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Bookmarked Filter Toggle */}
        <button
          type="button"
          onClick={onToggleBookmarked}
          style={{
            padding: '9px 14px',
            borderRadius: '10px',
            background: showOnlyBookmarked ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.04)',
            border: showOnlyBookmarked ? '1px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.1)',
            color: showOnlyBookmarked ? '#C084FC' : '#94A3B8',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Bookmark size={14} fill={showOnlyBookmarked ? 'currentColor' : 'none'} />
          {showOnlyBookmarked ? 'Bookmarked Only' : 'All Articles'}
        </button>

      </div>

    </div>
  );
}
