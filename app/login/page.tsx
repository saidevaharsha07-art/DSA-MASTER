"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, Shield, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sign in and redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="shell" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 24, background: "var(--background)" }}>
      <div className="card" style={{ maxWidth: 400, width: "100%", padding: "32px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Terminal size={12} /> Credentials Gateway
          </div>
          <h2 style={{ margin: 0, fontSize: 24 }}>Sign In</h2>
          <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>
            Enter your email to resume your learning track.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              required
              className="input"
              style={{ width: "100%" }}
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              required
              className="input"
              style={{ width: "100%" }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="button"
            style={{ width: "100%", marginTop: 8, justifyContent: "center" }}
          >
            {isLoading ? "Signing In..." : "Access Dashboard"}
            {!isLoading && <ArrowRight size={14} style={{ marginLeft: 8 }} />}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <span className="muted" style={{ fontSize: 12 }}>New candidate? </span>
          <Link href="/onboarding" style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>
            Create custom roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}
