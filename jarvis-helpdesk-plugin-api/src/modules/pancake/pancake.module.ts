import { Module } from '@nestjs/common';

import { PancakeController } from './pancake.controller';
import { PancakeService } from './pancake.service';

@Module({
  controllers: [PancakeController],
  providers: [PancakeService],
})
export class PancakeModule {}
