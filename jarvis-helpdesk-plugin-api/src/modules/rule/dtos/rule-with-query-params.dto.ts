import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsUUIDQueryParam } from 'src/shared/decorators/query-params.decorator';
import { QueryParamsDto } from 'src/shared/dtos/common.dto';

export class RuleWithQueryParamsDto extends QueryParamsDto {
  @ApiProperty({
    required: false,
    description: 'filter data by assistantId',
  })
  @IsNotEmpty()
  @IsUUIDQueryParam()
  assistantId: string;
}
