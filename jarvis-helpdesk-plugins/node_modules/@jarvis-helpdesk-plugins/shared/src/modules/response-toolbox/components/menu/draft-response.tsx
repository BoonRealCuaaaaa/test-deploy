import React, { ReactElement } from 'react';

import { Button } from '@/shared/components/alt-button';

import { Action } from '../../constants/action';
import { ACTIONS } from '../../constants/action-props';
import { ResponseToolboxTranslation } from '../../types/translation';

interface Props {
  onClick: (actionProps: Action) => void;
  translation: ResponseToolboxTranslation;
  isReDraft: boolean;
}

export function DraftResponse(props: Props) {
  return (
    <div className="flex flex-col">
      <Button variant={'primary'} onClick={() => props.onClick(Action.DRAFT_RESPONSE)}>
        <div className="flex w-full flex-row place-items-center">
          {ACTIONS[Action.DRAFT_RESPONSE].icon &&
            React.cloneElement(ACTIONS[Action.DRAFT_RESPONSE].icon as ReactElement, {
              className: 'mr-2 size-4',
            })}{' '}
          {props.isReDraft
            ? props.translation.actions[Action.DRAFT_RESPONSE].reDraftTitle
            : props.translation.actions[Action.DRAFT_RESPONSE].title}
        </div>
      </Button>
    </div>
  );
}

export default DraftResponse;
