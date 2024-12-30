import { produce } from 'immer';
import { create } from 'zustand';

import { IAssistantSettings } from '../libs/interfaces/ai-setting';
import { IKnowledge } from '../libs/interfaces/knowledge';

interface AppState {
  assistant: IAssistantSettings | undefined;
  setAssistant: (workspace: IAssistantSettings) => void;
  knowledge: IKnowledge | undefined;
  setKnowledge: (knowledge: IKnowledge) => void;
}

export const useAppStore = create<AppState>((set) => ({
  assistant: undefined,
  setAssistant: (assistant: IAssistantSettings) => {
    set(
      produce((state: AppState) => {
        state.assistant = assistant;
      })
    );
  },
  knowledge: undefined,
  setKnowledge: (knowledge: IKnowledge) => {
    set(
      produce((state: AppState) => {
        state.knowledge = knowledge;
      })
    );
  },
}));
