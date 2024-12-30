// FILE: useFormalizeResponseMutation.ts
import { useMutation } from '@tanstack/react-query';

import { Action } from '@/shared/modules/response-toolbox/constants/action';
import { ActionStatus } from '@/shared/modules/response-toolbox/constants/action-status';
import { ActionAPIResult } from '@/shared/modules/response-toolbox/types/action-api-result';
import { TicketEditorApi } from '@/src/app/apis/ticket-editor';
import { ZafRequestApi } from '@/src/app/apis/zaf-request';
import { ZafClient } from '@/src/app/lib/types/zaf-client';
import { removeHtmlTags } from '@/src/app/lib/utils/remove-html-tags';

import { ErrorMessage } from '../constants/error-message';
import { convertResponseFormatForLiveChat } from '../helpers/convert-response-format-for-live-chat';

const useFormalizeResponseMutation = (
  client: ZafClient,
  setCurrentResponse: (value: string) => void,
  setActionStatus: (status: ActionStatus) => void,
  setActiveAction: (action: Action) => void,
  setResult: (result: ActionAPIResult) => void,
  currentResponse: string
) => {
  return useMutation({
    mutationFn: async ({ variant, signal }: { variant: string; signal: AbortSignal }) => {
      const givenText = await ZafRequestApi.getComment(client);

      if (removeHtmlTags(givenText).toLowerCase() !== removeHtmlTags(currentResponse).toLowerCase()) {
        setCurrentResponse(givenText);
      }

      const ticket = await ZafRequestApi.getTicket(client);
      const domain = await ZafRequestApi.getDomain(client);

      try {
        const response = await TicketEditorApi.getFormalizeResponse({
          payload: { ticket, domain },
          givenText,
          variant: variant,
          domain: domain,
          signal,
        });

        if (response.status > 299) {
          throw new Error('Failed to formalize response');
        }

        return { response, ticket };
      } catch (error) {
        throw new Error('Failed to formalize response');
      }
    },
    onMutate: async ({ variant }: { variant: string; signal: AbortSignal }) => {
      setActionStatus(ActionStatus.WORKING);
      setActiveAction(variant as Action);
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
    },
    onError: async (error) => {
      if (error.message !== ErrorMessage.ABORTED) {
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

export default useFormalizeResponseMutation;
