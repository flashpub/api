import * as Express from 'express';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './core/app.module';

const bootstrapNestServer = async (expressServer: Express.Application) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressServer),
  );

  app.enableCors();

  await app.init();
};

const ExpressServer = Express();
bootstrapNestServer(ExpressServer);

export const api = functions
  .region('us-central1')
  .https.onRequest(ExpressServer);
