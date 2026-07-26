'use client';

import { motion } from 'framer-motion';

interface AnimationTimelineProps {
  currentStep: number;
  totalSteps: number;
  onSeek: (step: number) => void;
}

export function AnimationTimeline({ currentStep, totalSteps, onSeek }: AnimationTimelineProps) {
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="flex flex-col gap-2 w-full max-w-3xl">
      <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Step {currentStep + 1}</span>
        <span>{totalSteps} Steps</span>
      </div>
      
      <div className="relative h-2 bg-slate-800 rounded-full cursor-pointer flex items-center">
        <div className="absolute inset-y-0 left-0 bg-slate-800 rounded-full w-full" />
        
        {/* Progress Fill */}
        <motion.div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Steps Clickable Area */}
        <div className="absolute inset-0 flex justify-between">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => onSeek(idx)}
              className="flex-1 h-full z-10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
