import { Action } from '../constants/action';

export type ActionTranslation = {
  title: string; // E.g: Draft response
  onWorking: string; // E.g: Drafting response
  onSuccess: string; // E.g: Response drated successfully
  onFailed: string; // E.g: Failed to draft response
};

export type ResponseToolboxTranslation = {
  responseToolbox: string; //E.g: Response Toolbox
  formalization: string; // E.g: Formalization
  onWorkingMsg: string; // E.g: This may take a few seconds.

  actions: {
    [key in Action]: ActionTranslation & (key extends Action.DRAFT_RESPONSE ? { reDraftTitle: string } : {});
  };
};
