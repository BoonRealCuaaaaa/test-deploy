import { AIAssistant } from 'src/modules/assistant/entities/assistant.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Assistant_Configs' })
export class AssistantConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  values: {
    toneOfAI: string;
    language: string;
    includeReference: boolean;
    autoResponse: boolean;
    enableTemplate: boolean;
  };

  @OneToOne(() => AIAssistant, (assistant) => assistant.config, { onDelete: 'CASCADE' })
  @JoinColumn()
  assistant: AIAssistant;
}
