import { Body, Controller, Post } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZendeskDraftResponseTicketDto } from './dtos/zendesk-draft-response-ticket.dto';
import { ZendeskFormalizeResponseTicketDto } from './dtos/zendesk-formalize-response-ticket.dto';
import { ZendeskGenerateResponseDto } from './dtos/zendesk-generate-response.dto';
import { ZendeskTicketAnalyzeTicketDto } from './dtos/zendesk-ticket-analyze.dto';
import { checkTicketConversation } from './lib/utils';
import { ZendeskService } from './zendesk.service';

@ApiTags('Zendesk')
@Controller('zendesk')
export class ZendeskController {
  constructor(private aiGenerateResponseService: ZendeskService) {}

  @Post('/')
  async generateResponse(@Body() dto: ZendeskGenerateResponseDto) {
    const { content } = dto;
    return await this.aiGenerateResponseService.generateResponse(content);
  }

  @Post('/draft-response')
  async draftResponse(@Body() dto: ZendeskDraftResponseTicketDto) {
    const { conversation, requester, via, domain } = dto;
    return await this.aiGenerateResponseService.generateDraftResponse(conversation, requester, via, domain);
  }

  @Post('/formalize-response')
  async formalizeResponse(@Body() dto: ZendeskFormalizeResponseTicketDto) {
    const { payload, givenText, variant } = dto;
    const ticket = payload.ticket;
    if (checkTicketConversation(ticket.conversation) == false) {
      throw new BadRequestException('Invalid ticket conversation');
    }
    return await this.aiGenerateResponseService.generateFormalizeResponse(ticket, givenText, variant);
  }

  @Post('/ticket-analyze')
  async ticketAnalyze(@Body() dto: ZendeskTicketAnalyzeTicketDto) {
    const { ticket, domain } = dto;
    return await this.aiGenerateResponseService.generateAnalyzeTicket(ticket, domain);
  }
}
