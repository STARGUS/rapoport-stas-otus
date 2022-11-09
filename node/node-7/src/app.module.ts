import { CourseModule } from './modules/course/course.module';
import { configService } from './config/config.service';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserService } from './modules/user/user.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Photo, Role, User } from './modules/user/entities';
import { Course, Lesson, Materail, Comment } from './modules/course/entities';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    CourseModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
      synchronize: true,
      entities: [User, Role, Photo, Course, Lesson, Materail, Comment],
    }), // подключаем БД
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, 'client'),
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: true,
      playground: true,
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
