import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { KbAssistantService } from './services/kb-assistant.service';
import { KbKnowledgeService } from './services/kb-knowledge.service';
import { KbThreadService } from './services/kb-thread.service';
import { KbCoreClientService } from './kb-core-client.service';

@Global()
@Module({
  providers: [
    KbCoreClientService,
    KbKnowledgeService,
    KbAssistantService,
    KbThreadService,
    {
      provide: 'KB_CORE_CLIENT',
      useFactory: (configService: ConfigService) => {
        return axios.create({
          baseURL: configService.get('knowledgeBase.endpoint'),
          headers: {
            Authorization: `Bearer ${configService.getOrThrow('knowledgeBase.token')}`,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [KbCoreClientService],
})
export class KbCoreClientModule {}
