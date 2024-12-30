import { PartialType } from '@nestjs/swagger';

import { CreateAssistantConfigDto } from './create-assistant-config.dto';

export class UpdateAssistantConfigDto extends PartialType(CreateAssistantConfigDto) {}
