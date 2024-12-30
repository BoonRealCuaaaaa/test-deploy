import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDParam } from 'src/shared/decorators/params.decorator';

import { CreateRuleDto } from './dtos/create-rule.dto';
import { RuleWithQueryParamsDto } from './dtos/rule-with-query-params.dto';
import { UpdateRuleDto } from './dtos/update-rule.dto';
import { RuleService } from './rule.service';

@ApiTags('rules')
@Controller('rules')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  findAllByAssistantWithPagination(@Query() ruleWithQueryParamsDto: RuleWithQueryParamsDto) {
    return this.ruleService.findAllWithPaginationByAssistantId({
      ...ruleWithQueryParamsDto,
    });
  }

  @Post()
  async create(@Body() createRuleDto: CreateRuleDto) {
    const { content, isEnable, assistantId } = createRuleDto;

    return this.ruleService.create(assistantId, { content, isEnable });
  }

  @Get(':ruleId')
  async findOne(@UUIDParam('ruleId') ruleId: string) {
    return await this.ruleService.findOne(ruleId);
  }

  @Patch(':ruleId')
  async update(@UUIDParam('ruleId') ruleId: string, @Body() updateRuleDto: UpdateRuleDto) {
    return await this.ruleService.update(ruleId, { ...updateRuleDto });
  }

  @Delete(':ruleId')
  async remove(@UUIDParam('ruleId') ruleId: string) {
    return await this.ruleService.delete(ruleId);
  }
}
