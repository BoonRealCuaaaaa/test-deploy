import { PlusCircle, XLg } from 'react-bootstrap-icons';
import * as Dialog from '@radix-ui/react-alert-dialog';

import { Separator } from '@/shared/components/separator';
import { Button } from '@/src/components/button';

import AddKnowledgeForm from './components/add-knowledge-form';

interface EditKnowledgeModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const AddKnowledgeModal = ({ openModal, setOpenModal }: EditKnowledgeModalProps) => {
  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger asChild>
        <Button variant="primary" size="small" className="rounded-md px-4 py-1 font-normal">
          <PlusCircle size={14} />
          Add Knowledge
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-10 h-fit w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
            <Dialog.Title className="flex items-center justify-between p-4">
              <p className="text-sm font-semibold">Create new knowledge</p>
              <Dialog.Cancel asChild>
                <button>
                  <XLg size={18} />
                </button>
              </Dialog.Cancel>
            </Dialog.Title>
            <Separator className="w-full" />
            <Dialog.Description asChild>
              <AddKnowledgeForm setOpenModal={setOpenModal} />
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddKnowledgeModal;
