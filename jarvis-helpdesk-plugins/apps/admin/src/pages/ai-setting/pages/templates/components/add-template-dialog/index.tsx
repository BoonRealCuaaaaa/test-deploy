import { PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/src/components/dialog';

import AddTemplateForm from './components/add-template-form';

type AddTemplateDialogProps = PropsWithChildren & {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  onCreateTemplate: ({ name, template, description }: { name: string; description: string; template: string }) => void;
};

const AddTemplateDialog = ({ open, setOpen, onCreateTemplate, children }: AddTemplateDialogProps) => {
  const onOpenChanged = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <AddTemplateForm onSubmitCallback={onCreateTemplate} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTemplateDialog;
