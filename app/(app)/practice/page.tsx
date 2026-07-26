'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Activity, 
  Play, 
  Search, 
  Shuffle, 
  Flame, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight, 
  Bookmark, 
  Zap,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { CurriculumService } from '@/src/curriculum/services';
import { Difficulty, ProgressionLevel } from '@/src/curriculum/types';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';

export default function PracticeArena() {
  const { settings } = useSettings();
  const { toast } = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'order' | 'difficulty' | 'xp' | 'acceptance' | 'title'>('order');
  const [solvedIds, setSolvedIds] = useState<string[]>(['lc-1', 'lc-217', 'lc-1480']);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['lc-3']);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Master Data from CurriculumRepository (Single Source of Truth)
  const categories = useMemo(() => CurriculumRepository.getAllCategories(), []);
  const allProblems = useMemo(() => CurriculumRepository.getAllProblems(), []);
  const allPatterns = useMemo(() => CurriculumRepository.getAllPatterns(), []);

  // Filtered & Sorted Problem Dataset
  const filteredProblems = useMemo(() => {
    return CurriculumRepository.filterProblems(
      {
        categorySlug: selectedCategorySlug === 'all' ? undefined : selectedCategorySlug,
        difficulty: selectedDifficulty === 'all' ? undefined : (selectedDifficulty as Difficulty),
        level: selectedLevel === 'all' ? undefined : (selectedLevel as ProgressionLevel),
        company: selectedCompany === 'all' ? undefined : selectedCompany,
        searchQuery: searchQuery || undefined,
      },
      solvedIds
    ).sort((a, b) => {
      if (sortBy === 'difficulty') {
        const orderMap: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3 };
        return orderMap[a.difficulty] - orderMap[b.difficulty];
      }
      if (sortBy === 'xp') return b.xp - a.xp;
      if (sortBy === 'acceptance') return b.acceptanceRate - a.acceptanceRate;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return (a.order ?? 0) - (b.order ?? 0);
    });
  }, [selectedCategorySlug, selectedDifficulty, selectedLevel, selectedCompany, searchQuery, sortBy, solvedIds]);

  // Overall Statistics calculated directly from Curriculum Engine
  const stats = useMemo(() => CurriculumService.calculateProgress(solvedIds), [solvedIds]);

  // Companies dropdown options
  const allCompanies = useMemo(() => {
    const set = new Set<string>();
    allProblems.forEach((p) => p.companies.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [allProblems]);

  const toggleCategoryCollapse = (catSlug: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [catSlug]: !prev[catSlug] }));
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((b) => b !== id));
      toast('Removed from bookmarks', 'info');
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      toast('Added problem to bookmarks!', 'success');
    }
  };

  const toggleSolved = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (solvedIds.includes(id)) {
      setSolvedIds((prev) => prev.filter((s) => s !== id));
      toast('Marked problem as unsolved', 'warning');
    } else {
      setSolvedIds((prev) => [...prev, id]);
      toast('Problem completed! +XP Awarded!', 'success');
    }
  };

  const handleRandomPractice = (filterType: string) => {
    let pool = filteredProblems;
    if (filterType === 'easy') pool = allProblems.filter((p) => p.difficulty === 'Easy');
    if (filterType === 'medium') pool = allProblems.filter((p) => p.difficulty === 'Medium');
    if (filterType === 'hard') pool = allProblems.filter((p) => p.difficulty === 'Hard');
    if (filterType === 'learn') pool = allProblems.filter((p) => p.level === 'Learn');
    if (filterType === 'practice') pool = allProblems.filter((p) => p.level === 'Practice');
    if (filterType === 'master') pool = allProblems.filter((p) => p.level === 'Master');

    if (pool.length === 0) {
      toast('No problems matching random criteria!', 'warning');
      return;
    }

    const randomProb = pool[Math.floor(Math.random() * pool.length)];
    toast(`Selected random challenge: ${randomProb.title}!`, 'success');
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 24px 40px 24px' }}>
      
      {/* 1. AAA Top Hero Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "relative",
          borderRadius: "var(--radius, 20px)",
          overflow: "hidden",
          border: "1px solid var(--primary-soft)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
          background: "linear-gradient(135deg, rgba(10, 14, 26, 0.95) 0%, rgba(20, 15, 45, 0.9) 60%, rgba(124, 77, 255, 0.18) 100%)",
          padding: "24px 32px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "28px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", background: "var(--primary-soft)", padding: "2px 8px", borderRadius: "99px" }}>
                Official Curriculum Database
              </span>
              <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 700 }}>● 25 Kingdoms • 700+ Problems</span>
            </div>

            <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Practice Arena
            </h1>
            <p style={{ margin: "6px 0 16px 0", fontSize: "13px", color: "var(--text-secondary)" }}>
              Execute. Compile. Master. Solve curriculum challenges dynamically generated from the master database.
            </p>

            {/* Live Progress Stats Strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <Activity size={14} style={{ color: "var(--primary)" }} />
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>PROBLEMS:</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-primary)" }}>{stats.solvedCount} / {stats.totalProblems} ({stats.progressPercentage}%)</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <Zap size={14} style={{ color: "#F59E0B" }} />
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>XP EARNED:</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#F59E0B" }}>{stats.totalXp} XP</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <Flame size={14} style={{ color: "#EF4444" }} />
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>STREAK:</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#EF4444" }}>15 Days</span>
              </div>
            </div>
          </div>

          {/* Random Practice Actions Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              <Shuffle size={12} /> Quick Random Challenge
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              <button type="button" onClick={() => handleRandomPractice('easy')} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10B981", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Easy</button>
              <button type="button" onClick={() => handleRandomPractice('medium')} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#F59E0B", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Medium</button>
              <button type="button" onClick={() => handleRandomPractice('hard')} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#EF4444", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Hard</button>
              <button type="button" onClick={() => handleRandomPractice('any')} style={{ padding: "6px 14px", borderRadius: "8px", background: "var(--primary)", border: "none", color: "#FFF", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>🎲 Any</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Global Search & Filter Bar */}
      <div style={{ padding: "18px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
        
        {/* Search Input Bar */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={18} style={{ position: "absolute", left: "14px", color: "var(--primary)", pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Search 700+ problems by title, LeetCode #, company, topic, pattern, or kingdom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px 12px 42px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-primary)",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {/* Category Dropdown */}
          <div>
            <label style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>Kingdom / Category</label>
            <select
              value={selectedCategorySlug}
              onChange={(e) => setSelectedCategorySlug(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "12px" }}
            >
              <option value="all">All 25 Kingdoms</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.title} ({c.kingdomTitle})</option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <label style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "12px" }}
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Level Dropdown */}
          <div>
            <label style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>Progression Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "12px" }}
            >
              <option value="all">All Levels (Learn/Practice/Master)</option>
              <option value="Learn">Learn</option>
              <option value="Practice">Practice</option>
              <option value="Master">Master</option>
            </select>
          </div>

          {/* Company Dropdown */}
          <div>
            <label style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>Company Tag</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "12px" }}
            >
              <option value="all">All Companies</option>
              {allCompanies.map((comp) => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>Sort Order</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "12px" }}
            >
              <option value="order">Curriculum Order</option>
              <option value="difficulty">Difficulty</option>
              <option value="xp">XP Reward</option>
              <option value="acceptance">Acceptance %</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Category & Pattern Accordion View (Rendering ALL 25 Categories) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {categories.map((category) => {
          const isCollapsed = collapsedCategories[category.slug];
          const categoryProblems = filteredProblems.filter((p) => p.categorySlug === category.slug);

          if (selectedCategorySlug !== 'all' && selectedCategorySlug !== category.slug) {
            return null;
          }

          if (categoryProblems.length === 0 && (searchQuery || selectedDifficulty !== 'all' || selectedLevel !== 'all' || selectedCompany !== 'all')) {
            return null;
          }

          const catSolvedCount = categoryProblems.filter((p) => solvedIds.includes(p.id)).length;
          const catProgressPct = Math.round((catSolvedCount / (categoryProblems.length || 1)) * 100);

          return (
            <div
              key={category.id}
              style={{
                borderRadius: "var(--radius, 16px)",
                background: "var(--card)",
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              {/* Category Header Bar */}
              <div
                onClick={() => toggleCategoryCollapse(category.slug)}
                style={{
                  padding: "16px 20px",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  borderBottom: isCollapsed ? "none" : "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {isCollapsed ? <ChevronRight size={18} style={{ color: "var(--primary)" }} /> : <ChevronDown size={18} style={{ color: "var(--primary)" }} />}
                  <div>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "var(--text-primary)" }}>
                      {category.order}. {category.title} <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>({category.kingdomTitle})</span>
                    </h3>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{category.description}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--primary)" }}>
                      {catSolvedCount} / {categoryProblems.length} Solved ({catProgressPct}%)
                    </span>
                    <div style={{ width: "100px", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginTop: "4px" }}>
                      <div style={{ width: `${catProgressPct}%`, height: "100%", background: "var(--primary)", borderRadius: "2px" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Problems Table (Grouped by Patterns) */}
              {!isCollapsed && (
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {categoryProblems.length === 0 ? (
                    <div style={{ padding: "24px", textAlign: "center", color: "var(--text-secondary)", fontSize: "12px" }}>
                      No problems match the current filter criteria in this Kingdom.
                    </div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "10px" }}>
                            <th style={{ padding: "8px 12px", width: "40px" }}>Status</th>
                            <th style={{ padding: "8px 12px", width: "70px" }}>LC #</th>
                            <th style={{ padding: "8px 12px" }}>Problem Name</th>
                            <th style={{ padding: "8px 12px", width: "90px" }}>Difficulty</th>
                            <th style={{ padding: "8px 12px", width: "80px" }}>Level</th>
                            <th style={{ padding: "8px 12px", width: "80px" }}>Est Time</th>
                            <th style={{ padding: "8px 12px", width: "70px" }}>XP</th>
                            <th style={{ padding: "8px 12px", width: "90px" }}>Acceptance</th>
                            <th style={{ padding: "8px 12px" }}>Companies</th>
                            <th style={{ padding: "8px 12px", width: "80px", textAlign: "right" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryProblems.map((prob) => {
                            const isSolved = solvedIds.includes(prob.id);
                            const isBookmarked = bookmarkedIds.includes(prob.id);

                            return (
                              <tr
                                key={prob.id}
                                style={{
                                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                                  transition: "var(--transition-speed)",
                                }}
                                className="hover:bg-surface"
                              >
                                <td style={{ padding: "10px 12px" }}>
                                  <button
                                    type="button"
                                    onClick={(e) => toggleSolved(prob.id, e)}
                                    style={{ background: "transparent", border: "none", cursor: "pointer", color: isSolved ? "#10B981" : "var(--text-secondary)" }}
                                  >
                                    <CheckCircle2 size={16} fill={isSolved ? "currentColor" : "none"} />
                                  </button>
                                </td>
                                <td style={{ padding: "10px 12px", fontWeight: 700, color: "var(--text-secondary)" }}>
                                  #{prob.leetcodeNumber}
                                </td>
                                <td style={{ padding: "10px 12px" }}>
                                  <Link href={`/practice/${prob.slug}`} style={{ fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                                    {prob.title}
                                  </Link>
                                </td>
                                <td style={{ padding: "10px 12px" }}>
                                  <span style={{ fontSize: "10px", fontWeight: 700, color: prob.difficulty === 'Easy' ? '#10B981' : prob.difficulty === 'Medium' ? '#F59E0B' : '#EF4444', background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px" }}>
                                    {prob.difficulty}
                                  </span>
                                </td>
                                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{prob.level}</td>
                                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{prob.estimatedTimeMin}m</td>
                                <td style={{ padding: "10px 12px", fontWeight: 700, color: "var(--primary)" }}>+{prob.xp} XP</td>
                                <td style={{ padding: "10px 12px", color: "#10B981" }}>{prob.acceptanceRate}%</td>
                                <td style={{ padding: "10px 12px", color: "var(--text-secondary)", fontSize: "11px" }}>
                                  {prob.companies.slice(0, 3).join(', ')}
                                </td>
                                <td style={{ padding: "10px 12px", textAlign: "right" }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                                    <button
                                      type="button"
                                      onClick={(e) => toggleBookmark(prob.id, e)}
                                      style={{ background: "transparent", border: "none", cursor: "pointer", color: isBookmarked ? "var(--primary)" : "var(--text-secondary)" }}
                                    >
                                      <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
                                    </button>
                                    <Link
                                      href={`/practice/${prob.slug}`}
                                      style={{ padding: "4px 8px", borderRadius: "6px", background: "var(--primary-soft)", color: "var(--primary)", fontSize: "10px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "2px" }}
                                    >
                                      Solve <Play size={10} />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
