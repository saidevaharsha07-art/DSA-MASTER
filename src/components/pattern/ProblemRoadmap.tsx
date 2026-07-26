'use client';

import { motion } from 'framer-motion';
import { ProblemReference } from '@/src/types/curriculum';
import { Map, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ProblemRoadmapProps {
  problems: ProblemReference[];
}

export function ProblemRoadmap({ problems }: ProblemRoadmapProps) {
  return (
    <div id="problems" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20">
          <Map className="w-6 h-6 text-fuchsia-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Problem Roadmap</h2>
      </div>

      <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-slate-800 ml-2">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center gap-6"
          >
            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border-4 border-slate-950 z-10 ${
              problem.difficulty === 'Easy' ? 'bg-green-500' :
              problem.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
            }`}>
              <span className="text-xs font-bold text-white uppercase">{problem.difficulty[0]}</span>
            </div>

            <div className="flex-1 flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-white/5 hover:border-fuchsia-500/30 transition-colors group">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-400 transition-colors">{problem.title}</h3>
                <span className={`text-sm font-medium ${
                  problem.difficulty === 'Easy' ? 'text-green-400' :
                  problem.difficulty === 'Medium' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
              
              <Link 
                href={problem.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
