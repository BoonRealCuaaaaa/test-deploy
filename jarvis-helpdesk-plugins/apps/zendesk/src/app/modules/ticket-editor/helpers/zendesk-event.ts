import { ZafRequestApi } from '@/src/app/apis/zaf-request';
import queryClient from '@/src/app/lib/clients/query-client';
import { StorageKeys } from '@/src/app/lib/constants/storage-keys';
import { ZafClient } from '@/src/app/lib/types/zaf-client';
import { ZendeskTicket } from '@/src/app/lib/types/zendesk';
import { removeHtmlTags } from '@/src/app/lib/utils/remove-html-tags';

import { isValueInTicketEditorLoadingValue, TicketEditorLoadingValue } from '../constants/ticket-editor-loading-value';

const handleTicketConversationChangedHandlers: { [key: string]: () => void } = {};

const handleTicketConversationChanged = async (client: ZafClient, triggerDraftResponse: () => void) => {
  const ticket = await ZafRequestApi.getTicket(client);
  const conversation = ticket.conversation;
  const currentComment = ticket.comment.text;
  const simplifiedComment = currentComment.match(/<p>([\s\S]*?)<\/p>/i);

  if (
    conversation.pop()?.author.role !== 'end-user' ||
    (currentComment !== '' && !isValueInTicketEditorLoadingValue(simplifiedComment?.[1] || ''))
  ) {
    return;
  }
  triggerDraftResponse();
};

const registerAutoDraftOnNewMessage = async (client: ZafClient, triggerDraftResponse: () => void) => {
  try {
    const ticket = await ZafRequestApi.getTicket(client);
    const isAutoResponseEnabled = localStorage.getItem(`${StorageKeys.IS_AUTO_RESPONSE_ENABLED}`) === 'true';
    if (!handleTicketConversationChangedHandlers['handler']) {
      handleTicketConversationChangedHandlers['handler'] = () =>
        handleTicketConversationChanged(client, triggerDraftResponse);
    }

    if (ticket.via.channel === 'native_messaging' || ticket.via.channel === 'sample_ticket') {
      if (isAutoResponseEnabled) {
        client.on('ticket.conversation.changed', handleTicketConversationChangedHandlers['handler']);
      } else {
        client.off('ticket.conversation.changed', handleTicketConversationChangedHandlers['handler']);
        delete handleTicketConversationChangedHandlers['handler'];
      }
    }
  } catch (error) {
    console.error('Error registering auto draft on new message:', error);
  }
};

const registerAppActivatedEvent = async (client: ZafClient, triggerDraftResponse: () => void) => {
  client.on('app.activated', async () => {
    try {
      const ticket: ZendeskTicket = await ZafRequestApi.getTicket(client);
      const isAutoResponseEnabled = localStorage.getItem(`${StorageKeys.IS_AUTO_RESPONSE_ENABLED}`) === 'true';

      if (!isAutoResponseEnabled) {
        return;
      }

      const currentComment = ticket.comment.text;
      const simplifiedComment = currentComment.match(/<p>([\s\S]*?)<\/p>/i);
      const lastConversation = ticket.conversation[ticket.conversation.length - 1];

      const cacheResponse = queryClient.getQueryData([
        'draftResponse',
        ticket.id,
        ticket.conversation[ticket.conversation.length - 1],
      ]);

      if (cacheResponse) {
        ZafRequestApi.setComment(client, cacheResponse as string);
        return;
      }

      if (
        (currentComment !== '' && !isValueInTicketEditorLoadingValue(simplifiedComment?.[1] || '')) ||
        lastConversation?.author.role !== 'end-user'
      ) {
        return;
      }
      triggerDraftResponse();
    } catch (error) {
      console.error('Error handling app activated event:', error);
    }
  });
};

const initDraftTicket = async (
  client: ZafClient,
  resetResponse: (currentComment: string) => void,
  triggerDraftResponse: () => void
) => {
  const ticket: ZendeskTicket = await ZafRequestApi.getTicket(client);
  const currentComment: string = await ZafRequestApi.getComment(client);
  const simplifiedComment = currentComment.match(/<p>([\s\S]*?)<\/p>/i);

  if (removeHtmlTags(currentComment) === TicketEditorLoadingValue.GENERATING) {
    resetResponse('');
  } else {
    resetResponse(currentComment);
  }

  const lastConversation = ticket.conversation[ticket.conversation.length - 1];
  if (
    (currentComment !== '' && !isValueInTicketEditorLoadingValue(simplifiedComment?.[1] || '')) ||
    lastConversation?.author.role !== 'end-user'
  ) {
    return;
  }
  triggerDraftResponse();
};

export const ZendeskEvent = {
  registerAutoDraftOnNewMessage,
  registerAppActivatedEvent,
  initDraftTicket,
};
