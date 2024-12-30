import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';

import Loader from '@/shared/components/loader';
import { Separator } from '@/shared/components/separator';
import { importWebApi } from '@/src/apis/source';
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
} from '@/src/components/form';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import queryClient from '@/src/libs/clients/query-client';

export interface IAddWebTabProps {
  setOpenModal: (value: boolean) => void;
}

const AddWebTab = (props: IAddWebTabProps) => {
  const { toast } = useToast();
  const formSchema = yup.object().shape({
    name: yup.string().max(255, 'Name must be at most 255 characters').required('Name is required'),
    url: yup.string().max(2000, 'URL must be at most 255 characters').required('URL is required'),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  });

  const params = useParams();

  const { mutate: importWebsite, status: importWebsiteStatus } = useMutation({
    mutationFn: importWebApi,
    onSuccess: () => {
      props.setOpenModal(false);
      form.reset();
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == 'sources',
      });
      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Website imported successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Website imported failed" />,
      });
    },
  });

  const onSubmit = (values: yup.InferType<typeof formSchema>) => {
    importWebsite({
      knowledgeId: params.knowledgeId as string,
      name: values.name,
      webUrl: values.url,
    });
  };

  return (
    <div className="flex h-[301px] flex-col pb-5 pt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              maxLength={255}
              render={({ field }) => (
                <FormItem className="px-5">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Website name..." {...field} />
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
              name="url"
              maxLength={2000}
              render={({ field }) => (
                <FormItem className="px-5">
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <FormInput placeholder="URL..." {...field} />
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
          <div className="w-full px-5">
            <Button
              variant="primary"
              size="medium"
              className="w-full"
              type="submit"
              disabled={importWebsiteStatus === 'pending' ? true : false}
            >
              {importWebsiteStatus === 'pending' && <Loader fill="white" size={20} className="mx-2" />}
              Add website
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddWebTab;