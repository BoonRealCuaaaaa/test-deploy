import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/shared/lib/utils/cn';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  isLoading?: boolean;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, isLoading, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        'flex h-[18px] w-[30px] min-w-[30px] items-center rounded-full bg-gray-300 data-[state=checked]:bg-primary-500',
        isLoading && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'relative flex size-3 translate-x-1 items-center justify-center rounded-full bg-white duration-100 data-[state=checked]:translate-x-[15px]'
        )}
      >
        {isLoading && (
          <div className={cn('h-3 w-3 animate-spin rounded-full border-2 border-gray-500 border-t-transparent')} />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
export default Switch;
