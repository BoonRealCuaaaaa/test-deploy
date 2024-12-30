import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDParam } from 'src/shared/decorators/params.decorator';

import { CreateIntegrationPlatformDto } from './dtos/create-integration-platform.dto';
import { IntegrationPlatformWithQueryParamsDto } from './dtos/integration-platform-with-query-params.dto';
import { UpdateIntegrationPlatformDto } from './dtos/update-integration-platform.dto';
import { IntegrationPlatformService } from './integration-platform.service';

@ApiTags('integration-platforms')
@Controller('integration-platforms')
export class IntegrationPlatformController {
  constructor(private readonly integrationPlatformService: IntegrationPlatformService) {}

  @Get()
  findAllByAssisant(@Query() integrationPlatformWithQueryParamsDto: IntegrationPlatformWithQueryParamsDto) {
    return this.integrationPlatformService.findAllByAssisantId(integrationPlatformWithQueryParamsDto.assistantId);
  }

  @Post()
  async create(@Body() createIntegrationPlatformDto: CreateIntegrationPlatformDto) {
    const { type, domain, isEnable, assistantId } = createIntegrationPlatformDto;

    return this.integrationPlatformService.create(assistantId, { type, domain, isEnable });
  }

  @Get(':integrationPlatformId')
  findOne(@UUIDParam('integrationPlatformId') integrationPlatformId: string) {
    return this.integrationPlatformService.findOne(integrationPlatformId);
  }

  @Patch(':integrationPlatformId')
  async update(
    @UUIDParam('integrationPlatformId') integrationPlatformId: string,
    @Body() updateIntegrationPlatformDto: UpdateIntegrationPlatformDto
  ) {
    const { type, domain, isEnable } = updateIntegrationPlatformDto;
    return await this.integrationPlatformService.update(integrationPlatformId, { type, domain, isEnable });
  }

  @Delete(':integrationPlatformId')
  async remove(@UUIDParam('integrationPlatformId') integrationPlatformId: string) {
    return await this.integrationPlatformService.delete(integrationPlatformId);
  }
}
