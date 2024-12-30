import { PartialType } from '@nestjs/swagger';

import { CreateResponseTemplateDto } from './create-response-template.dto';

export class UpdateResponseTemplateDto extends PartialType(CreateResponseTemplateDto) {}
