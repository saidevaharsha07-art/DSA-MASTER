'use client';

import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, badge, children }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        {badge && <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">{badge}</span>}
      </div>
      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
