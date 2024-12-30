import { createContext, useContext, useEffect, useState } from 'react';

import I18n from '@/shared/lib/i18n';

export type TranslationContextState = {
  locale: string | undefined;
  setLocale: (locale: string) => void;
  i18n: I18n;
};

export const TranslationContext = createContext<TranslationContextState | undefined>(undefined);

export const useTranslationProvider = ({
  i18n,
  initLocale,
}: {
  i18n: I18n;
  initLocale?: string;
}): TranslationContextState => {
  const [locale, setLocale] = useState<string | undefined>(initLocale);

  useEffect(() => {
    if (locale) {
      i18n.loadTranslations(locale);
    }
  }, [locale, i18n]);

  return {
    locale,
    setLocale,
    i18n,
  };
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a provider');
  }
  return context;
};
