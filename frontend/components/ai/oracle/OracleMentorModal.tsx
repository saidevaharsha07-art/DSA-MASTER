'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Send, X, Bot, User, Brain, Lightbulb, Zap } from 'lucide-react';
import { oracleMentorService, MentorChatMessage } from '@/src/ai/mentor';
import { useToast } from '@/src/context/ToastContext';
import { useSettings } from '@/src/context/SettingsContext';

export function OracleMentorModal() {
  const pathname = usePathname();
  const { toast } = useToast();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<MentorChatMessage[]>(oracleMentorService.getChatHistory());

  if (
    pathname === '/settings' ||
    pathname?.startsWith('/settings') ||
    (pathname?.startsWith('/practice/') && pathname !== '/practice' && pathname !== '/practice/codechef')
  ) {
    return null;
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const reply = oracleMentorService.sendMessage(inputText);
    setMessages([...oracleMentorService.getChatHistory()]);
    setInputText('');
  };

  const handleQuickAction = (promptText: string) => {
    oracleMentorService.sendMessage(promptText);
    setMessages([...oracleMentorService.getChatHistory()]);
  };

  return (
    <>
      {/* FLOATING ASSISTANT BUTTON (BOTTOM RIGHT) */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            padding: '12px 20px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
            border: '1px solid var(--primary-border, rgba(255,255,255,0.2))',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 800,
            boxShadow: '0 8px 30px var(--primary-soft, rgba(16, 185, 129, 0.35))',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Sparkles size={16} /> 🔮 Ask Oracle AI
        </motion.button>
      )}

      {/* EXPANDED ORACLE CHAT MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 200,
              width: '420px',
              height: '560px',
              borderRadius: '24px',
              background: 'var(--surface)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              boxShadow: isLight
                ? '0 20px 60px rgba(0, 0, 0, 0.15), 0 2px 10px rgba(0, 0, 0, 0.05)'
                : '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px var(--accent-glow)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              color: 'var(--text-primary)',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              background: 'var(--surface-secondary)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)' }}>
                  <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)' }}>The Oracle AI Mentor</h3>
                  <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700 }}>● Online • FAANG Personal Tutor</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '6px', overflowX: 'auto', background: 'var(--surface)' }}>
              <button
                type="button"
                onClick={() => handleQuickAction('Explain the Two Pointers pattern in detail.')}
                style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--accent-primary)', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <Brain size={10} /> Explain Concept
              </button>

              <button
                type="button"
                onClick={() => handleQuickAction('How can I optimize O(N^2) loops using a Map?')}
                style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.25)', color: '#0284C7', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <Lightbulb size={10} /> Adaptive Hint
              </button>

              <button
                type="button"
                onClick={() => handleQuickAction('What is the best way to handle edge cases?')}
                style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#D97706', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <Zap size={10} /> Edge Cases
              </button>
            </div>

            {/* Chat Messages Body */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--background)' }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    alignSelf: m.sender === 'player' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '12px 14px',
                    borderRadius: m.sender === 'player' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: m.sender === 'player'
                      ? 'var(--accent-primary)'
                      : 'var(--card)',
                    border: m.sender === 'player'
                      ? 'none'
                      : '1px solid var(--border)',
                    color: m.sender === 'player' ? '#FFFFFF' : 'var(--text-primary)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    boxShadow: m.sender === 'player' ? '0 4px 12px var(--accent-glow)' : 'none',
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div style={{ padding: '12px 16px', background: 'var(--surface-secondary)', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask Oracle anything about algorithms..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--accent-primary)', border: 'none', color: '#FFF', cursor: 'pointer' }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
