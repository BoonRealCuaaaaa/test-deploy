import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateAssistantDto {
  @ApiProperty({ required: false })
  jarvisAssistantId?: string;

  @ApiProperty({ required: false })
  jarvisKnowledgeId?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  owner: string;

  @ApiProperty({ required: false, example: 'Professional' })
  @IsOptional()
  @IsString()
  toneOfAI?: string;

  @ApiProperty({ required: false, example: 'English' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ required: false, example: false })
  @IsOptional()
  @IsBoolean()
  includeReference?: boolean;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  autoResponse?: boolean;

  @ApiProperty({ required: false, example: false })
  @IsOptional()
  @IsBoolean()
  enableTemplate?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
