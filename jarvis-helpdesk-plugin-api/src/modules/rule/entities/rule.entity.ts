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

@Entity({ name: 'Rules' })
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', default: false })
  isEnable: boolean;

  @ManyToOne(() => AIAssistant, (aiAssistant) => aiAssistant.rules)
  @JoinColumn()
  aiAssistant: AIAssistant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
