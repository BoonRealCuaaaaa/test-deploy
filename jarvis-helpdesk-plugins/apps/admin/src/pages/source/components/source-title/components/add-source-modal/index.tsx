import { PlusCircle, XLg } from 'react-bootstrap-icons';
import * as Dialog from '@radix-ui/react-alert-dialog';
import * as Tabs from '@radix-ui/react-tabs';

import { Separator } from '@/shared/components/separator';
import { Button } from '@/src/components/button';

import AddFileTab from './components/add-file-tab';
import AddWebTab from './components/add-web-tab';

interface AddSourceModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const AddSourceModal = (props: AddSourceModalProps) => {
  return (
    <Dialog.Root open={props.openModal} onOpenChange={props.setOpenModal}>
      <Dialog.Trigger asChild>
        <Button variant="primary" size="small" className="px-4 py-1 font-normal">
          <PlusCircle />
          Add Source
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10 h-fit w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
          <Dialog.Title className="flex h-[52px] w-[500px] items-center justify-between py-[10px] pl-[20px] pr-[10px]">
            <p className="text-sm font-semibold">Add new source</p>
            <Dialog.Cancel asChild>
              <button>
                <XLg size={18} />
              </button>
            </Dialog.Cancel>
          </Dialog.Title>
          <Separator className="w-full" />
          <Dialog.Description asChild>
            <Tabs.Root defaultValue="file" className="">
              <div className="border-b">
                <Tabs.List className="flex h-[46px] space-x-[29px] px-[20px]">
                  <Tabs.Trigger
                    className="text-jarvis-text flex items-center justify-center py-[16px] pb-2 text-[13px] data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500 data-[state=active]:text-primary-500"
                    value="file"
                  >
                    File
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="text-jarvis-text flex items-center justify-center py-[16px] pb-2 text-[13px] data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500 data-[state=active]:text-primary-500"
                    value="web"
                  >
                    Web
                  </Tabs.Trigger>
                </Tabs.List>
              </div>
              <Tabs.Content value="file">
                <AddFileTab setOpenModal={props.setOpenModal} />
              </Tabs.Content>
              <Tabs.Content value="web">
                <AddWebTab setOpenModal={props.setOpenModal} />
              </Tabs.Content>
            </Tabs.Root>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddSourceModal;