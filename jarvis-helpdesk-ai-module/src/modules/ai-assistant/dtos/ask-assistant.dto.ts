import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AskAssistantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
