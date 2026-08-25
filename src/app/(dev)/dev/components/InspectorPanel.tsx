'use client';

import React from 'react';
import { JSONViewer } from './JSONViewer';

interface InspectorPanelProps {
  data: any;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({ data, title = 'Live Object Inspector', isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-slate-950 border-l border-slate-800 p-6 z-50 shadow-2xl overflow-y-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 text-xs bg-slate-900 px-2 py-1 rounded"
        >
          Close [✕]
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Raw TypeScript model inspection for live backend execution.
      </p>

      <JSONViewer data={data} title={title} defaultExpanded={true} />
    </div>
  );
};
