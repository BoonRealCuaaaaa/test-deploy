import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Loader from '@/shared/components/loader';
import { importFileApi } from '@/src/apis/source';
import { Button } from '@/src/components/button';
import FileUpload from '@/src/components/file-upload';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import queryClient from '@/src/libs/clients/query-client';

export interface IAddFileTabProps {
  setOpenModal: (value: boolean) => void;
}

const AddFileTab = (props: IAddFileTabProps) => {
  const params = useParams();
  const knowledgeId = params.knowledgeId || '';
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { mutate: addFile, status: addFileStatus } = useMutation({
    mutationFn: importFileApi,
    onSuccess: () => {
      setFile(null);
      props.setOpenModal(false);

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == 'sources',
      });

      toast({
        variant: 'success',
        description: <SuccessToastDescription content="File added successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="File added failed" />,
      });
    },
  });

  const onAddFile = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Please select a file to upload" />,
      });

      return;
    }

    addFile({ knowledgeId, file });
  };

  const onDropFile = (accedptedFiles: File[]) => {
    if (accedptedFiles[0]) {
      setFile(accedptedFiles[0]);
    }
  };

  return (
    <div className="h-[240px] space-y-[1.25rem] p-[1.25rem]">
      <FileUpload onDrop={onDropFile} />
      <Button
        disabled={addFileStatus === 'pending' ? true : false}
        variant="primary"
        size="medium"
        className="w-full"
        onClick={onAddFile}
      >
        {addFileStatus === 'pending' && <Loader fill="white" className="mx-2" />}
        Add file
      </Button>
    </div>
  );
};

export default AddFileTab;
