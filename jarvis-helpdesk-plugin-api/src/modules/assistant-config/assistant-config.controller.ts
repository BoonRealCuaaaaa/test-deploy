import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDParam } from 'src/shared/decorators/params.decorator';

import { CreateAssistantConfigDto } from './dtos/create-assistant-config.dto';
import { UpdateAssistantConfigDto } from './dtos/update-assistant-config.dto';
import { AssistantConfigService } from './assistant-config.service';

@ApiTags('assistant-configs')
@Controller('assistant-configs')
export class AssistantConfigController {
  constructor(private readonly assistantConfigService: AssistantConfigService) {}

  @Post(':assistantId')
  create(@UUIDParam('assistantId') assistantId: string, @Body() createAssistantConfigDto: CreateAssistantConfigDto) {
    const { toneOfAI, language, includeReference, autoResponse, enableTemplate } = createAssistantConfigDto;
    return this.assistantConfigService.create(assistantId, {
      toneOfAI,
      language,
      includeReference,
      autoResponse,
      enableTemplate,
    });
  }

  @Get()
  findAll() {
    return this.assistantConfigService.findAll();
  }

  @Get(':assistantId')
  findOne(@UUIDParam('assistantId') assistantId: string) {
    return this.assistantConfigService.findOneByAssistantId(assistantId);
  }

  @Patch(':assistantId')
  update(@UUIDParam('assistantId') assistantId: string, @Body() updateAssistantConfigDto: UpdateAssistantConfigDto) {
    const { toneOfAI, language, includeReference, autoResponse, enableTemplate } = updateAssistantConfigDto;
    return this.assistantConfigService.updateByAssistantId(assistantId, {
      toneOfAI,
      language,
      includeReference,
      autoResponse,
      enableTemplate,
    });
  }

  @Delete(':assistantId')
  remove(@UUIDParam('assistantId') assistantId: string) {
    return this.assistantConfigService.remove(assistantId);
  }
}
