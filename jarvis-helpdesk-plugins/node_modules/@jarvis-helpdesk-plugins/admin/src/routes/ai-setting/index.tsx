import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import AiSettingPage from '@/src/pages/ai-setting';

const GeneralPage = lazy(() => import('@/src/pages/ai-setting/pages/general'));
const IntegrationsPage = lazy(() => import('@/src/pages/ai-setting/pages/integrations'));
const RulesPage = lazy(() => import('@/src/pages/ai-setting/pages/rules'));
const TemplatesPage = lazy(() => import('@/src/pages/ai-setting/pages/templates'));
const NotFoundPage = lazy(() => import('@/src/pages/errors/not-found'));

const AiSettingRouters = () => {
  return (
    <Routes>
      <Route element={<AiSettingPage />}>
        <Route index element={<GeneralPage />} />
        <Route path="rules" element={<RulesPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="templates" element={<TemplatesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AiSettingRouters;