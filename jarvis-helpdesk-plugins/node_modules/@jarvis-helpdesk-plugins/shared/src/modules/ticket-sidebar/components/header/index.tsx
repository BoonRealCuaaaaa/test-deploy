import { InfoCircle } from 'react-bootstrap-icons';
import * as Tooltip from '@radix-ui/react-tooltip';

import { Button } from '@/shared/components/alt-button';

import ToggleButton, { ToggleButtonProps } from '../../../../components/toggle-button';

import '@/shared/styles/index.css';

function TicketSidebarHeader(props: ToggleButtonProps) {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-1 flex-row items-center gap-1">
        <ToggleButton {...props} />
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root defaultOpen={false}>
            <Tooltip.Trigger asChild>
              <InfoCircle className="size-4 text-slate-500 opacity-60" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="tooltip w-72">
                {props.description}
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
      <Button variant={'primary-solid'} size={'small-icon'}>
        A
      </Button>
    </div>
  );
}

export default TicketSidebarHeader;
