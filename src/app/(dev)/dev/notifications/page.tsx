'use client';

import React, { useState, useEffect } from 'react';
import { NotificationService } from '@/src/lib/notifications/services/notification.service';
import { NotificationState } from '@/src/lib/notifications/services/notification-state.service';
import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { JSONViewer } from '../components/JSONViewer';

export default function DevNotificationsPage() {
  const [service] = useState<NotificationService>(() => {
    if (!Container.has('NotificationService')) {
      Container.registerSingleton('NotificationService', new NotificationService());
    }
    return Container.resolve<NotificationService>('NotificationService');
  });

  const [state, setState] = useState<NotificationState>(() => service.stateService.getState());

  useEffect(() => {
    const unsub = service.stateService.subscribe((next) => setState(next));
    return unsub;
  }, [service]);

  const handleSimulateAchievement = () => {
    EventBus.publish('AchievementUnlocked', { name: 'Grandmaster Solver' });
  };

  const handleScheduleDailyReminder = async () => {
    await service.scheduleReminder('Daily Practice', 'Time to solve your daily recommended problem!', 'daily_practice', 'daily');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🔔</span> Unified Notifications & Reminder Framework Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect notification feed, unread counter, priority queue delivery, scheduled reminders, and preferences.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Event & Reminder Simulator</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button onClick={handleSimulateAchievement} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Simulate Achievement Event
          </button>
          <button onClick={handleScheduleDailyReminder} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium">
            Schedule Daily Practice Reminder
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Total Notifications</span>
          <strong className="text-xl font-bold text-slate-200">{state.items.length}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Unread Count</span>
          <strong className="text-xl font-bold text-amber-400">{state.unreadCount}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Active Reminders</span>
          <strong className="text-xl font-bold text-indigo-400">{state.reminders.length}</strong>
        </div>
      </div>

      <JSONViewer data={{ state, preferences: service.preferenceService.getPreferences() }} title="Raw Notification State & Preferences" defaultExpanded={true} />
    </div>
  );
}
