'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { useSettings } from '@/src/context/SettingsContext';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { radius, colors } from '@/src/design';

export function LandingNavbar() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { settings, updateSetting } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = settings?.appearance?.theme !== 'light';

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    updateSetting('appearance', 'theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  const navLinks = [
    { label: 'Journey', href: '/journey' },
    { label: 'Practice', href: '/practice' },
    { label: 'Interview', href: '/interview' },
    { label: 'Study Plan', href: '/study-plan' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: radius.md,
              background: 'var(--accent-subtle)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '18px', height: '18px' }}>
              <path
                d="M12 2L2 22H22L12 2Z"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="var(--accent-subtle)"
              />
              <path d="M12 9L7 19H17L12 9Z" fill="var(--accent)" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            DSA <span style={{ color: 'var(--accent)' }}>Magna</span>
          </span>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: '28px',
          }}
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle & Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: radius.md,
              background: 'transparent',
              border: '1px solid var(--border)',
              color: isDark ? '#F59E0B' : 'var(--accent)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Dynamic Auth Buttons */}
          <div className="hidden sm:flex" style={{ alignItems: 'center', gap: '8px' }}>
            {isLoading ? (
              <div
                style={{
                  width: '80px',
                  height: '34px',
                  borderRadius: radius.md,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                }}
              />
            ) : isAuthenticated ? (
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">
                  Dashboard <ArrowRight size={13} />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="flex md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: radius.md,
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div
            style={{
              height: '1px',
              backgroundColor: 'var(--border)',
              margin: '6px 0',
            }}
          />

          {isAuthenticated ? (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none' }}
            >
              <Button variant="primary" size="md" style={{ width: '100%' }}>
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outline" size="md" style={{ width: '100%' }}>
                  Sign In
                </Button>
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="primary" size="md" style={{ width: '100%' }}>
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
