'use client';

import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { PatternModule } from '@/src/types/content';
import { colors, radius } from '@/src/design';
import { JourneyNode } from './JourneyNode';
import { JourneyConnection } from './JourneyConnection';
import { JourneyControls } from './JourneyControls';
import { JourneyMiniMap } from './JourneyMiniMap';
import { JourneyTooltip } from './JourneyTooltip';
import { JourneyOverlay } from './JourneyOverlay';
import { JourneyNodeDrawer } from './JourneyNodeDrawer';
import { worlds, WorldInfo } from './worldData';
import Image from 'next/image';

interface JourneyMapProps {
  patterns: PatternModule[];
  user: {
    name: string;
    xp: number;
    streak: number;
  };
  weakestPatternTitle: string | undefined;
  readiness: number;
}

export function JourneyMap({ patterns, user, weakestPatternTitle, readiness }: JourneyMapProps) {
  const [zoom, setZoom] = useState(0.85); // Start at standard zoom
  const [selectedWorld, setSelectedWorld] = useState<WorldInfo | null>(null);
  const [hoveredWorld, setHoveredWorld] = useState<WorldInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedWorldId, setFocusedWorldId] = useState<number | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Motion values to drive the camera coordinates programmatically
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);

  const worldsList = useMemo(() => Object.values(worlds), []);

  // Progression Rules: World 1 completed, World 2 current active, Worlds 3-25 locked.
  const completedWorldIds = useMemo(() => [1], []); // World 1 completed
  const currentWorldId = 2; // World 2 active

  const getWorldStatus = useCallback((worldId: number): 'completed' | 'current' | 'locked' => {
    if (completedWorldIds.includes(worldId)) return 'completed';
    if (worldId === currentWorldId) return 'current';
    return 'locked';
  }, [completedWorldIds]);

  const centerOnNode = useCallback((nodeX: number, nodeY: number) => {
    if (!mapContainerRef.current) return;
    const containerWidth = mapContainerRef.current.offsetWidth;
    const containerHeight = mapContainerRef.current.offsetHeight;

    const targetX = containerWidth / 2 - nodeX * zoom;
    const targetY = containerHeight / 2 - nodeY * zoom;

    animate(canvasX, targetX, { type: 'spring', damping: 25, stiffness: 120 });
    animate(canvasY, targetY, { type: 'spring', damping: 25, stiffness: 120 });
  }, [zoom, canvasX, canvasY]);

  // Center on current active node (World 2) when mounting
  useEffect(() => {
    const currentWorld = worlds[currentWorldId];
    if (currentWorld) {
      setTimeout(() => {
        centerOnNode(currentWorld.x, currentWorld.y);
      }, 100);
    }
  }, [centerOnNode]);

  // Handle minimap node clicks to pan camera
  const handleMiniMapClick = (worldId: number) => {
    const targetWorld = worlds[worldId];
    if (targetWorld) {
      setFocusedWorldId(worldId);
      centerOnNode(targetWorld.x, targetWorld.y);
    }
  };

  // Handle Search focuses
  useEffect(() => {
    if (!searchQuery) {
      setFocusedWorldId(null);
      return;
    }
    const found = worldsList.find(w => 
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.biome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (found && getWorldStatus(found.id) !== 'locked') {
      setFocusedWorldId(found.id);
      centerOnNode(found.x, found.y);
      setZoom(1.15); // zoom in on search match
    }
  }, [searchQuery, centerOnNode, getWorldStatus, worldsList]);

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    let nextZoom = zoom;
    if (direction === 'in') nextZoom = Math.min(zoom + 0.15, 1.5);
    if (direction === 'out') nextZoom = Math.max(zoom - 0.15, 0.45);
    if (direction === 'reset') nextZoom = 1;
    setZoom(nextZoom);
  };

  const handleFitMap = useCallback(() => {
    setZoom(0.45);
    centerOnNode(700, 680); // Centers on general geometric center of 5x5 map grid
  }, [centerOnNode]);

  // Escape key listener to zoom out and reset view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFitMap();
        setSelectedWorld(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFitMap]);

  return (
    <div 
      ref={mapContainerRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: 'calc(100vh - 80px)', 
        overflow: 'hidden', 
        background: '#040810', 
        borderRadius: radius.xl,
        border: `1px solid ${colors.border}`
      }}
    >
      {/* Immersive Drag Canvas */}
      <motion.div 
        drag 
        dragConstraints={mapContainerRef}
        style={{ 
          width: '1600px', 
          height: '1600px', 
          originX: 0, 
          originY: 0, 
          scale: zoom, 
          x: canvasX,
          y: canvasY,
          cursor: 'grab',
          position: 'relative',
          backgroundColor: '#070b13',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* Handcrafted Campaign World Map WebP Artwork Layer */}
        <Image 
          src="/assets/journey/world.webp"
          alt="Journey Fantasy World"
          width={1600}
          height={1600}
          priority
          draggable={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            objectFit: 'cover'
          }}
        />

        {/* SVG Paths overlay (Curvy sequential progression path 1 -> 2 -> ... -> 25) */}
        <svg width="1600" height="1600" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
          {worldsList.map((w, idx) => {
            if (idx === 0) return null;
            const prev = worldsList[idx - 1];
            
            const prevStatus = getWorldStatus(prev.id);
            const isUnlocked = prevStatus === 'completed' || prevStatus === 'current';

            return (
              <JourneyConnection 
                key={idx}
                x1={prev.x} y1={prev.y}
                x2={w.x} y2={w.y}
                isUnlocked={isUnlocked}
                themeColor={w.themeColor}
                pathType={w.pathType}
              />
            );
          })}
        </svg>

        {/* Render volumetric fog clouds overlaying locked biomes to keep future areas mysterious */}
        {worldsList.map((w) => {
          const status = getWorldStatus(w.id);
          if (status !== 'locked') return null;

          return (
            <motion.div 
              key={`fog-${w.id}`}
              animate={{ opacity: [0.7, 0.85, 0.7] }}
              transition={{ repeat: Infinity, duration: 6 + (w.id % 4), ease: "easeInOut" }}
              style={{
                position: 'absolute',
                left: w.x - 120,
                top: w.y - 120,
                width: '240px',
                height: '240px',
                background: 'radial-gradient(circle, rgba(9, 13, 22, 0.98) 0%, rgba(9, 13, 22, 0.85) 45%, transparent 70%)',
                filter: 'blur(22px)',
                pointerEvents: 'none',
                zIndex: 30,
              }}
            />
          );
        })}

        {/* Render World Nodes */}
        {worldsList.map((w) => {
          const status = getWorldStatus(w.id);
          const progress = status === 'completed' ? 100 : 0;

          return (
            <JourneyNode 
              key={w.id}
              world={w}
              status={status}
              progress={progress}
              isFocused={focusedWorldId === w.id}
              onClick={() => {
                setSelectedWorld(w);
                centerOnNode(w.x, w.y);
              }}
              onDoubleClick={() => {
                setZoom(1.3);
                centerOnNode(w.x, w.y);
              }}
              onHover={(isHovered) => setHoveredWorld(isHovered ? w : null)}
            />
          );
        })}

        {/* Floating Node Previews on Hover */}
        {hoveredWorld && (
          <JourneyTooltip 
            world={hoveredWorld}
            status={getWorldStatus(hoveredWorld.id)}
            x={hoveredWorld.x}
            y={hoveredWorld.y}
          />
        )}
      </motion.div>

      {/* Floating HUD Panel overlays */}
      <JourneyOverlay 
        user={user}
        currentWorld={worlds[currentWorldId]}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        miniMap={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <JourneyMiniMap 
              worldsList={worldsList}
              currentWorldId={currentWorldId}
              completedWorldIds={completedWorldIds}
              onNodeClick={handleMiniMapClick}
            />
            {/* Bottom Right Zoom controls, fitted bottom-left in absolute stack */}
            <JourneyControls 
              onZoomIn={() => handleZoom('in')}
              onZoomOut={() => handleZoom('out')}
              onReset={() => handleZoom('reset')}
              onFitMap={handleFitMap}
            />
          </div>
        }
      />

      {/* Node detail drawer details */}
      <AnimatePresence>
        {selectedWorld && (
          <JourneyNodeDrawer 
            world={selectedWorld}
            status={getWorldStatus(selectedWorld.id)}
            progress={selectedWorld.id === 1 ? 100 : 0}
            onClose={() => setSelectedWorld(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
