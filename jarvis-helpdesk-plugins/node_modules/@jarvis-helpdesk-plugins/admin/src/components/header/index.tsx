import { ArrowUp } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import * as Avatar from '@radix-ui/react-avatar';

import { Separator } from '@/shared/components/separator';
import Crown from '@/src/assets/svgs/crown.svg';
import JarvisLogo from '@/src/assets/svgs/jarvis-logo-without-text.svg';

import { Button } from '../button';

const Header = () => {
  return (
    <div className="border-separator flex justify-center border-b px-10 pb-2 pt-3">
      <div className="flex w-full max-w-content flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img src={JarvisLogo} alt="Jarvis Logo" className="h-8" />
          <h1 className="ml-2 text-xl/5 font-bold text-primary-700">Jarvis Helpdesk</h1>
          <div className="ml-20 flex flex-row items-center space-x-6">
            <NavLink
              to="/knowledge"
              className={({ isActive }) =>
                isActive
                  ? 'text-[13px]/[14px] text-primary-500 underline underline-offset-[0.5rem]'
                  : 'text-[13px]/[14px] text-gray-800'
              }
            >
              Knowledge
            </NavLink>
            <NavLink
              to="/ai-setting"
              className={({ isActive }) =>
                isActive
                  ? 'text-[13px]/[14px] font-semibold text-primary-500 underline underline-offset-[0.5rem]'
                  : 'text-[13px]/[14px] text-gray-800'
              }
            >
              AI Settings
            </NavLink>
          </div>
        </div>
        <div className="flex flex-row items-center justify-around gap-x-6">
          <div className="flex flex-row items-center gap-x-3.5">
            <div className="flex flex-row items-center gap-x-1.5">
              <img src={Crown} alt="Crown" className="size-3" />
              <p className="text-xs/3 font-medium">FREE</p>
            </div>
            <Button variant="primary" size="small">
              Upgrade
              <ArrowUp />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-5" />
          <Avatar.Root className="inline-flex size-[34px] select-none items-center justify-center overflow-hidden rounded-full border-2 align-middle">
            <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-white text-[14px] font-medium">
              PD
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>
    </div>
  );
};

export default Header;
