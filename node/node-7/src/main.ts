import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 // app.use(helmet());
  // app.use(AuthMiddleware.use()); //Глобальный Middlewsre
  await app.listen(3000);
}
bootstrap();
