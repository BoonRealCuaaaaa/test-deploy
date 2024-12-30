import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AIAssistant } from '../assistant/entities/assistant.entity';

import { IntegrationPlatform } from './entities/integration-platform.entity';
import { IntegrationPlatformController } from './integration-platform.controller';
import { IntegrationPlatformService } from './integration-platform.service';

@Module({
  imports: [TypeOrmModule.forFeature([IntegrationPlatform, AIAssistant])],
  controllers: [IntegrationPlatformController],
  providers: [IntegrationPlatformService],
  exports: [IntegrationPlatformService],
})
export class IntegrationPlatformModule {}
