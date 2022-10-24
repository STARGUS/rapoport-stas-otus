import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Course from './course.model';
import User from '../user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
