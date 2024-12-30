import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';

import ErrorBoundary from '@/shared/components/error-boundary';
import Loader from '@/shared/components/loader';
import { prayTheLord } from '@/shared/lib/utils/^^.pray-the-lord';

import ZafClientProvider from './contexts/zaf-client/provider';
import queryClient from './lib/clients/query-client';
import AppLocation from './app-location';

import './styles/index.scss';

prayTheLord();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader size={40} />
        </div>
      }
    >
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ZafClientProvider>
            <AppLocation />
          </ZafClientProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  </StrictMode>
);
