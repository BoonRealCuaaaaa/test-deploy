import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AIAssistant } from '../assistant/entities/assistant.entity';

import { AssistantConfig } from './entities/assistant-config.entity';
import { AssistantConfigController } from './assistant-config.controller';
import { AssistantConfigService } from './assistant-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssistantConfig, AIAssistant])],
  controllers: [AssistantConfigController],
  providers: [AssistantConfigService],
  exports: [AssistantConfigService],
})
export class AssistantConfigModule {}
