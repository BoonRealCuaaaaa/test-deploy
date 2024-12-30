import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUUIDQueryParam } from 'src/shared/decorators/query-params.decorator';

import { PlatformTypeEnum } from '../constants/platform-type';

export class CreateIntegrationPlatformDto {
  @ApiProperty({
    required: true,
    description: 'description of the severity property',
    enum: PlatformTypeEnum,
  })
  @IsNotEmpty()
  @IsEnum(PlatformTypeEnum)
  type: PlatformTypeEnum;

  @ApiProperty({
    required: true,
    example: 'zendesk.com.vn',
  })
  @IsNotEmpty()
  @IsString()
  domain: string;

  @ApiProperty({
    required: true,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isEnable: boolean;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsUUIDQueryParam()
  assistantId: string;
}
