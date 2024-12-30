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

@Entity({ name: 'Response_Templates' })
export class ResponseTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  template: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ManyToOne(() => AIAssistant, (assistant) => assistant.responseTemplates, { onDelete: 'CASCADE' })
  @JoinColumn()
  assistant: AIAssistant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
