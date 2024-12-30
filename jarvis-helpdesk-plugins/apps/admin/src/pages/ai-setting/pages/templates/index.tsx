import { useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import { useMutation, useQuery } from '@tanstack/react-query';

import { updateAssistantSettings } from '@/src/apis/setting.api';
import { addTemplateApi, getTemplatesApi } from '@/src/apis/template.api';
import { Button } from '@/src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/card';
import FullscreenLoader from '@/src/components/full-screen-loader';
import { Switch } from '@/src/components/switch';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import { useAssistant } from '@/src/hooks/use-assistant';
import { useAppStore } from '@/src/store';

import AddTemplateDialog from './components/add-template-dialog';
import InfoPanel from './components/infor-panel';
import TemplateList from './components/templates-list';
import { TEMPLATE_AMOUNT } from './constants/amount';
import { TEMPLATE_QUERY_KEY } from './constants/query-keys';

const TemplatePage = () => {
  const [openAddTemplateDialog, setOpenAddTemplateDialog] = useState(false);
  const { toast } = useToast();
  const assistant = useAssistant();
  const setAssistant = useAppStore((state) => state.setAssistant);

  const {
    data: templates,
    isLoading: isLoadingTemplate,
    refetch: refetchTemplates,
  } = useQuery({
    queryKey: [TEMPLATE_QUERY_KEY.TEMPLATES],
    queryFn: () => {
      if (!assistant?.id) {
        return;
      }

      return getTemplatesApi(assistant.id);
    },
  });

  const { mutate: createTemplate } = useMutation({
    mutationFn: addTemplateApi,
    onSuccess: () => {
      refetchTemplates();
      setOpenAddTemplateDialog(false);

      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Create new template successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Something went wrong" />,
      });
    },
  });

  const onCreateTemplate = async ({
    name,
    description,
    template,
  }: {
    name: string;
    description: string;
    template: string;
  }) => {
    if (!assistant?.id) {
      return;
    }

    if (templates?.data.length === TEMPLATE_AMOUNT.MAX) {
      return;
    }

    try {
      await createTemplate({
        data: { name, description, template },
        assistantId: assistant.id,
      });
    } catch (error) {
      console.error('Failed to create template:', error);
    }
  };

  if (isLoadingTemplate) {
    return <FullscreenLoader />;
  }

  return (
    <div className="flex flex-row space-x-9">
      <Card className="h-fit flex-1">
        <CardHeader className="justify-between">
          <div className="flex flex-row gap-x-2">
            <CardTitle>AI Templates</CardTitle>
            <Switch
              checked={assistant?.enableTemplate}
              onCheckedChange={(value: boolean) => {
                if (!assistant?.id) {
                  return;
                }

                updateAssistantSettings({
                  updatedWorkspace: { enableTemplate: value },
                  assistantId: assistant.id,
                });
                setAssistant({ ...assistant, enableTemplate: value });
              }}
            />
          </div>

          <AddTemplateDialog
            open={openAddTemplateDialog}
            setOpen={setOpenAddTemplateDialog}
            onCreateTemplate={onCreateTemplate}
          >
            <Button
              disabled={templates?.data.length === TEMPLATE_AMOUNT.MAX}
              variant="primary"
              size="small"
              className="gap-x-1"
            >
              <PlusCircle />
              Add new ({templates?.data.length || TEMPLATE_AMOUNT.MIN}/{TEMPLATE_AMOUNT.MAX})
            </Button>
          </AddTemplateDialog>
        </CardHeader>
        <CardContent>
          <TemplateList templates={templates?.data || []} refetchTemplates={refetchTemplates} />
        </CardContent>
      </Card>
      <InfoPanel />
    </div>
  );
};

export default TemplatePage;
