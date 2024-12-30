import { Module } from '@nestjs/common';
import { AiAssistantModule } from 'src/shared/modules/ai-assistant/ai-assistant.module';

import { AssistantKnowledgeController } from './assistant-knowledge.controller';
import { AssistantKnowledgeService } from './assistant-knowledge.service';

@Module({
  controllers: [AssistantKnowledgeController],
  providers: [AssistantKnowledgeService],
  imports: [AiAssistantModule],
  exports: [AssistantKnowledgeService],
})
export class AssistantKnowledgeModule {}
