'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    displayName: string;
    email: string;
    leetcode: string;
    codechef: string;
    codeforces: string;
    geeksforgeeks: string;
  }) => void;
  initialName: string;
  initialEmail: string;
  initialHandles: {
    leetcode: string;
    codechef: string;
    codeforces: string;
    geeksforgeeks: string;
  };
  isSaving: boolean;
}

export function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  initialName,
  initialEmail,
  initialHandles,
  isSaving,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [lcUser, setLcUser] = useState(initialHandles.leetcode || '');
  const [ccUser, setCcUser] = useState(initialHandles.codechef || '');
  const [cfUser, setCfUser] = useState(initialHandles.codeforces || '');
  const [gfgUser, setGfgUser] = useState(initialHandles.geeksforgeeks || '');

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setEmail(initialEmail);
      setLcUser(initialHandles.leetcode || '');
      setCcUser(initialHandles.codechef || '');
      setCfUser(initialHandles.codeforces || '');
      setGfgUser(initialHandles.geeksforgeeks || '');
    }
  }, [isOpen, initialName, initialEmail, initialHandles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      displayName: name.trim() || 'Developer',
      email: email.trim() || 'developer@dsamaster.dev',
      leetcode: lcUser.trim(),
      codechef: ccUser.trim(),
      codeforces: cfUser.trim(),
      geeksforgeeks: gfgUser.trim(),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 box-border">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border-strong)] rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col gap-5 text-[var(--text-primary)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] m-0">
                    Edit Developer Profile
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] m-0 mt-0.5">
                    Manage your profile information and handles
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors border-none bg-transparent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  Connected Handles (4 Platforms)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="LeetCode handle"
                    value={lcUser}
                    onChange={(e) => setLcUser(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
                  />
                  <input
                    type="text"
                    placeholder="CodeChef handle"
                    value={ccUser}
                    onChange={(e) => setCcUser(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Codeforces handle"
                    value={cfUser}
                    onChange={(e) => setCfUser(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
                  />
                  <input
                    type="text"
                    placeholder="GeeksForGeeks handle"
                    value={gfgUser}
                    onChange={(e) => setGfgUser(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-1.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold cursor-pointer transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
