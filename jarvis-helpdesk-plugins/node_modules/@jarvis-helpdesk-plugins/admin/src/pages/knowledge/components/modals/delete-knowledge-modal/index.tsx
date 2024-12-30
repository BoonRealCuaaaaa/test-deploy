import { useState } from 'react';
import { Trash3, XLg } from 'react-bootstrap-icons';
import * as Dialog from '@radix-ui/react-alert-dialog';
import { useMutation } from '@tanstack/react-query';

import Loader from '@/shared/components/loader';
import { Separator } from '@/shared/components/separator';
import { deleteKnowledgeApi } from '@/src/apis/knowledge';
import { Button } from '@/src/components/button';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { toast } from '@/src/components/toaster/hooks/use-toast';
import queryClient from '@/src/libs/clients/query-client';

export interface DeleteKnowledgeModalProps {
  knowledgeId: string;
  knowledgeName: string;
}

const DeleteKnowledgeModal = ({ knowledgeId, knowledgeName }: DeleteKnowledgeModalProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { mutate: deleteKnowledge, status: deleteKnowledgeStatus } = useMutation({
    mutationFn: deleteKnowledgeApi,
    onSuccess: async () => {
      setOpenModal(false);
      queryClient.invalidateQueries({
        queryKey: ['knowledge'],
      });

      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Knowledge deleted successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Knowledge deleted failed" />,
      });
    },
  });

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger asChild>
        <div className="flex flex-row">
          <button className="m-2">
            <Trash3 className="text-lg" />
          </button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
          <Dialog.Title className="mb-2 flex items-center justify-between pb-2 pl-4 pr-4 pt-4 text-base font-medium">
            <p>Delete knowledge</p>
            <Dialog.Cancel asChild>
              <button>
                <XLg size={18} />
              </button>
            </Dialog.Cancel>
          </Dialog.Title>
          <Separator className="w-full" />
          <Dialog.Description className="flex flex-col space-y-5 p-4 pl-6 text-sm leading-normal" asChild>
            <div>
              <p className="text-gray-700">
                Are you sure to delete this <span className="font-semibold text-black">knowledge</span>?
              </p>
              <div className="rounded-lg border bg-gray-200 p-3 font-normal">{knowledgeName}</div>
              <p className="font-normal text-red-500">
                WARNING: <span className="font-normal text-gray-700">This action cannot be undone.</span>
              </p>
            </div>
          </Dialog.Description>
          <Separator />
          <div className="flex justify-end space-x-5 pb-4 pr-4 pt-4">
            <Dialog.Cancel asChild>
              <Button variant="secondary" className="rounded-lg" size="medium">
                Cancel
              </Button>
            </Dialog.Cancel>
            <Button
              variant="danger"
              className="rounded-lg"
              size="medium"
              onClick={() => deleteKnowledge(knowledgeId)}
              disabled={deleteKnowledgeStatus === 'pending' ? true : false}
            >
              {deleteKnowledgeStatus === 'pending' && <Loader fill="white" size={20} className="mx-2" />}
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteKnowledgeModal;
