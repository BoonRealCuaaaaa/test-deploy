import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getContextUser } from '@/src/apis/user.api';
import FullscreenLoader from '@/src/components/full-screen-loader';
import { useAppStore } from '@/src/store';

import AiSettingTabs from './components/tabs';

const AiSettingPage = () => {
  const setAssistant = useAppStore((state) => state.setAssistant);

  const { data: assistant, isLoading: isAssistantLoading } = useQuery({
    queryKey: ['assistant'],
    queryFn: getContextUser,
  });

  if (isAssistantLoading) {
    return <FullscreenLoader />;
  }

  if (!assistant) {
    return <Navigate to={'/interrupts'} />;
  }

  setAssistant(assistant.data);

  return (
    <div className="flex w-full flex-col items-center gap-y-5">
      <div className="w-5/6 lg:w-4/5 xl:w-3/4">
        <AiSettingTabs />
        <Outlet />
      </div>
    </div>
  );
};

export default AiSettingPage;
