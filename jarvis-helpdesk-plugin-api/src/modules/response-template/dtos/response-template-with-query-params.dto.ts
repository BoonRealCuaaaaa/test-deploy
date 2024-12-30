import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsUUIDQueryParam } from 'src/shared/decorators/query-params.decorator';

export class ResponseTemplateWithQueryParamsDto {
  @ApiProperty({
    required: false,
    description: 'filter data by assistantId',
  })
  @IsNotEmpty()
  @IsUUIDQueryParam()
  assistantId: string;
}
