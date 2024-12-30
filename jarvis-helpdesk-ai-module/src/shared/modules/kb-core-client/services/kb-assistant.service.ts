import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';

@Injectable()
export class KbAssistantService {
  private readonly logger = new Logger(KbAssistantService.name);

  constructor(@Inject('KB_CORE_CLIENT') private client: AxiosInstance) {}

  async ask(assistantId: string, { openAiThreadId, message }: { openAiThreadId: string; message: string }) {
    const response = await this.client.post(`/kb-core/v1/ai-assistant/${assistantId}/ask`, {
      message,
      openAiThreadId,
    });
    return response.data;
  }

  async importKnowledge(assistantId: string, { knowledgeId }: { knowledgeId: string }) {
    await this.client.post(`/kb-core/v1/ai-assistant/${assistantId}/knowledges/${knowledgeId}`);
  }

  async removeKnowledge(assistantId: string, { knowledgeId }: { knowledgeId: string }) {
    await this.client.delete(`/kb-core/v1/ai-assistant/${assistantId}/knowledges/${knowledgeId}`);
  }
}
