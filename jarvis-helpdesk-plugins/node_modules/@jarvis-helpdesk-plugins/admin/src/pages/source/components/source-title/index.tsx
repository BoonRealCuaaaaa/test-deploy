import { useState } from 'react';
import { Book, DatabaseFill } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getKnowledgeApi } from '@/src/apis/source';
import { Button } from '@/src/components/button';
import FullscreenLoader from '@/src/components/full-screen-loader';
import { useAppStore } from '@/src/store';

import AddSourceModal from './components/add-source-modal';
import EditKnowledgeModal from './components/edit-knowledge-modal';

const SourceTitle = () => {
  const navigate = useNavigate();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const params = useParams();
  const setKnowledge = useAppStore((state) => state.setKnowledge);

  const { data: knowledge, isLoading: isLoadingKnowledge } = useQuery({
    queryKey: ['knowledge', params.knowledgeId],
    queryFn: () => getKnowledgeApi(params.knowledgeId as string),
  });

  if (isLoadingKnowledge) {
    return <FullscreenLoader />;
  }

  if (knowledge) {
    setKnowledge(knowledge.data);
  }

  return (
    <div className="flex items-center justify-between pt-5">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <DatabaseFill size={20} className="text-[#4b5563]" />
          <div className="text-base font-medium">{knowledge?.data.knowledgeName as string}</div>
          <div className="justify-self-end pl-2 text-[#71717A]">
            <EditKnowledgeModal
              openModal={openEditModal}
              setOpenModal={setOpenEditModal}
              name={knowledge?.data.knowledgeName as string}
              description={knowledge?.data.description as string}
            />
          </div>
        </div>
        <div className="space-x-1">
          <span
            className="text-jarvis-text cursor-pointer text-[13px] text-[#4B5675]"
            onClick={() => {
              navigate('/knowledge');
            }}
          >
            Knowledge
          </span>
          <span>/</span>
          <span className="text-sm">{knowledge?.data.knowledgeName as string}</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="flex flex-1 justify-end">
          <Button variant="light" size="small">
            <Book />
            Guides
          </Button>
        </div>
        <AddSourceModal openModal={openAddModal} setOpenModal={setOpenAddModal} />
      </div>
    </div>
  );
};

export default SourceTitle;