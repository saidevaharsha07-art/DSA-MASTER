'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { Menu, X, User, ChevronRight } from 'lucide-react';

export function LandingNavbar() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why DSA Master', href: '#why-dsa-master' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070A0F]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-sm shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#090D16]">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-sky-400">
                <path
                  d="M12 2L2 22H22L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="url(#logo-grad)"
                  fillOpacity="0.2"
                />
                <path
                  d="M12 9L7 19H17L12 9Z"
                  fill="currentColor"
                />
                <defs>
                  <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38BDF8" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <span className="text-base font-extrabold tracking-wider text-white">
            DSA <span className="text-sky-400">MASTER</span>
          </span>
        </Link>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-slate-800" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700/60 hover:bg-slate-700 transition"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
                  <User className="h-3 w-3" />
                </div>
                <span className="max-w-[120px] truncate">{user?.email?.split('@')[0] || 'Account'}</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/25 hover:from-sky-400 hover:to-blue-500 transition"
              >
                <span>Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-sky-500 hover:bg-sky-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-400 hover:text-white p-2"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070A0F] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-white py-1.5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-sky-500 py-2.5 text-xs font-bold text-slate-950"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-lg border border-slate-700 py-2 text-sm font-medium text-slate-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-sky-500 py-2 text-sm font-bold text-slate-950"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
