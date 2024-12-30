import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { configuration } from './config/configuration';
import loggerModuleParams from './logger/logger-module-params';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { AiKnowledgeModule } from './modules/ai-knowledge/ai-knowledge.module';
import { RequestIdHeaderMiddleware } from './shared/middlewares/request-id-header.middleware';
import { HttpRequestContextMiddleware } from './shared/modules/http-request-context/http-request-context.middleware';
import { HttpRequestContextModule } from './shared/modules/http-request-context/http-request-context.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),

    LoggerModule.forRootAsync(loggerModuleParams),
    AiAssistantModule,

    // Global modules
    HttpRequestContextModule,

    AiKnowledgeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdHeaderMiddleware, HttpRequestContextMiddleware).forRoutes('*');
  }
}
