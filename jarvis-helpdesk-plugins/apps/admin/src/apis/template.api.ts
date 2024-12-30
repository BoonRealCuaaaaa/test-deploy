import { AxiosResponse } from 'axios';

import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

import { ITemplate } from '../libs/interfaces/ai-setting';

export const addTemplateApi = ({
  assistantId,
  data,
}: {
  assistantId: string;
  data: { name: string; description: string; template: string };
}): Promise<AxiosResponse<ITemplate>> => {
  return helpdeskPluginsApiAxios.post('/api/v1/response-templates', { ...data, assistantId: assistantId });
};

export const getTemplatesApi = (assistantId: string): Promise<AxiosResponse<ITemplate[]>> => {
  return helpdeskPluginsApiAxios.get(`/api/v1/response-templates?assistantId=${assistantId}`);
};

export const updateTemplateApi = ({
  templateId,
  data,
}: {
  templateId: string;
  data: { name?: string; description?: string; template?: string };
}): Promise<AxiosResponse<{ updated: boolean; template: ITemplate }>> => {
  return helpdeskPluginsApiAxios.patch(`/api/v1/response-templates/${templateId}`, data);
};

export const deleteTemplateApi = (templateId: string): Promise<AxiosResponse<{ id: string; deleted: boolean }>> => {
  return helpdeskPluginsApiAxios.delete(`/api/v1/response-templates/${templateId}`);
};

export const activeTemplateApi = ({
  templateId,
  assistantId,
}: {
  templateId: string;
  assistantId: string;
}): Promise<AxiosResponse<{ updated: boolean; template: ITemplate }>> => {
  return helpdeskPluginsApiAxios.patch(`/api/v1/response-templates/${templateId}/activate`, {
    assistantId,
    isActive: true,
  });
};
