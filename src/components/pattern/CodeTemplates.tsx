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
        <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Code2 className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Code Templates</h2>
      </div>

      <div className="flex flex-col bg-slate-900 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/5">
          <div className="flex items-center gap-2">
            {availableLangs.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeLang === lang.id 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleCopy}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            title="Copy Code"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
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
              className="font-mono text-sm leading-relaxed text-slate-300"
            >
              <code>{templates[activeLang]}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
