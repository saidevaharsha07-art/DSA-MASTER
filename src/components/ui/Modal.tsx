'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { colors, radius, shadows, typography, zIndex, spacing } from '@/src/design';
import { motion, AnimatePresence } from 'framer-motion';

export function Modal({ open, onOpenChange, title, description, children, trigger }: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  trigger?: React.ReactNode;
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
              borderRadius: radius.xl,
              boxShadow: shadows.xl,
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw', maxWidth: '500px',
              maxHeight: '85vh',
              padding: spacing.lg,
              zIndex: zIndex.modal + 1,
              border: `1px solid ${colors.border}`,
              overflowY: 'auto',
              fontFamily: typography.fontFamily.sans,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md }}>
                <div>
                  {title && <Dialog.Title style={{ margin: 0, fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: colors.foreground }}>{title}</Dialog.Title>}
                  {description && <Dialog.Description style={{ margin: `${spacing.sm} 0 0`, color: colors.muted, fontSize: typography.fontSize.caption }}>{description}</Dialog.Description>}
                </div>
                <Dialog.Close asChild>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: colors.muted, padding: spacing.xs }}>
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>
              
              <div>{children}</div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
