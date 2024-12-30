import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AIAssistant } from '../assistant/entities/assistant.entity';

import { Rule } from './entities/rule.entity';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rule, AIAssistant])],
  controllers: [RuleController],
  providers: [RuleService],
})
export class RuleModule {}
