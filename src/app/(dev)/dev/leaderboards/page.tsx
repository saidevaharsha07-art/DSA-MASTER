'use client';

import React, { useState, useEffect } from 'react';
import { LeaderboardApi } from '@/src/intelligence/leaderboards/api/leaderboard.api';
import { LeaderboardType } from '@/src/intelligence/leaderboards/models/leaderboard.models';
import { PaginatedLeaderboard } from '@/src/intelligence/leaderboards/models/leaderboard-entry.models';
import { JSONViewer } from '../components/JSONViewer';

export default function DevLeaderboardsPage() {
  const [type, setType] = useState<LeaderboardType>('global');
  const [board, setBoard] = useState<PaginatedLeaderboard | null>(null);

  useEffect(() => {
    async function load() {
      const res = await LeaderboardApi.getLeaderboard(type, { page: 1, pageSize: 10 });
      setBoard(res);
    }
    load();
  }, [type]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🥇</span> Scalable Leaderboard & Profile Engine Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect multi-scope leaderboards, composite weighted rankings, search query filters, and public profile data.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Leaderboard Scope Selector</h2>
        <div className="flex items-center gap-3 text-xs">
          <label className="text-slate-400 font-mono">Scope:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as LeaderboardType)}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200"
          >
            <option value="global">Global Rankings</option>
            <option value="xp">Top XP Earners</option>
            <option value="rating">Top Rated Contestants</option>
            <option value="streak">Longest Active Streaks</option>
            <option value="memory">Top Memory Health</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table Preview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-100">Top Performers Preview ({board?.entries.length || 0} entries)</h2>
        <div className="space-y-2 font-mono text-xs">
          {board?.entries.map((e) => (
            <div key={e.userId} className="flex items-center justify-between bg-slate-950 p-3 rounded border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-400 w-8">#{e.rank}</span>
                <span className="font-bold text-slate-200">@{e.username}</span>
                {e.activeTitle && <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800/40">{e.activeTitle.title}</span>}
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>Score: <strong className="text-emerald-400">{e.score}</strong></span>
                <span>XP: {e.xp}</span>
                <span>Rating: {e.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <JSONViewer data={{ type, board }} title="Raw Leaderboard Data Inspector" defaultExpanded={true} />
    </div>
  );
}
