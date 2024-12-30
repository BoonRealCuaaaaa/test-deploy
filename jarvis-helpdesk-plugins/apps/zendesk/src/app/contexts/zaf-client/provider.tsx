import { PropsWithChildren } from 'react';

import Loader from '@/shared/components/loader';

import { useZafClientProvider, ZafClientContext } from './context';

const ZafClientProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const { client, isInitialized, zendeskUser } = useZafClientProvider();

  if (!isInitialized) {
    return <Loader />;
  }

  return <ZafClientContext.Provider value={{ client, zendeskUser }}>{children}</ZafClientContext.Provider>;
};

export default ZafClientProvider;
