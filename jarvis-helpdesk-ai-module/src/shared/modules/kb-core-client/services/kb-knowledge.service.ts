import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { omit } from 'lodash';
import qs from 'qs';
import { PageOptionsDto } from 'src/shared/dtos/pagination.dtos';

import { KbKnowledge } from '../interfaces/kb-knowledge';

@Injectable()
export class KbKnowledgeService {
  private readonly logger = new Logger(KbKnowledgeService.name);

  constructor(@Inject('KB_CORE_CLIENT') private client: AxiosInstance) {}

  async create(knowledgeName: string, description?: string) {
    const response = await this.client.post<KbKnowledge>(`/kb-core/v1/knowledge`, {
      knowledgeName,
      description,
    });
    return omit(response.data, ['userId', 'openAiKnowledgeId']);
  }

  async update(knowledgeId: string, { knowledgeName, description }: { knowledgeName?: string; description?: string }) {
    await this.client.patch(`/kb-core/v1/knowledge/${knowledgeId}`, {
      knowledgeName,
      description,
    });
  }

  async getList({ offset, limit, order_field, q, order }: PageOptionsDto) {
    const response = await this.client.get<KbKnowledge>(
      `/kb-core/v1/knowledge?${qs.stringify({ offset, limit, order_field, q, order })}`
    );
    return omit(response.data, ['userId', 'openAiKnowledgeId']);
  }

  async get(knowledgeId: string) {
    const response = await this.client.get<KbKnowledge>(`/kb-core/v1/knowledge/${knowledgeId}`);
    return omit(response.data, ['userId', 'openAiKnowledgeId']);
  }

  async delete(knowledgeId: string) {
    await this.client.delete(`/kb-core/v1/knowledge/${knowledgeId}`);
  }

  async importLocalFile(knowledgeId: string, { file }: { file: Express.Multer.File }) {
    const formData = new FormData();
    formData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname);
    await this.client.post(`/kb-core/v1/knowledge/${knowledgeId}/local-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async importWeb(knowledgeId: string, { name, webUrl }: { name: string; webUrl: string }) {
    await this.client.post(`/kb-core/v1/knowledge/${knowledgeId}/web`, { unitName: name, webUrl });
  }

  async getUnits(knowledgeId: string, { offset, limit, order_field, q, order }: PageOptionsDto) {
    const response = await this.client.get(
      `/kb-core/v1/knowledge/${knowledgeId}/units?${qs.stringify({ offset, limit, order_field, q, order })}`
    );
    return response.data;
  }

  async deleteUnit(knowledgeId: string, unitId: string) {
    await this.client.delete(`/kb-core/v1/knowledge/${knowledgeId}/units/${unitId}`);
  }

  async updateUnitStatus(_knowledgeId: string, unitId: string, status: boolean) {
    await this.client.patch(`/kb-core/v1/knowledge/units/${unitId}/status`, { status });
  }
}
