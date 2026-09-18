'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { colors, typography } from '@/src/design';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export function Breadcrumbs({
  items,
  className,
  style,
  'aria-label': ariaLabel = 'Breadcrumb',
}: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={className} style={{ display: 'flex', alignItems: 'center', ...style }}>
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: '6px',
          fontFamily: typography.fontFamily.sans,
          fontSize: '13px',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {index > 0 && (
                <ChevronRight
                  size={12}
                  style={{
                    color: colors.textMuted,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  style={{
                    color: isLast ? colors.textPrimary : colors.textMuted,
                    fontWeight: isLast ? 600 : 400,
                  }}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  prefetch={false}
                  style={{
                    color: colors.textMuted,
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.textPrimary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
