import React from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';

type SelectItemProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
} & React.ComponentPropsWithoutRef<typeof Select.Item>;

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          'text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] px-1 text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export interface SelectNumberProps {
  placeholder: number;
  nums?: number[];
  handleSelectNumber: (num: number) => void;
}

const SelectNumber = ({ placeholder, nums = [3, 5, 10, 15, 20, 25, 30], handleSelectNumber }: SelectNumberProps) => {
  return (
    <Select.Root
      onValueChange={(value) => {
        const num = parseInt(value, 10);
        if (!isNaN(num)) {
          handleSelectNumber(num);
        }
      }}
    >
      <Select.Trigger
        className="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 mx-2 inline-flex items-center justify-center gap-2 rounded bg-white p-2 text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Number"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.Viewport className="p-[5px]">
            {nums.map((num, index) => (
              <SelectItem key={index} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectNumber;
