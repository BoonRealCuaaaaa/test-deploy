import { AxiosResponse } from 'axios';

import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

export const getSourceApi = (knowledgeId: string, searchParams: URLSearchParams): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.get(`/api/v1/assistant-knowledges/${knowledgeId}/sources?${searchParams.toString()}`);
};

export const getKnowledgeApi = (knowledgeId: string): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.get(`/api/v1/assistant-knowledges/${knowledgeId}`);
};

export const updateKnowledgeApi = ({
  knowledgeId,
  name,
  description,
}: {
  knowledgeId: string;
  name: string;
  description: string;
}): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.patch(`/api/v1/assistant-knowledges/${knowledgeId}`, {
    name: name,
    description: description,
  });
};

export const deleteSourceApi = ({
  knowledgeId,
  sourceId,
}: {
  knowledgeId: string;
  sourceId: string;
}): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.delete(`/api/v1/assistant-knowledges/${knowledgeId}/sources/${sourceId}`);
};

export const updateSourceStatusApi = ({
  knowledgeId,
  sourceId,
  status,
}: {
  knowledgeId: string;
  sourceId: string;
  status: boolean;
}): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.patch(`/api/v1/assistant-knowledges/${knowledgeId}/sources/${sourceId}`, {
    status: status,
  });
};

export const importWebApi = ({
  knowledgeId,
  name,
  webUrl,
}: {
  knowledgeId: string;
  name: string;
  webUrl: string;
}): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.post(`/api/v1/assistant-knowledges/${knowledgeId}/web`, {
    name: name,
    webUrl: webUrl,
  });
};

export const importFileApi = ({
  knowledgeId,
  file,
}: {
  knowledgeId: string;
  file: File;
}): Promise<AxiosResponse<any>> => {
  const formData = new FormData();
  formData.append('file', file);
  return helpdeskPluginsApiAxios.post(`/api/v1/assistant-knowledges/${knowledgeId}/local-file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};