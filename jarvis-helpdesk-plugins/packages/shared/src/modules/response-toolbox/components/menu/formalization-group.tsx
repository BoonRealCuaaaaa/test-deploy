import React, { ReactElement } from 'react';

import { Button } from '@/shared/components/alt-button';

import { Action } from '../../constants/action';
import { FORMALIZATION_ACTIONS } from '../../constants/action-props';
import { ResponseToolboxTranslation } from '../../types/translation';

interface Props {
  onClick: (action: Action) => void;
  translation: ResponseToolboxTranslation;
}

function FormalizationGroup(props: Props) {
  return (
    <div className="flex flex-col">
      <div className="px-2 py-1">
        <div className="menu-section">{props.translation.formalization}</div>
      </div>
      {Object.entries(FORMALIZATION_ACTIONS).map(([key, action]) => (
        <Button key={key} onClick={() => props.onClick(key as Action)}>
          <div className="flex w-full flex-row place-items-center">
            {action.icon &&
              React.cloneElement(action.icon as ReactElement, {
                className: 'mr-2 size-4',
              })}
            {props.translation.actions[key as Action].title}
          </div>
        </Button>
      ))}
    </div>
  );
}

export default FormalizationGroup;
