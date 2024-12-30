import { Book } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { Button } from '@/src/components/button';
import { Toaster } from '@/src/components/toaster';

import { NAV_TABS } from './constants/nav-tabs';

const AiSettingTabs = () => {
  return (
    <div className="mb-10 flex w-full items-stretch justify-center border-b pt-[14px]">
      <div className="flex gap-x-7">
        {NAV_TABS.map(({ title, link }: { title: string; link: string }) => {
          return (
            <NavLink
              key={link}
              end
              to={link}
              className={({ isActive }) =>
                isActive
                  ? 'flex h-full items-center border-b-2 border-primary-500 pb-2 text-sm text-primary-500'
                  : 'flex h-full items-center pb-2 text-sm text-gray-800'
              }
            >
              {title}
            </NavLink>
          );
        })}
      </div>
      <div className="flex flex-1 justify-end pb-3">
        <Button variant="light" size="small" className="gap-x-1">
          <Book />
          Guides
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default AiSettingTabs;
