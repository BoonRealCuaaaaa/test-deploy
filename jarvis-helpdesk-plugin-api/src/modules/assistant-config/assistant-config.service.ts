import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AIAssistant } from '../assistant/entities/assistant.entity';

import { UpdateAssistantConfigDto } from './dtos/update-assistant-config.dto';
import { AssistantConfig } from './entities/assistant-config.entity';

export type CreateAssistantConfigInput = {
  toneOfAI?: string;
  language?: string;
  includeReference?: boolean;
  autoResponse?: boolean;
  enableTemplate?: boolean;
};

export type UpdateAssistantConfigInput = Partial<CreateAssistantConfigInput>;

@Injectable()
export class AssistantConfigService {
  constructor(
    @InjectRepository(AssistantConfig)
    private assistantConfigRepository: Repository<AssistantConfig>,
    @InjectRepository(AIAssistant)
    private aiAssistantRepository: Repository<AIAssistant>
  ) {}

  async create(
    assistantId: string,
    { toneOfAI, language, includeReference, autoResponse, enableTemplate }: CreateAssistantConfigInput
  ) {
    const config = { toneOfAI, language, includeReference, autoResponse, enableTemplate };
    const assistant = await this.aiAssistantRepository.findOne({ where: { id: assistantId } });

    if (!assistant) {
      throw new NotFoundException('Assistant not found');
    }

    const assistantConfig = this.assistantConfigRepository.create({
      values: config,
      assistant,
    });
    return this.assistantConfigRepository.save(assistantConfig);
  }

  async findAll() {
    return this.assistantConfigRepository.find({ relations: ['assistant'] });
  }

  async findOne(id: string) {
    const assistantConfig = await this.assistantConfigRepository.findOne({
      where: { id },
      relations: ['assistant'],
    });

    if (!assistantConfig) {
      throw new NotFoundException('AssistantConfig not found');
    }

    return assistantConfig;
  }

  async findOneByAssistantId(assistantId: string) {
    const assistantConfig = await this.assistantConfigRepository.findOne({
      where: { assistant: { id: assistantId } },
      relations: ['assistant'],
    });

    if (!assistantConfig) {
      throw new NotFoundException('AssistantConfig not found');
    }

    return assistantConfig;
  }

  async updateByAssistantId(
    assistantId: string,
    { toneOfAI, language, includeReference, autoResponse, enableTemplate }: UpdateAssistantConfigDto
  ) {
    const assistantConfig = await this.findOneByAssistantId(assistantId);

    const updatedValues = {
      ...assistantConfig.values,
      ...Object.fromEntries(
        Object.entries({
          toneOfAI,
          language,
          includeReference,
          autoResponse,
          enableTemplate,
        }).filter(([_, v]) => v !== undefined)
      ),
    };

    await this.assistantConfigRepository.save({ ...assistantConfig, values: updatedValues });

    return this.findOneByAssistantId(assistantId);
  }

  async remove(assistantId: string) {
    const assistantConfig = await this.findOneByAssistantId(assistantId);
    return this.assistantConfigRepository.remove(assistantConfig);
  }

  async removeByAssistantId(assistantId: string) {
    const assistantConfig = await this.findOneByAssistantId(assistantId);
    return this.assistantConfigRepository.remove(assistantConfig);
  }
}
