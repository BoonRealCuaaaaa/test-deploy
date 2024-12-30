import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/shared/dtos/pagination.dtos';
import { KbCoreClientService } from 'src/shared/modules/kb-core-client/kb-core-client.service';

@Injectable()
export class AiKnowledgeService {
  constructor(private kbCoreClient: KbCoreClientService) {}

  async createKnowledge(name: string, description?: string) {
    return await this.kbCoreClient.knowledge.create(name, description);
  }

  async getKnowledge(knowledgeId: string) {
    return await this.kbCoreClient.knowledge.get(knowledgeId);
  }

  async getKnowledgeList({ offset, limit, order_field, q, order }: PageOptionsDto) {
    return await this.kbCoreClient.knowledge.getList({ offset, limit, order_field, q, order });
  }

  async updateKnowledge(knowledgeId: string, { name, description }: { name?: string; description?: string }) {
    await this.kbCoreClient.knowledge.update(knowledgeId, { knowledgeName: name, description });
    return true;
  }

  async deleteKnowledge(knowledgeId: string) {
    await this.kbCoreClient.knowledge.delete(knowledgeId);
    return true;
  }

  async importLocalFile(knowledgeId: string, file: Express.Multer.File) {
    await this.kbCoreClient.knowledge.importLocalFile(knowledgeId, { file });
    return true;
  }

  async importWeb(knowledgeId: string, name: string, webUrl: string) {
    await this.kbCoreClient.knowledge.importWeb(knowledgeId, { name, webUrl });
    return true;
  }

  async getKnowledgeUnits(knowledgeId: string, { offset, limit, order_field, q, order }: PageOptionsDto) {
    return await this.kbCoreClient.knowledge.getUnits(knowledgeId, { offset, limit, order_field, q, order });
  }

  async deleteKnowledgeUnit(knowledgeId: string, unitId: string) {
    await this.kbCoreClient.knowledge.deleteUnit(knowledgeId, unitId);
    return true;
  }

  async updateKnowledgeUnitStatus(knowledgeId: string, unitId: string, status: boolean) {
    await this.kbCoreClient.knowledge.updateUnitStatus(knowledgeId, unitId, status);
    return true;
  }
}
