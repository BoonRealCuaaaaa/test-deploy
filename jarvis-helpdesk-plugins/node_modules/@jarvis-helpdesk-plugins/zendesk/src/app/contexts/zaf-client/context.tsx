import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ZafRequestApi } from '../../apis/zaf-request';
import { QUERY_KEY } from '../../lib/constants/query-keys';
import { ZafClient } from '../../lib/types/zaf-client';
import { ZendeskUser } from '../../lib/types/zendesk';

export type ZafClientContextState = {
  client: ZafClient;
  zendeskUser: ZendeskUser;
  isInitialized?: boolean;
};

export const ZafClientContext = createContext<ZafClientContextState | undefined>(undefined);

export const useZafClientProvider = (): ZafClientContextState => {
  const client = useMemo(() => window.ZAFClient.init(), []);
  const [isAppRegistered, setIsAppRegistered] = useState(false);
  const [zendeskUser, setZendeskUser] = useState<ZendeskUser>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    client.on('app.registered', () => {
      setIsAppRegistered(true);
    });
  }, [client]);

  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.ZENDESK.CURRENT_USER],
    queryFn: () => ZafRequestApi.getCurrentUser(client),
    enabled: isAppRegistered,
  });

  useEffect(() => {
    if (user) {
      setZendeskUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (isAppRegistered && user) {
      setIsInitialized(true);
    }
  }, [isAppRegistered, user]);

  return {
    client,
    zendeskUser: zendeskUser!,
    isInitialized,
  };
};

export const useZafClient = () => {
  const context = useContext(ZafClientContext);
  if (context === undefined) {
    throw new Error('useZafClient must be used within a provider');
  }
  return context;
};
