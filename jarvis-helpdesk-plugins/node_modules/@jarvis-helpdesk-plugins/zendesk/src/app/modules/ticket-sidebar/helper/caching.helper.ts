import { TicketAnalyzeResponse } from '@/src/app/lib/types/response';

import { TICKET_SIDEBAR_QUERY_KEY } from '../contants/query-keys';

export interface CachedData {
  lastMessageTime: string;
  data: TicketAnalyzeResponse;
}

export interface CachedDataList {
  [key: number]: CachedData;
}

export function getCachedData(ticketId: number): CachedData | null {
  const cachedTickets = localStorage.getItem(TICKET_SIDEBAR_QUERY_KEY.TICKET_CACHING);
  const cachedObj: CachedDataList = cachedTickets ? (JSON.parse(cachedTickets) as CachedDataList) : {};
  return cachedObj[ticketId] || null;
}

export function setCachedData(ticketId: number, data: CachedData): void {
  const cachedTickets = localStorage.getItem(TICKET_SIDEBAR_QUERY_KEY.TICKET_CACHING);
  const cachedObj: CachedDataList = cachedTickets ? (JSON.parse(cachedTickets) as CachedDataList) : {};
  cachedObj[ticketId] = data;
  localStorage.setItem(TICKET_SIDEBAR_QUERY_KEY.TICKET_CACHING, JSON.stringify(cachedObj));
}

export function setAutoResponseCachedData(autoResponse: boolean): void {
  const cachedTickets = localStorage.getItem(TICKET_SIDEBAR_QUERY_KEY.TICKET_CACHING);
  const cachedObj: CachedDataList = cachedTickets ? (JSON.parse(cachedTickets) as CachedDataList) : {};

  Object.values(cachedObj).forEach((cachedData) => {
    cachedData.data.isAutoResponse = autoResponse;
  });

  localStorage.setItem(TICKET_SIDEBAR_QUERY_KEY.TICKET_CACHING, JSON.stringify(cachedObj));
}

export function checkCachedData(ticketId: number, lastMessageTime: string): boolean {
  const cachedTickets = localStorage.getItem(TICKET_SIDEBAR_QUERY_KEY.TICKET_CACHING);
  const cachedObj: CachedDataList = cachedTickets ? (JSON.parse(cachedTickets) as CachedDataList) : {};
  const cachedData = cachedObj[ticketId];

  if (!cachedData || lastMessageTime !== cachedData.lastMessageTime) {
    return false;
  }

  return true;
}
