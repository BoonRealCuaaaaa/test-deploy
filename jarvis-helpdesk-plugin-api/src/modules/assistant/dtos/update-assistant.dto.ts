import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsUUIDQueryParam } from 'src/shared/decorators/query-params.decorator';

import { CreateAssistantDto } from './create-assistant.dto';

export class UpdateAssistantDto extends PartialType(CreateAssistantDto) {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsUUIDQueryParam()
  owner: string;
}
