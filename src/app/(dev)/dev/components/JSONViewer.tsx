'use client';

import React, { useState } from 'react';

interface JSONViewerProps {
  data: any;
  title?: string;
  defaultExpanded?: boolean;
}

export const JSONViewer: React.FC<JSONViewerProps> = ({ data, title = 'Raw Object Inspector', defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, (key, value) => {
    if (value instanceof Set) return Array.from(value);
    if (value instanceof Map) return Object.fromEntries(value);
    return value;
  }, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:text-indigo-400 font-bold focus:outline-none"
          >
            {isExpanded ? '▼' : '►'} {title}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-200 bg-slate-800 px-2 py-0.5 rounded text-[11px] transition-colors"
          >
            {copied ? '[Copied!]' : '[Copy JSON]'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 max-h-96 overflow-y-auto font-mono text-xs text-indigo-300 bg-slate-950/90 whitespace-pre-wrap leading-relaxed">
          {jsonString}
        </div>
      )}
    </div>
  );
};
