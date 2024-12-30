import { Action } from '../constants/action';

export type ActionCommand = {
  onActive: () => void;
};

export type AllActionCommands = {
  [key in Action]: ActionCommand;
};
