const flatten = (text: string) => {
  return text
    .trim()
    .replace(/\t+/g, `\\t`)
    .replace(/(\r\n|\r|\n)+/gm, `\\n`)
    .replace(/\s+/g, ' ')
    .replace(/\\ /g, '\\');
};

export const isEnum = (value: number | string, enumeration: any) => {
  if (typeof value === 'string') {
    return Object.values(enumeration).includes(value);
  }

  return value in enumeration;
};

const StringUtils = {
  flatten,
  isEnum,
};

export default StringUtils;
