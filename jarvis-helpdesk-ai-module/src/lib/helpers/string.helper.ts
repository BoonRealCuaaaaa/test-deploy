import StringUtils from '../utils/string.util';

const beautifyEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

const parseJson = (text: string): Record<string, unknown> => {
  try {
    return JSON.parse(text);
  } catch (error) {
    try {
      const flattenText = StringUtils.flatten(text);
      const cleanedText = flattenText.replace(/\\n(?=(?:[^"]*"[^"]*")*[^"]*$)/gm, '');
      const startIndex = cleanedText.indexOf('{');
      const endIndex = cleanedText.lastIndexOf('}');
      const jsonText = cleanedText.substring(startIndex, endIndex + 1);
      return JSON.parse(StringUtils.flatten(jsonText));
    } catch (error) {
      return {};
    }
  }
};

const StringHelpers = {
  beautifyEmail,
  parseJson,
};

export default StringHelpers;
