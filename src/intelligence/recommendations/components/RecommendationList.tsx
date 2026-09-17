'use client';

import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { UnifiedRecommendation } from '../types/recommendation.types';
import { RecommendationCard } from './RecommendationCard';

export interface RecommendationListProps {
  recommendations: UnifiedRecommendation[];
  variant?: 'compact' | 'journey' | 'detailed';
  onDismiss?: (id: string) => void;
  onStart?: (id: string) => void;
  emptyMessage?: string;
  className?: string;
}

export function RecommendationList({
  recommendations,
  variant = 'compact',
  onDismiss,
  onStart,
  emptyMessage = 'All active recommendations completed. Practice or run an interview to generate new missions.',
  className = '',
}: RecommendationListProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col items-center justify-center text-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
          <Compass size={20} />
        </div>
        <p className="text-xs text-[var(--text-muted)] max-w-sm">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {recommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          recommendation={rec}
          variant={variant}
          onDismiss={onDismiss}
          onStart={onStart}
        />
      ))}
    </div>
  );
}
