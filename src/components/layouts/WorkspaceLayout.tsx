'use client';

import React from 'react';
import { ResizableWorkspace, ResizablePane, ResizableDivider } from '../ui/ResizablePanel';

interface WorkspaceLayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel?: React.ReactNode;
  leftSize?: number;
  centerSize?: number;
  rightSize?: number;
}

export function WorkspaceLayout({ 
  leftPanel, 
  centerPanel, 
  rightPanel,
  leftSize = 25,
  centerSize = 50,
  rightSize = 25 
}: WorkspaceLayoutProps) {
  return (
    <div style={{ height: 'calc(100vh - 70px)', width: '100%', padding: '0 8px 8px' }}>
      <ResizableWorkspace direction="horizontal">
        <ResizablePane defaultSize={leftSize} minSize={15}>
          {leftPanel}
        </ResizablePane>
        
        <ResizableDivider />
        
        <ResizablePane defaultSize={rightPanel ? centerSize : 100 - leftSize} minSize={30}>
          {centerPanel}
        </ResizablePane>
        
        {rightPanel && (
          <>
            <ResizableDivider />
            <ResizablePane defaultSize={rightSize} minSize={15}>
              {rightPanel}
            </ResizablePane>
          </>
        )}
      </ResizableWorkspace>
    </div>
  );
}
