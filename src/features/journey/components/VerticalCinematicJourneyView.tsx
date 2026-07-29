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
  Grid,
  MapPin,
  Trees,
  Mountain,
  Snowflake,
  Sun,
  Globe
} from 'lucide-react';

import { Serpentine5x5CampaignView } from './Serpentine5x5CampaignView';

export function VerticalCinematicJourneyView() {
  const [layoutMode, setLayoutMode] = useState<'continent' | '4col' | '5x5'>('continent');
  const [zoomingPortal, setZoomingPortal] = useState<string | null>(null);

  if (layoutMode === '5x5') {
    return <Serpentine5x5CampaignView onSwitchLayout={() => setLayoutMode('continent')} />;
  }

  if (layoutMode === '4col') {
    return <Grid4ColCampaignView onSwitchLayout={(mode) => setLayoutMode(mode)} />;
  }

  const continentRegions = [
    {
      id: 'region-1',
      name: 'REGION I: THE SOUTHERN SUNLIT MEADOWS',
      description: 'The peaceful starting lands of contiguous memory, sandstone castles, knight academies, and emerald river basins.',
      color: '#10B981',
      roadConnector: '🌾 Paved Cobblestone Road through Sunlit Wheatfields',
      kingdoms: [
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
          fallbackGrad: 'linear-gradient(135deg, rgba(34, 197, 94, 0.6) 0%, rgba(8, 22, 10, 0.98) 100%)',
          accentColor: '#10B981',
          stoneBorder: '3px solid #10B981',
          glowBox: '0 0 32px rgba(16, 185, 129, 0.45)',
          environmentArt: 'Sandstone Castle Spire, Knight Academy, Sunlit Wheat Fields',
          landscapeDetail: 'Peaceful morning sunburst (4,500K), cobblestone villages, training dummies, flowing windmills.',
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
          fallbackGrad: 'linear-gradient(135deg, rgba(16, 185, 129, 0.6) 0%, rgba(6, 20, 24, 0.98) 100%)',
          accentColor: '#10B981',
          stoneBorder: '3px solid #10B981',
          glowBox: '0 0 32px rgba(16, 185, 129, 0.45)',
          environmentArt: 'Mayan Step-Pyramids, Emerald Waterfalls, Golden Shrines',
          landscapeDetail: 'Cascading emerald waterfalls, precomputed water aqueducts, floating jade relics.',
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
          fallbackGrad: 'linear-gradient(135deg, rgba(56, 189, 248, 0.6) 0%, rgba(8, 16, 38, 0.98) 100%)',
          accentColor: '#38BDF8',
          stoneBorder: '3px solid #38BDF8',
          glowBox: '0 0 44px rgba(56, 189, 248, 0.6)',
          environmentArt: 'Twin River Canyons, Granite Winch Bridges, River Fog',
          landscapeDetail: 'Parallel granite river canyons, suspended stone arch bridges, merchant fishing ships.',
        },
      ],
    },
    {
      id: 'region-2',
      name: 'REGION II: THE CENTRAL PLAINS & RUNE VAULTS',
      description: 'Windmill ridge trails, purple quartz library caverns, snow-capped observatories, and golden clockwork capitals.',
      color: '#A855F7',
      roadConnector: '🌬️ Windmill Ridge Trail & Blue Quartz Rune Archway',
      kingdoms: [
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
          fallbackGrad: 'linear-gradient(135deg, rgba(168, 85, 247, 0.6) 0%, rgba(18, 6, 30, 0.98) 100%)',
          accentColor: '#A855F7',
          stoneBorder: '2px solid rgba(168, 85, 247, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Huge Grasslands, Brass Windmills, Storm Clouds',
          landscapeDetail: 'Sweeping violet quartz sand dunes, rotating brass windmills, drifting autumn leaves.',
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
          fallbackGrad: 'linear-gradient(135deg, rgba(236, 72, 153, 0.6) 0%, rgba(24, 4, 18, 0.98) 100%)',
          accentColor: '#EC4899',
          stoneBorder: '2px solid rgba(236, 72, 153, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Magical Library, Floating Books, Purple Crystals',
          landscapeDetail: 'Subterranean pink quartz library caverns, floating magical tomes, blue rune circles.',
        },
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
          fallbackGrad: 'linear-gradient(135deg, rgba(6, 182, 212, 0.6) 0%, rgba(4, 16, 30, 0.98) 100%)',
          accentColor: '#06B6D4',
          stoneBorder: '2px solid rgba(6, 182, 212, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Snow Mountains, Astronomical Observatory, Light Beacons',
          landscapeDetail: 'Alpine glacial snow peaks, ancient celestial observatory, glowing beacon towers.',
        },
        {
          id: 7,
          slug: 'ordered-realms',
          name: 'The Ordered Realms',
          subtitle: 'The Clockwork Capital',
          topic: 'Sorting & Alignment',
          difficulty: 'Adept',
          status: 'locked',
          progress: 0,
          xpReward: 2000,
          problemsCount: 15,
          npcGuide: 'Royal Captain Vael',
          bossName: 'The Clockwork Sentinel',
          bgImage: '/assets/journey/kingdoms/kingdom-07.webp',
          fallbackGrad: 'linear-gradient(135deg, rgba(245, 158, 11, 0.6) 0%, rgba(24, 14, 2, 0.98) 100%)',
          accentColor: '#F59E0B',
          stoneBorder: '2px solid rgba(245, 158, 11, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Royal Golden Palace, Symmetrical Gardens, Clockwork Gear Towers',
          landscapeDetail: 'Imperial golden capital city, symmetrical hedge labyrinths, marble avenues.',
        },
      ],
    },
    {
      id: 'region-3',
      name: 'REGION III: THE GREAT FOREST & MOUNTAIN HINTERLANDS',
      description: 'LIFO magma spires, queue procession aqueducts, world tree canopies, and sacred BST groves.',
      color: '#EF4444',
      roadConnector: '🔥 Obsidian Magma Bridge & World Tree Vine Canopy Pass',
      kingdoms: [
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
          fallbackGrad: 'linear-gradient(135deg, rgba(239, 68, 68, 0.6) 0%, rgba(28, 4, 4, 0.98) 100%)',
          accentColor: '#EF4444',
          stoneBorder: '2px solid rgba(239, 68, 68, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Vertical Obsidian Spire, Magma Lakes, Floating Lifts',
          landscapeDetail: 'Pitch-black obsidian vertical fortress, floating stone lifts, molten magma lakes.',
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
          fallbackGrad: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(14, 6, 26, 0.98) 100%)',
          accentColor: '#8B5CF6',
          stoneBorder: '2px solid rgba(139, 92, 246, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Processional Stone Aqueduct, Ceremonial Gates, Queue Halls',
          landscapeDetail: 'Ceremonial procession aqueduct, massive iron gates, blue magical torches.',
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
          fallbackGrad: 'linear-gradient(135deg, rgba(192, 132, 252, 0.6) 0%, rgba(16, 8, 30, 0.98) 100%)',
          accentColor: '#C084FC',
          stoneBorder: '2px solid rgba(192, 132, 252, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Clock Towers, Floating Clocks, Broken Timelines',
          landscapeDetail: 'Floating clock towers, broken timelines, hourglass portals over golden sands.',
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
          fallbackGrad: 'linear-gradient(135deg, rgba(34, 197, 94, 0.6) 0%, rgba(8, 28, 12, 0.98) 100%)',
          accentColor: '#22C55E',
          stoneBorder: '2px solid rgba(34, 197, 94, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Gigantic World Tree Canopy, Tree Houses, Ancient Roots',
          landscapeDetail: 'Gigantic world tree civilization, dense forest canopy, vine rope bridges.',
        },
      ],
    },
    {
      id: 'region-4',
      name: 'REGION IV: THE ENCHANTED SHADOW LANDS & DYNAMIC CITADELS',
      description: 'Labyrinthine graph webs, shortest path highways, greedy bazaar empires, and infinite DP memoization time citadels.',
      color: '#6366F1',
      roadConnector: '🌐 Indigo Web Trail & Imperial Highway Pass',
      kingdoms: [
        {
          id: 14,
          slug: 'shadow-forest',
          name: 'Shadow Forest',
          subtitle: 'The Labyrinthine Network of Graphs',
          topic: 'Graphs, BFS/DFS & TopoSort',
          difficulty: 'Master',
          status: 'locked',
          progress: 0,
          xpReward: 4000,
          problemsCount: 24,
          npcGuide: 'Shadow Warden Kael',
          bossName: 'The 100-Node Graph Spider',
          bgImage: '/assets/journey/kingdoms/kingdom-14.webp',
          fallbackGrad: 'linear-gradient(135deg, rgba(99, 102, 241, 0.7) 0%, rgba(10, 12, 35, 0.98) 100%)',
          accentColor: '#6366F1',
          stoneBorder: '3px solid #6366F1',
          glowBox: '0 0 44px rgba(99, 102, 241, 0.6)',
          environmentArt: 'Dark Enchanted Forest, Indigo Purple Fog, Blue Spirits, Ancient Ruins',
          landscapeDetail: 'Dark enchanted woodland, indigo purple fog, blue spirit orbs, ancient ruins.',
          isLegendary: true,
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
          fallbackGrad: 'linear-gradient(135deg, rgba(234, 179, 8, 0.6) 0%, rgba(28, 20, 4, 0.98) 100%)',
          accentColor: '#EAB308',
          stoneBorder: '2px solid rgba(234, 179, 8, 0.4)',
          glowBox: '0 12px 36px rgba(0, 0, 0, 0.85)',
          environmentArt: 'Trading Empire, Golden Markets, Merchant Guild',
          landscapeDetail: 'Golden trading empire, bustling grand bazaar, golden caravans.',
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
          fallbackGrad: 'linear-gradient(135deg, rgba(168, 85, 247, 0.75) 0%, rgba(20, 8, 40, 0.98) 100%)',
          accentColor: '#C084FC',
          stoneBorder: '3px solid #C084FC',
          glowBox: '0 0 50px rgba(168, 85, 247, 0.65)',
          environmentArt: 'Floating Crystal City, Clock Towers, Time Portals, Golden Sky',
          landscapeDetail: 'Floating crystal city, massive clock towers, golden sky, time portals.',
          isLegendary: true,
        },
      ],
    },
    {
      id: 'region-5',
      name: 'REGION V: THE NORTHERN CELESTIAL PINNACLE',
      description: 'The supreme endgame continent soaring high above the clouds, guarded by celestial dragons.',
      color: '#EAB308',
      roadConnector: '🐉 Golden Soaring Dragon Sky Portal to Zenith',
      kingdoms: [
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
          fallbackGrad: 'linear-gradient(135deg, rgba(234, 179, 8, 0.85) 0%, rgba(35, 22, 4, 0.99) 100%)',
          accentColor: '#EAB308',
          stoneBorder: '4px solid #EAB308',
          glowBox: '0 0 85px rgba(234, 179, 8, 0.9)',
          environmentArt: 'Soaring Golden Sky Continent, Celestial Dragon Palace, Throne of Algorithmic Mastery',
          landscapeDetail: 'Soaring golden sky continent, floating celestial palace, celestial dragons, imperial throne.',
          isLegendary: true,
        },
      ],
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#040208',
        color: '#FFF',
        overflowY: 'auto',
        paddingBottom: '120px',
        position: 'relative',
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
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.95) 0%, rgba(7, 5, 18, 0.99) 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Sparkles size={80} style={{ color: '#FDE047', filter: 'drop-shadow(0 0 30px #FDE047)' }} />
            <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#FFF', letterSpacing: '0.05em' }}>
              ENTERING REALM GATE...
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ARENA HEADER BAR WITH LAYOUT SELECTOR */}
      <div
        style={{
          padding: '24px 40px',
          background: 'linear-gradient(180deg, rgba(20, 16, 38, 0.98) 0%, rgba(10, 8, 22, 0.95) 100%)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#FFF', letterSpacing: '0.04em' }}>
            THE HANDCRAFTED FANTASY CONTINENT (ISOMETRIC WORLD MAP)
          </h1>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.06em' }}>
            25 REGIONAL KINGDOMS • DYNAMIC ARTWORK LOADED FROM /assets/journey/kingdoms/
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* LAYOUT SELECTOR BUTTONS */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setLayoutMode('continent')}
              type="button"
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: layoutMode === 'continent' ? '#38BDF8' : 'transparent',
                border: 'none',
                color: layoutMode === 'continent' ? '#000' : '#CBD5E1',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Globe size={13} /> World Map
            </button>

            <button
              onClick={() => setLayoutMode('4col')}
              type="button"
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                color: '#CBD5E1',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Grid size={13} /> 4-Column Grid
            </button>

            <button
              onClick={() => setLayoutMode('5x5')}
              type="button"
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                color: '#CBD5E1',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Grid size={13} /> 5×5 Map
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#CBD5E1', fontWeight: 800 }}>
            <span>Progress: <strong style={{ color: '#10B981' }}>37%</strong></span>
            <span>Conquered: <strong style={{ color: '#38BDF8' }}>9 / 25</strong></span>
            <span>Total XP: <strong style={{ color: '#FDE047' }}>12,450 XP</strong></span>
          </div>
        </div>
      </div>

      {/* LIVING HANDCRAFTED CONTINENT MAP CONTAINER */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: '56px' }}>
        {continentRegions.map((region, idx) => (
          <React.Fragment key={region.id}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* REGION HEADER */}
              <div style={{ borderLeft: `4px solid ${region.color}`, paddingLeft: '16px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#FFF', letterSpacing: '0.05em' }}>
                  {region.name}
                </h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>
                  {region.description}
                </p>
              </div>

              {/* REGIONAL KINGDOM CARDS - ORGANIC ISOMETRIC CONTINENT PLACEMENT */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
                {region.kingdoms.map((k) => (
                  <OrganicKingdomCard key={k.id} card={k} onPortal={(name) => setZoomingPortal(name)} />
                ))}
              </div>
            </div>

            {/* ORGANIC REALMIC ROAD CONNECTOR BETWEEN REGIONS */}
            {idx < continentRegions.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 0' }}>
                <div style={{ width: '2px', height: '36px', background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.6), rgba(56, 189, 248, 0.6))' }} />
                <span style={{ fontSize: '11px', color: '#CBD5E1', fontWeight: 900, padding: '6px 18px', borderRadius: '12px', background: 'rgba(15, 12, 28, 0.95)', border: '1px solid rgba(255, 255, 255, 0.12)', letterSpacing: '0.05em' }}>
                  {region.roadConnector}
                </span>
                <div style={{ width: '2px', height: '36px', background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.6), rgba(168, 85, 247, 0.6))' }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

{/* REUSABLE 4-COLUMN SERPENTINE CAMPAIGN GRID COMPONENT */}
function Grid4ColCampaignView({ onSwitchLayout }: { onSwitchLayout: (mode: 'continent' | '4col' | '5x5') => void }) {
  const [zoomingPortal, setZoomingPortal] = useState<string | null>(null);

  const kingdoms = [
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
      environmentArt: 'Sandstone Castle Spire, Knight Academy, Sunlit Wheat Fields',
      connectionLabel: 'The Stone King\'s Road',
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
      connectionLabel: 'Cross the Crystal Bridge',
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
      connectionLabel: 'The Royal Highway',
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
      connectionLabel: 'The Forest Trail',
    },
  ];

  const citadelMaster = {
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
    bossName: 'The Supreme Celestial Dragon',
    bgImage: '/assets/journey/kingdoms/kingdom-25.webp',
    fallbackGrad: 'linear-gradient(180deg, rgba(234, 179, 8, 0.75) 0%, rgba(35, 22, 4, 0.99) 100%)',
    accentColor: '#EAB308',
    stoneBorder: '4px solid #EAB308',
    glowBox: '0 0 70px rgba(234, 179, 8, 0.8)',
    environmentArt: 'Soaring Golden Sky Continent, Celestial Dragon Palace',
    isLegendary: true,
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#040208', color: '#FFF', paddingBottom: '100px' }}>
      {/* HEADER */}
      <div style={{ padding: '24px 40px', background: 'linear-gradient(180deg, rgba(20, 16, 38, 0.98) 0%, rgba(10, 8, 22, 0.95) 100%)', borderBottom: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#FFF' }}>THE ALGORITHMIC JOURNEY (4-COLUMN CAMPAIGN GRID)</h1>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>25 KINGDOMS • MASTER THE REALM OF DSA</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => onSwitchLayout('continent')} type="button" style={{ padding: '6px 14px', borderRadius: '8px', background: 'transparent', border: 'none', color: '#CBD5E1', fontSize: '11px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={13} /> World Map
          </button>
          <button onClick={() => onSwitchLayout('4col')} type="button" style={{ padding: '6px 14px', borderRadius: '8px', background: '#38BDF8', border: 'none', color: '#000', fontSize: '11px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Grid size={13} /> 4-Column Grid
          </button>
          <button onClick={() => onSwitchLayout('5x5')} type="button" style={{ padding: '6px 14px', borderRadius: '8px', background: 'transparent', border: 'none', color: '#CBD5E1', fontSize: '11px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Grid size={13} /> 5×5 Map
          </button>
        </div>
      </div>

      {/* 4-COL GRID */}
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr 1fr 0.8fr 1fr 0.8fr 1fr', alignItems: 'center', gap: '8px' }}>
          <OrganicKingdomCard card={kingdoms[0]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[0].connectionLabel} direction="right" />
          <OrganicKingdomCard card={kingdoms[1]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[1].connectionLabel} direction="right" />
          <OrganicKingdomCard card={kingdoms[2]} onPortal={(name) => setZoomingPortal(name)} />
          <ConnectorHorizontal label={kingdoms[2].connectionLabel} direction="right" />
          <OrganicKingdomCard card={kingdoms[3]} onPortal={(name) => setZoomingPortal(name)} />
        </div>

        <div style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '20px', background: 'rgba(234, 179, 8, 0.25)', border: '1.5px solid #EAB308', color: '#EAB308', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>
            <Crown size={16} /> The Supreme Celestial Endgame Destination
          </div>
          <div style={{ maxWidth: '460px', width: '100%' }}>
            <OrganicKingdomCard card={citadelMaster} onPortal={(name) => setZoomingPortal(name)} />
          </div>
        </div>
      </div>
    </div>
  );
}

{/* REUSABLE ORGANIC FANTASY CONTINENT KINGDOM CARD (80% ART / 20% INFO) */}
function OrganicKingdomCard({ card, onPortal }: { card: any; onPortal: (name: string) => void }) {
  const isCompleted = card.status === 'completed';
  const isActive = card.status === 'active';
  const isLocked = card.status === 'locked';

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.04, y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(18, 14, 34, 0.98) 0%, rgba(8, 6, 18, 1) 100%)',
        border: card.stoneBorder,
        boxShadow: card.glowBox,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 80% HEIGHT HANDCRAFTED ENVIRONMENT ARTWORK WITH DYNAMIC IMAGE LOADING */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: card.isLegendary ? '260px' : '220px',
          backgroundImage: card.bgImage ? `linear-gradient(180deg, rgba(5, 3, 12, 0.35) 0%, rgba(5, 3, 12, 0.85) 100%), url(${card.bgImage}), ${card.fallbackGrad}` : card.fallbackGrad,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <span style={{ fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '8px', background: 'rgba(0,0,0,0.75)', color: card.accentColor, border: `1px solid ${card.accentColor}` }}>
            {card.isLegendary ? '★ LEGENDARY REALM' : `REALM #${card.id}`}
          </span>
          {isActive && (
            <span style={{ fontSize: '9px', fontWeight: 900, padding: '3px 8px', borderRadius: '6px', background: 'rgba(245,158,11,0.3)', color: '#F59E0B', border: '1px solid #F59E0B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={11} /> ACTIVE
            </span>
          )}
        </div>

        <div style={{ zIndex: 2 }}>
          <span style={{ fontSize: '10px', color: '#CBD5E1', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '2px' }}>
            {card.landscapeDetail || card.environmentArt}
          </span>
          <h3 style={{ margin: 0, fontSize: card.isLegendary ? '24px' : '20px', fontWeight: 900, color: isLocked ? '#94A3B8' : '#FFF', textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}>
            {card.name}
          </h3>
          <span style={{ fontSize: '12px', color: '#FDE047', fontWeight: 800, textShadow: '0 2px 10px rgba(253, 224, 71, 0.5)' }}>
            {card.subtitle}
          </span>
        </div>
      </div>

      {/* 20% HEIGHT CARVED STONE INFORMATION PANEL */}
      <div style={{ padding: '14px 20px', background: 'rgba(10, 8, 22, 0.96)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 800 }}>{card.topic}</span>
          <span style={{ fontSize: '12px', fontWeight: 900, color: isCompleted ? '#10B981' : isActive ? '#38BDF8' : '#64748B' }}>
            {card.progress}% Conquered
          </span>
        </div>

        {isLocked ? (
          <button disabled type="button" style={{ padding: '8px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B', fontSize: '11px', fontWeight: 900, cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} /> Locked
          </button>
        ) : (
          <Link href={`/learn/${card.slug}`} style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPortal(card.name);
                setTimeout(() => onPortal(''), 1200);
              }}
              type="button"
              style={{
                padding: '9px 20px',
                borderRadius: '10px',
                background: isActive ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #10B981, #059669)',
                border: 'none',
                color: '#000',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isActive ? '0 0 18px rgba(245,158,11,0.5)' : '0 0 18px rgba(16,185,129,0.4)',
              }}
            >
              {isActive ? 'Enter' : 'Restored'} <ChevronRight size={14} />
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

{/* REUSABLE HORIZONTAL REALMIC CONNECTOR COMPONENT */}
function ConnectorHorizontal({ label = 'Runic Path', direction }: { label?: string; direction: 'right' | 'left' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <div style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6), rgba(56, 189, 248, 0.6))' }} />
      <span style={{ fontSize: '8px', color: '#94A3B8', fontWeight: 800, whiteSpace: 'nowrap', padding: '1px 4px', borderRadius: '4px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {direction === 'right' ? <ArrowRight size={8} style={{ display: 'inline', marginRight: '2px' }} /> : <ArrowLeft size={8} style={{ display: 'inline', marginRight: '2px' }} />}
        {label}
      </span>
    </div>
  );
}
