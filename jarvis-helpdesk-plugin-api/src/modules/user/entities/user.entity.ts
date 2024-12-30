import { AIAssistant } from 'src/modules/assistant/entities/assistant.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @OneToMany(() => AIAssistant, (aiAssistant) => aiAssistant.owner, { cascade: true, onDelete: 'CASCADE' })
  aiAssistants: AIAssistant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
