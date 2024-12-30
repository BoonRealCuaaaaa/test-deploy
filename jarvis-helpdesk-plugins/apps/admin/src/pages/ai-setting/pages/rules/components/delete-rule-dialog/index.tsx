import { Trash3, XLg } from 'react-bootstrap-icons';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { Separator } from '@/shared/components/separator';
import { Button } from '@/src/components/button';

export interface DeleteRuleDialogProps {
  ruleId: string;
  content?: string;
  afterDelete: (ruleId: string) => void;
}

const DeleteRuleDialog = ({ ruleId, content, afterDelete }: DeleteRuleDialogProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <div className="flex flex-row">
          <button className="m-2">
            <Trash3 className="text-lg" />
          </button>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-10 bg-black opacity-70" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-10 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
          <AlertDialog.Title className="mb-2 flex items-center justify-between pl-5 pr-4 pt-4 text-base font-medium">
            <p>Delete Rule</p>
            <AlertDialog.Cancel asChild>
              <button>
                <XLg />
              </button>
            </AlertDialog.Cancel>
          </AlertDialog.Title>
          <Separator className="w-full" />
          <AlertDialog.Description className="flex flex-col space-y-5 p-4 pl-6 text-sm leading-normal" asChild>
            <div>
              <p className="text-gray-700">
                Are you sure to delete this <span className="font-semibold text-black">Rule</span>?
              </p>
              <div className="rounded-lg border bg-gray-200 p-3 font-normal">{content}</div>
              <p className="font-normal text-red-500">
                WARNING: <span className="font-normal text-gray-700">This action cannot be undone.</span>
              </p>
            </div>
          </AlertDialog.Description>
          <Separator />
          <div className="flex justify-end space-x-5 pb-4 pr-4 pt-4">
            <AlertDialog.Cancel asChild>
              <Button variant="secondary" size="medium">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="danger" size="medium" onClick={() => afterDelete(ruleId)}>
                Delete
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteRuleDialog;
