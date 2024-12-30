import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDParam } from 'src/shared/decorators/params.decorator';

import { CreateResponseTemplateDto } from './dtos/create-response-template.dto';
import { ResponseTemplateWithQueryParamsDto } from './dtos/response-template-with-query-params.dto';
import { UpdateResponseTemplateDto } from './dtos/update-response-template.dto';
import { ResponseTemplateService } from './response-template.service';

@ApiTags('response-templates')
@Controller('response-templates')
export class ResponseTemplateController {
  constructor(private readonly responseTemplateService: ResponseTemplateService) {}

  @Get()
  findAllByAssisant(@Query() responseTemplateWithQueryParamsDto: ResponseTemplateWithQueryParamsDto) {
    return this.responseTemplateService.findAllByAssisantId(responseTemplateWithQueryParamsDto.assistantId);
  }

  @Post()
  async create(@Body() createResponseTemplateDto: CreateResponseTemplateDto) {
    const { isActive, name, description, template, assistantId } = createResponseTemplateDto;

    return this.responseTemplateService.create(assistantId, { isActive, name, description, template });
  }

  @Get(':templateId')
  async findOne(@UUIDParam('templateId') templateId: string) {
    return await this.responseTemplateService.findOne(templateId);
  }

  @Patch(':templateId')
  async update(
    @UUIDParam('templateId') templateId: string,
    @Body() updateResponseTemplateDto: UpdateResponseTemplateDto
  ) {
    return await this.responseTemplateService.update(templateId, { ...updateResponseTemplateDto });
  }

  @Patch(':templateId/activate')
  async active(@UUIDParam('templateId') templateId: string) {
    return await this.responseTemplateService.activateTemplate(templateId);
  }

  @Delete(':templateId')
  async remove(@UUIDParam('templateId') templateId: string) {
    return await this.responseTemplateService.delete(templateId);
  }
}
