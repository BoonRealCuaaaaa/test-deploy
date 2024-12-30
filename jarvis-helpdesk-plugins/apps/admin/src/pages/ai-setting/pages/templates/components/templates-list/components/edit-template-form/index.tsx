'use client';

import { ControllerRenderProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

import { TEMPLATE_FORM_SIZE } from '../../../constants/template-form-size';

const formSchema = yup.object({
  name: yup.string().required('Cannot be empty').max(TEMPLATE_FORM_SIZE.MAX_NAME),
  description: yup.string().required('Cannot be empty').max(TEMPLATE_FORM_SIZE.MAX_DESCRIPTION),
  template: yup.string().required('Cannot be empty').max(TEMPLATE_FORM_SIZE.MAX_TEMPLATE),
});

// Define the form schema type
type FormSchema = yup.InferType<typeof formSchema>;

interface EditTemplateFormProps {
  onCancelUpdateTemplate: () => void;
  onUpdateTemplateSubmit: (templateId: string, data: FormSchema) => void;
  id: string;
  name?: string;
  description?: string;
  template?: string;
}

const EditTemplateForm = ({
  id,
  name,
  description,
  template,
  onCancelUpdateTemplate,
  onUpdateTemplateSubmit,
}: EditTemplateFormProps) => {
  const form = useForm<FormSchema>({
    mode: 'all',
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: name ?? '',
      description: description ?? '',
      template: template ?? '',
    },
  });

  const onSubmit = (data: FormSchema) => {
    onUpdateTemplateSubmit(id, data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="edit-template-form"
        className="flex w-full flex-col gap-y-5 rounded-xl border border-gray-200 p-4"
      >
        <FormField
          control={form.control}
          name="name"
          maxLength={TEMPLATE_FORM_SIZE.MAX_NAME}
          render={({ field }) => (
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
          render={({ field }) => (
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
        <div className="flex justify-end gap-x-2.5">
          <Button variant="light" onClick={onCancelUpdateTemplate}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditTemplateForm;
