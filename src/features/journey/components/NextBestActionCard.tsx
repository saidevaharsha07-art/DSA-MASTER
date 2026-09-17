'use client';

import React from 'react';
import { NextBestAction } from '../types/journey.types';
import { UnifiedRecommendation } from '@/src/intelligence/recommendations/types/recommendation.types';
import { RecommendationCard } from '@/src/intelligence/recommendations/components/RecommendationCard';

interface NextBestActionCardProps {
  action?: NextBestAction;
  recommendation?: UnifiedRecommendation;
  isZeroState?: boolean;
}

export function NextBestActionCard({ action, recommendation, isZeroState }: NextBestActionCardProps) {
  if (recommendation) {
    return <RecommendationCard recommendation={recommendation} variant="journey" />;
  }

  if (!action) return null;

  const unifiedRec: UnifiedRecommendation = {
    id: `rec_journey_${action.targetTopicId}_${action.actionType.toLowerCase()}`,
    actionType: (action.actionType === 'REVISE'
      ? 'REVISE'
      : action.actionType === 'INTERVIEW'
      ? 'INTERVIEW'
      : action.actionType === 'CONTEST'
      ? 'CONTEST'
      : action.actionType === 'LEARN'
      ? 'LEARN'
      : 'PRACTICE'),
    title: isZeroState ? 'Start Your Algorithmic Journey' : `Focus on ${action.targetTopicTitle}`,
    explanation: action.reason,
    priority: action.urgency === 'Immediate' ? 'URGENT' : 'NORMAL',
    priorityRank: action.urgency === 'Immediate' ? 1 : 4,
    topic: action.targetTopicTitle,
    topicId: action.targetTopicId,
    destinationRoute: action.actionUrl,
    sourceSignals: ['ROADMAP_STATE', 'ADAPTIVE_MOMENTUM'],
    supportingEvidence: [
      action.reason,
      `Estimated commitment: ~${action.estimatedMinutes} minutes`,
      `Adaptive urgency: ${action.urgency || 'Normal'}`,
    ],
    estimatedMinutes: action.estimatedMinutes,
    isZeroState: !!isZeroState,
    isGuest: false,
    lifecycleState: 'GENERATED',
    createdAt: new Date().toISOString(),
    userId: 'user',
    confidenceStrength: 'high',
    mentorContextPayload: {
      topic: action.targetTopicTitle,
      actionType: action.actionType as any,
      suggestedQuery: `I need help preparing for ${action.targetTopicTitle}. What are the primary algorithmic patterns and common pitfalls?`,
    },
  };

  return <RecommendationCard recommendation={unifiedRec} variant="journey" />;
}
