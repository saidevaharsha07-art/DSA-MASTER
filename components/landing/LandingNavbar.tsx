'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { useSettings } from '@/src/context/SettingsContext';
import { Menu, X, User, ChevronRight, Sun, Moon } from 'lucide-react';

export function LandingNavbar() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { settings, updateSetting } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLight = settings?.appearance?.theme === 'light';

  const toggleTheme = () => {
    updateSetting('appearance', 'theme', isLight ? 'dark' : 'light');
  };

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why DSA Master', href: '#why-dsa-master' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-200 ${
      isLight 
        ? 'border-slate-200/80 bg-white/90 shadow-sm' 
        : 'border-slate-800/80 bg-[#070A0F]/90'
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-sm shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all">
            <div className={`flex h-full w-full items-center justify-center rounded-[7px] ${isLight ? 'bg-white' : 'bg-[#090D16]'}`}>
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-sky-500">
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
          <span className={`text-base font-extrabold tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            DSA <span className="text-sky-500">MASTER</span>
          </span>
        </Link>

        {/* Center Desktop Minimal Anchors */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isLight 
                  ? 'text-slate-600 hover:text-sky-600' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Auth / Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all cursor-pointer ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {isLight ? (
              <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
            )}
          </button>

          {isLoading ? (
            <div className={`h-8 w-20 animate-pulse rounded-md ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                  isLight
                    ? 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                    : 'bg-slate-800/80 text-slate-200 border-slate-700/60 hover:bg-slate-700'
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-sky-500">
                  <User className="h-3 w-3" />
                </div>
                <span className="max-w-[120px] truncate">{user?.email?.split('@')[0] || 'Account'}</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/25 transition"
              >
                <span>Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`text-sm font-medium px-3 py-1.5 transition-colors ${
                  isLight ? 'text-slate-700 hover:text-sky-600' : 'text-slate-300 hover:text-white'
                }`}
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

        {/* Mobile theme toggle + menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            className={`p-2 rounded-lg border ${
              isLight ? 'border-slate-200 bg-slate-100 text-slate-700' : 'border-slate-800 bg-slate-900 text-slate-300'
            }`}
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg ${isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-4 space-y-3 ${
          isLight ? 'border-slate-200 bg-white text-slate-800' : 'border-slate-800 bg-[#070A0F] text-slate-200'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-sm font-medium py-1.5 ${
                isLight ? 'text-slate-700 hover:text-sky-600' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className={`pt-3 border-t flex flex-col gap-2 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
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
                  className={`flex items-center justify-center rounded-lg border py-2 text-sm font-medium ${
                    isLight ? 'border-slate-300 bg-slate-100 text-slate-850' : 'border-slate-700 text-slate-200'
                  }`}
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
