'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/shared/lib/utils/cn';

const RadioGroupCardSeparate = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-y-5', className)} {...props} ref={ref} />;
});
RadioGroupCardSeparate.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupCardSeparateItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn('flex flex-row items-center gap-x-4 rounded-xl border border-gray-200 p-4', className)}
      {...props}
    >
      <div className="size-[22px] rounded-full border border-gray-300">
        <RadioGroupPrimitive.Indicator className="">
          <div className="flex size-full items-center justify-center rounded-full bg-primary-500">
            <div className="size-3 rounded-full bg-white"></div>
          </div>
        </RadioGroupPrimitive.Indicator>
      </div>
      {/* Render children here */}
      {children}
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupCardSeparateItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroupCardSeparate, RadioGroupCardSeparateItem };
