import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AskAssistantDto } from './dtos/ask-assistant.dto';
import { ImportKnowledgeReqDto } from './dtos/import-knowledge-req.dto';
import { AiAssistantService } from './ai-assistant.service';

@ApiTags('Ai Assistant')
@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private aiAssistantService: AiAssistantService) {}

  @ApiOperation({ summary: 'Ask assistant' })
  @HttpCode(HttpStatus.OK)
  @Post('/generate-response')
  async askAssistant(@Body() dto: AskAssistantDto) {
    const { message } = dto;
    return await this.aiAssistantService.askAssistant(message);
  }

  @ApiOperation({ summary: 'Import knowledge to assistant' })
  @HttpCode(HttpStatus.OK)
  @Post('/knowledge')
  async importKnowledge(@Body() dto: ImportKnowledgeReqDto) {
    const { knowledgeId } = dto;
    return await this.aiAssistantService.importKnowledge(knowledgeId);
  }

  @ApiOperation({ summary: 'Remove knowledge from assistant' })
  @HttpCode(HttpStatus.OK)
  @Delete('/knowledge')
  async removeKnowledge(@Body() dto: ImportKnowledgeReqDto) {
    const { knowledgeId } = dto;
    return await this.aiAssistantService.removeKnowledge(knowledgeId);
  }
}
