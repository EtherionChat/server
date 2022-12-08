import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import bodyParser from 'body-parser';
import cors from 'cors';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  // app.use(bodyParser.urlencoded());

  // app.use(hpp());

  app.use(helmet());

  // app.use(ExpressMongoSanitize());

  const configService = app.get(ConfigService);
  const NODE_PORT = configService.get('NODE_PORT') || 5000;

  await app.listen(NODE_PORT, () =>
    Logger.log(
      `HTTP Service is listening on http://localhost:${NODE_PORT}`,
      'App',
    ),
  );
}

bootstrap();
