'use client';

import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { colors } from '@/src/design';

interface ResizableWorkspaceProps {
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

export function ResizableWorkspace({ direction = 'horizontal', children }: ResizableWorkspaceProps) {
  return (
    <PanelGroup direction={direction}>
      {children}
    </PanelGroup>
  );
}

interface ResizablePaneProps {
  id?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children: React.ReactNode;
}

export function ResizablePane({ id, defaultSize, minSize = 10, maxSize, children }: ResizablePaneProps) {
  return (
    <Panel id={id} defaultSize={defaultSize} minSize={minSize} maxSize={maxSize}>
      {children}
    </Panel>
  );
}

export function ResizableDivider() {
  return (
    <PanelResizeHandle
      style={{
        width: '4px',
        backgroundColor: 'transparent',
        cursor: 'col-resize',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 4px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{
        width: '2px',
        height: '32px',
        backgroundColor: colors.border,
        borderRadius: '2px',
        transition: 'background-color 0.2s'
      }} />
    </PanelResizeHandle>
  );
}
