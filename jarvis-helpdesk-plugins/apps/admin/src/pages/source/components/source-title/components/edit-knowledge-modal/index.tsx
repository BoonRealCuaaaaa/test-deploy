import { PencilSquare, XLg } from 'react-bootstrap-icons';
import * as Dialog from '@radix-ui/react-alert-dialog';

import { Separator } from '@/shared/components/separator';

import EditKnowledgeForm from './components/edit-knowledge-form';

interface EditKnowledgeModalProps {
  name: string;
  description: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const EditKnowledgeModal = (props: EditKnowledgeModalProps) => {
  return (
    <Dialog.Root open={props.openModal} onOpenChange={props.setOpenModal}>
      <Dialog.Trigger asChild>
        <PencilSquare size={14} className="cursor-pointer" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-10 h-fit w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
            <Dialog.Title className="flex h-[52px] w-[500px] items-center justify-between py-[10px] pl-[20px] pr-[10px]">
              <p className="text-sm font-semibold">Edit Knowledge</p>
              <Dialog.Cancel asChild>
                <button>
                  <XLg size={18} />
                </button>
              </Dialog.Cancel>
            </Dialog.Title>
            <Separator className="w-full" />
            <Dialog.Description asChild>
              <EditKnowledgeForm setOpenModal={props.setOpenModal} name={props.name} description={props.description} />
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditKnowledgeModal;