import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DataSource } from 'typeorm';

import { configuration } from './config/configuration';
import { DefaultTypeOrmOptionsFactory } from './database/factories/default.typeorm-options.factory';
import loggerModuleParams from './logger/logger-module-params';
import { AssistantModule } from './modules/assistant/assistant.module';
import { AssistantKnowledgeModule } from './modules/assistant-knowledge/assistant-knowledge.module';
import { IntegrationPlatformModule } from './modules/integration-platform/integration-platform.module';
import { ResponseTemplateModule } from './modules/response-template/response-template.module';
import { RuleModule } from './modules/rule/rule.module';
import { TiktokshopModule } from './modules/tiktokshop/tiktokshop.module';
import { UserModule } from './modules/user/user.module';
import { ZendeskModule } from './modules/zendesk/zendesk.module';
import { RequestIdHeaderMiddleware } from './shared/middlewares/request-id-header.middleware';
import { AiAssistantModule } from './shared/modules/ai-assistant/ai-assistant.module';
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

    TypeOrmModule.forRootAsync({
      useClass: DefaultTypeOrmOptionsFactory,
      dataSourceFactory: async (options) => {
        return await new DataSource(options!).initialize();
      },
    }),

    LoggerModule.forRootAsync(loggerModuleParams),
    AiAssistantModule,
    ZendeskModule,
    RuleModule,
    UserModule,
    ResponseTemplateModule,
    AssistantModule,
    IntegrationPlatformModule,
    AssistantKnowledgeModule,
    // PancakeModule,
    // ZohoDeskModule,
    TiktokshopModule,

    // Global modules
    HttpRequestContextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdHeaderMiddleware, HttpRequestContextMiddleware).forRoutes('*');
  }
}
