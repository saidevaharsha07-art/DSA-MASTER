"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Shield, ArrowRight, ArrowLeft, Target, Code, Clock, Building } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form states
  const [level, setLevel] = useState("beginner");
  const [language, setLanguage] = useState("python");
  const [time, setTime] = useState("1h");
  const [companies, setCompanies] = useState<string[]>([]);

  const toggleCompany = (company: string) => {
    setCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save setup values to localStorage
      localStorage.setItem("dsa-level", level);
      localStorage.setItem("dsa-language", language);
      localStorage.setItem("dsa-time-commitment", time);
      localStorage.setItem("dsa-target-companies", JSON.stringify(companies));

      // Preset daily goal based on time commitment
      if (time === "30m") {
        localStorage.setItem("dsa-weekly-goal", "5");
      } else if (time === "1h") {
        localStorage.setItem("dsa-weekly-goal", "15");
      } else {
        localStorage.setItem("dsa-weekly-goal", "25");
      }

      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="shell" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 24, background: "var(--background)" }}>
      <div className="card" style={{ maxWidth: 500, width: "100%", padding: "36px 40px" }}>
        
        {/* Step Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Terminal size={12} /> Roadmap Configurator
          </div>
          <span className="muted" style={{ fontSize: 11, fontWeight: 700 }}>
            Step {step} of 4
          </span>
        </div>

        {/* STEP 1: DSA Level */}
        {step === 1 && (
          <div>
            <h3 style={{ margin: "0 0 6px 0", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Target size={18} style={{ color: "var(--primary)" }} /> What is your current DSA experience?
            </h3>
            <p className="muted" style={{ fontSize: 12, margin: "0 0 24px 0" }}>
              We will adjust the initial roadmap difficulties to match your level.
            </p>

            <div style={{ display: "grid", gap: 12 }}>
              {[
                { id: "beginner", title: "Complete Beginner", desc: "No prior experience with data structures, algorithms, or space-time complexities." },
                { id: "intermediate", title: "Intermediate Solver", desc: "Familiar with arrays, trees, and maps. Comfortable solving easy problems." },
                { id: "advanced", title: "Advanced Competitor", desc: "Understand DP and Graphs. Focused on optimization and rating division scores." }
              ].map((item) => {
                const active = level === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLevel(item.id)}
                    className="card button ghost"
                    style={{
                      display: "block",
                      textAlign: "left",
                      padding: 16,
                      background: active ? "var(--muted-bg)" : "transparent",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      color: "var(--foreground)",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    <b style={{ fontSize: 13, display: "block" }}>{item.title}</b>
                    <span className="muted" style={{ fontSize: 11, marginTop: 4, display: "block", lineHeight: 1.4 }}>
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Programming Language */}
        {step === 2 && (
          <div>
            <h3 style={{ margin: "0 0 6px 0", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Code size={18} style={{ color: "var(--primary)" }} /> Choose your primary coding language
            </h3>
            <p className="muted" style={{ fontSize: 12, margin: "0 0 24px 0" }}>
              Code templates and compiler workspaces will defaults to this selection.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { id: "python", name: "Python 3" },
                { id: "cpp", name: "C++ (GCC)" },
                { id: "java", name: "Java (JDK)" },
                { id: "javascript", name: "JavaScript" }
              ].map((item) => {
                const active = language === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLanguage(item.id)}
                    className="button ghost"
                    style={{
                      justifyContent: "center",
                      padding: "16px",
                      background: active ? "var(--accent)" : "transparent",
                      color: active ? "var(--accent-foreground)" : "var(--foreground)",
                      borderColor: active ? "var(--primary)" : "var(--border)"
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Time Commitments */}
        {step === 3 && (
          <div>
            <h3 style={{ margin: "0 0 6px 0", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={18} style={{ color: "var(--primary)" }} /> Set your available daily study time
            </h3>
            <p className="muted" style={{ fontSize: 12, margin: "0 0 24px 0" }}>
              We will scale your daily mission lists and weekly goals to fit your schedule.
            </p>

            <div style={{ display: "grid", gap: 12 }}>
              {[
                { id: "30m", label: "30 Minutes / day", desc: "Steady practice. Recommended for academic consistency." },
                { id: "1h", label: "1 Hour / day", desc: "Focused track. Standard interview preparation pace." },
                { id: "2h+", label: "2+ Hours / day", desc: "Intense boot camp. Fast-track readiness inside 30 days." }
              ].map((item) => {
                const active = time === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTime(item.id)}
                    className="card button ghost"
                    style={{
                      display: "block",
                      textAlign: "left",
                      padding: 16,
                      background: active ? "var(--muted-bg)" : "transparent",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      color: "var(--foreground)",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    <b style={{ fontSize: 13, display: "block" }}>{item.label}</b>
                    <span className="muted" style={{ fontSize: 11, marginTop: 4, display: "block" }}>{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Target Companies */}
        {step === 4 && (
          <div>
            <h3 style={{ margin: "0 0 6px 0", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Building size={18} style={{ color: "var(--primary)" }} /> Select your target companies
            </h3>
            <p className="muted" style={{ fontSize: 12, margin: "0 0 24px 0" }}>
              Problems will highlight company tags corresponding to your target choices.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Unicorn Startups"].map((company) => {
                const active = companies.includes(company);
                return (
                  <button
                    key={company}
                    onClick={() => toggleCompany(company)}
                    className="button ghost"
                    style={{
                      justifyContent: "center",
                      padding: "12px",
                      background: active ? "var(--accent)" : "transparent",
                      color: active ? "var(--accent-foreground)" : "var(--foreground)",
                      borderColor: active ? "var(--primary)" : "var(--border)"
                    }}
                  >
                    {company}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="button ghost"
            style={{ opacity: step === 1 ? 0.4 : 1, padding: "8px 16px" }}
          >
            <ArrowLeft size={14} style={{ marginRight: 8 }} /> Back
          </button>

          <button
            onClick={handleNext}
            className="button"
            style={{ padding: "8px 20px" }}
          >
            {step === 4 ? "Complete Setup" : "Continue"}
            <ArrowRight size={14} style={{ marginLeft: 8 }} />
          </button>
        </div>

      </div>
    </div>
  );
}
