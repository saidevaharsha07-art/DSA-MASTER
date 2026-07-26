import React from 'react';
import { BaseBlock } from '../../types';

export function GenericBlockComponent({ block }: { block: BaseBlock }) {
  return (
    <div className="p-4 border border-dashed border-white/20 rounded-xl bg-slate-900/50 mb-6 flex flex-col gap-2">
      <div className="text-xs font-mono text-slate-500 uppercase">Unsupported Block: {block.type}</div>
      <pre className="text-xs text-slate-400 overflow-x-auto">
        {JSON.stringify(block.content, null, 2)}
      </pre>
    </div>
  );
}
