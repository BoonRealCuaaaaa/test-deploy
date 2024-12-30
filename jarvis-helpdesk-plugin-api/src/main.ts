import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { GLOBAL_ROOT_PREFIX } from './shared/constants/http-request';
import { manufactureValidationException } from './shared/exceptions/factories/validation-exception.factory';
import { AllExceptionsFilter } from './shared/exceptions/filters/all-exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true, rawBody: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  const swaggerEnabled = configService.get<boolean>('swaggerEnabled');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(GLOBAL_ROOT_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      validationError: {
        target: true,
        value: true,
      },
      exceptionFactory: manufactureValidationException,
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableShutdownHooks();

  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Jarvis HelpDesk Plugins API')
      .setDescription('API Documentation')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  app.useBodyParser('json', { limit: '50mb' });
  app.useBodyParser('urlencoded', { limit: '50mb', extended: true });
  app.enableCors({ allowedHeaders: '*', origin: '*', credentials: true });

  await app.listen(configService.getOrThrow('port'), () => {
    console.log(`\n🚀 App running on http://localhost:${configService.get('port')}`);
    if (swaggerEnabled) {
      console.log(`\n🚀 Swagger running on http://localhost:${configService.get('port')}/api-docs\n`);
    }
  });
}

bootstrap().catch((e) => console.log(`\n🚀 Failed to start Application due to ->>\n${e.stack}`));
