import { useState } from 'react';
import { Book } from 'react-bootstrap-icons';

import { Button } from '@/src/components/button';

import AddKnowledgeModal from '../modals/add-knowledge-modal';

const KnowledgeTitle = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="flex flex-row items-center justify-between pt-5">
      <div>
        <p className="text-xl font-semibold">Knowledge</p>
        <p className="text-base font-normal text-[#4B5675]">Train AI with your own knowledge</p>
      </div>
      <div className="flex space-x-3">
        <div className="flex flex-1 justify-end">
          <Button variant="light" size="small" className="rounded-md">
            <Book />
            Guides
          </Button>
        </div>
        <AddKnowledgeModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </div>
  );
};

export default KnowledgeTitle;
