import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createOrFail, updatedOrFail } from 'src/lib/utils/repository.util';
import { AIAssistant } from 'src/modules/assistant/entities/assistant.entity';
import { Repository } from 'typeorm';

import { PlatformTypeEnum } from './constants/platform-type';
import { IntegrationPlatform } from './entities/integration-platform.entity';

@Injectable()
export class IntegrationPlatformService {
  constructor(
    @InjectRepository(IntegrationPlatform)
    private integrationPlatformRepository: Repository<IntegrationPlatform>,
    @InjectRepository(AIAssistant)
    private aiAssistantRepository: Repository<AIAssistant>
  ) {}

  async findAllByAssisantId(assistantId: string) {
    return await this.integrationPlatformRepository.find({
      where: { assistant: { id: assistantId } },
    });
  }

  async create(
    assistantId: string,
    {
      type = PlatformTypeEnum.ZENDESK,
      domain,
      isEnable = true,
    }: {
      type: PlatformTypeEnum;
      domain: string;
      isEnable?: boolean;
    }
  ) {
    const assistant = await this.aiAssistantRepository.findOne({ where: { id: assistantId } });

    if (!assistant) {
      throw new NotFoundException('Assistant not found');
    }

    return await createOrFail(
      this.integrationPlatformRepository,
      { type, domain, assistant, isEnable } as IntegrationPlatform,
      'Create failed'
    );
  }

  async findOne(integrationPlatformId: string) {
    const integrationPlatform = await this.integrationPlatformRepository.findOne({
      where: { id: integrationPlatformId },
    });

    if (!integrationPlatform) {
      throw new NotFoundException('Integration Platform not found');
    }

    return integrationPlatform;
  }

  async findOneByDomain(domain: string) {
    return await this.integrationPlatformRepository.findOneOrFail({
      where: { domain },
      relations: ['assistant'],
    });
  }

  async update(
    integrationPlatformId: string,
    { type, domain, isEnable }: { type?: PlatformTypeEnum; domain?: string; isEnable?: boolean }
  ) {
    const { affected } = await updatedOrFail(
      this.integrationPlatformRepository,
      integrationPlatformId,
      { type, domain, isEnable },
      'Update failed'
    );

    if (!affected) {
      throw new BadRequestException('Given Id not found');
    }

    const updatedIntegrationPlatform = await this.findOne(integrationPlatformId);

    return {
      integrationPlatform: updatedIntegrationPlatform,
      updated: affected > 0,
    };
  }

  async delete(integrationPlatformId: string) {
    const { affected } = await this.integrationPlatformRepository.delete(integrationPlatformId);

    if (!affected) {
      throw new BadRequestException('Given Id not found');
    }

    return {
      id: integrationPlatformId,
      deleted: affected > 0,
    };
  }

  async deleteByUserId(userId: string) {
    const integrationPlatforms = await this.integrationPlatformRepository.find({
      where: { assistant: { owner: { id: userId } } },
    });

    for (const integrationPlatform of integrationPlatforms) {
      await this.delete(integrationPlatform.id);
    }

    return {
      deleted: integrationPlatforms.length,
    };
  }
}
