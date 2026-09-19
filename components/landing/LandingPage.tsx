'use client';

import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { ProductFactsSection } from './ProductFactsSection';
import { LearningLoopSection } from './LearningLoopSection';
import { AdaptiveEngineSection } from './AdaptiveEngineSection';
import { JourneyTaxonomySection } from './JourneyTaxonomySection';
import { PracticeArenaSection } from './PracticeArenaSection';
import { InterviewArenaSection } from './InterviewArenaSection';
import { DailyStudyPlanSection } from './DailyStudyPlanSection';
import { PlatformMixSection } from './PlatformMixSection';
import { FinalCtaSection } from './FinalCtaSection';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. Global Public Navigation */}
      <LandingNavbar />

      {/* 2. Main Storytelling Landing Flow */}
      <main style={{ flex: 1, overflowX: 'hidden' }}>
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Factual Product Metrics */}
        <ProductFactsSection />

        {/* Section 3: Core Product Story (Learning Loop) */}
        <LearningLoopSection />

        {/* Section 4: Adaptive Intelligence */}
        <AdaptiveEngineSection />

        {/* Section 5: Journey & Taxonomy Breakdown */}
        <JourneyTaxonomySection />

        {/* Section 6: Practice Arena Preview */}
        <PracticeArenaSection />

        {/* Section 7: Interview Arena Simulation */}
        <InterviewArenaSection />

        {/* Section 8: Daily Study Plan Breakdown */}
        <DailyStudyPlanSection />

        {/* Section 9: 4 Platform Catalog */}
        <PlatformMixSection />

        {/* Section 10: Closing CTA */}
        <FinalCtaSection />
      </main>

      {/* 3. Global Public Footer */}
      <LandingFooter />
    </div>
  );
}
