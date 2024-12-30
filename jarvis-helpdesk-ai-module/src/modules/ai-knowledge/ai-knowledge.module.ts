import { Module } from '@nestjs/common';
import { KbCoreClientModule } from 'src/shared/modules/kb-core-client/kb-core-client.module';

import { AiKnowledgeController } from './ai-knowledge.controller';
import { AiKnowledgeService } from './ai-knowledge.service';

@Module({
  imports: [KbCoreClientModule],
  providers: [AiKnowledgeService],
  controllers: [AiKnowledgeController],
})
export class AiKnowledgeModule {}
