import React from 'react';
import { Input, InputProps } from './Input';
import { Search as SearchIcon } from 'lucide-react';
import { colors } from '@/src/design';

export const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <Input
        ref={ref}
        leftIcon={<SearchIcon size={16} color={colors.muted} />}
        placeholder="Search..."
        {...props}
      />
    );
  }
);
Search.displayName = 'Search';
