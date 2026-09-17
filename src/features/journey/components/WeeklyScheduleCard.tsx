'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  BookOpen,
  Code2,
  RotateCcw,
  Timer,
  Trophy,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { DailyScheduleItem } from '../types/journey.types';

interface WeeklyScheduleCardProps {
  plan: DailyScheduleItem[];
}

export function WeeklyScheduleCard({ plan }: WeeklyScheduleCardProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 border flex flex-col gap-6"
      style={{
        background: 'var(--card)',
        borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-purple-500" />
          <h3 className="text-base font-extrabold text-[var(--text-primary)]">
            Personal 7-Day Learning Plan
          </h3>
        </div>
        <span className="text-xs text-[var(--text-muted)] font-semibold">
          Adaptive Balanced Cadence
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {plan.map((item) => {
          const isInterview = item.actionType === 'INTERVIEW';
          const isContest = item.actionType === 'CONTEST';
          const isRevise = item.actionType === 'REVISE';
          const isLearn = item.actionType === 'LEARN';

          const badgeColor = isContest
            ? '#EC4899'
            : isInterview
            ? '#8B5CF6'
            : isRevise
            ? '#EF4444'
            : isLearn
            ? '#3B82F6'
            : '#10B981';

          return (
            <div
              key={item.dayIndex}
              className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between gap-3 hover:border-pink-500/40 transition-colors"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase text-[var(--text-muted)]">
                    {item.dayName.substring(0, 3)}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase"
                    style={{
                      background: `${badgeColor}18`,
                      color: badgeColor,
                    }}
                  >
                    {item.actionType}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[var(--text-primary)] line-clamp-2">
                  {item.topicTitle}
                </h4>

                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {item.reason}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-muted)] flex items-center gap-1 font-semibold">
                  <Clock size={11} /> {item.estimatedMinutes}m
                </span>

                <Link
                  href={item.actionUrl}
                  className="font-bold text-pink-500 hover:text-pink-600 flex items-center gap-0.5"
                >
                  Start <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
