'use client';

import React, { useState, useEffect } from 'react';
import { RealtimeService } from '@/src/lib/realtime/services/realtime.service';
import { RealtimeStateSnapshot } from '@/src/lib/realtime/services/realtime-state.service';
import { Container } from '@/src/core/container/container';
import { JSONViewer } from '../components/JSONViewer';

export default function DevLivePage() {
  const [service] = useState<RealtimeService>(() => {
    if (!Container.has('RealtimeService')) {
      Container.registerSingleton('RealtimeService', new RealtimeService());
    }
    return Container.resolve<RealtimeService>('RealtimeService');
  });

  const [state, setState] = useState<RealtimeStateSnapshot>(() => service.stateService.getState());

  useEffect(() => {
    const unsub = service.stateService.subscribe((next) => setState(next));
    return unsub;
  }, [service]);

  const handleConnectToggle = async () => {
    if (state.connection.status === 'connected') {
      await service.disconnect();
    } else {
      await service.connect();
    }
  };

  const handlePublishPracticeEvent = async () => {
    await service.publish('practice', 'ProblemSolved', { problemId: 'P-101', xp: 50 });
  };

  const handleReplay = () => {
    service.replay();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>⚡</span> Real-Time Update & Event Streaming Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect connection status, presence heartbeats, channel subscriptions, event replay queues, and stream throughput.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Streaming Triggers & Connection Controls</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={handleConnectToggle}
            className={`px-3 py-2 text-white rounded font-medium ${
              state.connection.status === 'connected' ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {state.connection.status === 'connected' ? 'Disconnect Real-Time' : 'Connect Real-Time Engine'}
          </button>
          <button onClick={handlePublishPracticeEvent} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Publish Event onto &apos;practice&apos; Channel
          </button>
          <button onClick={handleReplay} className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium">
            Replay Queue Events
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Connection Status</span>
          <strong className="text-xl font-bold text-emerald-400">{state.connection.status.toUpperCase()}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Presence Status</span>
          <strong className="text-xl font-bold text-indigo-400">{state.presence.status}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Active Channels</span>
          <strong className="text-xl font-bold text-amber-400">{state.channels.length}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Event Throughput</span>
          <strong className="text-xl font-bold text-purple-400">{state.eventThroughputCount}</strong>
        </div>
      </div>

      <JSONViewer data={state} title="Raw Real-Time Connection & Channel State Inspector" defaultExpanded={true} />
    </div>
  );
}
