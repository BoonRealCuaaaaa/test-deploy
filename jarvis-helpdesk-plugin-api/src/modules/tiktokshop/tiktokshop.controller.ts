import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TiktokshopDraftResponseTicketDto } from './dtos/tiktokshop-draft-response-ticket.dto';
import { TiktokshopFormalizeResponseTicketDto } from './dtos/tiktokshop-formalize-response-ticket.dto';
import { TiktokshopGenerateResponseDto } from './dtos/tiktokshop-generate-response.dto';
import { TiktokshopTicketAnalyzeTicketDto } from './dtos/tiktokshop-ticket-analyze.dto';
import { checkTicketConversation } from './libs/utils';
import { TiktokshopService } from './tiktokshop.service';

@ApiTags('Tiktokshop')
@Controller('tiktokshop')
export class TiktokshopController {
  constructor(private aiGenerateResponseService: TiktokshopService) {}

  @Post('/')
  async generateResponse(@Body() dto: TiktokshopGenerateResponseDto) {
    const { content } = dto;
    return await this.aiGenerateResponseService.generateResponse(content);
  }

  @Post('/draft-response')
  async draftResponse(@Body() dto: TiktokshopDraftResponseTicketDto) {
    const { conversation } = dto;
    return await this.aiGenerateResponseService.generateDraftResponse(conversation);
  }

  @Post('/formalize-response')
  async formalizeResponse(@Body() dto: TiktokshopFormalizeResponseTicketDto) {
    const { conversation, givenText, variant } = dto;
    if (checkTicketConversation(conversation) == false) {
      throw new BadRequestException('Invalid ticket conversation');
    }
    return await this.aiGenerateResponseService.generateFormalizeResponse(conversation, givenText, variant);
  }

  @Post('/ticket-analyze')
  async ticketAnalyze(@Body() dto: TiktokshopTicketAnalyzeTicketDto) {
    const { conversation } = dto;
    return await this.aiGenerateResponseService.generateAnalyzeTicket(conversation);
  }
}
