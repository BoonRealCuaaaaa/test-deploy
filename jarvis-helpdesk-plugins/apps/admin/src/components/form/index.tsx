'use client';

import * as React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/shared/lib/utils/cn';

import { Input } from '../input';
import { Label } from '../label';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  maxLength?: number;
  required?: boolean;
};

const FormFieldContext = React.createContext<FormFieldContextValue<FieldValues, FieldPath<FieldValues>> | null>(null);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  maxLength,
  required,
  ...props
}: ControllerProps<TFieldValues, TName> & { maxLength?: number; required?: boolean }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name, maxLength, required }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState, watch } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  if (!itemContext) {
    throw new Error('useFormField should be used within <FormItem>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const currentValue = watch(fieldContext.name) as string | undefined;
  const currentLength = currentValue?.length || 0;

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    currentLength,
    maxLength: fieldContext.maxLength,
    required: fieldContext.required,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('flex flex-col gap-y-2', className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = 'FormItem';

const FormItemHorizontal = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('grid-cols-horizontal-input grid items-center gap-2', className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItemHorizontal.displayName = 'FormItemHorizontal';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId, required } = useFormField();

  return (
    <Label ref={ref} className={cn(error && '', className)} htmlFor={formItemId} {...props}>
      {props.children}
      {required && <span className="ml-1 text-danger">*</span>}
    </Label>
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p ref={ref} id={formDescriptionId} className={cn('text-muted-foreground text-[0.8rem]', className)} {...props} />
    );
  }
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn('text-xs/3 text-danger', className)} {...props}>
        {body}
      </p>
    );
  }
);
FormMessage.displayName = 'FormMessage';

const FormInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentPropsWithoutRef<typeof Input>>(
  ({ className, ...props }, ref) => {
    const { maxLength, required, error } = useFormField();

    return (
      <Input
        ref={ref}
        className={cn(error ? 'border-danger' : '', className)}
        {...props}
        maxLength={maxLength}
        required={required}
      />
    );
  }
);
FormInput.displayName = 'FormInput';

const FormTextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    const { maxLength, error } = useFormField();

    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-24 rounded border border-gray-300 bg-gray-50 p-2',
          error ? 'border-danger' : '',
          className
        )}
        maxLength={maxLength}
        {...props}
      ></textarea>
    );
  }
);
FormTextArea.displayName = 'FormTextArea';

const FormCounter = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { currentLength, maxLength } = useFormField();

    return (
      <p ref={ref} className={cn('flex-1 text-end text-xs/3 text-gray-700', className)} {...props}>
        {currentLength} / {maxLength}
      </p>
    );
  }
);
FormCounter.displayName = 'FormCounter';

const FormStatus = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex justify-between', className)} {...props} />
);
FormStatus.displayName = 'FormStatus';

const FormDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('divide-separator w-full gap-x-5 divide-y', className)} {...props} />
  )
);
FormDialogContent.displayName = 'FormDialogContent';

export {
  Form,
  FormControl,
  FormCounter,
  FormDescription,
  FormDialogContent,
  FormField,
  FormInput,
  FormItem,
  FormItemHorizontal,
  FormLabel,
  FormMessage,
  FormStatus,
  FormTextArea,
  useFormField,
};
