export enum TicketEditorLoadingValue {
  GENERATING = 'Generating...',
  SHORTENING = 'Shortening...',
  LENGTHENING = 'Lengthening...',
}

export const isValueInTicketEditorLoadingValue = (value: string): boolean => {
  return Object.values(TicketEditorLoadingValue).includes(value as TicketEditorLoadingValue);
};
