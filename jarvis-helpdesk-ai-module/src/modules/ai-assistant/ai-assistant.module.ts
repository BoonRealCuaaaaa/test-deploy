import { Module } from '@nestjs/common';
import { KbCoreClientModule } from 'src/shared/modules/kb-core-client/kb-core-client.module';

import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';

@Module({
  imports: [KbCoreClientModule],
  providers: [AiAssistantService],
  controllers: [AiAssistantController],
})
export class AiAssistantModule {}
