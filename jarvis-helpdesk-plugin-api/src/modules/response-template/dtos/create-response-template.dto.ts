import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUUIDQueryParam } from 'src/shared/decorators/query-params.decorator';

export class CreateResponseTemplateDto {
  @ApiProperty({
    required: true,
    example: 'Email Template',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Template is used for email channel',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    example: 'Hello {customer}, {answer}',
  })
  @IsNotEmpty()
  @IsString()
  template: string;

  @ApiProperty({
    required: true,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsUUIDQueryParam()
  assistantId: string;
}
