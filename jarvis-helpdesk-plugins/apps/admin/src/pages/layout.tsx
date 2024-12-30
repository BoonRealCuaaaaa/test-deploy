import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import FullscreenLoader from '../components/full-screen-loader';
import Header from '../components/header';

const RootLayout = () => {
  return (
    <Suspense fallback={<FullscreenLoader />}>
      <div className="flex min-h-screen flex-col gap-y-5">
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default RootLayout;
