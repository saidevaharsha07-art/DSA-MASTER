'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { colors, shadows, typography, zIndex, spacing } from '@/src/design';
import { motion, AnimatePresence } from 'framer-motion';

export function Drawer({ open, onOpenChange, title, description, children, trigger, side = 'right' }: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  side?: 'left' | 'right';
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      
      <AnimatePresence>
        {open !== false && ( 
          <Dialog.Portal>
            <Dialog.Overlay style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'fixed', inset: 0, zIndex: zIndex.modal,
              backdropFilter: 'blur(4px)'
            }} />
            <Dialog.Content style={{
              backgroundColor: colors.card,
              boxShadow: shadows.xl,
              position: 'fixed',
              top: 0, bottom: 0,
              [side]: 0,
              width: '400px',
              maxWidth: '100vw',
              padding: spacing.xl,
              zIndex: zIndex.modal + 1,
              borderLeft: side === 'right' ? `1px solid ${colors.border}` : 'none',
              borderRight: side === 'left' ? `1px solid ${colors.border}` : 'none',
              overflowY: 'auto',
              fontFamily: typography.fontFamily.sans,
              display: 'flex',
              flexDirection: 'column',
              animation: `0.3s cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal none running ${side === 'right' ? 'slideInRight' : 'slideInLeft'}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg }}>
                <div>
                  {title && <Dialog.Title style={{ margin: 0, fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.foreground }}>{title}</Dialog.Title>}
                  {description && <Dialog.Description style={{ margin: `${spacing.sm} 0 0`, color: colors.muted, fontSize: typography.fontSize.caption }}>{description}</Dialog.Description>}
                </div>
                <Dialog.Close asChild>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: colors.muted, padding: spacing.xs }}>
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </div>
              
              <div style={{ flex: 1 }}>{children}</div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
