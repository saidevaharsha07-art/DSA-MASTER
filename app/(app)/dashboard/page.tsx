"use client";

import { useState } from "react";
import { mockDashboardData } from "@/lib/mock/dashboard";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { JourneyCard } from "@/components/dashboard/JourneyCard";
import { DailyMissionCard } from "@/components/dashboard/DailyMissionCard";
import { SkillMasteryCard } from "@/components/dashboard/SkillMasteryCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { RevisionPreviewCard } from "@/components/dashboard/RevisionPreviewCard";
import { AiRecommendationCard } from "@/components/dashboard/AiRecommendationCard";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";

export default function Dashboard() {
  const [data, setData] = useState(mockDashboardData);

  const toggleMission = (id: string) => {
    setData((prev) => ({
      ...prev,
      missions: prev.missions.map((m) =>
        m.id === id ? { ...m, isCompleted: !m.isCompleted } : m
      ),
    }));
  };

  return (
    <div style={{ display: "grid", gap: 28 }}>
      {/* 1. Welcome Banner */}
      <WelcomeBanner user={data.user} />

      {/* Main Grid: Left Column & Right Column */}
      <DashboardGrid>
        {/* Left Column */}
        <div style={{ display: "grid", gap: 28 }}>
          {/* 2. Current Journey Card */}
          <JourneyCard
            user={data.user}
            completedPatternsCount={15}
            totalPatternsCount={26}
            continueHref="/problems/leetcode"
          />

          {/* 3. Daily Mission Card */}
          <DailyMissionCard
            missions={data.missions}
            xpReward={100}
            onToggleMission={toggleMission}
          />

          {/* 4. Skill Mastery Card */}
          <SkillMasteryCard skills={data.skills} />
        </div>

        {/* Right Column */}
        <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
          {/* 6. AI Recommendation Card */}
          <AiRecommendationCard recommendation={data.recommendation} />

          {/* 7. Revision Preview Card */}
          <RevisionPreviewCard revisions={data.revisions} />

          {/* 5. Recent Activity Timeline Card */}
          <RecentActivityCard activities={data.activities} />
        </div>
      </DashboardGrid>
    </div>
  );
}
