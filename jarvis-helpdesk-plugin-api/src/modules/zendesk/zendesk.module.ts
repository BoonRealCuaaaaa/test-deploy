import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAssistantModule } from 'src/shared/modules/ai-assistant/ai-assistant.module';

import { AssistantModule } from '../assistant/assistant.module';
import { AIAssistant } from '../assistant/entities/assistant.entity';
import { IntegrationPlatform } from '../integration-platform/entities/integration-platform.entity';
import { IntegrationPlatformModule } from '../integration-platform/integration-platform.module';
import { ResponseTemplate } from '../response-template/entities/response-template.entity';
import { Rule } from '../rule/entities/rule.entity';

import { ZendeskController } from './zendesk.controller';
import { ZendeskService } from './zendesk.service';

@Module({
  imports: [
    AiAssistantModule,
    AssistantModule,
    IntegrationPlatformModule,
    TypeOrmModule.forFeature([AIAssistant, ResponseTemplate, Rule, IntegrationPlatform]),
  ],
  controllers: [ZendeskController],
  providers: [ZendeskService],
  exports: [ZendeskService],
})
export class ZendeskModule {}
