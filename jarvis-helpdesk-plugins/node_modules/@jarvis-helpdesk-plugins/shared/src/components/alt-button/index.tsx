import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/cn';

// eslint-disable-next-line
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-primary-950 hover:bg-slate-100 rounded-xl',
        // destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        // outline: 'border border-primary-100 bg-background shadow-sm hover:bg-slate-100',
        // secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        // ghost: 'hover:bg-slate-100',
        // link: 'text-primary underline-offset-4 hover:underline',
        primary: 'bg-primary-gradient text-white hover:bg-primary-gradient-hover rounded-xl font-semibold',
        'icon-only': 'rounded-lg text-primary-950 hover:bg-slate-100',
        'primary-solid': 'bg-primary-600 text-white hover:bg-primary-700 rounded-xl font-semibold',
        secondary: 'rounded-full bg-gray-100 hover:bg-gray-300',
      },
      size: {
        default: 'h-10 px-3 py-2.5',
        xs: 'h-7 px-2 py-0 text-xs',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-[30px] w-[30px]',
        'small-icon': 'size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    // eslint-disable-next-line
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
