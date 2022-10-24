import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as express from 'express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { RoleGuard } from './guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(cookieParser());
  // app.useGlobalGuards();
  // app.use('/', express.static(join(__dirname, 'client')));
  // app.use(AuthMiddleware); //Глобальный Middlewsre
  await app.listen(3000);
}
bootstrap();
