'use client';

import React from 'react';
import { spacing } from '@/src/design';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, maxWidth = 'xl', className, style, ...props }, ref) => {
    let maxW = '1400px';
    if (maxWidth === 'sm') maxW = '768px';
    else if (maxWidth === 'md') maxW = '1024px';
    else if (maxWidth === 'lg') maxW = '1200px';
    else if (maxWidth === 'full') maxW = '100%';

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '100%',
          maxWidth: maxW,
          margin: '0 auto',
          padding: '24px 20px 48px 20px',
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PageContainer.displayName = 'PageContainer';
