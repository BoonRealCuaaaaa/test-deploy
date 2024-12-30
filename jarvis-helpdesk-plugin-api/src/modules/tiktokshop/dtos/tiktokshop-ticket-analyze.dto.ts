import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { ChatMessage } from '../types/tiktokshop.type';

export class TiktokshopTicketAnalyzeTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  conversation: ChatMessage[];
}
