'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveQuizBlock, ChecklistBlock, AccordionBlock, CodeBlock } from '../../types';
import { CheckCircle2, Circle, ChevronDown, Code2 } from 'lucide-react';

// ---------------------------
// Code Block
// ---------------------------
export function CodeBlockComponent({ block }: { block: CodeBlock }) {
  return (
    <div className="flex flex-col bg-slate-900 rounded-2xl border border-white/5 overflow-hidden mb-6 shadow-xl">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-950 border-b border-white/5">
        <Code2 className="w-5 h-5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
          {block.content.fileName || block.content.language}
        </span>
      </div>
      <div className="p-5 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-slate-300">
          <code>{block.content.code}</code>
        </pre>
      </div>
    </div>
  );
}

// ---------------------------
// Interactive Quiz Block
// ---------------------------
export function InteractiveQuizBlockComponent({ block }: { block: InteractiveQuizBlock }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedOption = block.content.options.find(o => o.id === selectedId);
  const isCorrect = selectedOption?.isCorrect;

  return (
    <div className="flex flex-col gap-4 p-6 bg-slate-900/40 rounded-3xl border border-white/5 mb-6">
      <h4 className="text-lg font-bold text-white mb-2">{block.content.question}</h4>
      
      <div className="flex flex-col gap-3">
        {block.content.options.map(option => (
          <button
            key={option.id}
            onClick={() => !isSubmitted && setSelectedId(option.id)}
            disabled={isSubmitted}
            className={`text-left p-4 rounded-xl border transition-colors ${
              selectedId === option.id
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-50'
                : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-800'
            } ${isSubmitted && option.isCorrect ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''}
            ${isSubmitted && selectedId === option.id && !option.isCorrect ? 'bg-red-500/20 border-red-500/50 text-red-300' : ''}`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {!isSubmitted && selectedId && (
        <button
          onClick={() => setIsSubmitted(true)}
          className="mt-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-colors self-end"
        >
          Check Answer
        </button>
      )}

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-4 p-4 rounded-xl border ${
              isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-300' : 'bg-red-500/10 border-red-500/20 text-red-300'
            }`}
          >
            <span className="font-bold block mb-1">
              {isCorrect ? 'Correct!' : 'Not quite.'}
            </span>
            <p className="text-sm">{block.content.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------
// Checklist Block
// ---------------------------
export function ChecklistBlockComponent({ block }: { block: ChecklistBlock }) {
  const [items, setItems] = useState(block.content.items);

  const toggleItem = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-slate-900/40 rounded-3xl border border-white/5 mb-6">
      {block.content.title && (
        <h4 className="text-lg font-bold text-white">{block.content.title}</h4>
      )}
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="flex items-start gap-3 text-left group"
          >
            <div className="mt-0.5 shrink-0">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500 group-hover:text-slate-400 transition-colors" />
              )}
            </div>
            <span className={`text-lg transition-colors ${item.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// Accordion Block
// ---------------------------
export function AccordionBlockComponent({ block }: { block: AccordionBlock }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 mb-6">
      {block.content.items.map(item => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="flex flex-col bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-bold text-white text-lg">{item.title}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 text-slate-300 leading-relaxed"
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
