'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { PatternLearningAdapterService } from '@/src/features/journey/services/pattern-learning-adapter.service';
import { PatternConceptAcademyView } from '@/src/features/journey/components/PatternConceptAcademyView';
import { useActiveUser } from '@/src/hooks/useActiveUser';

export default function PatternConceptAcademyPage() {
  const params = useParams();
  const { userId } = useActiveUser();

  const rawArea = params?.area as string;
  const areaSlug = Array.isArray(rawArea) ? rawArea[0] : rawArea;

  const rawSubtopic = params?.subtopic as string;
  const subtopicSlug = Array.isArray(rawSubtopic) ? rawSubtopic[0] : rawSubtopic;

  const rawPattern = params?.pattern as string;
  const patternSlug = Array.isArray(rawPattern) ? rawPattern[0] : rawPattern;

  if (!areaSlug || !subtopicSlug || !patternSlug) {
    notFound();
  }

  const detail = PatternLearningAdapterService.getPatternLearningDetail(
    areaSlug,
    subtopicSlug,
    patternSlug,
    userId || 'default_user'
  );

  if (!detail) {
    notFound();
  }

  return (
    <PatternConceptAcademyView
      initialDetail={detail}
      areaSlug={areaSlug}
      subtopicSlug={subtopicSlug}
      patternSlug={patternSlug}
    />
  );
}
