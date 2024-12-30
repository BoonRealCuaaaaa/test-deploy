import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUUIDQueryParam } from 'src/shared/decorators/query-params.decorator';

export class CreateRuleDto {
  @ApiProperty({
    required: true,
    example: 'Do not say hi',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    required: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isEnable: boolean;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsUUIDQueryParam()
  assistantId: string;
}
