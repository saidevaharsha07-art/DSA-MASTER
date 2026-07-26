'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'objectives', label: 'Learning Objectives' },
  { id: 'signals', label: 'Recognition Signals' },
  { id: 'usage', label: 'When To Use' },
  { id: 'complexity', label: 'Complexity' },
  { id: 'visual', label: 'Visual Explanation' },
  { id: 'code', label: 'Code Templates' },
  { id: 'mistakes', label: 'Common Mistakes' },
  { id: 'problems', label: 'Problem Roadmap' },
];

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-24 hidden lg:flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2 text-slate-400 px-4">
        <List className="w-5 h-5" />
        <span className="font-semibold uppercase tracking-wider text-xs">On this page</span>
      </div>
      <nav className="flex flex-col relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-slate-800">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative flex items-center py-2 px-8 text-sm font-medium transition-colors text-left ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className={`absolute left-0 w-[30px] flex justify-center`}>
                <div 
                  className={`w-1.5 h-1.5 rounded-full z-10 transition-colors ${
                    isActive ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-700'
                  }`}
                />
              </div>
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
