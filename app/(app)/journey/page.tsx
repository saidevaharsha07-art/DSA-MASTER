'use client';

import React from 'react';
import { JourneyMap } from '@/components/journey';
import { curriculumEngine } from '@/src/engines/curriculum';
import { memoryEngine } from '@/src/engines/memory';

export default function JourneyPage() {
  const patterns = curriculumEngine.getAllPatterns();
  const user = memoryEngine.getUserProfile();
  const weakestPattern = memoryEngine.getWeakestPattern();
  const readiness = memoryEngine.getInterviewReadiness();

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <JourneyMap 
        patterns={patterns} 
        user={{
          name: user.name,
          xp: user.xp,
          streak: user.streak
        }} 
        weakestPatternTitle={weakestPattern?.title} 
        readiness={readiness} 
      />
    </div>
  );
}
