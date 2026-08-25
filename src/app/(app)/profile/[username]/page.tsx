'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LeaderboardApi } from '@/src/intelligence/leaderboards/api/leaderboard.api';
import { PublicProfileSummary } from '@/src/intelligence/leaderboards/models/profile-summary.models';

export default function PublicProfilePage() {
  const params = useParams();
  const username = typeof params?.username === 'string' ? params.username : 'tourist';
  const [profile, setProfile] = useState<PublicProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await LeaderboardApi.getProfile(username);
      setProfile(res);
      setLoading(false);
    }
    load();
  }, [username]);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400 font-mono text-xs">
        Loading public profile for @{username}...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center space-y-3">
        <h1 className="text-xl font-bold text-slate-200">User Not Found</h1>
        <p className="text-xs text-slate-400 font-mono">No public user profile found for @{username}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600/30 border border-indigo-500 flex items-center justify-center text-2xl font-bold text-indigo-300">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              @{profile.username}
              {profile.titles[0] && (
                <span className="text-xs font-mono font-normal bg-indigo-950 text-indigo-300 border border-indigo-800/40 px-2.5 py-0.5 rounded-full">
                  {profile.titles[0].title}
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Member since {new Date(profile.joinedDate).toLocaleDateString()} • {profile.country || 'Global'}
            </p>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-xs text-slate-400 block">Global Rank</span>
          <span className="text-2xl font-extrabold text-amber-400">#{profile.globalRank}</span>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Experience XP</span>
          <strong className="text-lg font-bold text-indigo-400">{profile.xp.toLocaleString()} XP</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Contest Rating</span>
          <strong className="text-lg font-bold text-emerald-400">{profile.rating}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Daily Streak</span>
          <strong className="text-lg font-bold text-amber-400">🔥 {profile.streak} Days</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Memory Health</span>
          <strong className="text-lg font-bold text-purple-400">{profile.memoryHealthScore}/100</strong>
        </div>
      </div>
    </div>
  );
}
