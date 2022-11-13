import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.use(helmet()); // отключить для запуска /graphql
  app.use(cookieParser());
  // app.useGlobalGuards();
  // app.use('/', express.static(join(__dirname, 'client')));
  // app.use(AuthMiddleware); //Глобальный Middlewsre
  await app.listen(configService.getPort());
}
bootstrap();
