import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import multerOptions from 'src/lib/multer/multer-options';
import { UUIDParam } from 'src/shared/decorators/params.decorator';
import { ApiUploadFile } from 'src/shared/decorators/swaggers/api-upload-file.decorator';
import { PageOptionsDto } from 'src/shared/dtos/pagination.dtos';
import { CustomBadRequestException } from 'src/shared/exceptions/custom-bad-request.exception';

import { CreateKnowledgeReqDto } from './dtos/create-knowledge-req.dto';
import { ImportWebReqDto } from './dtos/import-datasource-req.dtos';
import { UpdateKnowledgeUnitStatusReqDto } from './dtos/update-knowledge-unit-status-req.dto';
import { AiKnowledgeService } from './ai-knowledge.service';

@ApiTags('Ai Knowledge')
@Controller('ai-knowledge')
export class AiKnowledgeController {
  constructor(private readonly aiKnowledgeService: AiKnowledgeService) {}

  @Post('/')
  async createKnowledge(@Body() body: CreateKnowledgeReqDto) {
    const { name, description } = body;
    return await this.aiKnowledgeService.createKnowledge(name, description);
  }

  @Get('/')
  async getKnowledgeList(@Query() dto: PageOptionsDto) {
    return await this.aiKnowledgeService.getKnowledgeList(dto);
  }

  @Patch('/:knowledgeId')
  async updateKnowledge(@UUIDParam('knowledgeId') knowledgeId: string, @Body() dto: CreateKnowledgeReqDto) {
    const { name, description } = dto;
    return await this.aiKnowledgeService.updateKnowledge(knowledgeId, { name, description });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:knowledgeId')
  async deleteKnowledge(@UUIDParam('knowledgeId') knowledgeId: string) {
    return await this.aiKnowledgeService.deleteKnowledge(knowledgeId);
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
    return await this.aiKnowledgeService.importLocalFile(knowledgeId, file);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/:knowledgeId/web')
  async importWeb(@UUIDParam('knowledgeId') knowledgeId: string, @Body() dto: ImportWebReqDto) {
    const { name, webUrl } = dto;
    return await this.aiKnowledgeService.importWeb(knowledgeId, name, webUrl);
  }

  @Get('/:id/units')
  async getKnowledgeUnits(@UUIDParam('id') id: string, @Query() dto: PageOptionsDto) {
    return await this.aiKnowledgeService.getKnowledgeUnits(id, dto);
  }

  @Delete('/:id/units/:unitId')
  async deleteKnowledgeUnit(@UUIDParam('id') id: string, @UUIDParam('unitId') unitId: string) {
    return await this.aiKnowledgeService.deleteKnowledgeUnit(id, unitId);
  }

  @ApiOperation({ summary: 'Update knowledge unit status' })
  @Patch('/:id/units/:unitId')
  async updateKnowledgeUnit(
    @UUIDParam('id') id: string,
    @UUIDParam('unitId') unitId: string,
    @Body() dto: UpdateKnowledgeUnitStatusReqDto
  ) {
    const { status } = dto;
    return await this.aiKnowledgeService.updateKnowledgeUnitStatus(id, unitId, status);
  }

  @Get('/:id')
  async getKnowledge(@UUIDParam('id') id: string) {
    return await this.aiKnowledgeService.getKnowledge(id);
  }
}
