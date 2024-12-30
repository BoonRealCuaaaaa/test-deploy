import { Bandaid, ChatDotsFill, Dash, Plus, Spellcheck } from 'react-bootstrap-icons';

import { ActionProps } from '../types/action-props';

import { Action } from './action';

export const ACTIONS: { [key in Action]: ActionProps } = {
  [Action.DRAFT_RESPONSE]: {
    icon: <ChatDotsFill />,
  },
  [Action.CORRECT_SPELLING]: {
    icon: <Bandaid />,
  },
  [Action.SIMPLIFY_WORDS]: {
    icon: <Spellcheck />,
  },
  [Action.SHORTEN_RESPONSE]: {
    icon: <Dash />,
  },
  [Action.LENGTHEN_RESPONSE]: {
    icon: <Plus />,
  },
};

export const FORMALIZATION_ACTIONS = Object.fromEntries(
  Object.entries(ACTIONS).filter(([key]) => key != Action.DRAFT_RESPONSE)
);
