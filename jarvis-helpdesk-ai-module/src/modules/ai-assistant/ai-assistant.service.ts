import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KbCoreClientService } from 'src/shared/modules/kb-core-client/kb-core-client.service';

@Injectable()
export class AiAssistantService {
  // TODO: this should be stored in the database for each `enterprise` in the future
  private kbAssistantId: string;

  constructor(private configService: ConfigService, private kbCoreClient: KbCoreClientService) {
    this.kbAssistantId = configService.getOrThrow('knowledgeBase.assistantId');
  }

  // NOTE: We are only using this service to ask the assistant a question
  async askAssistant(message: string) {
    const { openAiThreadId } = await this.kbCoreClient.thread.createThread(this.kbAssistantId);

    return await this.kbCoreClient.assistant.ask(this.kbAssistantId, { message, openAiThreadId });
  }

  async importKnowledge(knowledgeId: string) {
    return await this.kbCoreClient.assistant.importKnowledge(this.kbAssistantId, { knowledgeId });
  }

  async removeKnowledge(knowledgeId: string) {
    return await this.kbCoreClient.assistant.removeKnowledge(this.kbAssistantId, { knowledgeId });
  }
}
