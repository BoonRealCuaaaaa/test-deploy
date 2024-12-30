import { AxiosResponse } from "axios";

import helpdeskPluginsApiAxios from "@/shared/lib/clients/axios/helpdesk-plugins-api";

export const getKnowledgeApi = (
  searchParams: URLSearchParams
): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.get(`/api/v1/assistant-knowledges?${searchParams.toString()}`);
};

export const addKnowledgeApi = ({
  name,
  description,
}: {
  name: string;
  description: string;
}): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.post(`/api/v1/assistant-knowledges`, {
    name,
    description,
  });
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
  return helpdeskPluginsApiAxios.patch(
    `/api/v1/assistant-knowledges/${knowledgeId}`,
    {
      name,
      description,
    }
  );
};

export const deleteKnowledgeApi = (knowledgeId : string): Promise<AxiosResponse<any>> => {
  return helpdeskPluginsApiAxios.delete(
    `/api/v1/assistant-knowledges/${knowledgeId}`
  );
};