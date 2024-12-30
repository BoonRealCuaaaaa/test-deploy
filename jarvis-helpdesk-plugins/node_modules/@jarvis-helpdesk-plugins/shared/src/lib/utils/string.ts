const getAbbreviation = (input: string) => {
  return input.match(/[A-Z]/g)?.join('') ?? '';
};

const removeExtraSpaces = (input: string) => {
  return input.replace(/\s+/g, ' ').trim();
};

export const StringUtil = {
  getAbbreviation,
  removeExtraSpaces,
};
