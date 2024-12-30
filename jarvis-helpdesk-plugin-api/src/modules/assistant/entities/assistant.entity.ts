import { AssistantConfig } from 'src/modules/assistant-config/entities/assistant-config.entity';
import { IntegrationPlatform } from 'src/modules/integration-platform/entities/integration-platform.entity';
import { ResponseTemplate } from 'src/modules/response-template/entities/response-template.entity';
import { Rule } from 'src/modules/rule/entities/rule.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'AI_Assistants' })
export class AIAssistant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.aiAssistants, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @Column({ type: 'uuid', nullable: true })
  jarvisAssistantId: string;

  @Column({ type: 'uuid', nullable: true })
  jarvisKnowledgeId: string;

  @OneToOne(() => AssistantConfig, (config) => config.assistant, { cascade: true, onDelete: 'CASCADE' })
  config: AssistantConfig;

  @OneToMany(() => ResponseTemplate, (template) => template.assistant, { cascade: true, onDelete: 'CASCADE' })
  responseTemplates: ResponseTemplate[];

  @OneToMany(() => Rule, (rule) => rule.aiAssistant, { cascade: true, onDelete: 'CASCADE' })
  rules: Rule[];

  @OneToMany(() => IntegrationPlatform, (platform) => platform.assistant, { cascade: true, onDelete: 'CASCADE' })
  integrationPlatforms: IntegrationPlatform[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
