'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Send, X, Bot, User, Brain, Lightbulb, Zap } from 'lucide-react';
import { oracleMentorService, MentorChatMessage } from '@/src/ai/mentor';
import { useToast } from '@/src/context/ToastContext';

export function OracleMentorModal() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<MentorChatMessage[]>(oracleMentorService.getChatHistory());

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
            bottom: '80px',
            right: '24px',
            zIndex: 100,
            padding: '12px 20px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #A855F7, #7E22CE)',
            border: '1px solid #C084FC',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 30px rgba(168, 85, 247, 0.5)',
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
              bottom: '80px',
              right: '24px',
              zIndex: 200,
              width: '420px',
              height: '560px',
              borderRadius: '24px',
              background: 'linear-gradient(180deg, rgba(20, 16, 38, 0.98) 0%, rgba(13, 10, 25, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(168, 85, 247, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              color: '#FFF',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              background: 'rgba(168, 85, 247, 0.15)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.25)', border: '1px solid #C084FC' }}>
                  <Sparkles size={18} style={{ color: '#C084FC' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900 }}>The Oracle AI Mentor</h3>
                  <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700 }}>● Online • FAANG Personal Tutor</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
              <button
                type="button"
                onClick={() => handleQuickAction('Explain the Two Pointers pattern in detail.')}
                style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#C084FC', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <Brain size={10} /> Explain Concept
              </button>

              <button
                type="button"
                onClick={() => handleQuickAction('How can I optimize O(N^2) loops using a Map?')}
                style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)', color: '#38BDF8', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <Lightbulb size={10} /> Adaptive Hint
              </button>

              <button
                type="button"
                onClick={() => handleQuickAction('What is the best way to handle edge cases?')}
                style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <Zap size={10} /> Edge Cases
              </button>
            </div>

            {/* Chat Messages Body */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    alignSelf: m.sender === 'player' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '12px 14px',
                    borderRadius: m.sender === 'player' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: m.sender === 'player' ? 'linear-gradient(135deg, #A855F7, #7E22CE)' : 'rgba(255,255,255,0.05)',
                    border: m.sender === 'player' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    lineHeight: '1.6',
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div style={{ padding: '12px 16px', background: 'rgba(13, 10, 25, 0.98)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask Oracle anything about algorithms..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px', outline: 'none' }}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                style={{ padding: '10px 14px', borderRadius: '10px', background: '#A855F7', border: 'none', color: '#FFF', cursor: 'pointer' }}
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
