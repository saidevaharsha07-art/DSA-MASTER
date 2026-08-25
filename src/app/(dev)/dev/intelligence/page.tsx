'use client';

import React, { useState } from 'react';
import { Container } from '@/src/core/container/container';
import { initializeServiceRegistry } from '@/src/core/container/service-registry';
import { UniversalUserModel } from '@/src/intelligence/user-model/universal-user.model';
import { KnowledgeGraphEngine } from '@/src/intelligence/knowledge-graph/knowledge-graph.engine';
import { PredictiveCoachEngine } from '@/src/intelligence/predictive-coach/predictive-coach.engine';
import { CompanyPrepEngine } from '@/src/intelligence/company-prep/company-prep.engine';
import { PatternDiscoveryEngine } from '@/src/intelligence/pattern-discovery/pattern-discovery.engine';

export default function DeveloperIntelligenceDashboard2() {
  initializeServiceRegistry();

  const kgEngine = Container.resolve<KnowledgeGraphEngine>('KnowledgeGraphEngine');
  const coachEngine = Container.resolve<PredictiveCoachEngine>('PredictiveCoachEngine');
  const companyEngine = Container.resolve<CompanyPrepEngine>('CompanyPrepEngine');
  const patternEngine = Container.resolve<PatternDiscoveryEngine>('PatternDiscoveryEngine');

  const [profile] = useState(() => UniversalUserModel.createDefaultProfile('dev-master-1', 'ArchMaster'));
  const prediction = coachEngine.predictPerformance(profile);
  const nodes = kgEngine.getAllNodes();
  const companies = companyEngine.getAllCompanies();
  const clusters = patternEngine.discoverClusters();
  const graphStats = kgEngine.calculateGraphHealth();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
          <span>🧠 PHASE 4.0 GLOBAL INTELLIGENCE PLATFORM</span>
          <span>•</span>
          <span>DEVELOPER DASHBOARD 2.0</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100">Knowledge Graph & Predictive AI Inspector</h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect Bayesian Knowledge Tracing, Ebbinghaus decay probabilities, AI Performance Predictions, Company Prep Gaps, and Pattern Clusters.
        </p>
      </div>

      {/* Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-mono">Predicted ELO Rating</div>
          <div className="text-2xl font-extrabold text-indigo-400 mt-1">{prediction.predictedNextRating} ELO</div>
          <div className="text-xs text-slate-500 mt-1">Interval: [{prediction.ratingConfidenceInterval.join(' - ')}]</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-mono">Interview Readiness</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">{prediction.interviewReadinessPercent}%</div>
          <div className="text-xs text-emerald-500/80 mt-1">Placement: {prediction.placementReadinessPercent}%</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-mono">Knowledge Graph Nodes</div>
          <div className="text-2xl font-extrabold text-purple-400 mt-1">{graphStats.totalNodes} Nodes</div>
          <div className="text-xs text-slate-500 mt-1">{graphStats.totalEdges} Dependency Edges</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-mono">Pattern Clusters</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">{clusters.length} Clusters</div>
          <div className="text-xs text-slate-500 mt-1">Avg Similarity: 91%</div>
        </div>
      </div>

      {/* Universal Learner Profile */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span>👤</span> Phase 4A Universal Learner Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div>
            <p><strong>Mastery Score:</strong> {profile.masteryScore}%</p>
            <p><strong>Accuracy:</strong> {profile.accuracy}%</p>
            <p><strong>Learning Velocity:</strong> {profile.learningVelocity} problems / week</p>
            <p><strong>Consistency Streak:</strong> {profile.consistencyStreak} days</p>
            <p><strong>Burnout Risk:</strong> <span className="text-emerald-400">{profile.burnoutRisk}</span></p>
          </div>
          <div>
            <p><strong>Strengths:</strong> {profile.strengths.join(', ')}</p>
            <p><strong>Weaknesses:</strong> <span className="text-rose-400">{profile.weaknesses.join(', ')}</span></p>
            <p><strong>Contest Temperament:</strong> {profile.contestTemperament}</p>
            <p><strong>Active Kingdoms:</strong> {profile.activeKingdoms.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Knowledge Graph Nodes */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span>🕸️</span> Phase 4B Knowledge Graph Nodes ({nodes.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {nodes.map((n) => (
            <div key={n.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
              <div className="font-bold text-slate-200">{n.name}</div>
              <div className="text-slate-400">Difficulty: {n.difficulty} ELO</div>
              <div className="text-slate-400">Mastery: <span className="text-emerald-400">{n.masteryScore}%</span></div>
              <div className="text-slate-500">Prereqs: {n.prerequisites.join(', ') || 'None'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Preparation Engine */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span>🏢</span> Phase 4F Company Preparation Readiness
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {companies.map((c) => (
            <div key={c.companyId} className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 text-sm">{c.logoIcon} {c.companyName}</span>
                <span className="font-mono text-emerald-400 font-bold">{c.estimatedReadinessPercent}% Ready</span>
              </div>
              <p className="text-slate-400">Required Patterns: {c.requiredPatterns.join(', ')}</p>
              {c.criticalGaps.length > 0 ? (
                <p className="text-rose-400">Critical Gaps: {c.criticalGaps.join(', ')}</p>
              ) : (
                <p className="text-emerald-400">No Critical Gaps Identified!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
