import { useMutation } from '@tanstack/react-query';

import { updateAssistantSettings } from '@/src/apis/setting.api';
import { Badge } from '@/src/components/badge';
import { Card, CardContentSettings, CardHeader, CardTitle } from '@/src/components/card';
import { Description, Label, LabelGroup } from '@/src/components/label';
import { RadioGroupCard, RadioGroupCardItem } from '@/src/components/radio-group/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/select';
import { Switch } from '@/src/components/switch';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import { useAssistant } from '@/src/hooks/use-assistant';
import { IAssistantSettings } from '@/src/libs/interfaces/ai-setting';
import { useAppStore } from '@/src/store';

const GeneralPage = () => {
  const assistant: IAssistantSettings | undefined = useAssistant();

  const setAssistant = useAppStore((state) => state.setAssistant);

  const { toast } = useToast();

  const { mutate: updateSetting } = useMutation({
    mutationFn: updateAssistantSettings,
    onSuccess: (newData) => {
      if (newData.data.updated) {
        setAssistant(newData.data.assistant);
      }
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Something went wrong" />,
      });
    },
  });

  const onUpdateSetting = (key: keyof IAssistantSettings, value: string | boolean) => {
    if (!assistant?.id) {
      console.error('Assistant ID is undefined. Unable to update settings.');
      return;
    }

    updateSetting({ updatedWorkspace: { [key]: value }, assistantId: assistant.id });
  };

  return (
    <div className="flex flex-col gap-y-[30px]">
      <Card>
        <CardHeader>
          <CardTitle>AI Tone</CardTitle>
        </CardHeader>
        <RadioGroupCard
          value={assistant?.toneOfAI}
          onValueChange={(value: string) => {
            onUpdateSetting('toneOfAI', value);
          }}
        >
          <RadioGroupCardItem value="professional" id="professional">
            <Label>Professional</Label>
            <Description>
              Responses are formal, concise, and focused on clarity. Ideal for business or corporate settings, where
              accuracy and neutrality are key.
            </Description>
          </RadioGroupCardItem>
          <RadioGroupCardItem value="friendly" id="friendly">
            <Label>Friendly</Label>
            <Description>
              Conversational and approachable, this tone uses casual language to create a warm and engaging experience,
              perfect for customer support or social interactions.
            </Description>
          </RadioGroupCardItem>
          <RadioGroupCardItem value="enthusiastic" id="enthusiastic">
            <Label>Enthusiastic</Label>
            <Description>
              Upbeat, energetic, and positive. Suitable for engaging audiences, creating excitement, or energizing
              responses.
            </Description>
          </RadioGroupCardItem>
        </RadioGroupCard>
      </Card>

      <Card>
        {/* AI Language */}
        <CardContentSettings>
          <LabelGroup>
            <Label>AI Language</Label>
            <Description>Set the primary language for generated response</Description>
          </LabelGroup>
          <Select
            value={assistant?.language}
            onValueChange={(value) => {
              onUpdateSetting('language', value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Vietnamese">Vietnamese</SelectItem>
              <SelectItem value="France">France</SelectItem>
            </SelectContent>
          </Select>
        </CardContentSettings>
        <CardContentSettings>
          <LabelGroup>
            <Label>Include References</Label>
            <Description>
              Add source links and references at the end of the AI's responses.
              <div className="mt-2.5">
                <span className="font-semibold">E.g:</span>
                <Badge className="ml-1.5">Source:【Your_Document_In_Knowledge_Base.pdf】</Badge>
              </div>
            </Description>
          </LabelGroup>
          <Switch
            checked={assistant?.includeReference}
            onCheckedChange={(checked) => {
              onUpdateSetting('includeReference', checked);
            }}
          />
        </CardContentSettings>
        <CardContentSettings>
          <LabelGroup>
            <Label>Auto response</Label>
            <Description>
              Automatically draft a response when entering this site or receiving a new message from client.
            </Description>
          </LabelGroup>
          <Switch
            checked={assistant?.autoResponse}
            onCheckedChange={(checked) => {
              onUpdateSetting('autoResponse', checked);
            }}
          />
        </CardContentSettings>
      </Card>
    </div>
  );
};

export default GeneralPage;
