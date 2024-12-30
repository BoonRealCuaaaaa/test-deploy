import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { omit } from 'lodash';

import { KbThread } from '../interfaces/kb-thread';

@Injectable()
export class KbThreadService {
  private readonly logger = new Logger(KbThreadService.name);

  constructor(@Inject('KB_CORE_CLIENT') private client: AxiosInstance) {}

  async createThread(assistantId: string, { firstMessage }: { firstMessage?: string } = { firstMessage: undefined }) {
    const response = await this.client.post<KbThread>(`/kb-core/v1/ai-assistant/thread`, {
      assistantId,
      firstMessage,
    });
    return omit(response.data, ['userId', 'assistantId']);
  }
}
