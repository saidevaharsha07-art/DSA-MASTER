'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { KingdomDistrictLevel2 } from '@/components/knowledge/KingdomDistrictLevel2';
import { ArrowLeft } from 'lucide-react';

interface KingdomPageProps {
  params: Promise<{ kingdomSlug: string }>;
}

export default function KingdomLevel2Page({ params }: KingdomPageProps) {
  const resolvedParams = use(params);
  const category = CurriculumRepository.getCategoryBySlug(resolvedParams.kingdomSlug);

  if (!category) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#FFF' }}>
        <h2>Kingdom &quot;{resolvedParams.kingdomSlug}&quot; Not Found</h2>
        <Link href="/knowledge" style={{ color: '#C084FC', fontWeight: 800 }}>← Return to 25 Kingdoms Grid</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ width: '100%', minHeight: '100vh', background: '#09090B', display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 24px 40px 24px', fontFamily: 'var(--font-sans, sans-serif)' }}
    >
      <KingdomDistrictLevel2
        category={category}
        onBackToKingdoms={() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/knowledge';
          }
        }}
        bookmarkedPatternIds={['pattern.array-fundamentals']}
        onToggleBookmark={() => {}}
      />
    </motion.div>
  );
}
