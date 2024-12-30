import { Module } from '@nestjs/common';

import { ZohoDeskController } from './zohodesk.controller';
import { ZohoDeskService } from './zohodesk.service';

@Module({
  controllers: [ZohoDeskController],
  providers: [ZohoDeskService],
})
export class ZohoDeskModule {}
