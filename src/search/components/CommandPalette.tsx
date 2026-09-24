'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchContext } from '../providers/SearchProvider';
import { performSearch } from '../engine';
import { SearchResult } from '../types';
import { Search, Command, BookOpen, Code, Building, Tag as TagIcon, Clock, Pin } from 'lucide-react';
import { useRouter } from 'next/navigation';

function getIconForType(type: string) {
  switch (type) {
    case 'problem': return <Code className="w-4 h-4" />;
    case 'pattern': return <BookOpen className="w-4 h-4" />;
    case 'company': return <Building className="w-4 h-4" />;
    default: return <TagIcon className="w-4 h-4" />;
  }
}

export function CommandPalette() {
  const { isOpen, close, recentSearches, addRecentSearch, pinnedResults, togglePinnedResult } = useSearchContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      const res = await performSearch(query);
      setResults(res.slice(0, 8)); // top 8
      setSelectedIndex(0);
      setIsSearching(false);
    };

    const debounce = setTimeout(fetchResults, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = React.useCallback((url: string, q: string) => {
    addRecentSearch(q);
    close();
    router.push(url);
  }, [addRecentSearch, close, router]);

  const displayResults = query.trim() ? results : pinnedResults;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, Math.max(0, displayResults.length - 1)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (displayResults.length > 0) {
          const selected = displayResults[selectedIndex];
          handleSelect(selected.url, selected.title);
        } else if (query.trim()) {
          addRecentSearch(query.trim());
          close();
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, displayResults, selectedIndex, query, router, close, addRecentSearch, handleSelect]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}
          className="fixed inset-0"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
          }}
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col"
        >
          {/* Search Input */}
          <div style={{ borderBottom: '1px solid var(--border)' }} className="flex items-center px-4 py-4">
            <Search style={{ color: 'var(--text-muted)' }} className="w-6 h-6 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patterns, problems, companies..."
              style={{ color: 'var(--text-primary)' }}
              className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-[var(--text-muted)]"
            />
            <div className="flex items-center gap-2 ml-3">
              <kbd style={{ color: 'var(--text-muted)', background: 'var(--surface-secondary)', border: '1px solid var(--border)' }} className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded">
                ESC
              </kbd>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
            {/* Quick Actions / Recents when empty */}
            {!query.trim() && (
              <div className="p-2">
                {pinnedResults.length > 0 && (
                  <div className="mb-4">
                    <div style={{ color: 'var(--text-muted)' }} className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">
                      Pinned
                    </div>
                    {pinnedResults.map((result, idx) => (
                      <ResultRow 
                        key={result.id} 
                        result={result} 
                        isSelected={idx === selectedIndex} 
                        onSelect={() => handleSelect(result.url, result.title)} 
                        onTogglePin={(e) => {
                          e.stopPropagation();
                          togglePinnedResult(result);
                        }}
                        isPinned={true}
                      />
                    ))}
                  </div>
                )}

                {recentSearches.length > 0 && (
                  <div>
                    <div style={{ color: 'var(--text-muted)' }} className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">
                      Recent Searches
                    </div>
                    {recentSearches.map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuery(q)}
                        style={{ color: 'var(--text-primary)' }}
                        className="w-full flex items-center px-3 py-3 text-left hover:bg-[var(--accent-soft)] rounded-lg group transition-colors"
                      >
                        <Clock style={{ color: 'var(--text-muted)' }} className="w-4 h-4 mr-3 group-hover:text-[var(--accent-primary)]" />
                        <span className="group-hover:text-[var(--accent-primary)]">{q}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Results */}
            {query.trim() && displayResults.length > 0 && (
              <div className="p-2">
                {displayResults.map((result, idx) => {
                  const isPinned = pinnedResults.some(r => r.id === result.id);
                  return (
                    <ResultRow 
                      key={result.id} 
                      result={result} 
                      isSelected={idx === selectedIndex} 
                      onSelect={() => handleSelect(result.url, result.title)} 
                      onTogglePin={(e) => {
                        e.stopPropagation();
                        togglePinnedResult(result);
                      }}
                      isPinned={isPinned}
                    />
                  );
                })}
              </div>
            )}
            
            {query.trim() && displayResults.length === 0 && !isSearching && (
              <div style={{ color: 'var(--text-muted)' }} className="py-12 text-center">
                No results found for <span style={{ color: 'var(--text-primary)' }} className="font-semibold">&quot;{query}&quot;</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ background: 'var(--surface-secondary)', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }} className="px-4 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)' }} className="px-1.5 py-0.5 rounded">↑</kbd>
                <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)' }} className="px-1.5 py-0.5 rounded">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)' }} className="px-1.5 py-0.5 rounded">↵</kbd>
                select
              </span>
            </div>
            <span>DSA Magna Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ResultRow({ 
  result, 
  isSelected, 
  onSelect, 
  onTogglePin, 
  isPinned 
}: { 
  result: SearchResult; 
  isSelected: boolean; 
  onSelect: () => void;
  onTogglePin: (e: React.MouseEvent) => void;
  isPinned: boolean;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        background: isSelected ? 'var(--accent-soft)' : 'transparent',
      }}
      className="flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer group transition-colors hover:bg-[var(--accent-soft)]"
    >
      <div className="flex items-start gap-4">
        <div 
          style={{
            background: isSelected ? 'var(--accent-soft)' : 'var(--surface-secondary)',
            color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
          }}
          className="p-2 rounded-lg mt-0.5"
        >
          {getIconForType(result.type)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-primary)' }} className="font-semibold">
              {result.title}
            </span>
            <span style={{ background: 'var(--surface-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }} className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase">
              {result.type}
            </span>
          </div>
          {result.preview && (
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm line-clamp-1 mt-0.5">
              {result.preview}
            </p>
          )}
        </div>
      </div>
      
      <button 
        onClick={onTogglePin}
        style={{
          color: isPinned ? 'var(--accent-primary)' : 'var(--text-muted)',
        }}
        className={`p-2 rounded-lg transition-colors hover:bg-[var(--accent-soft)] ${isSelected && !isPinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <Pin className="w-4 h-4" />
      </button>
    </div>
  );
}
