import { PencilSquare, XLg } from 'react-bootstrap-icons';
import * as Dialog from '@radix-ui/react-alert-dialog';

import { Separator } from '@/shared/components/separator';

import EditKnowledgeForm from './components/edit-knowledge-form';
import { useState } from 'react';

interface EditKnowledgeModalProps {
  id: string;
  name: string;
  description: string;
}

const EditKnowledgeModal = ({ id, name, description }: EditKnowledgeModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger asChild>
        <button>
          <PencilSquare size={18} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-10" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10 h-fit w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
          <Dialog.Title className="flex items-center justify-between p-4">
            <p className="text-sm font-semibold">Edit knowledge</p>
            <Dialog.Cancel asChild>
              <button>
                <XLg size={18} />
              </button>
            </Dialog.Cancel>
          </Dialog.Title>
          <Separator className="w-full" />
          <Dialog.Description asChild>
            <EditKnowledgeForm
              id={id}
              setOpenModal={setOpenModal}
              name={name}
              description={description}
            />
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditKnowledgeModal;
