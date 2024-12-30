import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AiSettingLayout from '../pages/ai-setting/layout';
import KnowledgeLayout from '../pages/knowledge/layout';
import RootLayout from '../pages/layout';

import AiSettingRouters from './ai-setting';
import KnowledgeRouters from './knowledge';

const Interrupts = lazy(() => import('@/src/pages/errors/interrupts'));
const Forbidden = lazy(() => import('@/src/pages/errors/forbidden'));
const NotFound = lazy(() => import('@/src/pages/errors/not-found'));

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/knowledge" replace />} />

      <Route element={<RootLayout />}>
        <Route element={<KnowledgeLayout />}>
          <Route path="knowledge/*" element={<KnowledgeRouters />} />
        </Route>

        <Route element={<AiSettingLayout />}>
          <Route path="ai-setting/*" element={<AiSettingRouters />} />
        </Route>
      </Route>

      <Route path="/interrupts" element={<Interrupts />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
