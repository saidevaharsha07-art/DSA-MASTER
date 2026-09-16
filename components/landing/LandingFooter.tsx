'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06090F] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <span className="text-xs font-bold">▲</span>
              </div>
              <span className="text-sm font-extrabold tracking-wider text-white">
                DSA <span className="text-sky-400">MASTER</span>
              </span>
            </Link>
            <div className="text-slate-400 text-xs leading-relaxed space-y-1">
              <p className="font-semibold text-slate-300">Learn. Practice. Grow.</p>
              <p>Your journey to becoming a better problem solver.</p>
            </div>
          </div>

          {/* Product Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="hover:text-sky-400 transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-sky-400 transition-colors">
                  Practice
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-sky-400 transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/mentor" className="hover:text-sky-400 transition-colors">
                  AI Mentor
                </Link>
              </li>
              <li>
                <Link href="/revision" className="hover:text-sky-400 transition-colors">
                  Revision
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-sky-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-sky-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-sky-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Stay Connected</h4>
            <p className="text-xs text-slate-400">
              Build your skills. One problem at a time.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/80 pt-6 text-[11px] text-slate-500 gap-3">
          <div>© 2026 DSA Master. All rights reserved.</div>
          <div className="text-slate-400 font-medium">Code Today. A Better Tomorrow.</div>
        </div>
      </div>
    </footer>
  );
}
