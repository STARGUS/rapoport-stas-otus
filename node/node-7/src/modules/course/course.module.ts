import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Lesson, Materail, Comment } from './entities';
import { Photo, User } from '../user/entities';
import { CourseResolver, LessonResolver } from './course.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User, Photo, Lesson, Comment, Materail]),
    UserModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseResolver, LessonResolver],
  exports: [CourseService],
})
export class CourseModule {}
