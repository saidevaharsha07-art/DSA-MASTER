'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Compass } from 'lucide-react';
import { CategoryModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { KingdomCard } from './KingdomCard';

interface KingdomGridProps {
  categories: CategoryModel[];
  searchQuery: string;
}

export function KingdomGrid({ categories, searchQuery }: KingdomGridProps) {
  const router = useRouter();

  // Compute matching category slugs for search highlighting
  const highlightedCategorySlugs = useMemo(() => {
    if (!searchQuery) return new Set<string>();
    const q = searchQuery.toLowerCase().trim();
    const matchingSlugs = new Set<string>();

    categories.forEach((cat) => {
      if (cat.title.toLowerCase().includes(q) || cat.kingdomTitle.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q)) {
        matchingSlugs.add(cat.slug);
      }

      const patterns = CurriculumRepository.getPatternsByCategory(cat.slug);
      if (patterns.some((p) => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))) {
        matchingSlugs.add(cat.slug);
      }

      const problems = CurriculumRepository.getProblemsByCategory(cat.slug);
      if (problems.some((pr) => pr.title.toLowerCase().includes(q) || pr.leetcodeNumber.toString().includes(q))) {
        matchingSlugs.add(cat.slug);
      }
    });

    return matchingSlugs;
  }, [categories, searchQuery]);

  const handleSelectKingdom = (slug: string) => {
    // Dedicated Route Navigation (Level 1 -> Level 2)
    router.push(`/knowledge/${slug}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Grid Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <Compass size={18} style={{ color: '#C084FC' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
              Explore the 25 Kingdoms
            </h2>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>
              Select a kingdom below to enter its dedicated Level 2 realm, pattern districts, and codex documentation.
            </span>
          </div>
        </div>

        {searchQuery && (
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            {highlightedCategorySlugs.size} Kingdoms Match &quot;{searchQuery}&quot;
          </span>
        )}
      </div>

      {/* 5x5 Desktop Kingdom Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {categories.map((category) => {
          const isHighlighted = highlightedCategorySlugs.has(category.slug);

          return (
            <KingdomCard
              key={category.id}
              category={category}
              isSelected={false}
              isHighlighted={isHighlighted}
              onSelect={() => handleSelectKingdom(category.slug)}
            />
          );
        })}
      </div>

    </div>
  );
}
