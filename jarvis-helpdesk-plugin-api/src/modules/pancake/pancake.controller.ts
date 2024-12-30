import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pancake')
@Controller('pancake')
export class PancakeController {}
