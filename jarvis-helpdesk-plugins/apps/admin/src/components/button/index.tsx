import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs/3 font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        light: 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 hover:text-gray-800 hover:shadow-sm',
        secondary:
          'bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-800 hover:shadow-sm',
        primary: 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-sm',
        danger: 'bg-rose-500 hover:bg-rose-600 text-white hover:shadow-sm',
        ghost: 'text-gray-600 hover:bg-gray-200',
      },
      size: {
        large: 'h-12 px-6 gap-x-1.5 text-sm/[14px]',
        medium: 'h-10 px-4 gap-x-[5px] text-[13px]/[14px]',
        small: 'h-8 px-3 gap-x-1 text-xs/3',
        'extra-small': 'h-7 px-2 gap-x-[3px] text-[11px]/3',
        icon: 'size-7',
      },
    },
    defaultVariants: {
      variant: 'light',
      size: 'small',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
