'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight,
  Shield,
  Swords,
  Scroll,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Crown,
  Zap,
  Grid
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function Serpentine5x5CampaignView({ onSwitchLayout }: { onSwitchLayout?: () => void }) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [zoomingPortal, setZoomingPortal] = useState<string | null>(null);

  const kingdoms = [
    // ROW 1: K1 -> K2 -> K3 -> K4 -> K5
    {
      id: 1,
      slug: 'beginnings',
      name: 'Kingdom of Beginnings',
      subtitle: 'The Birthplace of Arrays',
      topic: 'Arrays & Memory',
      difficulty: 'Novice',
      status: 'completed',
      progress: 100,
      xpReward: 500,
      problemsCount: 12,
      npcGuide: 'Elder Oros',
      bossName: 'The Array Titan',
      bgImage: '/assets/journey/kingdoms/kingdom-01.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(34, 197, 94, 0.5) 0%, rgba(8, 22, 10, 0.98) 100%)',
      accentColor: '#10B981',
      stoneBorder: '3px solid #10B981',
      glowBox: '0 0 28px rgba(16, 185, 129, 0.4)',
      environmentArt: 'Sandstone Castle Spire, Knight Academy, Sunlit Fields',
      connectionLabel: 'Stone Road',
    },
    {
      id: 2,
      slug: 'accumulation',
      name: 'Kingdom of Accumulation',
      subtitle: 'The Sacred Water Basins',
      topic: 'Prefix Sum & Subarrays',
      difficulty: 'Novice',
      status: 'completed',
      progress: 100,
      xpReward: 750,
      problemsCount: 10,
      npcGuide: 'High Sage Lyra',
      bossName: 'The Accumulator Serpent',
      bgImage: '/assets/journey/kingdoms/kingdom-02.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(16, 185, 129, 0.5) 0%, rgba(6, 20, 24, 0.98) 100%)',
      accentColor: '#10B981',
      stoneBorder: '3px solid #10B981',
      glowBox: '0 0 28px rgba(16, 185, 129, 0.4)',
      environmentArt: 'Mayan Step-Pyramids, Emerald Waterfalls, Golden Shrines',
      connectionLabel: 'Crystal Bridge',
    },
    {
      id: 3,
      slug: 'twin-rivers',
      name: 'Twin Rivers Kingdom',
      subtitle: 'The Confluence of Two Winches',
      topic: 'Two Pointers & Convergence',
      difficulty: 'Apprentice',
      status: 'active',
      progress: 45,
      xpReward: 1000,
      problemsCount: 14,
      npcGuide: 'Winch Master Torin',
      bossName: 'The Dual Water Hydra',
      bgImage: '/assets/journey/kingdoms/kingdom-03.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(56, 189, 248, 0.5) 0%, rgba(8, 16, 38, 0.98) 100%)',
      accentColor: '#38BDF8',
      stoneBorder: '3px solid #38BDF8',
      glowBox: '0 0 40px rgba(56, 189, 248, 0.6)',
      environmentArt: 'Twin River Canyons, Granite Winch Bridges, River Fog',
      connectionLabel: 'Royal Highway',
    },
    {
      id: 4,
      slug: 'moving-horizon',
      name: 'The Moving Horizon',
      subtitle: 'The Sliding Lens of Dunes',
      topic: 'Sliding Window Techniques',
      difficulty: 'Apprentice',
      status: 'locked',
      progress: 0,
      xpReward: 1250,
      problemsCount: 12,
      npcGuide: 'Desert Scout Kael',
      bossName: 'The Windmill Leviathan',
      bgImage: '/assets/journey/kingdoms/kingdom-04.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(168, 85, 247, 0.5) 0%, rgba(18, 6, 30, 0.98) 100%)',
      accentColor: '#A855F7',
      stoneBorder: '2px solid rgba(168, 85, 247, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Huge Grasslands, Windmills, Storm Clouds',
      connectionLabel: 'Forest Trail',
    },
    {
      id: 5,
      slug: 'cipher-vaults',
      name: 'The Cipher Vaults',
      subtitle: 'The O(1) Key Library',
      topic: 'Hashing & Hash Tables',
      difficulty: 'Adept',
      status: 'locked',
      progress: 0,
      xpReward: 1500,
      problemsCount: 15,
      npcGuide: 'Grand Archivist Vane',
      bossName: 'The Cipher Golem',
      bgImage: '/assets/journey/kingdoms/kingdom-05.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(236, 72, 153, 0.5) 0%, rgba(24, 4, 18, 0.98) 100%)',
      accentColor: '#EC4899',
      stoneBorder: '2px solid rgba(236, 72, 153, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Magical Library, Floating Books, Purple Crystals',
      connectionLabel: 'Mountain Pass',
    },

    // ROW 2: K10 <- K9 <- K8 <- K7 <- K6 (SNAKE REVERSE)
    {
      id: 6,
      slug: 'hidden-truth',
      name: 'The Hidden Truth',
      subtitle: 'The Logarithmic Snow Peak',
      topic: 'Binary Search & Monotonic',
      difficulty: 'Adept',
      status: 'locked',
      progress: 0,
      xpReward: 1750,
      problemsCount: 16,
      npcGuide: 'Astronomer Celestia',
      bossName: 'The Frost Behemoth',
      bgImage: '/assets/journey/kingdoms/kingdom-06.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(6, 182, 212, 0.5) 0%, rgba(4, 16, 30, 0.98) 100%)',
      accentColor: '#06B6D4',
      stoneBorder: '2px solid rgba(6, 182, 212, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Snow Mountains, Observatory, Frozen Bridges',
      connectionLabel: 'Sky Bridge',
    },
    {
      id: 7,
      slug: 'ordered-realms',
      name: 'The Ordered Realms',
      subtitle: 'The Clockwork Capital',
      topic: 'Sorting & O(N log N)',
      difficulty: 'Adept',
      status: 'locked',
      progress: 0,
      xpReward: 2000,
      problemsCount: 15,
      npcGuide: 'Royal Captain Vael',
      bossName: 'The Clockwork Sentinel',
      bgImage: '/assets/journey/kingdoms/kingdom-07.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(245, 158, 11, 0.5) 0%, rgba(24, 14, 2, 0.98) 100%)',
      accentColor: '#F59E0B',
      stoneBorder: '2px solid rgba(245, 158, 11, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Royal Capital, Golden Palace, Symmetrical Gardens',
      connectionLabel: 'Magic Portal',
    },
    {
      id: 8,
      slug: 'tower-of-stacks',
      name: 'The Tower of Stacks',
      subtitle: 'The LIFO Magma Spire',
      topic: 'Stack & Monotonic Stack',
      difficulty: 'Master',
      status: 'locked',
      progress: 0,
      xpReward: 2250,
      problemsCount: 18,
      npcGuide: 'Magma Smith Torvald',
      bossName: 'The Volcanic Stack Dragon',
      bgImage: '/assets/journey/kingdoms/kingdom-08.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(239, 68, 68, 0.5) 0%, rgba(28, 4, 4, 0.98) 100%)',
      accentColor: '#EF4444',
      stoneBorder: '2px solid rgba(239, 68, 68, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Vertical Obsidian Fortress, Floating Platforms',
      connectionLabel: 'Ancient Staircase',
    },
    {
      id: 9,
      slug: 'corridor-of-queues',
      name: 'Corridor of Queues',
      subtitle: 'The FIFO Procession Gates',
      topic: 'Queue & Monotonic Deque',
      difficulty: 'Master',
      status: 'locked',
      progress: 0,
      xpReward: 2500,
      problemsCount: 14,
      npcGuide: 'Gatekeeper Herman',
      bossName: 'The Queue Colossus',
      bgImage: '/assets/journey/kingdoms/kingdom-09.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(139, 92, 246, 0.5) 0%, rgba(14, 6, 26, 0.98) 100%)',
      accentColor: '#8B5CF6',
      stoneBorder: '2px solid rgba(139, 92, 246, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Ceremonial Corridor, Royal Guards, Huge Gates',
      connectionLabel: 'Lava Crossing',
    },
    {
      id: 10,
      slug: 'timeline-kingdom',
      name: 'Timeline Kingdom',
      subtitle: 'The Hourglass Interval Citadel',
      topic: 'Intervals & Scheduling',
      difficulty: 'Master',
      status: 'locked',
      progress: 0,
      xpReward: 2750,
      problemsCount: 14,
      npcGuide: 'Chronomancer Malakor',
      bossName: 'The Chrono Warden',
      bgImage: '/assets/journey/kingdoms/kingdom-10.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(192, 132, 252, 0.5) 0%, rgba(16, 8, 30, 0.98) 100%)',
      accentColor: '#C084FC',
      stoneBorder: '2px solid rgba(192, 132, 252, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Clock Towers, Floating Clocks, Broken Timelines',
      connectionLabel: 'Frozen Path',
    },

    // ROW 3: K11 -> K12 -> K13 -> K14 -> K15
    {
      id: 11,
      slug: 'chain-islands',
      name: 'Chain Islands',
      subtitle: 'The Linked Node Archipelago',
      topic: 'Linked List Traversal',
      difficulty: 'Master',
      status: 'locked',
      progress: 0,
      xpReward: 3000,
      problemsCount: 16,
      npcGuide: 'Navigator Drake',
      bossName: 'The Leviathan Serpent',
      bgImage: '/assets/journey/kingdoms/kingdom-11.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(14, 165, 233, 0.5) 0%, rgba(5, 18, 30, 0.98) 100%)',
      accentColor: '#0EA5E9',
      stoneBorder: '2px solid rgba(14, 165, 233, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Floating Islands, Wooden Bridges, Sea Ships',
      connectionLabel: 'Runic Corridor',
    },
    {
      id: 12,
      slug: 'branching-woods',
      name: 'Branching Woods',
      subtitle: 'The World Tree Canopy',
      topic: 'Binary Trees & Recursion',
      difficulty: 'Master',
      status: 'locked',
      progress: 0,
      xpReward: 3250,
      problemsCount: 18,
      npcGuide: 'Druid Sylvanus',
      bossName: 'The World Tree Treant',
      bgImage: '/assets/journey/kingdoms/kingdom-12.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(34, 197, 94, 0.5) 0%, rgba(8, 28, 12, 0.98) 100%)',
      accentColor: '#22C55E',
      stoneBorder: '2px solid rgba(34, 197, 94, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Gigantic World Tree, Tree Houses, Ancient Roots',
      connectionLabel: 'Path of Branches',
    },
    {
      id: 13,
      slug: 'ordered-grove',
      name: 'Ordered Grove',
      subtitle: 'The BST Sacred Shrine',
      topic: 'Binary Search Trees',
      difficulty: 'Master',
      status: 'locked',
      progress: 0,
      xpReward: 3500,
      problemsCount: 16,
      npcGuide: 'Grove Guardian Elora',
      bossName: 'The Sacred Deer Spirit',
      bgImage: '/assets/journey/kingdoms/kingdom-13.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(16, 185, 129, 0.5) 0%, rgba(6, 25, 16, 0.98) 100%)',
      accentColor: '#10B981',
      stoneBorder: '2px solid rgba(16, 185, 129, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Sacred Forest, Perfectly Arranged Trees, Shrines',
      connectionLabel: 'Balanced Trail',
    },
    {
      id: 14,
      slug: 'shadow-forest',
      name: 'Shadow Forest',
      subtitle: 'The Labyrinthine Network',
      topic: 'Graphs & BFS/DFS',
      difficulty: 'Master',
      status: 'locked',
      progress: 0,
      xpReward: 4000,
      problemsCount: 24,
      npcGuide: 'Shadow Warden Kael',
      bossName: 'The 100-Node Graph Spider',
      bgImage: '/assets/journey/kingdoms/kingdom-14.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(99, 102, 241, 0.6) 0%, rgba(10, 12, 35, 0.98) 100%)',
      accentColor: '#6366F1',
      stoneBorder: '3px solid #6366F1',
      glowBox: '0 0 44px rgba(99, 102, 241, 0.6)',
      environmentArt: 'Dark Enchanted Forest, Indigo Fog, Blue Spirits',
      connectionLabel: 'Through Enchanted Woods',
    },
    {
      id: 15,
      slug: 'swift-roads',
      name: 'Swift Roads',
      subtitle: 'The Imperial Highway Network',
      topic: 'Shortest Path Algorithms',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 4500,
      problemsCount: 20,
      npcGuide: 'Imperial Courier Vane',
      bossName: 'The Highway Sentinel',
      bgImage: '/assets/journey/kingdoms/kingdom-15.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(245, 158, 11, 0.5) 0%, rgba(26, 16, 4, 0.98) 100%)',
      accentColor: '#F59E0B',
      stoneBorder: '2px solid rgba(245, 158, 11, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Imperial Highways, Road Network, Travel Stations',
      connectionLabel: 'Crystal Connection',
    },

    // ROW 4: K20 <- K19 <- K18 <- K17 <- K16 (SNAKE REVERSE)
    {
      id: 16,
      slug: 'web-of-kingdoms',
      name: 'Web of Kingdoms',
      subtitle: 'The Minimum Spanning Bridge',
      topic: 'MST & Disjoint Sets',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 5000,
      problemsCount: 18,
      npcGuide: 'Architect Mason',
      bossName: 'The Spanning Golem',
      bgImage: '/assets/journey/kingdoms/kingdom-16.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(56, 189, 248, 0.5) 0%, rgba(6, 18, 32, 0.98) 100%)',
      accentColor: '#38BDF8',
      stoneBorder: '2px solid rgba(56, 189, 248, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Crystal Bridges, Floating Islands, Energy Connections',
      connectionLabel: 'Maze of Trials',
    },
    {
      id: 17,
      slug: 'maze-of-choices',
      name: 'Maze of Choices',
      subtitle: 'The Backtracking Labyrinth',
      topic: 'Backtracking & Pruning',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 5250,
      problemsCount: 20,
      npcGuide: 'Labyrinth Scholar',
      bossName: 'The Minotaur Sentinel',
      bgImage: '/assets/journey/kingdoms/kingdom-17.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(34, 197, 94, 0.5) 0%, rgba(8, 24, 12, 0.98) 100%)',
      accentColor: '#22C55E',
      stoneBorder: '2px solid rgba(34, 197, 94, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Massive Hedge Maze, Ancient Puzzles, Stone Statues',
      connectionLabel: 'Path of Opportunities',
    },
    {
      id: 18,
      slug: 'merchants-gambit',
      name: 'Merchant\'s Gambit',
      subtitle: 'The Optimal Choice Bazaar',
      topic: 'Greedy Algorithms',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 5500,
      problemsCount: 18,
      npcGuide: 'Merchant King Midas',
      bossName: 'The Golden Sphinx',
      bgImage: '/assets/journey/kingdoms/kingdom-18.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(234, 179, 8, 0.5) 0%, rgba(28, 20, 4, 0.98) 100%)',
      accentColor: '#EAB308',
      stoneBorder: '2px solid rgba(234, 179, 8, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Trading Empire, Golden Markets, Merchant Guild',
      connectionLabel: 'The Temporal Bridge',
    },
    {
      id: 19,
      slug: 'summit-fortress',
      name: 'Summit Fortress',
      subtitle: 'The Priority Heap Colosseum',
      topic: 'Heaps & Priority Queues',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 5750,
      problemsCount: 20,
      npcGuide: 'Highland Commander',
      bossName: 'The Mountain Heap Behemoth',
      bgImage: '/assets/journey/kingdoms/kingdom-19.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(239, 68, 68, 0.5) 0%, rgba(30, 6, 6, 0.98) 100%)',
      accentColor: '#EF4444',
      stoneBorder: '2px solid rgba(239, 68, 68, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Mountain Kingdom, Huge Fortress, Mining Village',
      connectionLabel: 'The Binary Gate',
    },
    {
      id: 20,
      slug: 'time-citadel',
      name: 'Time Citadel',
      subtitle: 'The Infinite Memory of Subproblems',
      topic: 'Dynamic Programming & Memoization',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 6000,
      problemsCount: 30,
      npcGuide: 'Arch-Chronomancer Malakor',
      bossName: 'The Chronos Titan',
      bgImage: '/assets/journey/kingdoms/kingdom-20.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(168, 85, 247, 0.65) 0%, rgba(20, 8, 40, 0.98) 100%)',
      accentColor: '#C084FC',
      stoneBorder: '3px solid #C084FC',
      glowBox: '0 0 50px rgba(168, 85, 247, 0.65)',
      environmentArt: 'Floating Crystal City, Clock Towers, Time Portals',
      connectionLabel: 'Sequence Road',
    },

    // ROW 5: K21 -> K22 -> K23 -> K24 -> K25
    {
      id: 21,
      slug: 'binary-caverns',
      name: 'Binary Caverns',
      subtitle: 'The Bitwise Rune Grotto',
      topic: 'Bit Manipulation & Bitmasks',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 6500,
      problemsCount: 18,
      npcGuide: 'Subterranean Sage',
      bossName: 'The Bitwise Elemental',
      bgImage: '/assets/journey/kingdoms/kingdom-21.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(20, 184, 166, 0.5) 0%, rgba(4, 24, 22, 0.98) 100%)',
      accentColor: '#14B8A6',
      stoneBorder: '2px solid rgba(20, 184, 166, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Crystal Caves, Blue Glowing Crystals, Energy Beams',
      connectionLabel: 'Grid Pathway',
    },
    {
      id: 22,
      slug: 'scriptorium',
      name: 'The Scriptorium',
      subtitle: 'The String Matching Vaults',
      topic: 'Strings, Tries & Pattern Matching',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 7000,
      problemsCount: 22,
      npcGuide: 'Grand Scribe Hermeas',
      bossName: 'The Scroll Leviathan',
      bgImage: '/assets/journey/kingdoms/kingdom-22.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(168, 85, 247, 0.5) 0%, rgba(22, 6, 30, 0.98) 100%)',
      accentColor: '#A855F7',
      stoneBorder: '2px solid rgba(168, 85, 247, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Magical Academy, Huge Library, Floating Scrolls',
      connectionLabel: 'The Final Ascent',
    },
    {
      id: 23,
      slug: 'grid-kingdom',
      name: 'Grid Kingdom',
      subtitle: 'The 2D Matrix Plaza',
      topic: 'Matrix Traversal & Transformations',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 7500,
      problemsCount: 20,
      npcGuide: 'Geometric Master',
      bossName: 'The Matrix Sentinel',
      bgImage: '/assets/journey/kingdoms/kingdom-23.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(99, 102, 241, 0.5) 0%, rgba(10, 12, 32, 0.98) 100%)',
      accentColor: '#6366F1',
      stoneBorder: '2px solid rgba(99, 102, 241, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Geometric City, Symmetrical Roads, Crystal Plaza',
      connectionLabel: 'The Final Ascent',
    },
    {
      id: 24,
      slug: 'numeric-sanctum',
      name: 'Numeric Sanctum',
      subtitle: 'The Prime Observatory',
      topic: 'Math, Primes & Number Theory',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 8000,
      problemsCount: 22,
      npcGuide: 'High Astronomer',
      bossName: 'The Constellation Dragon',
      bgImage: '/assets/journey/kingdoms/kingdom-24.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(236, 72, 153, 0.5) 0%, rgba(26, 4, 18, 0.98) 100%)',
      accentColor: '#EC4899',
      stoneBorder: '2px solid rgba(236, 72, 153, 0.4)',
      glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
      environmentArt: 'Astronomical Observatory, Sacred Temple, Golden Dome',
      connectionLabel: 'The Final Ascent',
    },
    {
      id: 25,
      slug: 'citadel-of-masters',
      name: 'Citadel of Masters',
      subtitle: 'The Supreme Pinnacle of Advanced Algorithms',
      topic: 'Advanced Synthesis & System Design',
      difficulty: 'Grandmaster',
      status: 'locked',
      progress: 0,
      xpReward: 10000,
      problemsCount: 50,
      npcGuide: 'The Algorithm Emperor',
      bossName: 'The Supreme Celestial Dragon',
      bgImage: '/assets/journey/kingdoms/kingdom-25.webp',
      fallbackGrad: 'linear-gradient(180deg, rgba(234, 179, 8, 0.75) 0%, rgba(35, 22, 4, 0.99) 100%)',
      accentColor: '#EAB308',
      stoneBorder: '4px solid #EAB308',
      glowBox: '0 0 70px rgba(234, 179, 8, 0.8)',
      environmentArt: 'Soaring Golden Sky Continent, Celestial Dragon Palace, Throne of Algorithmic Mastery',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        overflowY: 'auto',
        paddingBottom: '100px',
        position: 'relative',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* MAGICAL PORTAL ENTERING OVERLAY */}
      <AnimatePresence>
        {zoomingPortal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: isLight
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.95) 0%, rgba(245, 247, 251, 0.99) 70%)'
                : 'radial-gradient(circle, rgba(56, 189, 248, 0.95) 0%, rgba(7, 5, 18, 0.99) 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Sparkles size={80} style={{ color: '#FDE047', filter: 'drop-shadow(0 0 30px #FDE047)' }} />
            <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              ENTERING REALM GATE...
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ARENA HEADER BAR WITH LAYOUT SWITCHER */}
      <div
        style={{
          padding: '24px 40px',
          background: isLight
            ? 'rgba(255, 255, 255, 0.95)'
            : 'linear-gradient(180deg, rgba(20, 16, 38, 0.98) 0%, rgba(10, 8, 22, 0.95) 100%)',
          borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(168, 85, 247, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
            THE ALGORITHMIC JOURNEY (5 × 5 SERPENTINE CAMPAIGN MAP)
          </h1>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>
            ALL 25 KINGDOMS VISIBLE AT A GLANCE • DYNAMIC IMAGE LOAD FROM /assets/journey/kingdoms/
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {onSwitchLayout && (
            <button
              onClick={onSwitchLayout}
              type="button"
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                background: 'rgba(168, 85, 247, 0.2)',
                border: '1px solid #C084FC',
                color: '#C084FC',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Grid size={14} /> Switch to World Map
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#CBD5E1', fontWeight: 800 }}>
            <span>Progress: <strong style={{ color: '#10B981' }}>37%</strong></span>
            <span>Conquered: <strong style={{ color: '#38BDF8' }}>9 / 25</strong></span>
            <span>Total XP: <strong style={{ color: '#FDE047' }}>12,450 XP</strong></span>
          </div>
        </div>
      </div>

      {/* 5 × 5 SERPENTINE CAMPAIGN GRID CONTAINER */}
      <div style={{ maxWidth: '1680px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* ROW 1: K1 -> K2 -> K3 -> K4 -> K5 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr', alignItems: 'center', gap: '6px' }}>
          <SerpentineCard card={kingdoms[0]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[0].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[1]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[1].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[2]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[2].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[3]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[3].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[4]} onPortal={(name) => setZoomingPortal(name)} />
        </div>

        {/* SNAKE DOWNWARD CONNECTOR RIGHT (K5 -> K6) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '80px' }}>
          <ConnectorVertical label="Mountain Pass Downward" />
        </div>

        {/* ROW 2: K10 <- K9 <- K8 <- K7 <- K6 (SNAKE REVERSE) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr', alignItems: 'center', gap: '6px' }}>
          <SerpentineCard card={kingdoms[9]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[8].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[8]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[7].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[7]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[6].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[6]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[5].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[5]} onPortal={(name) => setZoomingPortal(name)} />
        </div>

        {/* SNAKE DOWNWARD CONNECTOR LEFT (K10 -> K11) */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '80px' }}>
          <ConnectorVertical label="Runic Corridor Downward" />
        </div>

        {/* ROW 3: K11 -> K12 -> K13 -> K14 -> K15 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr', alignItems: 'center', gap: '6px' }}>
          <SerpentineCard card={kingdoms[10]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[10].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[11]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[11].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[12]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[12].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[13]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[13].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[14]} onPortal={(name) => setZoomingPortal(name)} />
        </div>

        {/* SNAKE DOWNWARD CONNECTOR RIGHT (K15 -> K16) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '80px' }}>
          <ConnectorVertical label="Crystal Connection Downward" />
        </div>

        {/* ROW 4: K20 <- K19 <- K18 <- K17 <- K16 (SNAKE REVERSE) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr', alignItems: 'center', gap: '6px' }}>
          <SerpentineCard card={kingdoms[19]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[18].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[18]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[17].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[17]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[16].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[16]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[15].connectionLabel} direction="left" />
          <SerpentineCard card={kingdoms[15]} onPortal={(name) => setZoomingPortal(name)} />
        </div>

        {/* SNAKE DOWNWARD CONNECTOR LEFT (K20 -> K21) */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '80px' }}>
          <ConnectorVertical label="Binary Gate Downward" />
        </div>

        {/* ROW 5: K21 -> K22 -> K23 -> K24 -> K25 (GRAND ENDGAME) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr 0.6fr 1fr', alignItems: 'center', gap: '6px' }}>
          <SerpentineCard card={kingdoms[20]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[20].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[21]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[21].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[22]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[22].connectionLabel} direction="right" />
          <SerpentineCard card={kingdoms[23]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label="The Final Ascent" direction="right" />
          <SerpentineCard card={kingdoms[24]} isGrandEndgame onPortal={(name) => setZoomingPortal(name)} />
        </div>

      </div>
    </div>
  );
}

{/* REUSABLE 5x5 SERPENTINE COLLECTIBLE KINGDOM CARD (80% ART / 20% INFO) */}
function SerpentineCard({ card, isGrandEndgame, onPortal }: { card: any; isGrandEndgame?: boolean; onPortal: (name: string) => void }) {
  const isCompleted = card.status === 'completed';
  const isActive = card.status === 'active';
  const isLocked = card.status === 'locked';

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.05 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, rgba(20, 16, 38, 0.98) 0%, rgba(10, 8, 22, 1) 100%)',
        border: card.stoneBorder,
        boxShadow: card.glowBox,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 80% HEIGHT ARTWORK WITH DYNAMIC IMAGE LOADING */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          backgroundImage: card.bgImage ? `linear-gradient(180deg, rgba(5, 3, 12, 0.35) 0%, rgba(5, 3, 12, 0.85) 100%), url(${card.bgImage}), ${card.fallbackGrad}` : card.fallbackGrad,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <span style={{ fontSize: '8px', fontWeight: 900, padding: '2px 6px', borderRadius: '6px', background: 'rgba(0,0,0,0.7)', color: card.accentColor, border: `1px solid ${card.accentColor}` }}>
            REALM #{card.id}
          </span>
          {isActive && (
            <span style={{ fontSize: '8px', fontWeight: 900, padding: '2px 6px', borderRadius: '4px', background: 'rgba(245,158,11,0.3)', color: '#F59E0B', border: '1px solid #F59E0B', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Flame size={9} /> ACTIVE
            </span>
          )}
        </div>

        <div style={{ zIndex: 2 }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: isLocked ? '#94A3B8' : '#FFF', textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}>
            {card.name}
          </h3>
          <span style={{ fontSize: '9px', color: '#FDE047', fontWeight: 700 }}>
            {card.subtitle}
          </span>
        </div>
      </div>

      {/* 20% HEIGHT CARVED STONE INFO PANEL */}
      <div style={{ padding: '10px 12px', background: 'rgba(10, 8, 22, 0.96)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '8px', color: '#94A3B8', fontWeight: 800 }}>{card.topic}</span>
          <span style={{ fontSize: '10px', fontWeight: 900, color: isCompleted ? '#10B981' : isActive ? '#38BDF8' : '#64748B' }}>
            {card.progress}%
          </span>
        </div>

        {isLocked ? (
          <button disabled type="button" style={{ padding: '5px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B', fontSize: '9px', fontWeight: 900, cursor: 'not-allowed' }}>
            Locked
          </button>
        ) : (
          <Link href={`/learn/${card.slug}`} style={{ textDecoration: 'none' }}>
            <button
              type="button"
              onClick={() => {
                onPortal(card.name);
                setTimeout(() => onPortal(''), 1200);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: isActive ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #10B981, #059669)',
                border: 'none',
                color: '#000',
                fontSize: '9px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              {isActive ? 'Enter' : 'Restored'} <ChevronRight size={10} />
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

{/* REUSABLE HORIZONTAL REALMIC CONNECTOR COMPONENT */}
function ConnectorHorizontal({ label = 'Runic Road', direction }: { label?: string; direction: 'right' | 'left' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <div style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6), rgba(56, 189, 248, 0.6))' }} />
      <span style={{ fontSize: '7px', color: '#94A3B8', fontWeight: 800, whiteSpace: 'nowrap', padding: '1px 3px', borderRadius: '3px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {direction === 'right' ? <ArrowRight size={7} style={{ display: 'inline', marginRight: '2px' }} /> : <ArrowLeft size={7} style={{ display: 'inline', marginRight: '2px' }} />}
        {label}
      </span>
    </div>
  );
}

{/* REUSABLE VERTICAL SNAKE CONNECTOR COMPONENT */}
function ConnectorVertical({ label = 'Downward Path' }: { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <div style={{ width: '2px', height: '24px', background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.6), rgba(56, 189, 248, 0.6))' }} />
      <span style={{ fontSize: '7px', color: '#94A3B8', fontWeight: 800, padding: '1px 4px', borderRadius: '3px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <ArrowDown size={7} style={{ display: 'inline', marginRight: '2px' }} /> {label}
      </span>
      <div style={{ width: '2px', height: '24px', background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.6), rgba(168, 85, 247, 0.6))' }} />
    </div>
  );
}
