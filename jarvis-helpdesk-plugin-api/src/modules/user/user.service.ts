import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createOrFail, updatedOrFail } from 'src/lib/utils/repository.util';
import { Repository } from 'typeorm';

import { AIAssistant } from '../assistant/entities/assistant.entity';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AIAssistant)
    private assistantRepository: Repository<AIAssistant>
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async create({ email }: { email: string }) {
    return await createOrFail(this.userRepository, { email } as User, 'Email is existed');
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, { email }: { email?: string }) {
    const { affected } = await updatedOrFail(this.userRepository, id, { email }, 'Failed to update');

    if (!affected) {
      throw new BadRequestException('Given Id not found');
    }

    const updatedUser = await this.findOne(id);

    return {
      ...updatedUser,
      updated: affected > 0,
    };
  }

  async delete(id: string) {
    const { affected } = await this.userRepository.delete(id);

    if (!affected) {
      throw new BadRequestException('Given Id not found');
    }

    return {
      id: id,
      deleted: affected > 0,
    };
  }

  async getContextUser(userId: string) {
    const assistant = await this.assistantRepository.findOne({
      where: { owner: { id: userId } },
      relations: ['config'],
    });

    if (!assistant) {
      throw new BadRequestException("User don't any assistant");
    }

    return {
      id: assistant.id,
      ...assistant.config.values,
      jarvisAssitantId: assistant.jarvisAssistantId,
      jarvisKnowledgeId: assistant.jarvisKnowledgeId,
      createdAt: assistant.createdAt,
      updatedAt: assistant.updatedAt,
    };
  }
}
