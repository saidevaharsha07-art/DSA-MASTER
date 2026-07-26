import React from 'react';
import { HeadingBlock, ParagraphBlock, CalloutBlock } from '../../types';
import { motion } from 'framer-motion';
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

// ---------------------------
// Heading Block
// ---------------------------
export function HeadingBlockComponent({ block }: { block: HeadingBlock }) {
  const Tag = `h${block.content.level}` as any;
  
  const sizeClasses = {
    1: 'text-4xl md:text-5xl mb-6',
    2: 'text-3xl md:text-4xl mb-4 mt-8',
    3: 'text-2xl md:text-3xl mb-3 mt-6',
    4: 'text-xl md:text-2xl mb-2 mt-4',
    5: 'text-lg md:text-xl mb-2 mt-4',
    6: 'text-base md:text-lg mb-2 mt-4',
  };

  return (
    <Tag className={`font-bold text-white tracking-tight ${sizeClasses[block.content.level]}`}>
      {block.content.text}
    </Tag>
  );
}

// ---------------------------
// Paragraph Block
// ---------------------------
export function ParagraphBlockComponent({ block }: { block: ParagraphBlock }) {
  return (
    <p className="text-slate-300 text-lg leading-relaxed mb-6">
      {block.content.text}
    </p>
  );
}

// ---------------------------
// Callout Block
// ---------------------------
const calloutStyles = {
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: Info },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: AlertTriangle },
  danger: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', icon: AlertCircle },
  success: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', icon: CheckCircle },
};

export function CalloutBlockComponent({ block }: { block: CalloutBlock }) {
  const style = calloutStyles[block.content.variant] || calloutStyles.info;
  const Icon = style.icon;

  return (
    <div className={`flex flex-col gap-2 p-5 rounded-2xl border ${style.bg} ${style.border} mb-6`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${style.text}`} />
        {block.content.title && (
          <span className={`font-bold ${style.text}`}>{block.content.title}</span>
        )}
      </div>
      <p className="text-slate-300 leading-relaxed ml-7">
        {block.content.text}
      </p>
    </div>
  );
}
