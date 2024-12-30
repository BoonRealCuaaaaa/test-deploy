import { AxiosResponse } from 'axios';

import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

import { IAssistantSettings } from '../libs/interfaces/ai-setting';

export const getAssistantSettings = (assistantId: string): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.get(`api/v1/assistants/${assistantId}`);
};

export const updateAssistantSettings = ({
  updatedWorkspace,
  assistantId,
}: {
  updatedWorkspace: any;
  assistantId: string;
}): Promise<AxiosResponse<{ updated: boolean; assistant: IAssistantSettings }>> => {
  return helpdeskPluginsApiAxios.patch(`api/v1/assistants/${assistantId}`, updatedWorkspace);
};
