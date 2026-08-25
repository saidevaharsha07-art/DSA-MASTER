'use client';

import React, { useState, useEffect } from 'react';
import { EventBus, AppEvent } from '@/src/core/events/event-bus';
import { JSONViewer } from '../components/JSONViewer';

export default function DevEventsPage() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    const unsub = EventBus.subscribe('ProfileUpdated', (evt) => {
      setEvents((prev) => [evt, ...prev]);
    });
    return unsub;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>📡</span> Event Bus & Action Queue Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time event stream tracking ProfileUpdated, ProblemSolved, MemoryReviewed, ContestCompleted, and StrategyChanged events.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-100">Live Event Stream ({events.length})</h2>
        {events.length > 0 ? (
          <div className="space-y-2">
            {events.map((evt, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800 text-xs font-mono flex items-center justify-between">
                <span className="text-indigo-400 font-bold">{evt.type}</span>
                <span className="text-slate-400">{evt.timestamp}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">Listening for app bus events...</p>
        )}
      </div>

      <JSONViewer data={events} title="Event Log Objects" defaultExpanded={false} />
    </div>
  );
}
