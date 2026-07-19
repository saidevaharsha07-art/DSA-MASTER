import Link from "next/link";
import { Shield, Target, Award, Terminal, Code2 } from "lucide-react";

export default function Home() {
  return (
    <div className="shell" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 24, background: "var(--background)" }}>
      {/* Background radial highlight */}
      <div style={{ position: "absolute", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(248,159,27,0.08) 0%, transparent 70%)", top: "10%", left: "30%", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ maxWidth: 800, width: "100%", zIndex: 1, textAlign: "center" }}>
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, margin: "0 auto 16px auto" }}>
          <Terminal size={12} /> World-Class Algorithmic Syllabus
        </div>
        <h1 className="title" style={{ fontSize: "3.2rem", lineHeight: 1.1, marginBottom: 16 }}>
          DSA Master Roadmap
        </h1>
        <p className="muted" style={{ fontSize: 16, maxWidth: 600, margin: "0 auto 32px auto", lineHeight: 1.6 }}>
          The world&apos;s most complete interactive DSA learning ecosystem. Guided patterns, spaced repetition memory engines, and AI-powered mentorship to make you interview-ready.
        </p>

        {/* Call to Actions */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
          <Link href="/onboarding" className="button" style={{ padding: "14px 28px", fontSize: 14 }}>
            Start Onboarding Wizard
          </Link>
          <Link href="/login" className="button ghost" style={{ padding: "14px 28px", fontSize: 14 }}>
            Sign In to Profile
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          <div className="card" style={{ padding: 20, textAlign: "left" }}>
            <Code2 size={24} style={{ color: "var(--primary)", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 6px 0", fontSize: 14 }}>Pattern Learning</h4>
            <p className="muted" style={{ fontSize: 12, margin: 0 }}>Intuitive visual explanations of core structures like Prefix Sum and Sliding Window.</p>
          </div>
          <div className="card" style={{ padding: 20, textAlign: "left" }}>
            <Target size={24} style={{ color: "var(--primary)", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 6px 0", fontSize: 14 }}>Spaced Repetition</h4>
            <p className="muted" style={{ fontSize: 12, margin: 0 }}>Automated Fibonacci review queues ensuring you never forget solved questions.</p>
          </div>
          <div className="card" style={{ padding: 20, textAlign: "left" }}>
            <Award size={24} style={{ color: "var(--primary)", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 6px 0", fontSize: 14 }}>AI Mentor</h4>
            <p className="muted" style={{ fontSize: 12, margin: 0 }}>Dynamic cognitive code audits pointing out off-by-one errors and edge cases.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

