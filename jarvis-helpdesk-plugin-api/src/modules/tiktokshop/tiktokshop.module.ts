import { Module } from '@nestjs/common';
import { AiAssistantModule } from 'src/shared/modules/ai-assistant/ai-assistant.module';

import { TiktokshopController } from './tiktokshop.controller';
import { TiktokshopService } from './tiktokshop.service';

@Module({
  imports: [AiAssistantModule],
  controllers: [TiktokshopController],
  providers: [TiktokshopService],
  exports: [TiktokshopService],
})
export class TiktokshopModule {}
