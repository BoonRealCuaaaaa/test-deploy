import { AIAssistant } from 'src/modules/assistant/entities/assistant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PlatformTypeEnum } from '../constants/platform-type';

@Entity({ name: 'Integration_Platforms' })
export class IntegrationPlatform {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PlatformTypeEnum })
  type: PlatformTypeEnum;

  @Column({ type: 'text' })
  domain: string;

  @Column({ type: 'boolean', nullable: false })
  isEnable: boolean;

  @ManyToOne(() => AIAssistant, (assistant) => assistant.integrationPlatforms, { onDelete: 'CASCADE' })
  @JoinColumn()
  assistant: AIAssistant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
