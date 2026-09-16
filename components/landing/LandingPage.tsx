'use client';

import React from 'react';
import { useSettings } from '@/src/context/SettingsContext';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { ProblemSection } from './ProblemSection';
import { SolutionPipelineSection } from './SolutionPipelineSection';
import { ProductExperienceSection } from './ProductExperienceSection';
import { FeatureShowcase } from './FeatureShowcase';
import { HowItWorksSection } from './HowItWorksSection';
import { PersonalJourneySection } from './PersonalJourneySection';
import { ProductPreviewsSection } from './ProductPreviewsSection';
import { PhilosophySection } from './PhilosophySection';
import { PublicFirstSection } from './PublicFirstSection';
import { FinalCtaSection } from './FinalCtaSection';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 selection:bg-sky-500/30 selection:text-sky-600 ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#06090F] text-slate-100'
    }`}>
      
      {/* 1. Sticky Navigation */}
      <LandingNavbar />

      {/* 2. Main Storytelling Landing Content */}
      <main className="relative overflow-hidden">
        {/* Global subtle developer grid overlay */}
        <div className={`pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] ${
          isLight 
            ? 'bg-[linear-gradient(to_right,#0F172A08_1px,transparent_1px),linear-gradient(to_bottom,#0F172A08_1px,transparent_1px)] bg-[size:4rem_4rem]' 
            : 'bg-[linear-gradient(to_right,#1E293B12_1px,transparent_1px),linear-gradient(to_bottom,#1E293B12_1px,transparent_1px)] bg-[size:4rem_4rem]'
        }`} />

        {/* SECTION 1 — HERO: What is this? */}
        <HeroSection />

        {/* SECTION 2 — THE PROBLEM: Why does it matter? */}
        <ProblemSection />

        {/* SECTION 3 — THE SOLUTION: One system for the entire DSA journey */}
        <SolutionPipelineSection />

        {/* SECTION 4 — PRODUCT EXPERIENCE: Showcases A, B, C */}
        <ProductExperienceSection />

        {/* SECTION 5 — FEATURE SYSTEM: 5 core connected capabilities */}
        <FeatureShowcase />

        {/* SECTION 6 — HOW IT WORKS: 4-step progression */}
        <HowItWorksSection />

        {/* SECTION 7 — THE PERSONAL JOURNEY: Cloud memory & privacy */}
        <PersonalJourneySection />

        {/* SECTION 8 — PRODUCT PREVIEWS: Cinematic 3-panel UI */}
        <ProductPreviewsSection />

        {/* SECTION 9 — WHY THIS EXISTS: The DSA Master Equation */}
        <PhilosophySection />

        {/* SECTION 10 — PUBLIC FIRST: Zero barriers to entry */}
        <PublicFirstSection />

        {/* SECTION 11 — FINAL CTA: Starts with one problem */}
        <FinalCtaSection />
      </main>

      {/* 3. Footer */}
      <LandingFooter />
    </div>
  );
}
