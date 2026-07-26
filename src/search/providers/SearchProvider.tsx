'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SearchResult } from '../types';

interface SearchContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  pinnedResults: SearchResult[];
  togglePinnedResult: (result: SearchResult) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [pinnedResults, setPinnedResults] = useState<SearchResult[]>([]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q !== query);
      return [query, ...filtered].slice(0, 5);
    });
  };

  const togglePinnedResult = (result: SearchResult) => {
    setPinnedResults(prev => {
      const exists = prev.some(r => r.id === result.id);
      if (exists) return prev.filter(r => r.id !== result.id);
      return [...prev, result];
    });
  };

  return (
    <SearchContext.Provider value={{ isOpen, open, close, toggle, recentSearches, addRecentSearch, pinnedResults, togglePinnedResult }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearchContext must be used within SearchProvider');
  return ctx;
};
