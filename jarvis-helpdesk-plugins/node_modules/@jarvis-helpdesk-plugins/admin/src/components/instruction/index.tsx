import * as React from 'react';

import { cn } from '@/shared/lib/utils/cn';

const InstructionCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-separator shadow-widget flex w-[320px] min-w-[320px] flex-col gap-y-5 rounded-xl border bg-white px-[30px] py-[26px]',
        className
      )}
      {...props}
    />
  )
);
InstructionCard.displayName = 'Card';

const InstructionCardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-base font-medium text-primary-950', className)} {...props} />
  )
);
InstructionCardTitle.displayName = 'CardTitle';

const InstructionCardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm/[22px] font-normal text-gray-700', className)} {...props} />
  )
);
InstructionCardDescription.displayName = 'CardDescription';

const InstructionCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col gap-y-2.5', className)} {...props} />
);
InstructionCardContent.displayName = 'CardContent';

const InstructionCardLink = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-xs/3 font-medium text-primary-500 underline decoration-dotted underline-offset-4', className)}
      {...props}
    />
  )
);
InstructionCardLink.displayName = 'CardLink';

export {
  InstructionCard,
  InstructionCardContent,
  InstructionCardDescription,
  InstructionCardLink,
  InstructionCardTitle,
};
