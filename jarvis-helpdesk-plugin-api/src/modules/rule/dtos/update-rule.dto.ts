import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateRuleDto } from './create-rule.dto';

export class UpdateRuleDto extends PartialType(OmitType(CreateRuleDto, ['assistantId'] as const)) {}
