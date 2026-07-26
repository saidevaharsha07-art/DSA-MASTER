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
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 py-4 border-b border-slate-800">
            <Search className="w-6 h-6 text-slate-500 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patterns, problems, companies..."
              className="flex-1 bg-transparent border-none outline-none text-lg text-slate-200 placeholder-slate-500"
            />
            <div className="flex items-center gap-2 ml-3">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-800 rounded">
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
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
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
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Recent Searches
                    </div>
                    {recentSearches.map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuery(q)}
                        className="w-full flex items-center px-3 py-3 text-left hover:bg-slate-800/50 rounded-lg group"
                      >
                        <Clock className="w-4 h-4 text-slate-500 mr-3 group-hover:text-cyan-500" />
                        <span className="text-slate-300 group-hover:text-cyan-50">{q}</span>
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
              <div className="py-12 text-center text-slate-500">
                No results found for <span className="text-slate-300 font-semibold">&quot;{query}&quot;</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">↵</kbd>
                select
              </span>
            </div>
            <span>DSA Master Roadmap Search</span>
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
      className={`flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer group transition-colors ${
        isSelected ? 'bg-cyan-500/10' : 'hover:bg-slate-800/50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg mt-0.5 ${
          isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
        }`}>
          {getIconForType(result.type)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isSelected ? 'text-cyan-50' : 'text-slate-200'}`}>
              {result.title}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-slate-800 text-slate-400 border border-white/5">
              {result.type}
            </span>
          </div>
          {result.preview && (
            <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">
              {result.preview}
            </p>
          )}
        </div>
      </div>
      
      <button 
        onClick={onTogglePin}
        className={`p-2 rounded-lg transition-colors ${
          isPinned ? 'text-cyan-400 hover:bg-cyan-500/20' : 'text-slate-600 hover:text-slate-300 hover:bg-slate-800 opacity-0 group-hover:opacity-100'
        } ${isSelected && !isPinned ? 'opacity-100' : ''}`}
      >
        <Pin className="w-4 h-4" />
      </button>
    </div>
  );
}
