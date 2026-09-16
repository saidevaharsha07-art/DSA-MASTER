'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actionName?: string;
  redirectPath?: string;
}

export function AuthPromptModal({
  isOpen,
  onClose,
  title = 'Create your free account to save this progress',
  description = 'Sign in or create a free account to track your solved problems, sync across devices, save persistent drafts, and unlock personalized AI recommendations.',
  actionName,
  redirectPath,
}: AuthPromptModalProps) {
  if (!isOpen) return null;

  const redirectQuery = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B0E14] p-6 shadow-2xl shadow-sky-950/40 text-slate-100 z-10 font-sans"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Icon Header */}
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shadow-sm shadow-sky-500/20">
            <Sparkles className="h-6 w-6" />
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-white mb-2 leading-snug">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            {description}
          </p>

          {/* Feature highlights */}
          <div className="space-y-2 mb-6 rounded-xl bg-slate-900/60 p-3.5 border border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Save persistent drafts and submission history</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Earn XP, build streaks, and track real analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Activate spaced repetition and AI mentor coaching</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/signup${redirectQuery}`}
              onClick={onClose}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/25 hover:bg-sky-400 transition"
            >
              <span>Create Account</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={`/login${redirectQuery}`}
              onClick={onClose}
              className="w-full sm:flex-1 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
