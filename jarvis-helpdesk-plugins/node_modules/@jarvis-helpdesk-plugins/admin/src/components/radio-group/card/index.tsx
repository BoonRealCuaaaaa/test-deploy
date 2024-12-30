'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/shared/lib/utils/cn';

const RadioGroupCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('divide-separator grid divide-y', className)} {...props} ref={ref} />;
});
RadioGroupCard.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupCardItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        'flex flex-row items-center px-[30px] py-5',
        className
      )}
      {...props}
    >
      {/* Render children here */}
      {children && <span className="flex flex-1 flex-col items-start gap-y-2">{children}</span>}
      <div className="size-[22px] rounded-full border border-gray-300">
        <RadioGroupPrimitive.Indicator className="">
          <div className="flex size-full items-center justify-center rounded-full bg-primary-500">
            <div className="size-3 rounded-full bg-white"></div>
          </div>
        </RadioGroupPrimitive.Indicator>
      </div>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupCardItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroupCard, RadioGroupCardItem };
