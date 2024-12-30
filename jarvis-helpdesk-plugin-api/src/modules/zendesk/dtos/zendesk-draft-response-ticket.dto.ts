import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Conversation, Requester, Via } from '../types/zendesk.type';

export class ZendeskDraftResponseTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  conversation: Conversation[];

  @ApiProperty()
  @IsNotEmpty()
  requester: Requester;

  @ApiProperty()
  @IsNotEmpty()
  via: Via;

  @ApiProperty()
  @IsNotEmpty()
  domain: string;
}
