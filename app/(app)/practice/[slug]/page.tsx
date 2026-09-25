'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { PracticeIDELayout } from '@frontend/components/practice/PracticeIDELayout';

interface ProblemPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const resolvedParams = use(params);
  const problem = CurriculumRepository.getProblemBySlug(resolvedParams.slug);

  if (!problem) {
    return notFound();
  }

  return <PracticeIDELayout problem={problem} />;
}
