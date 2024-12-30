import * as React from 'react';

import { cn } from '@/shared/lib/utils/cn';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, maxLength, ...props }, ref) => {
    return (
      <input
        type={type}
        maxLength={maxLength}
        className={cn(
          'file:text-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-600 focus:border-primary-500 focus:shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
