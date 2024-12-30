import { PropsWithChildren } from 'react';

import I18n from '@/shared/lib/i18n';

import { TranslationContext, useTranslationProvider } from './context';

type TranslationProviderProps = PropsWithChildren<{
  i18n: I18n;
  initLocale?: string;
}>;

const TranslationProvider = (props: TranslationProviderProps) => {
  const { children, i18n, initLocale } = props;
  const { locale, setLocale } = useTranslationProvider({ i18n, initLocale });

  return <TranslationContext.Provider value={{ locale, setLocale, i18n }}>{children}</TranslationContext.Provider>;
};

export default TranslationProvider;
