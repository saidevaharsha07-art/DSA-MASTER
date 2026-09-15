'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeTemplates as CodeTemplatesType } from '@/src/types/curriculum';
import { Code2, Check, Copy } from 'lucide-react';

interface CodeTemplatesProps {
  templates: CodeTemplatesType;
}

type Language = keyof CodeTemplatesType;

const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'javascript', label: 'JavaScript' }
];

export function CodeTemplates({ templates }: CodeTemplatesProps) {
  const availableLangs = LANGUAGES.filter(l => templates[l.id]);
  const [activeLang, setActiveLang] = useState<Language>(availableLangs[0]?.id || 'python');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = templates[activeLang];
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (availableLangs.length === 0) return null;

  return (
    <div id="code" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center gap-3">
        <div style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)' }} className="p-2 rounded-xl">
          <Code2 style={{ color: 'var(--accent-primary)' }} className="w-6 h-6" />
        </div>
        <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">Code Templates</h2>
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }} className="flex flex-col rounded-2xl overflow-hidden shadow-lg">
        <div style={{ background: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }} className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {availableLangs.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                style={{
                  background: activeLang === lang.id ? 'var(--accent-soft)' : 'transparent',
                  color: activeLang === lang.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: activeLang === lang.id ? '1px solid var(--accent-border)' : '1px solid transparent',
                }}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-[var(--accent-soft)]"
              >
                {lang.label}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleCopy}
            style={{ color: 'var(--text-muted)' }}
            className="p-2 rounded-lg hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeLang}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ color: 'var(--text-primary)' }}
              className="font-mono text-sm leading-relaxed"
            >
              <code>{templates[activeLang]}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
