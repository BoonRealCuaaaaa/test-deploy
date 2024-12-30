import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createOrFail, updatedOrFail } from 'src/lib/utils/repository.util';
import { Repository } from 'typeorm';

import {
  AssistantConfigService,
  CreateAssistantConfigInput,
  UpdateAssistantConfigInput,
} from '../assistant-config/assistant-config.service';
import { IntegrationPlatform } from '../integration-platform/entities/integration-platform.entity';
import { User } from '../user/entities/user.entity';

import { AIAssistant } from './entities/assistant.entity';

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(AIAssistant)
    private aiAssistantRepository: Repository<AIAssistant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly assistantConfigService: AssistantConfigService,
    @InjectRepository(IntegrationPlatform)
    private integrationPlatformRepository: Repository<IntegrationPlatform>
  ) {}

  async findAll() {
    const assistants = await this.aiAssistantRepository.find({ relations: ['config'] });
    return assistants.map((assistant) => ({
      id: assistant.id,
      jarvisAssistantId: assistant.jarvisAssistantId,
      jarvisKnowledgeId: assistant.jarvisKnowledgeId,
      createdAt: assistant.createdAt,
      updatedAt: assistant.updatedAt,
      ...assistant.config.values,
    }));
  }

  async create(
    ownerId: string,
    config: CreateAssistantConfigInput = {
      toneOfAI: 'Professional',
      language: 'English',
      includeReference: false,
      autoResponse: true,
      enableTemplate: false,
    },
    jarvisAssistantId?: string,
    jarvisKnowledgeId?: string
  ) {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new NotFoundException('User not found');
    }

    const assistant = await createOrFail(
      this.aiAssistantRepository,
      {
        jarvisAssistantId,
        jarvisKnowledgeId,
        owner,
      } as AIAssistant,
      'Create failed'
    );

    await this.assistantConfigService.create(assistant.id, config);

    return assistant;
  }

  async findOne(assistantId: string) {
    const assistant = await this.aiAssistantRepository.findOne({
      where: { id: assistantId },
      relations: ['config'],
    });

    if (!assistant) {
      throw new NotFoundException('AI-Assistant not found');
    }

    return {
      id: assistant.id,
      jarvisAssistantId: assistant.jarvisAssistantId,
      jarvisKnowledgeId: assistant.jarvisKnowledgeId,
      createdAt: assistant.createdAt,
      updatedAt: assistant.updatedAt,
      ...assistant.config.values,
    };
  }

  async findByUserId(userId: string) {
    const assistant = await this.aiAssistantRepository.findOne({
      where: { owner: { id: userId } },
      relations: ['config'],
    });

    if (!assistant) {
      throw new NotFoundException('AI-Assistant not found');
    }

    return {
      id: assistant.id,
      jarvisAssistantId: assistant.jarvisAssistantId,
      jarvisKnowledgeId: assistant.jarvisKnowledgeId,
      createdAt: assistant.createdAt,
      updatedAt: assistant.updatedAt,
      ...assistant.config.values,
    };
  }

  async update(
    assistantId: string,
    ownerId: string,
    updateConfig: UpdateAssistantConfigInput,
    jarvisAssistantId?: string,
    jarvisKnowledgeId?: string
  ) {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });

    if (!owner) {
      throw new NotFoundException('User not found');
    }

    const { affected } = await updatedOrFail(
      this.aiAssistantRepository,
      assistantId,
      {
        jarvisAssistantId,
        jarvisKnowledgeId,
        owner,
      } as AIAssistant,
      'Update failed'
    );

    if (!affected) {
      throw new BadRequestException('Given Id not found');
    }

    await this.assistantConfigService.updateByAssistantId(assistantId, updateConfig);
    const assistant = await this.findOne(assistantId);

    return {
      updated: affected > 0,
      assistant,
    };
  }

  async updateByDomain(
    domain: string,
    ownerId: string,
    updateConfig: UpdateAssistantConfigInput,
    jarvisAssistantId?: string,
    jarvisKnowledgeId?: string
  ) {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });

    if (!owner) {
      throw new NotFoundException('User not found');
    }
    const integrationPlatform = await this.integrationPlatformRepository.findOne({
      where: { domain },
      relations: ['assistant'],
    });

    const assistant = await this.aiAssistantRepository.findOne({ where: { id: integrationPlatform?.assistant.id } });
    if (!assistant) {
      throw new NotFoundException('Assistant not found');
    }

    return this.update(assistant.id, ownerId, updateConfig, jarvisAssistantId, jarvisKnowledgeId);
  }

  async delete(assistantId: string) {
    const { affected } = await this.aiAssistantRepository.delete(assistantId);

    if (!affected) {
      throw new BadRequestException('Given Id not found');
    }

    return {
      id: assistantId,
      deleted: affected > 0,
    };
  }

  async deleteByUserId(userId: string) {
    const assistants = await this.aiAssistantRepository.find({ where: { owner: { id: userId } } });
    if (!assistants.length) {
      throw new NotFoundException('Assistant not found');
    }

    for (const assistant of assistants) {
      await this.delete(assistant.id);
    }

    return {
      userId,
      deleted: true,
    };
  }
}
