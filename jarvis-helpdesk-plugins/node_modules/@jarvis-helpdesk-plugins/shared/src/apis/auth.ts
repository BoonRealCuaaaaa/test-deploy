import helpdeskPluginsApiAxios from '../lib/clients/axios/helpdesk-plugins-api';
import { User } from '../lib/types/user';

const exchangeGoogleAuthorizationCode = async (code: string) => {
  await helpdeskPluginsApiAxios.post('/api/v1/auth/google/exchange-code', { code });
};

const logout = async () => {
  await helpdeskPluginsApiAxios.post('/api/v1/auth/logout');
};

const getCurrentUser = async () => {
  // return (await helpdeskPluginsApiAxios.get('/api/v1/auth/current-user')).data;
  return {
    id: '1',
    username: 'test',
    email: 'test@test.com',
    roles: ['admin'],
  } as User;
};

export const AuthApi = {
  exchangeGoogleAuthorizationCode,
  logout,
  getCurrentUser,
};
