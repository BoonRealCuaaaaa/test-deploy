import { Injectable } from '@nestjs/common';

import { KbAssistantService } from './services/kb-assistant.service';
import { KbKnowledgeService } from './services/kb-knowledge.service';
import { KbThreadService } from './services/kb-thread.service';

@Injectable()
export class KbCoreClientService {
  constructor(
    public readonly assistant: KbAssistantService,
    public readonly knowledge: KbKnowledgeService,
    public readonly thread: KbThreadService
  ) {}
}
