import { useState } from 'react';
import { BoxArrowUpRight, Gear } from 'react-bootstrap-icons';

import { Button } from '@/src/components/button';
import { Switch } from '@/src/components/switch';

export interface PlatformCardProps {
  id: string | null;
  icon: string;
  platformName: string;
  isEnable: boolean;
  onSettingClick: () => void;
  onUpdateIntegration: ({
    integrationPlatformId,
    data,
  }: {
    integrationPlatformId: string;
    data: { domain?: string; isEnable?: boolean };
  }) => void;
}

const PlatformCard = ({ id, icon, platformName, isEnable, onSettingClick, onUpdateIntegration }: PlatformCardProps) => {
  const [newIsEnable, setNewIsEnable] = useState(isEnable);
  const onButtonClick = () => {
    onSettingClick();
  };

  return (
    <div className="relative flex w-[240px] min-w-[240px] flex-col rounded-xl border border-gray-200">
      <BoxArrowUpRight className="text-lg-4 absolute right-4 top-4 text-gray-500" />
      <div className="flex flex-col gap-y-5 border-b border-gray-200 p-[30px]">
        <img src={icon} className="size-[46px]" />
        <span className="text-[16px]/[16px] font-medium">{platformName}</span>
      </div>
      <div className="flex items-center justify-between px-4 py-[14px]">
        <Button onClick={onButtonClick} variant="light" size="small" className="gap-x-1">
          <Gear className="text-gray-500" />
          Setting
        </Button>
        <Switch
          checked={newIsEnable}
          onCheckedChange={() => {
            if (!id) {
              onSettingClick();
              return;
            }

            onUpdateIntegration({
              integrationPlatformId: id,
              data: { isEnable: !newIsEnable },
            });
            setNewIsEnable(!newIsEnable);
          }}
        />
      </div>
    </div>
  );
};

export default PlatformCard;
