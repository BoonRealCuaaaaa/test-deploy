import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Ticket } from '../types/zendesk.type';

export class ZendeskTicketAnalyzeTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  ticket: Ticket;

  @ApiProperty()
  @IsNotEmpty()
  domain: string;
}
