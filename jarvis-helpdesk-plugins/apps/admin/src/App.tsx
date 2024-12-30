import { Suspense } from 'react';

import { Toaster } from './components/toaster';
import AppRouter from './routes';

import './styles/index.scss';

function App() {
  return (
    <Suspense>
      <AppRouter />
      <Toaster />
    </Suspense>
  );
}

export default App;
