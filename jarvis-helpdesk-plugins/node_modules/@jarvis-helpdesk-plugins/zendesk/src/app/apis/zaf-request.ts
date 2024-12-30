import { ZafClient } from '../lib/types/zaf-client';
import { ZendeskTicket, ZendeskUser } from '../lib/types/zendesk';

const getCurrentUser = async (client: ZafClient): Promise<ZendeskUser> => {
  return (await client.get('currentUser')).currentUser;
};

const getTicket = async (client: ZafClient): Promise<ZendeskTicket> => {
  return (await client.get('ticket')).ticket as ZendeskTicket;
};

const onAppActivated = (client: ZafClient, callback: () => void) => {
  client.on('app.activated', callback);
};

const setComment = (client: ZafClient, text: string | undefined) => {
  client.set('comment.text', text);
};

const getComment = async (client: ZafClient): Promise<string> => {
  return (await client.get('comment')).comment.text;
};

const getDomain = async (client: ZafClient): Promise<string> => {
  const ticket = (await client.get('ticket')).ticket as ZendeskTicket;
  const domain = ticket.brand.url.replace('https://', '');
  return domain;
};

export const ZafRequestApi = {
  getCurrentUser,
  getTicket,
  onAppActivated,
  setComment,
  getDomain,
  getComment,
};
