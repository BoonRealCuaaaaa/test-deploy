import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const KnowledgePage = lazy(() => import('@/src/pages/knowledge'));
const NotFoundPage = lazy(() => import('@/src/pages/errors/not-found'));
const SourcePage = lazy(() => import('@/src/pages/source'));

const KnowledgeRouters = () => {
  return (
    <Routes>
      <Route index element={<KnowledgePage />} />
      <Route path="/:knowledgeId" element={<SourcePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default KnowledgeRouters;
