import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { QueryParamsDto } from 'src/shared/dtos/common.dto';

@Injectable()
export class AiAssistantService {
  private client: AxiosInstance;
  constructor(private configService: ConfigService) {
    this.client = axios.create({
      baseURL: configService.get('aiModuleApiUrl'),
    });
  }

  async askAssistant(message: string) {
    const response = await this.client.post<any, AxiosResponse<string>>(`/api/v1/ai-assistant/generate-response`, {
      message,
    });
    return response.data;
  }

  async createKnowledge({ name, description }: { name?: string; description?: string }) {
    const response = await this.client.post('/api/v1/ai-knowledge', {
      name,
      description,
    });
    return response.data;
  }
  async getAssistantKnowledges({ query, offset, limit, order }: QueryParamsDto) {
    const searchParams = new URLSearchParams();
    searchParams.append('offset', offset?.toString() || '0');
    searchParams.append('limit', limit?.toString() || '5');

    if (query) {
      searchParams.append('q', query);
    }

    if (order?.field) {
      searchParams.append('order_field', `${order.field}`);
    }

    if (order?.direction) {
      searchParams.append('order', `${order.direction.toUpperCase()}`);
    } else {
      searchParams.append('order', 'DESC');
    }

    const response = await this.client.get(`/api/v1/ai-knowledge?${searchParams.toString()}`);
    return response.data;
  }

  async getAssistantKnowledge(knowledgeId: string) {
    const response = await this.client.get(`/api/v1/ai-knowledge/${knowledgeId}`);
    return response.data;
  }

  async updateAssistantKnowledge(knowledgeId: string, { name, description }: { name: string; description?: string }) {
    const response = await this.client.patch<any, AxiosResponse<boolean>>(`/api/v1/ai-knowledge/${knowledgeId}`, {
      name,
      description,
    });

    return response.data;
  }

  async deleteKnowledge(knowledgeId: string) {
    await this.client.delete(`/api/v1/ai-knowledge/${knowledgeId}`);
  }

  async importLocalFIle(knowledgeId: string, file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname);

    const response = await this.client.post<any, AxiosResponse<boolean>>(
      `/api/v1/ai-knowledge/${knowledgeId}/local-file`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }

  async importWeb(knowledgeId: string, name: string, webUrl: string) {
    const response = await this.client.post<any, AxiosResponse<boolean>>(`/api/v1/ai-knowledge/${knowledgeId}/web`, {
      name,
      webUrl,
    });

    return response.data;
  }

  async getSources(knowledgeId: string, { query, offset, limit, order }: QueryParamsDto) {
    const searchParams = new URLSearchParams();
    searchParams.append('offset', offset?.toString() || '0');
    searchParams.append('limit', limit?.toString() || '5');

    if (query) {
      searchParams.append('q', query);
    }

    if (order?.field) {
      searchParams.append('order_field', `${order.field}`);
    }

    if (order?.direction) {
      searchParams.append('order', `${order.direction.toUpperCase()}`);
    } else {
      searchParams.append('order', 'DESC');
    }

    const response = await this.client.get(`/api/v1/ai-knowledge/${knowledgeId}/units?${searchParams.toString()}`);
    return response.data;
  }

  async updateSourceStatus(knowledgeId: string, sourceId: string, status: boolean) {
    await this.client.patch(`/api/v1/ai-knowledge/${knowledgeId}/units/${sourceId}`, { status });
  }

  async deleteSource(knowledgeId: string, sourceId: string) {
    await this.client.delete(`/api/v1/ai-knowledge/${knowledgeId}/units/${sourceId}`);
  }
}
