import * as Switch from '@radix-ui/react-switch';

export interface ToggleButtonProps {
  label: string;
  checked: boolean;
  description: string;
  onCheckedChange: (checked: boolean) => void;
}

function ToggleButton(props: ToggleButtonProps) {
  return (
    <div>
      <div className="flex items-center">
        <Switch.Root
          checked={props.checked}
          onCheckedChange={props.onCheckedChange}
          className="relative h-[22px] w-[34px] cursor-pointer rounded-full bg-slate-200 data-[state=checked]:bg-primary-500"
        >
          <Switch.Thumb className="block size-4 translate-x-1 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[16px]" />
        </Switch.Root>
        <div className="ml-2.5 text-sm/[14px] font-medium text-black">{props.label}</div>
      </div>
      {/* <div className="mt-2 text-sm font-medium text-slate-500">{props.description}</div> */}
    </div>
  );
}

export default ToggleButton;
