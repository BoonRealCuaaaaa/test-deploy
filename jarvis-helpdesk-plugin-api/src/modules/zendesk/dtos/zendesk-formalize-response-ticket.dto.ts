import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Ticket } from '../types/zendesk.type';

export class ZendeskFormalizeResponseTicketDto {
  @ApiProperty({
    required: true,
  })
  payload: { ticket: Ticket; domain: string };

  @ApiProperty()
  @IsNotEmpty()
  givenText: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  variant: string;
}
