import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';

import Loader from '@/shared/components/loader';
import { Separator } from '@/shared/components/separator';
import { updateKnowledgeApi } from '@/src/apis/source';
import { Button } from '@/src/components/button';
import {
  Form,
  FormControl,
  FormCounter,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormStatus,
  FormTextArea,
} from '@/src/components/form';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import queryClient from '@/src/libs/clients/query-client';

export interface IEditKnowledgeFormProps {
  name: string;
  description: string;
  setOpenModal: (value: boolean) => void;
}

const EditKnowledgeForm = (props: IEditKnowledgeFormProps) => {
  const { toast } = useToast();
  const formSchema = yup.object().shape({
    name: yup.string().max(50, 'Name must be at most 50 characters').required('Name is required'),
    description: yup.string().max(2000, 'URL must be at most 2000 characters').required('URL is required'),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: props.name,
      description: props.description,
    },
  });

  const params = useParams();

  const { mutate: editKnowledge, status: editKnowledgeStatus } = useMutation({
    mutationFn: updateKnowledgeApi,
    onSuccess: () => {
      props.setOpenModal(false);
      queryClient.invalidateQueries({
        queryKey: ['knowledge', params.knowledgeId],
      });
      form.reset();

      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Knowledge edited successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Knowledge edited failed" />,
      });
    },
  });

  const onSubmit = (values: yup.InferType<typeof formSchema>) => {
    editKnowledge({
      knowledgeId: params.knowledgeId as string,
      name: values.name,
      description: values.description,
    });
  };

  return (
    <div className="flex w-[500px] flex-col py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-5 px-5">
            <FormField
              control={form.control}
              name="name"
              maxLength={50}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Name..." {...field} />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="description"
              maxLength={2000}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <FormTextArea placeholder="Description..." {...field} className="h-[80px]" />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            ></FormField>
          </div>
          <Separator />
          <div className="px-5">
            <Button
              variant="primary"
              size="medium"
              className="w-full rounded-lg"
              type="submit"
              disabled={editKnowledgeStatus === 'pending' ? true : false}
            >
              {editKnowledgeStatus === 'pending' && <Loader fill="white" size={20} className="mx-2" />}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditKnowledgeForm;