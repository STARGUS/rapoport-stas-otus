import {
  Body,
  Controller,
  Post,
  Request,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { CourseRoles } from '../../decorators';
import { LessonInput } from './entities/lesson.entity';
import { LessonService } from './lesson.service';

@Controller('/api/course')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  //------------------------------------------------------
  //Lesson

  @Get(':id/lesson')
  @CourseRoles('MODERATOR', 'USER')
  async getLessons(@Param('id') id: string) {
    return this.lessonService.getLessons(id);
  }
  @Get(':id/lesson/:lessonId')
  @CourseRoles('MODERATOR', 'USER')
  async getLesson(@Param('lessonId') lessonId: string) {
    return this.lessonService.getLesson(lessonId);
  }

  @Post(':id/lesson')
  @CourseRoles('MODERATOR')
  async createLesson(
    @Body() body: LessonInput,
    @Request() { user },
    @Param('id') id: string,
  ) {
    return this.lessonService.createLesson({
      data: body,
      courseId: id,
    });
  }

  @Put(':id/lesson/:lessonId')
  @CourseRoles('MODERATOR')
  async editLesson(@Body() body, @Param('lessonId') lessonId: string) {
    return this.lessonService.editLesson(lessonId, { ...body });
  }

  @Delete(':id/lesson/:lessonId')
  @CourseRoles('MODERATOR')
  async deleteLesson(@Param('lessonId') lessonId: string) {
    return this.lessonService.removeLesson({ id: lessonId });
  }
}
