import { HddStack } from 'react-bootstrap-icons';

import {
  InstructionCard,
  InstructionCardContent,
  InstructionCardDescription,
  InstructionCardLink,
  InstructionCardTitle,
} from '@/src/components/instruction';

const InfoPanel = () => {
  return (
    <InstructionCard className="h-fit">
      <HddStack className="size-6 text-gray-500" />
      <InstructionCardContent>
        <InstructionCardTitle className="text-base">Customize AI response: Template</InstructionCardTitle>
        <InstructionCardDescription className="text-sm">
          Design your own plain-text templates to customize how the AI behaves and responds. These templates make it
          easy to define specific instructions, tone, or context for various tasks, allowing you to adapt the AI to your
          unique needs and streamline your workflow.
        </InstructionCardDescription>
      </InstructionCardContent>
      <InstructionCardLink className="text-xs decoration-dashed">Learn how to make an AI Template</InstructionCardLink>
    </InstructionCard>
  );
};

export default InfoPanel;
