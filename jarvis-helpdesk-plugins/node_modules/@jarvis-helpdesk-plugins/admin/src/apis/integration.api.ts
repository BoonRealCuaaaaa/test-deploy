import { AxiosResponse } from 'axios';

import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

import { Integration } from '../libs/constants/integration';
import { IIntegrationPlatform } from '../libs/interfaces/ai-setting';

export const getIntegrationApi = (assistantId: string): Promise<AxiosResponse<IIntegrationPlatform[]>> => {
  return helpdeskPluginsApiAxios.get(`/api/v1/integration-platforms?assistantId=${assistantId}`);
};

export const createIntegrationApi = ({
  data,
  assistantId,
}: {
  assistantId: string;
  data: { type: Integration; domain: string };
}): Promise<AxiosResponse<IIntegrationPlatform>> => {
  return helpdeskPluginsApiAxios.post('/api/v1/integration-platforms', { ...data, assistantId: assistantId });
};

export const updateIntegrationApi = ({
  integrationPlatformId,
  data,
}: {
  integrationPlatformId: string;
  data: { domain?: string; isEnable?: boolean };
}): Promise<AxiosResponse<{ updated: boolean; integrationPlatform: IIntegrationPlatform }>> => {
  return helpdeskPluginsApiAxios.patch(`/api/v1/integration-platforms/${integrationPlatformId}`, data);
};
