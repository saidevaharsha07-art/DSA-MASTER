'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import {
  OracleService,
  OracleContextService,
  ContestEngine,
  RatingEngine,
  MemoryEngine,
  OracleBalancedStrategy,
  OracleContestStrategy,
  OracleRevisionStrategy,
  OracleInterviewStrategy,
  OracleRatingStrategy,
  OracleMasteryStrategy,
  SimulationScenarioType,
} from '@/src/intelligence';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { JSONViewer } from '../components/JSONViewer';

export default function OracleInspectorPage() {
  const { profile, logAction } = useDev();

  const [contestEngine] = useState(() => new ContestEngine());
  const [ratingEngine] = useState(() => new RatingEngine());
  const [memoryEngine] = useState(() => new MemoryEngine());
  const [oracleService] = useState(() => new OracleService());

  const [activeStrategyName, setActiveStrategyName] = useState<string>('Balanced');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'planner' | 'insights' | 'simulation'>('recommendations');
  const [simScenario, setSimScenario] = useState<SimulationScenarioType>('solve_10_arrays');

  // Build context bundle
  const bundle = OracleContextService.buildContextBundle(profile, contestEngine, ratingEngine, memoryEngine);

  const snapshot = oracleService.getDashboardSnapshot(bundle);
  const { recommendations, conflictReports } = oracleService.getRecommendations(bundle);
  const insights = oracleService.getInsights(bundle);
  const dailyPlan = oracleService.getDailyPlan(bundle);
  const weeklyPlan = oracleService.getWeeklyPlan(bundle);
  const simulationResult = oracleService.simulateScenario(bundle, simScenario);

  const handleStrategyChange = (name: string) => {
    setActiveStrategyName(name);
    if (name === 'Balanced') oracleService.setStrategy(new OracleBalancedStrategy());
    else if (name === 'Contest Prep') oracleService.setStrategy(new OracleContestStrategy());
    else if (name === 'Revision Focus') oracleService.setStrategy(new OracleRevisionStrategy());
    else if (name === 'Interview Prep') oracleService.setStrategy(new OracleInterviewStrategy());
    else if (name === 'Rating Climb') oracleService.setStrategy(new OracleRatingStrategy());
    else if (name === 'Topic Mastery') oracleService.setStrategy(new OracleMasteryStrategy());

    logAction(`Switched Oracle Strategy: ${name}`, 'Oracle AI Engine', 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🤖</span> Oracle AI Recommendation Engine Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Internal inspection of unified recommendations, decision traces, conflict resolution, daily/weekly study planners, and What-If simulation engine.
        </p>
      </div>

      {/* Strategy Switcher Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-200">Active Oracle Strategy:</span>
          <span className="ml-2 text-xs font-mono text-indigo-400 font-bold">{activeStrategyName}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Balanced', 'Contest Prep', 'Revision Focus', 'Interview Prep', 'Rating Climb', 'Topic Mastery'].map((strat) => (
            <button
              key={strat}
              onClick={() => handleStrategyChange(strat)}
              className={`text-xs px-3 py-1 rounded border transition-colors ${
                activeStrategyName === strat
                  ? 'bg-indigo-600 text-white border-indigo-500 font-medium'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {strat}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Learning Score & Snapshot Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Unified Learning Score" value={`${snapshot.overallLearningScore.overallScore}/100`} subtext="Composed score across 6 engines" icon="⭐" />
        <MetricCard title="Memory Health" value={`${snapshot.memoryHealth}/100`} subtext={`Overdue reviews: ${snapshot.revisionQueue.length}`} icon="🧠" />
        <MetricCard title="Contest Readiness" value={snapshot.contestReadiness} subtext={`Projected rating: ${snapshot.ratingProjection}`} icon="🏆" />
        <MetricCard title="Top Recommendations" value={recommendations.length} subtext={`Conflicts resolved: ${conflictReports.length}`} icon="💡" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {(['recommendations', 'planner', 'insights', 'simulation'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs px-4 py-2 rounded-t font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-slate-900 text-indigo-400 border-t border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content 1: Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">{rec.category}</span>
                  <h3 className="text-sm font-bold text-slate-100">{rec.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Score: <strong className="text-emerald-400">{rec.rankingScore}/100</strong></span>
                  <StatusBadge status={rec.priority} />
                </div>
              </div>

              <p className="text-xs text-slate-300">{rec.description}</p>

              {/* Decision Trace Viewer */}
              {rec.decisionTraces.length > 0 && (
                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-xs space-y-1 font-mono">
                  <span className="text-indigo-400 font-semibold">Decision Trace:</span>
                  <div className="text-slate-300">
                    Engine: <span className="text-slate-100">{rec.decisionTraces[0].contributingEngine}</span> | Output: <span className="text-slate-400">{rec.decisionTraces[0].engineOutputSummary}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          <JSONViewer data={{ recommendations, conflictReports }} title="Ranked Recommendations & Conflict Resolution Reports" defaultExpanded={true} />
        </div>
      )}

      {/* Tab Content 2: Daily & Weekly Planners */}
      {activeTab === 'planner' && (
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-100">Oracle Daily Study Plan ({dailyPlan.totalMinutes} mins)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <h4 className="font-bold text-indigo-400 mb-1">Morning ({dailyPlan.morning.durationMinutes}m)</h4>
                <p className="text-slate-300">{dailyPlan.morning.title}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <h4 className="font-bold text-emerald-400 mb-1">Afternoon ({dailyPlan.afternoon.durationMinutes}m)</h4>
                <p className="text-slate-300">{dailyPlan.afternoon.title}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <h4 className="font-bold text-amber-400 mb-1">Evening ({dailyPlan.evening.durationMinutes}m)</h4>
                <p className="text-slate-300">{dailyPlan.evening.title}</p>
              </div>
            </div>
          </div>

          <JSONViewer data={{ dailyPlan, weeklyPlan }} title="Daily & Weekly Study Plan Models" defaultExpanded={true} />
        </div>
      )}

      {/* Tab Content 3: Insights */}
      {activeTab === 'insights' && (
        <JSONViewer data={insights} title="OracleInsightReport Model Output" defaultExpanded={true} />
      )}

      {/* Tab Content 4: What-If Simulation */}
      {activeTab === 'simulation' && (
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-100">What-If Scenario Simulator</h2>
            <div className="flex items-center gap-3 text-xs">
              <select
                value={simScenario}
                onChange={(e) => setSimScenario(e.target.value as SimulationScenarioType)}
                className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200"
              >
                <option value="solve_10_arrays">Solve 10 Array Problems (+6 pts)</option>
                <option value="increase_rating_100">Increase Rating by +100 (+8 pts)</option>
                <option value="complete_review_queue">Complete All Overdue Reviews (+10 pts)</option>
                <option value="skip_revision_1_week">Skip Revision for 1 Week (-12 pts)</option>
              </select>
            </div>
          </div>

          <JSONViewer data={simulationResult} title={`SimulationResult Output (${simScenario})`} defaultExpanded={true} />
        </div>
      )}

      {/* Full Dashboard Snapshot JSON */}
      <JSONViewer data={snapshot} title="OracleDashboardSnapshot Model Output" defaultExpanded={false} />
    </div>
  );
}
