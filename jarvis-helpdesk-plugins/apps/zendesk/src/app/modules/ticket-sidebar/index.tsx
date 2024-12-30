import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Loader from '@/shared/components/loader';
import { Separator } from '@/shared/components/separator';
import TicketSidebarHeader from '@/shared/modules/ticket-sidebar/components/header';
import TicketSidebarMain from '@/shared/modules/ticket-sidebar/components/main';

import { TicketSidebarApi } from '../../apis/ticket-sidebar';
import { ZafRequestApi } from '../../apis/zaf-request';
import { useZafClient } from '../../contexts/zaf-client/context';
import { StorageKeys } from '../../lib/constants/storage-keys';
import { ZafClient } from '../../lib/types/zaf-client';
import { ZendeskTicket } from '../../lib/types/zendesk';

import { TICKET_SIDEBAR_QUERY_KEY } from './contants/query-keys';
import { checkCachedData, getCachedData, setAutoResponseCachedData, setCachedData } from './helper/caching.helper';

import '@/shared/styles/index.css';

const TicketSidebar = () => {
  const { client }: { client: ZafClient } = useZafClient();

  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  const getTicketInformation = async () => {
    const ticket: ZendeskTicket = await ZafRequestApi.getTicket(client);
    const domain: string = await ZafRequestApi.getDomain(client);
    const lastMessageTime: string =
      ticket.conversation[ticket.conversation.length - 1]?.timestamp || new Date().toISOString();

    return { ticket, domain, lastMessageTime };
  };

  const {
    data: ticketData,
    isLoading: isTicketLoading,
    isError: isTicketError,
    error: ticketError,
  } = useQuery({
    queryKey: [TICKET_SIDEBAR_QUERY_KEY.TICKET_DATA],
    queryFn: async () => getTicketInformation(),
    refetchOnWindowFocus: false,
  });

  const {
    data,
    isLoading: isAnalyzing,
    isError,
    error,
  } = useQuery({
    queryKey: [TICKET_SIDEBAR_QUERY_KEY.TICKET_ANALYSIS, ticketData?.ticket.id], // Sử dụng ticketId
    queryFn: async () => {
      if (ticketData && !checkCachedData(ticketData.ticket.id, ticketData.lastMessageTime)) {
        const data = await TicketSidebarApi.getTicketAnalyze(ticketData.ticket, ticketData.domain);
        const cachedData = {
          lastMessageTime: ticketData.lastMessageTime,
          data,
        };
        setCachedData(ticketData.ticket.id, cachedData);
      }
      return ticketData ? getCachedData(ticketData.ticket.id)?.data : undefined;
    },
    enabled: !!ticketData, // Only run this query if `ticketData` is available
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    function handleResizeEvent() {
      client.invoke('resize', { height: `${sidebarContainerRef.current?.scrollHeight}px` });
    }

    window.addEventListener('resize', handleResizeEvent);
    handleResizeEvent();

    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    };
  }, [data]);
  const [isAutoResponseEnabled, setIsAutoResponseEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setIsAutoResponseEnabled(data.isAutoResponse);
    }
  }, [data]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `${StorageKeys.IS_AUTO_RESPONSE_ENABLED}`) {
        setIsAutoResponseEnabled(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleToggleDraftResponseSetting = async (checked: boolean) => {
    const domain: string = await ZafRequestApi.getDomain(client);
    localStorage.setItem(`${StorageKeys.IS_AUTO_RESPONSE_ENABLED}`, JSON.stringify(checked));
    await TicketSidebarApi.patchAutoResponse(domain, checked);
    if (ticketData) {
      setAutoResponseCachedData(checked);
    }
    setIsAutoResponseEnabled(checked);
  };

  if (isTicketLoading || isAnalyzing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader size={40} />
      </div>
    );
  }

  if (isTicketError || isError) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-primary-500">I'm so sorry. Something's wrong</h2>
        <p className="text-lg font-medium">{(ticketError || error)?.message}</p>
      </div>
    );
  }
  return (
    <div ref={sidebarContainerRef} className="flex flex-col space-y-3 bg-white">
      <Separator />
      <TicketSidebarHeader
        label="Auto response"
        checked={isAutoResponseEnabled}
        description="Automatically draft a response when entering this site or receiving a new message from client."
        onCheckedChange={handleToggleDraftResponseSetting}
      />
      <Separator />
      <TicketSidebarMain
        summary={data?.summary}
        sentiment={!data?.sentiment ? {} : data.sentiment}
        commentsCount={Number(data?.commentsCount) || 0}
        averageResponseTime={String(data?.averageResponseTime || 0)}
        lastMessageTime={String(data?.lastMessageTime || new Date().toISOString())}
        purchasingPotential={data?.purchasingPotential ?? { rating: 'Unknown', reason: 'Unknown' }}
      />
    </div>
  );
};

export default TicketSidebar;
