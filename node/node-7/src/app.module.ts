import { CourseModule } from './modules/course/course.module';
import { configService } from './config/config.service';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './modules/user/role.model';
import User from './modules/user/user.model';
import Photo from './modules/user/photo.model';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserService } from './modules/user/user.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    CourseModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
      entities: [User, Role, Photo],
      synchronize: true,
    }), // подключаем БД
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // тут указывается , middleware
      .forRoutes(''); // тут указываются роуты для конкретного микро сервиса
  }
}
console.log(__dirname);
