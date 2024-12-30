import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useUndo from 'use-undo';

import { useI18n } from '@/shared/hooks/use-i18n';
import ActionProcessing from '@/shared/modules/response-toolbox/components/action-processing';
import Header from '@/shared/modules/response-toolbox/components/header';
import Menu from '@/shared/modules/response-toolbox/components/menu';
import { Action } from '@/shared/modules/response-toolbox/constants/action';
import { ActionStatus } from '@/shared/modules/response-toolbox/constants/action-status';
import { ActionAPIResult } from '@/shared/modules/response-toolbox/types/action-api-result';
import { AllActionCommands } from '@/shared/modules/response-toolbox/types/action-command';
import { ResponseToolboxTranslation } from '@/shared/modules/response-toolbox/types/translation';

import { ZafRequestApi } from '../../apis/zaf-request';
import { useZafClient } from '../../contexts/zaf-client/context';
import { StorageKeys } from '../../lib/constants/storage-keys';
import { removeHtmlTags } from '../../lib/utils/remove-html-tags';

import { ErrorMessage } from './constants/error-message';
import { TICKET_EDITOR_DEFAULT_SIZE } from './constants/size';
import { TicketEditorLoadingValue } from './constants/ticket-editor-loading-value';
import { ZendeskEvent } from './helpers/zendesk-event';
import useDraftResponseMutation from './hooks/use-draft-response-mutation';
import useFormalizeResponseMutation from './hooks/use-formalize-response-mutation';

import '@/shared/modules/response-toolbox/styles/index.css';

const TicketEditor = () => {
  const { t } = useI18n();
  const { client } = useZafClient();
  const [actionStatus, setActionStatus] = useState<ActionStatus>(ActionStatus.NONE);
  const [activeAction, setActiveAction] = useState<Action>();
  const [result, setResult] = useState<ActionAPIResult>();
  const [
    currentResponse,
    { set: setCurrentResponse, undo: undoResponse, redo: redoResponse, reset: resetResponse, canUndo, canRedo },
  ] = useUndo<string>('');
  // Dynamically update Zendesk Ticket Editor height
  const ref = useRef<HTMLDivElement>(null);
  const abortController = useRef<AbortController | null>(null);
  const queryClient = new QueryClient();
  const [isAutoResponseEnabled, setIsAutoResponseEnabled] = useState<boolean>(() => {
    const storedValue = localStorage.getItem(`${StorageKeys.IS_AUTO_RESPONSE_ENABLED}`);
    return storedValue === 'true';
  });

  useEffect(() => {
    client.invoke('resize', { width: TICKET_EDITOR_DEFAULT_SIZE.WIDTH, height: TICKET_EDITOR_DEFAULT_SIZE.HEIGHT });
  }, [client]);

  const changeHeight = () => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]?.contentRect) {
        const newHeight = entries[0].contentRect.height;
        client.invoke('resize', { height: newHeight });
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Clean up observer on component unmount
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  };

  const translation: ResponseToolboxTranslation = {
    responseToolbox: t('ticket_editor.response_toolbox'),
    formalization: t('ticket_editor.formalization'),
    onWorkingMsg: t('ticket_editor.on_working_msg'),
    actions: {
      [Action.DRAFT_RESPONSE]: {
        title: t('ticket_editor.actions.draft_response.title'),
        reDraftTitle: t('ticket_editor.actions.draft_response.re_draft_title'),
        onWorking: t('ticket_editor.actions.draft_response.on_working'),
        onSuccess: t('ticket_editor.actions.draft_response.on_success'),
        onFailed: t('ticket_editor.actions.draft_response.on_failed'),
      },
      [Action.CORRECT_SPELLING]: {
        title: t('ticket_editor.actions.correct_spelling.title'),
        onWorking: t('ticket_editor.actions.correct_spelling.on_working'),
        onSuccess: t('ticket_editor.actions.correct_spelling.on_success'),
        onFailed: t('ticket_editor.actions.correct_spelling.on_failed'),
      },
      [Action.SIMPLIFY_WORDS]: {
        title: t('ticket_editor.actions.simplify_words.title'),
        onWorking: t('ticket_editor.actions.simplify_words.on_working'),
        onSuccess: t('ticket_editor.actions.simplify_words.on_success'),
        onFailed: t('ticket_editor.actions.simplify_words.on_failed'),
      },
      [Action.SHORTEN_RESPONSE]: {
        title: t('ticket_editor.actions.shorten_response.title'),
        onWorking: t('ticket_editor.actions.shorten_response.on_working'),
        onSuccess: t('ticket_editor.actions.shorten_response.on_success'),
        onFailed: t('ticket_editor.actions.shorten_response.on_failed'),
      },
      [Action.LENGTHEN_RESPONSE]: {
        title: t('ticket_editor.actions.lengthen_response.title'),
        onWorking: t('ticket_editor.actions.lengthen_response.on_working'),
        onSuccess: t('ticket_editor.actions.lengthen_response.on_success'),
        onFailed: t('ticket_editor.actions.lengthen_response.on_failed'),
      },
    },
  };

  useEffect(() => {
    const fetchAutoResponseSettings = async () => {
      const storedValue = localStorage.getItem(`${StorageKeys.IS_AUTO_RESPONSE_ENABLED}`);
      setIsAutoResponseEnabled(storedValue === 'true');
    };

    fetchAutoResponseSettings();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `${StorageKeys.IS_AUTO_RESPONSE_ENABLED}` && event.newValue !== null) {
        setIsAutoResponseEnabled(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [isReDraft, setIsReDraft] = useState(false);

  const { mutate: mutateDraftResponse } = useDraftResponseMutation(
    client,
    setCurrentResponse,
    setActionStatus,
    setActiveAction,
    setResult,
    setIsReDraft
  );

  const { mutate: mutateFormalizeResponse } = useFormalizeResponseMutation(
    client,
    setCurrentResponse,
    setActionStatus,
    setActiveAction,
    setResult,
    currentResponse.present
  );

  const isAutoResponseEnabledRef = useRef(isAutoResponseEnabled);

  useEffect(() => {
    isAutoResponseEnabledRef.current = isAutoResponseEnabled;
  }, [isAutoResponseEnabled]);

  const ACTION_COMMANDS: AllActionCommands = {
    [Action.DRAFT_RESPONSE]: {
      onActive: async () => {
        if (abortController.current) {
          abortController.current.abort(ErrorMessage.ABORTED);
        }

        abortController.current = new AbortController();
        return mutateDraftResponse(abortController.current.signal);
      },
    },
    [Action.CORRECT_SPELLING]: {
      onActive: () => {
        if (abortController.current) {
          abortController.current.abort(ErrorMessage.ABORTED);
        }

        abortController.current = new AbortController();
        return mutateFormalizeResponse({ variant: Action.CORRECT_SPELLING, signal: abortController.current.signal });
      },
    },
    [Action.SIMPLIFY_WORDS]: {
      onActive: () => {
        if (abortController.current) {
          abortController.current.abort(ErrorMessage.ABORTED);
        }

        abortController.current = new AbortController();
        return mutateFormalizeResponse({ variant: Action.SIMPLIFY_WORDS, signal: abortController.current.signal });
      },
    },
    [Action.SHORTEN_RESPONSE]: {
      onActive: () => {
        if (abortController.current) {
          abortController.current.abort(ErrorMessage.ABORTED);
        }
        abortController.current = new AbortController();
        return mutateFormalizeResponse({ variant: Action.SHORTEN_RESPONSE, signal: abortController.current.signal });
      },
    },
    [Action.LENGTHEN_RESPONSE]: {
      onActive: () => {
        if (abortController.current) {
          abortController.current.abort(ErrorMessage.ABORTED);
        }

        abortController.current = new AbortController();
        return mutateFormalizeResponse({ variant: Action.LENGTHEN_RESPONSE, signal: abortController.current.signal });
      },
    },
  };

  const onActionClick = (action: Action) => {
    ACTION_COMMANDS[action].onActive();
  };

  const onAbortClick = async () => {
    if (abortController.current) {
      abortController.current.abort(ErrorMessage.ABORTED);
      setActionStatus(ActionStatus.FAILED);
      setResult({ errorMsg: 'Cancel the action' });
      setTimeout(async () => {
        setActionStatus(ActionStatus.NONE);
        await client.invoke('app.close');
      }, 1000);
      const givenText = await ZafRequestApi.getComment(client);
      if (removeHtmlTags(givenText) === TicketEditorLoadingValue.GENERATING) {
        if (canUndo) {
          ZafRequestApi.setComment(client, currentResponse.present);
        } else {
          ZafRequestApi.setComment(client, '');
        }
      }
    }
  };

  const triggerDraftResponse = () => {
    if (isAutoResponseEnabledRef.current) {
      onActionClick(Action.DRAFT_RESPONSE);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const initializeDraftTicket = async () => {
        await ZendeskEvent.initDraftTicket(client, resetResponse, triggerDraftResponse);
        return true;
      };

      const registerEvents = () => {
        ZendeskEvent.registerAppActivatedEvent(client, triggerDraftResponse);

        ZendeskEvent.registerAutoDraftOnNewMessage(client, triggerDraftResponse);
      };

      initializeDraftTicket();
      registerEvents();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isAutoResponseEnabled, client]);

  const onUndoResponse = () => {
    if (canUndo) {
      ZafRequestApi.setComment(client, currentResponse.past[currentResponse.past.length - 1]);
      undoResponse();
    }
  };

  const onRedoResponse = () => {
    if (canRedo) {
      ZafRequestApi.setComment(client, currentResponse.future[0]);
      redoResponse();
    }
  };

  useEffect(() => {
    changeHeight();

    if (actionStatus === ActionStatus.NONE) {
      client.invoke('resize', { width: TICKET_EDITOR_DEFAULT_SIZE.WIDTH });
    } else {
      client.invoke('resize', { width: TICKET_EDITOR_DEFAULT_SIZE.WIDTH + 40 });
    }
  }, [actionStatus]);

  return (
    <QueryClientProvider client={queryClient}>
      <div ref={ref}>
        <div className="mx-3 flex flex-col gap-3 py-2.5">
          <Header
            showCommand={actionStatus == ActionStatus.NONE}
            onUndo={onUndoResponse}
            onRedo={onRedoResponse}
            canUndo={canUndo}
            canRedo={canRedo}
            translation={translation}
          />
          {actionStatus == ActionStatus.NONE ? (
            <Menu onClick={onActionClick} translation={translation} isReDraft={isReDraft} />
          ) : (
            <ActionProcessing
              status={actionStatus}
              activeAction={activeAction}
              result={result}
              translation={translation}
              onAbortClick={onAbortClick}
            />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default TicketEditor;
