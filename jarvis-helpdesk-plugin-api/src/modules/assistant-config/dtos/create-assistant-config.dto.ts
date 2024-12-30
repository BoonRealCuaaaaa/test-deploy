import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAssistantConfigDto {
  @ApiProperty({ required: false, example: 'Professional' })
  @IsOptional()
  @IsString()
  toneOfAI?: string = 'Professional';

  @ApiProperty({ required: false, example: 'English' })
  @IsOptional()
  @IsString()
  language?: string = 'English';

  @ApiProperty({ required: false, example: false })
  @IsOptional()
  @IsBoolean()
  includeReference?: boolean = false;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  autoResponse?: boolean = true;

  @ApiProperty({ required: false, example: false })
  @IsOptional()
  @IsBoolean()
  enableTemplate?: boolean = false;
}
