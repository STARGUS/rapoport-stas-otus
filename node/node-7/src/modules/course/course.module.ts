import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities';
import { Photo, User } from '../user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, Photo])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
