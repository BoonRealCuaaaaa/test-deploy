import { useState } from 'react';

import InnovationAmico from '@/src/assets/svgs/Innovation-amico.svg';

import AddSourceModal from '../source-title/components/add-source-modal';

const SourceTableEmptyPlaceholder = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="mb-8 flex flex-col items-center gap-y-6 rounded-xl border p-16 shadow-sm">
      <img src={InnovationAmico} alt="innovation-amico image" />
      <div className="flex flex-col items-center gap-y-5">
        <h2 className="text-center text-2xl font-semibold">No Sources added yet</h2>
        <p className="text-center text-sm text-[#252F4A]">
          {' '}
          This Knowledge doesn't have any sources to draw information from yet. To make it smarter and more helpful, try
          adding files or web links. The more sources you provide, the more accurate and detailed its responses will be!
        </p>
        <AddSourceModal openModal={openAddModal} setOpenModal={setOpenAddModal} />
      </div>
    </div>
  );
};

export default SourceTableEmptyPlaceholder;
