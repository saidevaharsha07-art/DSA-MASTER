'use client';

import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { FlowStrip } from './FlowStrip';
import { FeatureShowcase } from './FeatureShowcase';
import { PracticeSection } from './PracticeSection';
import { TrioShowcase } from './TrioShowcase';
import { PhilosophySection } from './PhilosophySection';
import { FinalCtaSection } from './FinalCtaSection';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* 1. Sticky Navigation */}
      <LandingNavbar />

      {/* 2. Main Landing Content */}
      <main className="relative overflow-hidden">
        {/* Subtle grid background overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1E293B0A_1px,transparent_1px),linear-gradient(to_bottom,#1E293B0A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Hero Section */}
        <HeroSection />

        {/* Flow Strip */}
        <FlowStrip />

        {/* Features Grid Showcase */}
        <FeatureShowcase />

        {/* Practice Arena Section */}
        <PracticeSection />

        {/* Trio Showcase (Analytics, AI Mentor, Revision) */}
        <TrioShowcase />

        {/* Traditional vs DSA Master Philosophy */}
        <PhilosophySection />

        {/* Final CTA Banner */}
        <FinalCtaSection />
      </main>

      {/* 3. Footer */}
      <LandingFooter />
    </div>
  );
}
