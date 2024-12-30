import { AxiosResponse } from 'axios';

import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

import { IAssistantSettings } from '../libs/interfaces/ai-setting';

export const getContextUser = async (): Promise<AxiosResponse<IAssistantSettings>> => {
  return helpdeskPluginsApiAxios.get('/api/v1/users/me');
};