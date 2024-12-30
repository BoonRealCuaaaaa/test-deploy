import { useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '@/src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/card';
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
} from '@/src/components/form';
import { Switch } from '@/src/components/switch';
import { useAssistant } from '@/src/hooks/use-assistant';
import { Integration } from '@/src/libs/constants/integration';
import { IIntegrationPlatform } from '@/src/libs/interfaces/ai-setting';

import { INTEGRATION_FORM_SIZE } from './constants/integration-form-size';

const formSchema = yup.object({
  domain: yup.string().required().max(INTEGRATION_FORM_SIZE.MAX_DOMAIN),
});

type FormSchema = yup.InferType<typeof formSchema>;

export interface IntegrationSettingPageProps {
  icon: string | undefined;
  platformType: string;
  platformName: string;
  selectedData: IIntegrationPlatform | undefined;
  onBackClick: () => void;
  onCreateIntegration: ({
    data,
    assistantId,
  }: {
    assistantId: string;
    data: { type: Integration; domain: string };
  }) => any;
  onUpdateIntegration: ({
    integrationPlatformId,
    data,
  }: {
    integrationPlatformId: string;
    data: { domain?: string; isEnable?: boolean };
  }) => any;
}

const IntegrationSettingPage = ({
  icon,
  platformType,
  platformName,
  selectedData,
  onBackClick,
  onCreateIntegration,
  onUpdateIntegration,
}: IntegrationSettingPageProps) => {
  const assistant = useAssistant();

  const data = selectedData;
  const initialDomain = data?.domain.split(`.${platformType.toLowerCase()}.com`)[0] || '';
  const [isEnable, setIsEnable] = useState(data !== undefined ? data.isEnable : false);

  const form = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      domain: initialDomain,
    },
  });

  const onHandleSaveClick = ({ domain }: FormSchema) => {
    const fullDomain = `${domain}.${platformType.toLowerCase()}.com`;
    if (data === undefined) {
      if (assistant?.id) {
        onCreateIntegration({
          data: { type: platformType as Integration, domain: fullDomain },
          assistantId: assistant.id,
        });
      }
    } else {
      onUpdateIntegration({
        integrationPlatformId: data.id,
        data: {
          domain: fullDomain,
          isEnable: isEnable,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button variant="ghost" onClick={onBackClick} className="w-min gap-x-2 font-semibold">
        <ArrowLeft />
        Back
      </Button>
      <Card className="flex divide-x divide-y-0">
        <div className="flex w-[240px] min-w-[240px] flex-col gap-y-5 p-[30px]">
          <img src={icon} className="size-[46px]" />
          <span className="text-[16px]/[16px] font-medium">{platformName}</span>
        </div>
        <div className="flex-1 divide-y divide-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Integration settings</CardTitle>
            {data != undefined && (
              <div className="flex items-center gap-x-2.5">
                <span className="text-[13px]/[14px] text-gray-500">{`Enable ${platformName} integration`}</span>
                <Switch checked={isEnable} onCheckedChange={(checked) => setIsEnable(checked)} />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onHandleSaveClick)}
                id="edit-template-form"
                className="flex flex-col gap-y-5"
              >
                <FormField
                  control={form.control}
                  name="domain"
                  maxLength={50}
                  render={({ field }: { field: ControllerRenderProps<FormSchema, 'domain'> }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <FormInput placeholder="Your domain..." {...field} />
                      </FormControl>
                      <FormStatus>
                        <FormMessage />
                        <FormCounter />
                      </FormStatus>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-x-2.5">
                  <Button type="submit" variant="primary" size="medium">
                    {data == undefined ? 'Connect' : 'Save'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default IntegrationSettingPage;
