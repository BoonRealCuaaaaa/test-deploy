import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssistantConfigModule } from '../assistant-config/assistant-config.module';
import { IntegrationPlatform } from '../integration-platform/entities/integration-platform.entity';
import { ResponseTemplate } from '../response-template/entities/response-template.entity';
import { Rule } from '../rule/entities/rule.entity';
import { User } from '../user/entities/user.entity';

import { AIAssistant } from './entities/assistant.entity';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AIAssistant, User, Rule, IntegrationPlatform, ResponseTemplate]),
    AssistantConfigModule,
  ],
  controllers: [AssistantController],
  providers: [AssistantService],
  exports: [AssistantService],
})
export class AssistantModule {}
