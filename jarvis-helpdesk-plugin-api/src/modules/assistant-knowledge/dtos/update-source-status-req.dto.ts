import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateSourceStatusReqDto {
  @ApiProperty({ description: 'Status' })
  @IsBoolean()
  status: boolean;
}
