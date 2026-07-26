'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Shield, 
  Compass, 
  Layers, 
  Flame, 
  Zap, 
  GitBranch, 
  Database, 
  Sparkles, 
  Cpu, 
  Network, 
  Target, 
  BookOpen, 
  Star, 
  Activity,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { CategoryModel } from '@/src/curriculum/types';
import { CurriculumRepository } from '@/src/curriculum/repository';

interface KingdomCardProps {
  category: CategoryModel;
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: () => void;
}

// Icon Map for 25 Kingdoms
const KINGDOM_ICONS = [
  Crown, Shield, Compass, Layers, Flame, Zap, GitBranch, Database, 
  Sparkles, Cpu, Network, Target, BookOpen, Star, Activity, 
  Crown, Shield, Compass, Layers, Flame, Zap, GitBranch, Database, Sparkles, Cpu
];

// Lore descriptions for 25 Kingdoms
const KINGDOM_LORE: Record<string, string> = {
  'basic-arrays': 'The birthplace of arrays, memory manipulation, and index operations.',
  'sliding-window': 'The moving realm of dynamic windows and subarray optimizations.',
  'two-pointers': 'The convergence of opposing pointers traversing memory bounds.',
  'prefix-sum': 'The ancient sanctuary of range queries and running cumulative sums.',
  'fast-slow-pointers': 'The cyclic realm of tortoise and hare pointer traversals.',
  'linked-list': 'The node matrix of sequential pointers and memory linkages.',
  'stack-queue': 'The LIFO/FIFO citadel of monotonic bounds and call stacks.',
  'hashing-hash-table': 'The instant lookup sanctuary of keys, values, and collision maps.',
  'binary-search': 'The logarithmic split valley of sorted boundaries.',
  'trees-binary-trees': 'The hierarchical canopy of recursive branch traversals.',
  'binary-search-tree': 'The ordered balance trees of BST invariants.',
  'heaps-priority-queue': 'The priority peak of min/max binary heaps.',
  'graphs-bfs-dfs': 'The interconnected web of node vertices and edge traversals.',
  'shortest-path': 'The navigational domain of Dijkstra, BFS, and Bellman-Ford paths.',
  'disjoint-set-union': 'The connected components of disjoint set forests.',
  'minimum-spanning-tree': 'The optimal spanning network of Prim and Kruskal edges.',
  'topological-sort': 'The DAG dependency sequence of directed graph ordering.',
  'backtracking': 'The decision tree sanctuary of state space exploration and prunings.',
  'greedy-algorithms': 'The local optimum fortress of greedy choices.',
  '1d-dynamic-programming': 'The foundation of memoization and tabulating linear states.',
  '2d-dynamic-programming': 'The grid matrix of multi-dimensional state transitions.',
  'knapsack-dp': 'The weight and value optimization of subset DP choices.',
  'trie': 'The prefix tree of character dictionaries and autocomplete nodes.',
  'bit-manipulation': 'The low-level binary realm of bitwise shifts and bitmasks.',
  'math-geometry': 'The mathematical sanctuary of primes, GCD, and geometric algorithms.',
};

export function KingdomCard({ category, isSelected, isHighlighted, onSelect }: KingdomCardProps) {
  const IconComponent = KINGDOM_ICONS[(category.order - 1) % KINGDOM_ICONS.length] || Crown;
  const loreText = KINGDOM_LORE[category.slug] || `${category.description || 'Explore codex documentation, algorithms, and patterns.'}`;

  // Calculate live Kingdom stats from CurriculumRepository
  const kingdomPatterns = CurriculumRepository.getPatternsByCategory(category.slug);
  const kingdomProblems = CurriculumRepository.getProblemsByCategory(category.slug);

  const totalPatterns = kingdomPatterns.length || category.patternIds.length || 4;
  const totalProblems = kingdomProblems.length || category.totalProblemCount || 16;

  // Determine difficulty range
  const hasEasy = kingdomProblems.some((p) => p.difficulty === 'Easy');
  const hasHard = kingdomProblems.some((p) => p.difficulty === 'Hard');
  const difficultyRange = hasEasy && hasHard ? 'Easy → Hard' : hasEasy ? 'Easy → Medium' : 'Medium → Hard';

  // Seed completion % (e.g. 60..95%)
  const completionPct = Math.min(100, Math.max(35, 60 + ((category.order * 7) % 38)));

  // Status badge
  const statusLabel = completionPct >= 90 ? 'Mastered' : completionPct >= 50 ? 'Available' : 'In Progress';
  const statusColor = completionPct >= 90 ? '#10B981' : completionPct >= 50 ? '#C084FC' : '#F59E0B';

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onSelect}
      style={{
        width: '100%',
        minHeight: '220px',
        borderRadius: '20px',
        background: '#11111A',
        backdropFilter: 'blur(16px)',
        border: isSelected
          ? '2px solid #C084FC'
          : isHighlighted
          ? '2px solid #F59E0B'
          : '1px solid rgba(168, 85, 247, 0.25)',
        boxShadow: isSelected
          ? '0 0 32px rgba(192, 132, 252, 0.6), inset 0 0 20px rgba(168, 85, 247, 0.2)'
          : isHighlighted
          ? '0 0 28px rgba(245, 158, 11, 0.5)'
          : '0 8px 24px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Background Shimmer Glow */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-40%',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: isSelected ? 'rgba(192, 132, 252, 0.25)' : 'rgba(168, 85, 247, 0.12)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* Top Header: Emblem Icon + Status + Progress Ring */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            padding: '10px',
            borderRadius: '14px',
            background: isSelected ? 'rgba(192, 132, 252, 0.3)' : 'rgba(168, 85, 247, 0.18)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)',
          }}>
            <IconComponent size={22} style={{ color: isSelected ? '#FFFFFF' : '#C084FC' }} />
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: statusColor, background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '6px', border: `1px solid ${statusColor}40` }}>
            {statusLabel}
          </span>
        </div>

        {/* Circular Progress Ring (Top Right) */}
        <div style={{ position: 'relative', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="42" height="42" viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" fill="none" />
            <circle
              cx="21"
              cy="21"
              r="16"
              stroke={isSelected ? '#C084FC' : '#A855F7'}
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset={100 - (100 * completionPct) / 100}
              strokeLinecap="round"
              transform="rotate(-90 21 21)"
            />
          </svg>
          <span style={{ position: 'absolute', fontSize: '10px', fontWeight: 900, color: '#FFFFFF' }}>
            {completionPct}%
          </span>
        </div>
      </div>

      {/* Middle Content: Title & Lore */}
      <div style={{ margin: '12px 0', zIndex: 2 }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          {category.order}. {category.title}
        </h3>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#C084FC', display: 'block', marginBottom: '6px' }}>
          {category.kingdomTitle}
        </span>
        <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8', lineHeight: 1.4, height: '32px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {loreText}
        </p>
      </div>

      {/* Bottom Bar Statistics */}
      <div style={{
        paddingTop: '10px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: '#CBD5E1',
        fontWeight: 700,
        zIndex: 2,
      }}>
        <span>{totalPatterns} Patterns</span>
        <span>•</span>
        <span>{totalProblems} Problems</span>
        <span>•</span>
        <span style={{ color: '#C084FC' }}>{difficultyRange}</span>
      </div>

    </motion.div>
  );
}
