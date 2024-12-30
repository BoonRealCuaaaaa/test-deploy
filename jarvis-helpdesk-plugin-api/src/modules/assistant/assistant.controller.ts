import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDParam } from 'src/shared/decorators/params.decorator';

import { CreateAssistantDto } from './dtos/create-assistant.dto';
import { UpdateAssistantDto } from './dtos/update-assistant.dto';
import { AssistantService } from './assistant.service';

@ApiTags('assistants')
@Controller('assistants')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Get()
  findAll() {
    return this.assistantService.findAll();
  }

  @Post()
  async create(@Body() createAssistantDto: CreateAssistantDto) {
    const {
      jarvisAssistantId,
      jarvisKnowledgeId,
      owner,
      toneOfAI,
      language,
      includeReference,
      autoResponse,
      enableTemplate,
    } = createAssistantDto;
    const config = { toneOfAI, language, includeReference, autoResponse, enableTemplate };
    return await this.assistantService.create(owner, config, jarvisAssistantId, jarvisKnowledgeId);
  }

  @Get(':assistantId')
  async findOne(@UUIDParam('assistantId') assistantId: string) {
    return await this.assistantService.findOne(assistantId);
  }

  @Patch(':assistantId')
  async update(@UUIDParam('assistantId') assistantId: string, @Body() updateAssistantDto: UpdateAssistantDto) {
    const {
      jarvisAssistantId,
      jarvisKnowledgeId,
      owner,
      toneOfAI,
      language,
      includeReference,
      autoResponse,
      enableTemplate,
    } = updateAssistantDto;
    const config = { toneOfAI, language, includeReference, autoResponse, enableTemplate };
    return this.assistantService.update(assistantId, owner, config, jarvisAssistantId, jarvisKnowledgeId);
  }

  @Patch('domain/:domain')
  async updateByDomain(@Param('domain') domain: string, @Body() updateAssistantDto: UpdateAssistantDto) {
    const {
      jarvisAssistantId,
      jarvisKnowledgeId,
      owner,
      toneOfAI,
      language,
      includeReference,
      autoResponse,
      enableTemplate,
    } = updateAssistantDto;
    return this.assistantService.updateByDomain(
      domain,
      owner,
      { toneOfAI, language, includeReference, autoResponse, enableTemplate },
      jarvisAssistantId,
      jarvisKnowledgeId
    );
  }

  @Delete(':assistantId')
  async remove(@UUIDParam('assistantId') assistantId: string) {
    return await this.assistantService.delete(assistantId);
  }
}
