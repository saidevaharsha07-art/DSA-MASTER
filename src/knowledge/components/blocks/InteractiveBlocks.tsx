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
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }} className="flex flex-col rounded-2xl overflow-hidden mb-6 shadow-md">
      <div style={{ background: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }} className="flex items-center gap-3 px-4 py-3">
        <Code2 style={{ color: 'var(--text-muted)' }} className="w-5 h-5" />
        <span style={{ color: 'var(--text-secondary)' }} className="text-xs font-semibold uppercase tracking-widest">
          {block.content.fileName || block.content.language}
        </span>
      </div>
      <div className="p-5 overflow-x-auto">
        <pre style={{ color: 'var(--text-primary)' }} className="font-mono text-sm leading-relaxed">
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
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }} className="flex flex-col gap-4 p-6 rounded-3xl mb-6 shadow-md">
      <h4 style={{ color: 'var(--text-primary)' }} className="text-lg font-bold mb-2">{block.content.question}</h4>
      
      <div className="flex flex-col gap-3">
        {block.content.options.map(option => (
          <button
            key={option.id}
            onClick={() => !isSubmitted && setSelectedId(option.id)}
            disabled={isSubmitted}
            style={{
              background: selectedId === option.id ? 'var(--accent-soft)' : 'var(--surface-secondary)',
              borderColor: selectedId === option.id ? 'var(--accent-primary)' : 'var(--border)',
              color: selectedId === option.id ? 'var(--accent-primary)' : 'var(--text-primary)',
            }}
            className={`text-left p-4 rounded-xl border transition-colors hover:border-[var(--accent-border)] ${
              isSubmitted && option.isCorrect ? '!bg-green-500/20 !border-green-500/50 !text-green-600 dark:!text-green-300' : ''
            } ${
              isSubmitted && selectedId === option.id && !option.isCorrect ? '!bg-red-500/20 !border-red-500/50 !text-red-600 dark:!text-red-300' : ''
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {!isSubmitted && selectedId && (
        <button
          onClick={() => setIsSubmitted(true)}
          style={{ background: 'var(--accent-primary)', color: '#FFFFFF' }}
          className="mt-2 px-6 py-3 font-bold rounded-xl transition-all self-end shadow-md"
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
              isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-300' : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-300'
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
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }} className="flex flex-col gap-4 p-6 rounded-3xl mb-6 shadow-md">
      {block.content.title && (
        <h4 style={{ color: 'var(--text-primary)' }} className="text-lg font-bold">{block.content.title}</h4>
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
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle style={{ color: 'var(--text-muted)' }} className="w-5 h-5 transition-colors" />
              )}
            </div>
            <span style={{ color: item.completed ? 'var(--text-muted)' : 'var(--text-primary)' }} className={`text-lg transition-colors ${item.completed ? 'line-through' : ''}`}>
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
          <div key={item.id} style={{ background: 'var(--card)', border: '1px solid var(--border)' }} className="flex flex-col rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex items-center justify-between p-5 text-left hover:bg-[var(--accent-soft)] transition-colors"
            >
              <span style={{ color: 'var(--text-primary)' }} className="font-bold text-lg">{item.title}</span>
              <ChevronDown style={{ color: 'var(--text-muted)' }} className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ color: 'var(--text-secondary)' }}
                  className="px-5 pb-5 leading-relaxed"
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
