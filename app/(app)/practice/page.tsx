'use client';

import React, { useState } from 'react';
import { curriculumEngine } from '@/src/engines/curriculum';
import { Activity, Play, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSettings } from '@/src/context/SettingsContext';

export default function PracticeArena() {
  const { settings } = useSettings();
  const { preferredDifficulty, preferredPlatform, skipSolved } = settings.practice;

  const allProblems = curriculumEngine.getAllProblems();
  const [selectedTopic, setSelectedTopic] = useState("All");
  
  // Default difficulty from settings context if preferred, otherwise "All"
  const defaultDiffMap: Record<string, string> = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    all: "All",
  };
  const [difficulty, setDifficulty] = useState<string>(defaultDiffMap[preferredDifficulty] || "All");

  const topics = Array.from(new Set(allProblems.flatMap(p => p.topics)));

  const pool = allProblems.filter(p => {
    const topicMatch = selectedTopic === "All" || p.topics.includes(selectedTopic);
    const diffMatch = difficulty === "All" || p.difficulty === difficulty;
    // Skip solved check if skipSolved is enabled
    const solvedMatch = !skipSolved; 
    return topicMatch && diffMatch && solvedMatch;
  });

  return (
    <div className="layout-stack" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div className="layout-stack-sm" style={{ marginBottom: '24px' }}>
        <h1 className="title" style={{ fontSize: '36px', display: 'flex', alignItems: 'center', gap: '12px', color: "var(--text-primary)" }}>
          <Activity style={{ color: 'var(--primary)' }} size={32} />
          Problem Arena
        </h1>
        <p className="muted" style={{ fontSize: '16px', color: "var(--text-secondary)" }}>
          Execute. Compile. Master. Test your skills against the engine on <strong style={{ color: "var(--primary)", textTransform: "capitalize" }}>{preferredPlatform}</strong>.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="layout-stack">
          {/* Filters */}
          <div className="card" style={{ marginBottom: '24px', background: "var(--card)", border: "1px solid var(--border)" }}>
             <h3 className="title" style={{ fontSize: '18px', marginBottom: '16px', color: "var(--text-primary)" }}>Filters</h3>
             <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
               <div>
                  <label className="muted" style={{ fontSize: '12px', display: 'block', marginBottom: '8px', color: "var(--text-secondary)" }}>Topic</label>
                  <select 
                    className="select" 
                    value={selectedTopic} 
                    onChange={e => setSelectedTopic(e.target.value)}
                    style={{ width: '100%', background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  >
                    <option value="All">All Topics</option>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
               </div>
               <div>
                  <label className="muted" style={{ fontSize: '12px', display: 'block', marginBottom: '8px', color: "var(--text-secondary)" }}>Difficulty</label>
                  <select 
                    className="select" 
                    value={difficulty} 
                    onChange={e => setDifficulty(e.target.value)}
                    style={{ width: '100%', background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  >
                    <option value="All">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
               </div>
             </div>
          </div>

          {/* Problem List */}
          <div className="layout-stack-sm">
            {pool.map(prob => (
              <Link 
                key={prob.id} 
                href={`/practice/${prob.slug}`}
                className="card"
                style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: "var(--card)", border: '1px solid var(--border)' }}
              >
                <div>
                  <div className="layout-row" style={{ gap: '12px', marginBottom: '4px' }}>
                     <h4 style={{ margin: 0, fontSize: '16px', color: "var(--text-primary)" }}>{prob.title}</h4>
                     <span className={`pill ${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                     <span>{prob.companies.join(', ')}</span>
                  </div>
                </div>
                <div className="layout-row" style={{ gap: '16px' }}>
                  <div style={{ padding: '8px', background: 'var(--primary-soft)', borderRadius: '8px', color: 'var(--primary)' }}>
                    <Play size={20} />
                  </div>
                </div>
              </Link>
            ))}
            {pool.length === 0 && (
              <div className="card" style={{ padding: '48px', textAlign: 'center', background: "var(--card)", border: "1px solid var(--border)" }}>
                <AlertCircle size={32} style={{ color: 'var(--text-secondary)', margin: '0 auto 16px' }} />
                <h3 className="title" style={{ color: "var(--text-primary)" }}>No problems found</h3>
                <p className="muted" style={{ color: "var(--text-secondary)" }}>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="layout-stack">
           <div className="card" style={{ background: 'var(--card)', border: '1px solid var(--primary-soft)' }}>
              <div className="layout-row" style={{ marginBottom: '16px' }}>
                 <div style={{ padding: '10px', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: '12px' }}>
                   <Activity size={20} />
                 </div>
                 <h3 className="title" style={{ fontSize: '18px', margin: 0, color: "var(--text-primary)" }}>Daily Challenge</h3>
              </div>
              <p className="muted" style={{ fontSize: '14px', marginBottom: '16px', color: "var(--text-secondary)" }}>
                 Your recommended challenge for today ({settings.practice.dailyGoal} total goal) is ready.
              </p>
              <Link href={`/practice/two-sum`} className="button" style={{ width: '100%', justifyContent: 'center', background: "var(--primary)", color: "#FFF" }}>
                 Start Challenge <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
