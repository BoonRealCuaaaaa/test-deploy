import { AxiosResponse } from 'axios';

import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

import { ZendeskTicket } from '../lib/types/zendesk';

const getDraftResponse = async (
  ticket: ZendeskTicket,
  domain: string,
  signal: AbortSignal
): Promise<AxiosResponse<string, any>> => {
  try {
    const { conversation, requester, via } = ticket;
    const res = await helpdeskPluginsApiAxios.post(
      'api/v1/zendesk/draft-response',
      { conversation, requester, via, domain },
      { signal }
    );
    return res;
  } catch (error) {
    console.error('Error fetching draft response:', error);
    throw error;
  }
};

const getFormalizeResponse = async ({
  payload,
  givenText,
  variant,
  domain,
  signal,
}: {
  payload: Record<string, unknown>;
  givenText: string;
  variant: string;
  domain: string;
  signal: AbortSignal;
}): Promise<AxiosResponse<string, any>> => {
  try {
    const res = await helpdeskPluginsApiAxios.post(
      'api/v1/zendesk/formalize-response',
      { payload, givenText, variant, domain },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: signal,
      }
    );
    return res;
  } catch (error) {
    console.error('Error fetching formalize response:', error);
    throw error;
  }
};

export const TicketEditorApi = {
  getDraftResponse,
  getFormalizeResponse,
};
