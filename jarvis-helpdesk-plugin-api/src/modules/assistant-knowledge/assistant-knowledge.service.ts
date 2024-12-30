import { Injectable } from '@nestjs/common';
import { QueryParamsDto } from 'src/shared/dtos/common.dto';
import { AiAssistantService } from 'src/shared/modules/ai-assistant/ai-assistant.service';

import { UpdateAssistantKnowledgeDto } from './dtos/update-assistant-knowledge.dto';

@Injectable()
export class AssistantKnowledgeService {
  constructor(private aiAssistantService: AiAssistantService) {}

  async createKnowledge(name: string, description: string) {
    return await this.aiAssistantService.createKnowledge({ name, description });
  }

  async getAssistantKnowledges(dto: QueryParamsDto) {
    return await this.aiAssistantService.getAssistantKnowledges(dto);
  }

  async getAssistantKnowledge(knowledgeId: string) {
    return await this.aiAssistantService.getAssistantKnowledge(knowledgeId);
  }

  async updateAssistantKnowledge(knowledgeId: string, dto: UpdateAssistantKnowledgeDto) {
    return this.aiAssistantService.updateAssistantKnowledge(knowledgeId, dto);
  }

  async deleteKnowledge(knowledgeId: string) {
    return this.aiAssistantService.deleteKnowledge(knowledgeId);
  }

  async importLocalFile(knowledgeId: string, file: Express.Multer.File) {
    return await this.aiAssistantService.importLocalFIle(knowledgeId, file);
  }

  async importWeb(knowledgeId: string, name: string, webUrl: string) {
    return await this.aiAssistantService.importWeb(knowledgeId, name, webUrl);
  }

  async getSources(knowledgeId: string, { query, offset, limit, order }: QueryParamsDto) {
    return await this.aiAssistantService.getSources(knowledgeId, { query, offset, limit, order });
  }

  async updateSourceStatus(knowledgeId: string, sourceId: string, status: boolean) {
    return await this.aiAssistantService.updateSourceStatus(knowledgeId, sourceId, status);
  }

  async deleteSource(knowledgeId: string, sourceId: string) {
    return await this.aiAssistantService.deleteSource(knowledgeId, sourceId);
  }
}