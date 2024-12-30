import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { createIntegrationApi, getIntegrationApi, updateIntegrationApi } from '@/src/apis/integration.api';
import FullscreenLoader from '@/src/components/full-screen-loader';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import SuccessToastDescription from '@/src/components/toaster/components/success-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import { useAssistant } from '@/src/hooks/use-assistant';
import { Integration } from '@/src/libs/constants/integration';

import IntegrationSetting from './components/integration-setting';
import PlatformCard from './components/platform-card';
import { INTEGRATION_PROPS } from './constants/integration-props';
import { INTEGRATION_QUERY_KEYS } from './constants/query-keys';
import { IntegrationProp } from './types/integration-prop';

const IntegrationsPage = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{ type: string; platformName: string; icon: string } | null>(
    null
  );
  const assistant = useAssistant();
  const { toast } = useToast();

  const onSettingClick = ({ type, platformName, icon }: { type: string; platformName: string; icon: string }) => {
    setIsOpenSetting(true);
    setSelectedPlatform({ type, platformName, icon });
  };

  const onBackClick = () => {
    setIsOpenSetting(false);
    setSelectedPlatform(null);
  };

  const { mutate: createIntegration } = useMutation({
    mutationFn: createIntegrationApi,
    onSuccess: () => {
      refetchIntegrations();
      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Integrated successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Something went wrong" />,
      });
    },
  });

  const onCreateIntegration = ({
    data,
    assistantId,
  }: {
    assistantId: string;
    data: { type: Integration; domain: string };
  }) => {
    createIntegration({ assistantId, data });
  };

  const { mutate: updateIntegration } = useMutation({
    mutationFn: updateIntegrationApi,
    onSuccess: (response) => {
      if (!response.data.updated) {
        toast({
          variant: 'destructive',
          description: <FailToastDescription content="Update rule failed" />,
        });
        return;
      }
      refetchIntegrations();
      toast({
        variant: 'success',
        description: <SuccessToastDescription content="Update integration settings successfully" />,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Something went wrong" />,
      });
    },
  });

  const {
    data: integrations,
    isLoading: isIntegrationsLoading,
    error: integrationsError,
    isError: isIntegrationsError,
    refetch: refetchIntegrations,
  } = useQuery({
    queryKey: [INTEGRATION_QUERY_KEYS.INTEGRATIONS],
    queryFn: () => {
      if (!assistant?.id) {
        return;
      }

      return getIntegrationApi(assistant.id);
    },
  });

  if (isIntegrationsLoading) {
    return <FullscreenLoader />;
  }

  if (isIntegrationsError) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-primary-500">I'm so sorry. Something's wrong</h2>
        <p className="text-lg font-medium">{integrationsError.message}</p>
      </div>
    );
  }

  const selectedData = integrations?.data.find((integration) => integration.type === selectedPlatform?.type);

  return (
    <>
      {isOpenSetting && selectedPlatform ? (
        <IntegrationSetting
          onBackClick={onBackClick}
          platformType={selectedPlatform.type}
          selectedData={selectedData}
          icon={selectedPlatform.icon}
          platformName={selectedPlatform.platformName}
          onUpdateIntegration={updateIntegration}
          onCreateIntegration={onCreateIntegration}
        />
      ) : (
        <div className="flex flex-row flex-wrap gap-[28px]">
          {Object.entries(INTEGRATION_PROPS).map(([key, value]: [string, IntegrationProp]) => {
            const integrationData = integrations?.data.find(
              (integration) => integration.type.toLowerCase() === key.toLowerCase()
            );

            return (
              <PlatformCard
                key={key}
                icon={value.icon}
                platformName={value.platformName}
                onSettingClick={() => onSettingClick({ type: key, icon: value.icon, platformName: value.platformName })}
                isEnable={integrationData !== undefined ? integrationData.isEnable : false}
                id={integrationData != undefined ? integrationData.id : null}
                onUpdateIntegration={updateIntegration}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default IntegrationsPage;
