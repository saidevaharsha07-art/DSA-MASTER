import React from 'react';
import { colors } from '@/src/design';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', style, ...props }, ref) => {
    
    const baseStyle: React.CSSProperties = {
      border: 'none',
      backgroundColor: colors.border,
      margin: 0,
      flexShrink: 0,
    };

    if (orientation === 'horizontal') {
      baseStyle.height = '1px';
      baseStyle.width = '100%';
    } else {
      baseStyle.width = '1px';
      baseStyle.height = '100%';
    }

    return (
      <hr ref={ref} style={{ ...baseStyle, ...style }} {...props} />
    );
  }
);
Divider.displayName = "Divider";
