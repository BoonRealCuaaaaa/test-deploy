'use client';

import { ControllerRenderProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '@/src/components/button';
import { DialogFooter, DialogHeader, DialogMainContent, DialogTitle } from '@/src/components/dialog';
import {
  Form,
  FormControl,
  FormCounter,
  FormDialogContent,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormStatus,
  FormTextArea,
} from '@/src/components/form';

import { TEMPLATE_FORM_SIZE } from '../../../constants/template-form-size';

const formSchema = yup.object({
  name: yup.string().required('Cannot be empty').max(TEMPLATE_FORM_SIZE.MAX_NAME),
  description: yup.string().required('Cannot be empty').max(TEMPLATE_FORM_SIZE.MAX_DESCRIPTION),
  template: yup.string().required('Cannot be empty').max(TEMPLATE_FORM_SIZE.MAX_TEMPLATE),
});

// Define the form schema type
type FormSchema = yup.InferType<typeof formSchema>;

export interface AddTemplateFormProps {
  onSubmitCallback?: (data: FormSchema) => void;
}

const AddTemplateForm = ({ onSubmitCallback }: AddTemplateFormProps) => {
  const form = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      template: '',
    },
  });

  const onSubmit = (data: FormSchema) => {
    if (onSubmitCallback) {
      onSubmitCallback(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="add-template-form" className="w-full gap-y-5">
        <FormDialogContent>
          <DialogHeader>
            <DialogTitle>Create new Template</DialogTitle>
          </DialogHeader>
          <DialogMainContent>
            <FormField
              control={form.control}
              name="name"
              maxLength={TEMPLATE_FORM_SIZE.MAX_NAME}
              render={({ field }: { field: ControllerRenderProps<FormSchema, 'name'> }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Template name..." {...field} />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              maxLength={TEMPLATE_FORM_SIZE.MAX_DESCRIPTION}
              render={({ field }: { field: ControllerRenderProps<FormSchema, 'description'> }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <FormInput placeholder="What is this template used for?" {...field} />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="template"
              maxLength={TEMPLATE_FORM_SIZE.MAX_TEMPLATE}
              required
              render={({ field }: { field: ControllerRenderProps<FormSchema, 'template'> }) => (
                <FormItem>
                  <FormLabel>Template</FormLabel>
                  <FormControl>
                    <FormTextArea
                      rows={8}
                      maxLength={TEMPLATE_FORM_SIZE.MAX_TEMPLATE}
                      placeholder="Write your template here..."
                      {...field}
                    />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            />
          </DialogMainContent>
          <DialogFooter>
            <Button type="submit" variant="primary" size="medium" className="w-full">
              Create new Template
            </Button>
          </DialogFooter>
        </FormDialogContent>
      </form>
    </Form>
  );
};

export default AddTemplateForm;
