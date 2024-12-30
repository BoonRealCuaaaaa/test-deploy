import { PropsWithChildren } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMainContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/alert-dialog';
import { Button } from '@/src/components/button';

type DeleteTemplateModalProps = PropsWithChildren & {
  templateId: string;
  templateName: string;
  onDeleteTemplate: (templateId: string) => void;
};

const DeleteTemplateModal = ({ children, templateId, templateName, onDeleteTemplate }: DeleteTemplateModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Template</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogMainContent>
          <p>
            Are you sure to delete template <span className="font-semibold">{templateName}</span>?
          </p>
          <p>
            <span className="text-rose-600">Warning:</span> This action cannot be undone
          </p>
        </AlertDialogMainContent>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant="ghost"
              size="medium"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              variant="danger"
              size="medium"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                onDeleteTemplate(templateId);
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTemplateModal;
