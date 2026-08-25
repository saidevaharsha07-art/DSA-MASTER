'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Sparkles, 
  BrainCircuit, 
  Target, 
  AlertTriangle, 
  RotateCcw, 
  Lightbulb, 
  Play, 
  Zap, 
  Bot, 
  TrendingUp, 
  Award, 
  Flame, 
  CheckCircle2, 
  Activity, 
  Bookmark, 
  Copy, 
  Check, 
  ChevronRight, 
  BarChart3, 
  Gift,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { useRoadmap } from '@/hooks/use-roadmap';
import { MentorAdapterService, MentorDashboardData } from '@/src/features/mentor/services/mentor-adapter.service';

export default function MentorPage() {
  const { settings } = useSettings();
  const { toast } = useToast();
  const { state: roadmapState } = useRoadmap();

  const [mentorData, setMentorData] = useState<MentorDashboardData>(() =>
    MentorAdapterService.getMentorData('default_user')
  );

  useEffect(() => {
    const fresh = MentorAdapterService.getMentorData('default_user');
    setMentorData(fresh);
  }, [roadmapState]);

  const { hud, observation, currentFocus, coachSummary, learningDna, skillMatrix, weaknessBreakdown, recommendedQuests, revisionSummary } = mentorData;

  const [copiedTip, setCopiedTip] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [understoodObservation, setUnderstoodObservation] = useState(false);

  const handleCopyTip = () => {
    const tipText = "When working with Sliding Window, always ask: Should I expand, shrink, or both? This prevents 80% of bugs.";
    navigator.clipboard.writeText(tipText);
    setCopiedTip(true);
    toast("Interview tip copied to clipboard!", "success");
    setTimeout(() => setCopiedTip(false), 2000);
  };

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
      toast("Removed problem from bookmarks", "info");
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast("Problem bookmarked for quick practice!", "success");
    }
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '32px' }}>
      
      {/* 1. Compact Hero Banner (Centered AI Icon, 10-15% reduced height) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "relative",
          borderRadius: "var(--radius, 16px)",
          overflow: "hidden",
          border: "1px solid var(--primary-soft)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)",
          background: "linear-gradient(135deg, rgba(12, 14, 28, 0.95) 0%, rgba(26, 18, 56, 0.9) 60%, rgba(124, 77, 255, 0.18) 100%)",
          padding: "18px 24px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "24px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", background: "var(--primary-soft)", padding: "2px 8px", borderRadius: "99px" }}>
                AI NEURAL COACH ACTIVE
              </span>
              <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} /> {typeof hud.accuracyPct === 'number' ? `${hud.accuracyPct}% Accuracy` : 'Unrated Accuracy'}
              </span>
            </div>
            
            <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              AI Mentor Sanctum
            </h1>
            <p style={{ margin: "4px 0 12px 0", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Your personal AI coach analyzing your journey, learning patterns, mistakes, and progress to make you a DSA master.
            </p>

            {/* Metric Pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Award size={14} style={{ color: "var(--primary)" }} />
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>CURRENT LEVEL:</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-primary)" }}>Lvl {hud.level} {hud.levelTitle}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Flame size={14} style={{ color: "#F59E0B" }} />
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>STREAK:</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#F59E0B" }}>{hud.streak} Days</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <TrendingUp size={14} style={{ color: "#10B981" }} />
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>SOLVED COUNT:</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#10B981" }}>{hud.solvedCount} Problems</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Activity size={14} style={{ color: "var(--primary)" }} />
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>CONFIDENCE:</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-primary)" }}>{typeof hud.confidenceScore === 'number' ? `${hud.confidenceScore}% Peak` : hud.confidenceScore}</span>
              </div>
            </div>
          </div>

          {/* Speech Bubble */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--primary-soft)", padding: "8px 14px", borderRadius: "12px", color: "var(--text-primary)", fontSize: "11px", fontWeight: 600, boxShadow: "0 6px 18px rgba(0,0,0,0.3)" }}>
            Let&apos;s level up together! 🚀
          </div>

          {/* Centered Glowing Robot Avatar */}
          <div style={{ width: "72px", height: "72px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "radial-gradient(circle, var(--primary) 0%, rgba(10,14,26,1) 85%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", boxShadow: "0 0 20px var(--primary-soft)" }}>
              <Bot size={36} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Row 1: Observation (1fr) | Focus (1fr) | Coach Sidebar (1fr) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "stretch" }}>
        
        {/* Today's Observation */}
        <div style={{ padding: "18px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <BrainCircuit size={16} style={{ color: "var(--primary)" }} />
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>Today&apos;s Observation</h3>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ fontSize: "9px", fontWeight: 700, color: "#10B981", background: "rgba(16, 185, 129, 0.15)", padding: "2px 6px", borderRadius: "4px" }}>{typeof observation.confidencePct === 'number' ? `${observation.confidencePct}% Conf` : observation.confidencePct}</span>
                <span style={{ fontSize: "9px", fontWeight: 700, color: "#EF4444", background: "rgba(239, 68, 68, 0.15)", padding: "2px 6px", borderRadius: "4px" }}>{observation.priority}</span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: "12px", color: "var(--text-primary)", lineHeight: 1.5 }}>
              {observation.summary}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
              <div style={{ padding: "8px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: 700, display: "block" }}>Why this matters?</span>
                <span style={{ fontSize: "10px", color: "var(--text-primary)" }}>{observation.whyItMatters}</span>
              </div>
              <div style={{ padding: "8px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: 700, display: "block" }}>Expected Improvement</span>
                <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 700 }}>{observation.expectedImprovement}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "6px", paddingTop: "6px" }}>
            <button type="button" onClick={() => toast(`Focusing on ${currentFocus.patternName}`, "info")} style={{ flex: 1, padding: "7px", borderRadius: "6px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "10px", fontWeight: 600, cursor: "pointer" }}>📖 Explain More</button>
            <Link href="/practice" style={{ flex: 1, padding: "7px", borderRadius: "6px", background: "var(--primary-soft)", border: "1px solid var(--primary-soft)", color: "var(--primary)", fontSize: "10px", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>&lt;/&gt; Create Practice</Link>
            <button type="button" onClick={() => { setUnderstoodObservation(true); toast("Acknowledged!", "success"); }} style={{ flex: 1, padding: "7px", borderRadius: "6px", background: "var(--primary)", border: "none", color: "#FFF", fontSize: "10px", fontWeight: 700, cursor: "pointer" }}>{understoodObservation ? "✓ Done" : "✓ I Understand"}</button>
          </div>
        </div>

        {/* Current Focus */}
        <div style={{ padding: "18px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Target size={16} style={{ color: "var(--primary)" }} />
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>Current Focus</h3>
              </div>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--primary)", background: "var(--primary-soft)", padding: "2px 6px", borderRadius: "4px" }}>Mastery Target: 85%</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>TARGET PATTERN</span>
                <h2 style={{ margin: "2px 0 0 0", fontSize: "17px", fontWeight: 800, color: "var(--text-primary)" }}>{currentFocus.patternName}</h2>
              </div>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "#F59E0B", background: "rgba(245, 158, 11, 0.15)", padding: "2px 6px", borderRadius: "4px" }}>{currentFocus.difficulty}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: "14px", alignItems: "center", marginTop: "10px" }}>
              <div style={{ position: "relative", width: "64px", height: "64px" }}>
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="25" stroke="var(--border)" strokeWidth="5" fill="none" />
                  <circle cx="32" cy="32" r="25" stroke="var(--primary)" strokeWidth="5" fill="none" strokeDasharray="157" strokeDashoffset={157 - (157 * currentFocus.masteryPct) / 100} strokeLinecap="round" transform="rotate(-90 32 32)" />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "var(--text-primary)" }}>{currentFocus.masteryPct}%</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "10px" }}>
                <span>Est. Mastery Time: <strong style={{ color: "var(--text-primary)" }}>{currentFocus.estTimeMins} mins</strong></span>
                <span>Reason: <strong style={{ color: "var(--text-primary)" }}>{currentFocus.reasoning}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Coach Sidebar Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ padding: "12px 16px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--primary-soft)", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
              <Bot size={18} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>JARVIS AI</h4>
              <span style={{ fontSize: "9px", color: "#10B981", fontWeight: 600 }}>⚡ Peak Focus Mode</span>
            </div>
          </div>

          <div style={{ padding: "14px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "6px", fontSize: "10px" }}>
            <h4 style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>Coach Summary</h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Solved Today:</span><strong style={{ color: "var(--text-primary)" }}>{coachSummary.solvedToday} Problems</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>XP Earned:</span><strong style={{ color: "var(--primary)" }}>+{coachSummary.xpEarnedToday} XP</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Accuracy:</span><strong style={{ color: "#10B981" }}>{coachSummary.accuracyText}</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Revision Due:</span><strong style={{ color: "#F59E0B" }}>{coachSummary.revisionDueCount} Items</strong></div>
          </div>
        </div>

      </div>

      {/* Row 2: AI Recommended Problems (Expanded to 4 Problem Cards Grid) */}
      <div style={{ padding: "18px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Play size={16} style={{ color: "#10B981" }} /> AI Recommended Problems
          </h3>
          <Link href="/practice" style={{ textDecoration: 'none' }}>
            <button type="button" style={{ background: "transparent", border: "none", color: "var(--text-secondary)", fontSize: "11px", cursor: "pointer", fontWeight: 600 }}>View All</button>
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {recommendedQuests.map((q) => (
            <div key={q.id} style={{ padding: "14px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--primary)" }}>{q.platform}</span>
                  <button type="button" onClick={() => toggleBookmark(q.id)} style={{ background: "transparent", border: "none", color: bookmarkedIds.includes(q.id) ? "var(--primary)" : "var(--text-secondary)", cursor: "pointer" }}>
                    <Bookmark size={14} fill={bookmarkedIds.includes(q.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{q.title}</h4>

                <div style={{ display: "flex", gap: "4px", margin: "6px 0", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "9px", fontWeight: 700, color: q.difficulty === "Easy" ? "#10B981" : "#F59E0B", background: "rgba(255,255,255,0.05)", padding: "2px 4px", borderRadius: "4px" }}>{q.difficulty}</span>
                  {q.tags.map((t) => (
                    <span key={t} style={{ fontSize: "9px", color: "var(--text-secondary)", background: "rgba(255,255,255,0.05)", padding: "2px 4px", borderRadius: "4px" }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", fontSize: "9px", color: "var(--text-secondary)", margin: "6px 0" }}>
                  <div>Acceptance: <strong style={{ color: "var(--text-primary)", display: "block" }}>{q.acceptance}</strong></div>
                  <div>Est. Time: <strong style={{ color: "var(--text-primary)", display: "block" }}>{q.estTime}</strong></div>
                  <div>AI Conf.: <strong style={{ color: "#10B981", display: "block" }}>{q.confidence}%</strong></div>
                </div>

                <p style={{ margin: 0, fontSize: "9px", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.3 }}>
                  AI Reason: {q.aiReason}
                </p>
              </div>

              <div style={{ display: "flex", gap: "6px", paddingTop: "6px", borderTop: "1px solid var(--border)" }}>
                <Link href={q.url} style={{ flex: 1, padding: "5px", borderRadius: "6px", background: "var(--primary)", color: "#FFF", fontSize: "10px", fontWeight: 700, textDecoration: "none", textAlign: "center" }}>&gt; Start Quest</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: 4-Column Matrix (Weakness | Learning DNA | Strength | Prediction) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        
        {/* Weakness Analysis */}
        <div style={{ padding: "16px", borderRadius: "var(--radius, 14px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
            <AlertTriangle size={14} style={{ color: "#EF4444" }} /> Weakness Analysis
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "10px" }}>
            {weaknessBreakdown.map((w) => (
              <div key={w.label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{w.label}:</span>
                <strong style={{ color: "#EF4444" }}>{w.errorRate}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Learning DNA */}
        <div style={{ padding: "16px", borderRadius: "var(--radius, 14px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
            <Activity size={14} style={{ color: "var(--primary)" }} /> Learning DNA
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {learningDna.slice(0, 4).map((item) => (
              <div key={item.label} style={{ fontSize: "9px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  <strong style={{ color: "var(--primary)" }}>{item.value}%</strong>
                </div>
                <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                  <div style={{ width: `${item.value}%`, height: "100%", background: "var(--primary)", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strength Radar */}
        <div style={{ padding: "16px", borderRadius: "var(--radius, 14px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
            <BarChart3 size={14} style={{ color: "#10B981" }} /> Strength Radar
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "10px" }}>
            {skillMatrix.slice(0, 4).map((s) => (
              <div key={s.name} style={{ padding: "6px", background: "var(--surface)", borderRadius: "6px", textAlign: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#10B981", display: "block" }}>{s.score}%</span>
                <span style={{ fontSize: "9px", color: "var(--text-secondary)" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Prediction */}
        <div style={{ padding: "16px", borderRadius: "var(--radius, 14px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} style={{ color: "var(--primary)" }} /> AI Prediction
          </h4>
          <p style={{ margin: 0, fontSize: "10px", color: "var(--text-secondary)", lineHeight: 1.3 }}>
            {mentorData.aiPredictionText}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "9px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Rating Gain:</span><strong style={{ color: "#10B981" }}>{mentorData.predictedRatingGain}</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Mastery Gain:</span><strong style={{ color: "var(--primary)" }}>{mentorData.predictedMasteryGain}</strong></div>
          </div>
        </div>

      </div>

      {/* Row 4: Revision Timeline & Tip of the Day */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        
        {/* Revision Timeline */}
        <div style={{ padding: "16px", borderRadius: "var(--radius, 14px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <RotateCcw size={14} style={{ color: "#F59E0B" }} /> Revision Timeline: {revisionSummary.dueTopic}
            </h4>
            <p style={{ margin: "2px 0 0 0", fontSize: "10px", color: "var(--text-secondary)" }}>{revisionSummary.dueInText} • Memory Decay: {revisionSummary.memoryDecayPct}% • Retention: {revisionSummary.retentionPct}%</p>
          </div>
          <Link href="/revision" style={{ padding: "6px 14px", borderRadius: "6px", background: "var(--primary)", color: "#FFF", fontSize: "10px", fontWeight: 700, textDecoration: "none" }}>
            Start Revision
          </Link>
        </div>

        {/* Tip of the Day */}
        <div style={{ padding: "16px", borderRadius: "var(--radius, 14px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Lightbulb size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "10px", color: "var(--text-primary)", lineHeight: 1.3 }}>
              When working with Sliding Window, always ask: Should I expand, shrink, or both? This prevents 80% of bugs.
            </p>
          </div>
          <button type="button" onClick={handleCopyTip} style={{ background: "transparent", border: "none", color: "var(--text-secondary)", fontSize: "9px", cursor: "pointer", flexShrink: 0 }}>
            {copiedTip ? "Copied!" : "Copy"}
          </button>
        </div>

      </div>

    </div>
  );
}
