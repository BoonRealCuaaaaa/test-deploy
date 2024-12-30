import { lazy } from 'react';

import AuthProvider from '@/shared/contexts/auth/provider';
import TranslationProvider from '@/shared/contexts/translation/provider';
import I18n from '@/shared/lib/i18n';

import { useZafClient } from './contexts/zaf-client/context';
import { useAppLocation } from './hooks/use-app-location';
import { AppLocation as Location } from './lib/constants/zaf';

const TicketEditor = lazy(() => import('./modules/ticket-editor'));
const TicketSidebar = lazy(() => import('./modules/ticket-sidebar'));
const NavBar = lazy(() => import('./modules/nav-bar'));

const APP_LOCATION = {
  [Location.NAV_BAR]: NavBar,
  [Location.TICKET_SIDEBAR]: TicketSidebar,
  [Location.TICKET_EDITOR]: TicketEditor,
};

const i18n = new I18n(async (locale) => {
  return (await import(`../translations/${locale}.json`)).default;
});

const AppLocation = () => {
  const appLocation = useAppLocation();
  const LocationComponent = appLocation ? APP_LOCATION[appLocation] : () => null;
  const { zendeskUser } = useZafClient();

  return (
    <TranslationProvider i18n={i18n} initLocale={zendeskUser.locale}>
      <AuthProvider>
        <LocationComponent />
      </AuthProvider>
    </TranslationProvider>
  );
};

export default AppLocation;
