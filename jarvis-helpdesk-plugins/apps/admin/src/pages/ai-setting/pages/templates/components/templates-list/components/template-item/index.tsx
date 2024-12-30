import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useMutation } from '@tanstack/react-query';

import { activeTemplateApi, deleteTemplateApi } from '@/src/apis/template.api';
import { Button } from '@/src/components/button';
import { Description, Label, LabelGroup } from '@/src/components/label';
import { RadioGroupCardSeparateItem } from '@/src/components/radio-group/card-separate';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import { useAssistant } from '@/src/hooks/use-assistant';

import DeleteTemplateModal from './components/delete-template-modal';

export interface TemplateItemProps {
  name: string;
  description: string;
  id: string;
  isActive: boolean;
  setSelected: (value: string) => void;
  refetchTemplates: () => void;
}

const TemplateItem = ({ name, description, id, isActive, setSelected, refetchTemplates }: TemplateItemProps) => {
  const { toast } = useToast();
  const assistant = useAssistant();

  const { mutate: activeTemplate } = useMutation({
    mutationFn: activeTemplateApi,
    onSuccess: () => {
      refetchTemplates();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Something went wrong" />,
      });
    },
  });

  const { mutate: deleteTemplate } = useMutation({
    mutationFn: deleteTemplateApi,
    onSuccess: (response) => {
      if (!response.data.deleted) {
        toast({
          variant: 'destructive',
          description: <FailToastDescription content="Delete template failed" />,
        });
        return;
      }

      refetchTemplates();
      setSelected('');

      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Delete template successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Something went wrong" />,
      });
    },
  });

  const onActiveTemplate = () => {
    if (!assistant?.id) {
      return;
    }

    activeTemplate({ templateId: id, assistantId: assistant.id });
  };

  const onDeleteTemplate = () => {
    deleteTemplate(id);
  };

  const onUpdateTemplate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelected(id);
  };

  return (
    <RadioGroupCardSeparateItem value={id} checked={isActive} onClick={onActiveTemplate}>
      <LabelGroup className="flex-1">
        <Label>{name}</Label>
        <Description>{description}</Description>
      </LabelGroup>
      <div className="flex gap-x-0.5">
        <Button variant="ghost" size="icon" onClick={onUpdateTemplate}>
          <PencilSquare />
        </Button>
        <DeleteTemplateModal templateName={name} templateId={id} onDeleteTemplate={onDeleteTemplate}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
          >
            <Trash />
          </Button>
        </DeleteTemplateModal>
      </div>
    </RadioGroupCardSeparateItem>
  );
};

export default TemplateItem;
