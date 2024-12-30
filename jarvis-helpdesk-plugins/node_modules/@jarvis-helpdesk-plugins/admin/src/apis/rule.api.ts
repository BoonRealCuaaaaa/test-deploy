import { AxiosResponse } from 'axios';

import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

import { IRule } from '../libs/interfaces/ai-setting';

export const addRuleApi = ({
  assistantId,
  data,
}: {
  assistantId: string;
  data: { content: string };
}): Promise<AxiosResponse<IRule>> => {
  return helpdeskPluginsApiAxios.post('api/v1/rules', { ...data, isEnable: true, assistantId: assistantId });
};

export const getRulesWithPaginationApi = async (
  assistantId: string,
  searchParams: URLSearchParams
): Promise<AxiosResponse<{ items: IRule[]; total: number }>> => {
  searchParams.set('assistantId', assistantId);
  return helpdeskPluginsApiAxios.get(`api/v1/rules?${searchParams.toString()}`);
};

export const deleteRuleApi = (ruleId: string): Promise<AxiosResponse<{ id: string; deleted: boolean }>> => {
  return helpdeskPluginsApiAxios.delete(`api/v1/rules/${ruleId}`);
};

export const editRuleApi = ({
  ruleId,
  data,
}: {
  ruleId: string;
  data: { content?: string; isEnable?: boolean };
}): Promise<AxiosResponse<{ updated: boolean; rule: IRule }>> => {
  return helpdeskPluginsApiAxios.patch(`api/v1/rules/${ruleId}`, data);
};
