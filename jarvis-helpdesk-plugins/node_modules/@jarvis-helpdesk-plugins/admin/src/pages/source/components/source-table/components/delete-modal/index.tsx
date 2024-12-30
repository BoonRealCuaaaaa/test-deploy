import { useState } from 'react';
import { Trash3 } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Loader from '@/shared/components/loader';
import { deleteSourceApi } from '@/src/apis/source';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMainContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/alert-dialog';
import { Button } from '@/src/components/button';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { toast } from '@/src/components/toaster/hooks/use-toast';
import queryClient from '@/src/libs/clients/query-client';
import { useAppStore } from '@/src/store';

export interface DeleteSourceModalProps {
  sourceId: string;
  content?: string;
}

const DeleteSourceModal = ({ sourceId, content }: DeleteSourceModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();

  const knowledge = useAppStore((state) => state.knowledge);

  const { mutate: deleteSource, status: deleteSourceStatus } = useMutation({
    mutationFn: deleteSourceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == 'sources',
      });

      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Source deleted successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Source deleted failed" />,
      });
    },
  });

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogTrigger asChild>
        <div className="flex flex-row">
          <button className="m-2">
            <Trash3 className="text-lg" />
          </button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Rule</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogMainContent>
          <div>
            Are you sure to delete this source from{' '}
            <span className="font-semibold text-black">{knowledge?.knowledgeName}</span>?
          </div>
          <div className="h-[40px] border-l-4 border-l-[#0C91EB] bg-[#F1F5F9] py-[10px] pl-4 pr-3 font-normal">
            {content}
          </div>
          <div>
            <span className="text-danger">WARNING:</span> This action cannot be undone.
          </div>
        </AlertDialogMainContent>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button size="medium">Cancel</Button>
          </AlertDialogCancel>
          <Button
            variant="danger"
            size="medium"
            onClick={() =>
              deleteSource({
                knowledgeId: params.knowledgeId as string,
                sourceId: sourceId,
              })
            }
            disabled={deleteSourceStatus === 'pending'}
          >
            {deleteSourceStatus === 'pending' && <Loader fill="white" size={20} className="mx-2" />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSourceModal;
