import React from 'react';
import { colors } from '@/src/design';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string;
  horizontal?: boolean;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, maxHeight, horizontal, style, ...props }, ref) => {
    
    return (
      <div
        ref={ref}
        style={{ 
          overflowY: 'auto',
          overflowX: horizontal ? 'auto' : 'hidden',
          maxHeight,
          // Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.border} transparent`,
          ...style 
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";
