import { useEffect, useState } from 'react';
import { PencilSquare, XLg } from 'react-bootstrap-icons';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Dialog from '@radix-ui/react-dialog';
import * as yup from 'yup';

import { Separator } from '@/shared/components/separator';
import { Button } from '@/src/components/button';
import {
  Form,
  FormControl,
  FormCounter,
  FormField,
  FormItem,
  FormMessage,
  FormStatus,
  FormTextArea,
} from '@/src/components/form';

import { RULE_FORM_SIZE } from '../constants/rule-form-size';

export interface EditRuleDialogProps {
  content?: string;
  afterSave: (content: string) => void;
}

const formSchema = yup.object({
  content: yup.string().required('Cannot be empty').max(RULE_FORM_SIZE.MAX_CONTENT),
});

type FormSchema = yup.InferType<typeof formSchema>;

const EditRuleDialog = ({ content = '', afterSave }: EditRuleDialogProps) => {
  const [open, onOpenChange] = useState(false);

  const form = useForm<FormSchema>({
    mode: 'all',
    resolver: yupResolver(formSchema),
    defaultValues: {
      content,
    },
  });

  const { reset } = form;

  // Dynamically update form values when content changes
  useEffect(() => {
    reset({ content });
  }, [content, reset]);

  const onUpdateSubmit = ({ content }: FormSchema) => {
    afterSave(content);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <div className="flex cursor-pointer flex-row">
          <button className="m-2">
            <PencilSquare className="text-base" />
          </button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal aria-modal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-0">
          <Dialog.Title className="flex items-center justify-between px-6 py-5 text-base font-medium">
            <p>Edit rule</p>
            <Dialog.Close asChild>
              <button>
                <XLg />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <Separator className="w-full" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onUpdateSubmit)}
              id="edit-rule-form"
              className="flex flex-col gap-y-5 px-6 py-5"
            >
              <FormField
                control={form.control}
                name="content"
                maxLength={RULE_FORM_SIZE.MAX_CONTENT}
                render={({ field }: { field: ControllerRenderProps<FormSchema, 'content'> }) => (
                  <FormItem>
                    <FormControl>
                      <FormTextArea rows={6} placeholder="Write your rule here..." {...field} />
                    </FormControl>
                    <FormStatus>
                      <FormMessage />
                      <FormCounter />
                    </FormStatus>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Separator className="w-full" />
          <div className="flex justify-end gap-[25px] px-6 py-5">
            <Dialog.Close asChild>
              <Button variant="secondary" size="medium">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" form="edit-rule-form" variant="primary" size="medium" className="w-16">
              Save
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditRuleDialog;
