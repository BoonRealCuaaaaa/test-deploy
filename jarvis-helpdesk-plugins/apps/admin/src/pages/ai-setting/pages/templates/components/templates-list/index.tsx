import { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useMutation } from '@tanstack/react-query';

import { updateTemplateApi } from '@/src/apis/template.api';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import { ITemplate } from '@/src/libs/interfaces/ai-setting';

import EditTemplateForm from './components/edit-template-form';
import TemplateItem from './components/template-item';

export interface TemplateListProps {
  templates: ITemplate[];
  refetchTemplates: () => void;
}

const TemplateList = ({ templates, refetchTemplates }: TemplateListProps) => {
  const [selected, setSelected] = useState('');
  const { toast } = useToast();

  const { mutate: updateTemplate } = useMutation({
    mutationFn: updateTemplateApi,
    onSuccess: (response) => {
      if (!response.data.updated) {
        toast({
          variant: 'destructive',
          description: <FailToastDescription content="Update template failed" />,
        });
        return;
      }

      refetchTemplates();
      setSelected('');

      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Update template successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Something went wrong" />,
      });
    },
  });

  const onUpdateTemplateSubmit = (
    templateId: string,
    data: { name: string; description: string; template: string }
  ) => {
    updateTemplate({ templateId: templateId, data });
  };

  const onCancelUpdateTemplate = () => {
    setSelected('');
  };

  return (
    <RadioGroup.Root className="flex flex-col space-y-5" defaultValue="1" aria-label="View density">
      {templates
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((template: ITemplate) => {
          if (selected === template.id) {
            return (
              <EditTemplateForm
                key={template.id}
                name={template.name}
                description={template.description}
                template={template.template}
                id={template.id}
                onCancelUpdateTemplate={onCancelUpdateTemplate}
                onUpdateTemplateSubmit={onUpdateTemplateSubmit}
              />
            );
          }

          return (
            <TemplateItem
              key={template.id}
              id={template.id}
              name={template.name}
              description={template.description}
              isActive={template.isActive}
              setSelected={setSelected}
              refetchTemplates={refetchTemplates}
            />
          );
        })}
    </RadioGroup.Root>
  );
};

export default TemplateList;
