import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateKnowledgeUnitStatusReqDto {
  @ApiProperty({ description: 'Status' })
  @IsBoolean()
  status: boolean;
}
