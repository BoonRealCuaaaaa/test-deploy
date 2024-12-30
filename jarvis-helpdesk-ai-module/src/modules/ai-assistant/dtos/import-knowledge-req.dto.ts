import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ImportKnowledgeReqDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  knowledgeId: string;
}
