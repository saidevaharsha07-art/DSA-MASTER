'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function LandingFooter() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  return (
    <footer className={`border-t text-xs transition-colors duration-200 ${
      isLight 
        ? 'border-slate-200 bg-slate-50 text-slate-600' 
        : 'border-slate-800/80 bg-[#06090F] text-slate-400'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                isLight 
                  ? 'bg-sky-50 border-sky-200 text-sky-600' 
                  : 'bg-sky-500/10 border-sky-500/30 text-sky-400'
              }`}>
                <span className="text-xs font-bold">▲</span>
              </div>
              <span className={`text-sm font-extrabold tracking-wider ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                DSA <span className={isLight ? 'text-sky-600' : 'text-sky-400'}>MASTER</span>
              </span>
            </Link>
            <div className={`text-xs leading-relaxed space-y-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <p className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>LEARN · PRACTICE · TRACK · CRACK</p>
              <p className={`italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>&ldquo;You don&apos;t have to figure it all out alone.&rdquo;</p>
              <p className={`text-[11px] pt-1 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>A companion for your daily problem-solving journey.</p>
            </div>
          </div>

          {/* Product Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Structured Roadmap
                </Link>
              </li>
              <li>
                <Link href="/practice" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Practice Arena
                </Link>
              </li>
              <li>
                <Link href="/analytics" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Intelligent Analytics
                </Link>
              </li>
              <li>
                <Link href="/revision" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Smart Revision
                </Link>
              </li>
              <li>
                <Link href="/mentor" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  AI Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform / Account Col */}
          <div className="md:col-span-2 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>Platform</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-dsa-master" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Why DSA Master
                </a>
              </li>
              <li>
                <Link href="/login" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className={`transition-colors ${isLight ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Community / Legal Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>Connect & Trust</h4>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Build problem-solving ability with consistency and clarity.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            <div className={`pt-2 flex items-center gap-4 text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
              <span>·</span>
              <a href="#terms" className="hover:underline">Terms of Service</a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-between border-t pt-6 text-[11px] gap-3 ${
          isLight 
            ? 'border-slate-200 text-slate-500' 
            : 'border-slate-800/80 text-slate-500'
        }`}>
          <div>© 2026 DSA Master. All rights reserved.</div>
          <div className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Code Today. A Better Tomorrow.</div>
        </div>
      </div>
    </footer>
  );
}
