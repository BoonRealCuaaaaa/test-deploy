import helpdeskPluginsApiAxios from '@/shared/lib/clients/axios/helpdesk-plugins-api';

const getExamples = async () => {
  return (await helpdeskPluginsApiAxios.get('/examples')).data;
};

export const ExampleApi = {
  getExamples,
};
