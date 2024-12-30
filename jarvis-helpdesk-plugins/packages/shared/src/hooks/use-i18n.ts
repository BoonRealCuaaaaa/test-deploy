import { useTranslation } from '../contexts/translation/context';
import I18n from '../lib/i18n';

export const useI18n = (): I18n => {
  const { i18n } = useTranslation();
  return i18n;
};
