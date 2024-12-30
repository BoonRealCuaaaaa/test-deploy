import { useState } from 'react';

import InnovationAmico from '@/src/assets/svgs/Innovation-amico.svg';

import AddKnowledgeModal from '../modals/add-knowledge-modal';

const KnowledgeTableEmptyPlaceholder = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="flex flex-col items-center gap-y-6 rounded-xl border p-8 shadow-sm">
      <img src={InnovationAmico} alt="innovation-amico image" />
      <div className="flex flex-col items-center gap-y-5">
        <h2 className="text-center text-2xl font-semibold">No Data added yet</h2>
        <AddKnowledgeModal openModal={openAddModal} setOpenModal={setOpenAddModal} />
      </div>
    </div>
  );
};

export default KnowledgeTableEmptyPlaceholder;
