import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') require('dotenv').config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  let port = process.env.PORT || 2357;
  await app.listen(port);
}
bootstrap();
