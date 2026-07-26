'use client';

import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onRestart,
  canGoNext,
  canGoPrev
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center gap-4 bg-slate-900/50 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
      <button
        onClick={onRestart}
        className="p-2 text-slate-400 hover:text-white transition-colors"
        title="Restart"
      >
        <RotateCcw className="w-5 h-5" />
      </button>

      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
        title="Previous Step"
      >
        <SkipBack className="w-5 h-5" />
      </button>

      <button
        onClick={onPlayPause}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 fill-current" />
        ) : (
          <Play className="w-6 h-6 fill-current ml-1" />
        )}
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
        title="Next Step"
      >
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  );
}
