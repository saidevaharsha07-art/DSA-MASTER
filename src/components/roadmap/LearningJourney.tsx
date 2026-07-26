'use client';

import React, { useMemo } from 'react';
import { RoadmapNodeData } from './types';
import { RoadmapNode } from './RoadmapNode';
import { RoadmapPath } from './RoadmapPath';
import { memoryEngine } from '@/src/memory/engine';

interface Props {
  nodes: RoadmapNodeData[];
}

export function LearningJourney({ nodes }: Props) {
  const hydratedNodes = useMemo(() => {
    const memoryState = memoryEngine.getState();
    
    return nodes.map(node => {
      const memory = memoryState.concepts[node.id];
      if (memory) {
        let derivedState = node.state;
        if (memory.masteryScore > 90) derivedState = 'elite';
        else if (memory.masteryScore > 75) derivedState = 'mastered';
        else if (memory.masteryScore > 0) derivedState = 'learning';
        else derivedState = node.state;
        
        return {
          ...node,
          state: derivedState,
          mastery: Math.round(memory.masteryScore),
          timeInvested: memory.reviewHistory.reduce((acc, r) => acc + r.timeSpentSeconds, 0),
          recognitionScore: memory.retrievalStrength,
          revisionHealth: Math.max(0, 100 - memory.forgettingRisk)
        };
      }
      return node;
    });
  }, [nodes]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '800px', overflow: 'hidden' }}>
      {hydratedNodes.map(node => (
        node.nextNodes.map(targetId => {
          const targetNode = hydratedNodes.find(n => n.id === targetId);
          if (!targetNode) return null;
          
          return (
            <RoadmapPath 
              key={`${node.id}-${targetId}`}
              startX={node.position.x}
              startY={node.position.y}
              endX={targetNode.position.x}
              endY={targetNode.position.y}
              isUnlocked={node.state === 'mastered' || node.state === 'elite' || node.state === 'learning'}
            />
          );
        })
      ))}

      {hydratedNodes.map(node => (
        <RoadmapNode 
          key={node.id} 
          node={node} 
          onClick={(id) => console.log('Navigate to node:', id)}
        />
      ))}
    </div>
  );
}
