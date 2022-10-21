import { configService } from './config/config.service';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './modules/user/role.model';
import User from './modules/user/user.model';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
      entities: [User, Role],
      synchronize: true,
    }), // подключаем БД
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply() // тут указывается , middleware
      .forRoutes(); // тут указываются роуты для конкретного микро сервиса
  }
}
