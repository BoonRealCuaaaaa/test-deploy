import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import multerOptions from 'src/lib/multer/multer-options';
import { UUIDParam } from 'src/shared/decorators/params.decorator';
import { ApiUploadFile } from 'src/shared/decorators/swaggers/api-upload-file.decorator';
import { QueryParamsDto } from 'src/shared/dtos/common.dto';
import { CustomBadRequestException } from 'src/shared/exceptions/custom-bad-request.exception';

import { CreateKnowledgeDto } from './dtos/create-knowledge.dto';
import { ImportWebReqDto } from './dtos/import-web-request.dto';
import { UpdateAssistantKnowledgeDto } from './dtos/update-assistant-knowledge.dto';
import { UpdateSourceStatusReqDto } from './dtos/update-source-status-req.dto';
import { AssistantKnowledgeService } from './assistant-knowledge.service';

@ApiTags('assistant-knowledges')
@Controller('assistant-knowledges')
export class AssistantKnowledgeController {
  constructor(private readonly assistantKnowledgeService: AssistantKnowledgeService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async createKnowledge(@Body() body: CreateKnowledgeDto) {
    const { name, description } = body;
    return await this.assistantKnowledgeService.createKnowledge(name, description);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAssistantKnowledges(@Query() dto: QueryParamsDto) {
    return await this.assistantKnowledgeService.getAssistantKnowledges(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:knowledgeId')
  async getAssistantKnowledge(@UUIDParam('knowledgeId') knowledgeId: string) {
    return await this.assistantKnowledgeService.getAssistantKnowledge(knowledgeId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:knowledgeId')
  async updateAssistantKnowledge(
    @UUIDParam('knowledgeId') knowledgeId: string,
    @Body() dto: UpdateAssistantKnowledgeDto
  ) {
    return await this.assistantKnowledgeService.updateAssistantKnowledge(knowledgeId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:knowledgeId')
  async deleteKnowledge(@UUIDParam('knowledgeId') knowledgeId: string) {
    return await this.assistantKnowledgeService.deleteKnowledge(knowledgeId);
  }

  @ApiUploadFile({}, multerOptions())
  @HttpCode(HttpStatus.OK)
  @Post('/:knowledgeId/local-file')
  async importLocalFile(@UUIDParam('knowledgeId') knowledgeId: string, @UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new CustomBadRequestException({
        details: [{ issue: 'File type is not supported' }],
      });
    }

    return await this.assistantKnowledgeService.importLocalFile(knowledgeId, file);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/:knowledgeId/web')
  async importWeb(@UUIDParam('knowledgeId') knowledgeId: string, @Body() dto: ImportWebReqDto) {
    const { name, webUrl } = dto;

    return await this.assistantKnowledgeService.importWeb(knowledgeId, name, webUrl);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:knowledgeId/sources')
  async getSource(@UUIDParam('knowledgeId') knowledgeId: string, @Query() dto: QueryParamsDto) {
    const { query, offset, limit, order } = dto;
    return await this.assistantKnowledgeService.getSources(knowledgeId, { query, offset, limit, order });
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:knowledgeId/sources/:sourceId')
  async updateSourceStatus(
    @UUIDParam('knowledgeId') knowledgeId: string,
    @UUIDParam('sourceId') sourceId: string,
    @Body() dto: UpdateSourceStatusReqDto
  ) {
    const { status } = dto;
    return await this.assistantKnowledgeService.updateSourceStatus(knowledgeId, sourceId, status);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:knowledgeId/sources/:sourcesId')
  async deleteSource(@UUIDParam('knowledgeId') knowledgeId: string, @UUIDParam('sourcesId') sourcesId: string) {
    return await this.assistantKnowledgeService.deleteSource(knowledgeId, sourcesId);
  }
}
