'use client';

import React from 'react';
import { colors, radius, animations } from '@/src/design';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = radius.md, style, ...props }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: colors.mutedBg,
        animation: `1.5s ease-in-out 0.5s infinite normal none running pulse`,
        ...style
      }}
      {...props}
    />
  );
}
