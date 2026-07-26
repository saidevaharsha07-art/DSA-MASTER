'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationModel } from '@/src/types/visualization';
import { ArrayRenderer } from './ArrayRenderer';
import { PlaybackControls } from './PlaybackControls';
import { AnimationTimeline } from './AnimationTimeline';
import { Layers } from 'lucide-react';

interface VisualizationRendererProps {
  model: VisualizationModel;
}

const SPEEDS = [0.5, 1, 1.5, 2];

export function VisualizationRenderer({ model }: VisualizationRendererProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalFrames = model.frames.length;
  const currentFrame = model.frames[currentFrameIndex];

  const handleNext = useCallback(() => {
    setCurrentFrameIndex(prev => Math.min(prev + 1, totalFrames - 1));
  }, [totalFrames]);

  const handlePrev = useCallback(() => {
    setCurrentFrameIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (currentFrameIndex >= totalFrames - 1) {
        setIsPlaying(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 1500 / speedMultiplier);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentFrameIndex, handleNext, speedMultiplier, totalFrames]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Layers className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Interactive Animation</h2>
      </div>

      <div className="flex flex-col bg-slate-900/40 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative min-h-[500px]">
        {/* Title Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-slate-950/50">
          <h3 className="text-lg font-bold text-white">
            {currentFrame.title || `Step ${currentFrameIndex + 1}`}
          </h3>
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
            {SPEEDS.map(speed => (
              <button
                key={speed}
                onClick={() => setSpeedMultiplier(speed)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  speedMultiplier === speed ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Renderer Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-slate-900/20 to-transparent relative">
          {model.type === 'array' && currentFrame.state.arrays && (
            <ArrayRenderer 
              arrays={currentFrame.state.arrays} 
              pointers={currentFrame.state.pointers} 
            />
          )}
          {/* Add MatrixRenderer, TreeRenderer, etc. here later */}
        </div>

        {/* Explanation Banner */}
        <div className="p-6 bg-slate-950/80 border-t border-white/5 min-h-[100px] flex items-center justify-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentFrame.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-medium text-slate-200 text-center max-w-3xl leading-relaxed"
            >
              {currentFrame.explanation}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Playback Controls Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border-t border-white/5 bg-slate-950">
          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={handleNext}
            onPrev={handlePrev}
            onRestart={handleRestart}
            canGoNext={currentFrameIndex < totalFrames - 1}
            canGoPrev={currentFrameIndex > 0}
          />
          
          <div className="flex-1 flex justify-end w-full">
            <AnimationTimeline
              currentStep={currentFrameIndex}
              totalSteps={totalFrames}
              onSeek={(step) => {
                setCurrentFrameIndex(step);
                setIsPlaying(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
