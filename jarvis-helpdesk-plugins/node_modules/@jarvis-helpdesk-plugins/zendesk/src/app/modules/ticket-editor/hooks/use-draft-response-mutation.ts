// FILE: useDraftResponseMutation.ts
import { useMutation } from '@tanstack/react-query';

import { Action } from '@/shared/modules/response-toolbox/constants/action';
import { ActionStatus } from '@/shared/modules/response-toolbox/constants/action-status';
import { ActionAPIResult } from '@/shared/modules/response-toolbox/types/action-api-result';
import { TicketEditorApi } from '@/src/app/apis/ticket-editor';
import { ZafRequestApi } from '@/src/app/apis/zaf-request';
import queryClient from '@/src/app/lib/clients/query-client';
import { ZafClient } from '@/src/app/lib/types/zaf-client';
import { removeHtmlTags } from '@/src/app/lib/utils/remove-html-tags';

import { ErrorMessage } from '../constants/error-message';
import { TicketEditorLoadingValue } from '../constants/ticket-editor-loading-value';
import { convertResponseFormatForLiveChat } from '../helpers/convert-response-format-for-live-chat';

const useDraftResponseMutation = (
  client: ZafClient,
  setCurrentResponse: (value: string) => void,
  setActionStatus: (status: ActionStatus) => void,
  setActiveAction: (action: Action) => void,
  setResult: (result: ActionAPIResult) => void,
  setIsReDraft: (state: boolean) => void
) => {
  return useMutation({
    mutationFn: async (signal: AbortSignal) => {
      const ticket = await ZafRequestApi.getTicket(client);
      const domain = await ZafRequestApi.getDomain(client);
      try {
        const response = await TicketEditorApi.getDraftResponse(ticket, domain, signal);

        if (response.status > 299) {
          throw new Error('Failed to draft response');
        }

        return { response, ticket };
      } catch (error: any) {
        if (error.message == 'canceled') {
          throw new Error(ErrorMessage.ABORTED);
        }

        throw new Error('Failed to draft response');
      }
    },
    onMutate: async () => {
      setActionStatus(ActionStatus.WORKING);
      setActiveAction(Action.DRAFT_RESPONSE);
      const oldComment = await ZafRequestApi.getComment(client);
      ZafRequestApi.setComment(client, TicketEditorLoadingValue.GENERATING);
      return { oldComment };
    },
    onSuccess: async (result) => {
      await client.invoke('app.close');
      setActionStatus(ActionStatus.SUCCESS);
      setActionStatus(ActionStatus.NONE);

      let responseText = result.response.data;

      if (result.ticket.via.channel === 'native_messaging') {
        responseText = convertResponseFormatForLiveChat(responseText);
      }

      setCurrentResponse(responseText);
      ZafRequestApi.setComment(client, responseText);
      setResult({ response: responseText });

      queryClient.setQueryData(
        ['draftResponse', result.ticket.id, result.ticket.conversation[result.ticket.conversation.length - 1]],
        responseText
      );

      setIsReDraft(true);
    },
    onError: async (error, variables, context) => {
      if (context && error.message !== ErrorMessage.ABORTED) {
        const { oldComment } = context;
        const givenText = await ZafRequestApi.getComment(client);
        if (removeHtmlTags(givenText) === TicketEditorLoadingValue.GENERATING) {
          ZafRequestApi.setComment(client, oldComment !== TicketEditorLoadingValue.GENERATING ? oldComment : '');
        }
        setActionStatus(ActionStatus.FAILED);
        setTimeout(async () => {
          setActionStatus(ActionStatus.NONE);
          await client.invoke('app.close');
        }, 1000);
        setResult({ errorMsg: error.message });
      }
    },
  });
};

export default useDraftResponseMutation;
