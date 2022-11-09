import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CourseRoles, Roles } from 'src/decorators/';
import { CourseService } from './course.service';
import { CourseUpdateDto } from './dto';
import { LessonInput } from './entities';

@Controller('course')
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}

  //------------------------------------------------------
  //Course
  @Get()
  getCourse() {
    return this._courseService.findAll();
  }

  @Post()
  @Roles()
  async createCourse(@Body() body, @Request() { user }) {
    return await this._courseService.createCourse({ body, userId: user.id });
  }

  @Put(':id')
  @Roles()
  async editCourse(@Body() body: CourseUpdateDto, @Param('id') id: string) {
    return this._courseService.updateCourse(body, id);
  }

  @Delete(':id')
  @Roles()
  async deleteCourse(@Param('id') id: string) {
    return await this._courseService.removeCourse(id);
  }

  @Post(':id/access')
  @CourseRoles('MODERATOR')
  async createCourseAccess(
    @Body('email') email: string,
    @Param('id') id: string,
  ) {
    return this._courseService.createAccessCourse(email, id);
  }

  @Put(':id/access')
  @CourseRoles('MODERATOR')
  async editCourseAccess(
    @Body('id') userId: string,
    @Request() { user },
    @Param('id') id: string,
  ) {
    // return this._courseService.editAccessCourse(id, userId);
  }

  @Delete(':id/access')
  @CourseRoles('MODERATOR')
  async deleteCourseAccess(
    @Body('id') userId: string,
    @Request() { user },
    @Param('id') id: string,
  ) {
    return this._courseService.removeAccessCourse(id, userId);
  }

  //------------------------------------------------------
  //Comment-Course
  @Post(':id/comment')
  @CourseRoles('MODERATOR', 'USER')
  async createCourseComment(
    @Body('text') data: string,
    @Request() { user },
    @Param('id') id: string,
  ) {
    const userId = user.id;
    return this._courseService.createCourseComment({
      text: data,
      author: { id: userId },
      courseId: id,
    });
  }

  @Put(':id/comment/:commentId')
  @CourseRoles('MODERATOR', 'USER')
  async editCourseComment(
    @Body('text') data: string,
    @Request() { user },
    @Param('id') id: string,
    @Param('commentId') commentId: string,
  ) {
    const userId = user.id;
    return this._courseService.editCourseComment({
      id: commentId,
      text: data,
      author: { id: userId },
      courseId: id,
    });
  }

  @Delete(':id/comment/:commentId')
  @CourseRoles('MODERATOR', 'USER')
  async deleteCourseComment(@Param('commentId') commentId: string) {
    return this._courseService.removeCourseComment({ id: commentId });
  }

  //------------------------------------------------------
  //Lesson
  @Get(':id/lesson')
  @CourseRoles('MODERATOR', 'USER')
  async getLesson(@Param('id') id: string) {
    return this._courseService.getLessons(id);
  }

  @Post(':id/lesson')
  @CourseRoles('MODERATOR')
  async createLesson(
    @Body() body: LessonInput,
    @Request() { user },
    @Param('id') id: string,
  ) {
    return this._courseService.createLesson({
      data: body,
      courseId: id,
    });
  }

  @Put(':id/lesson/:lessonId')
  @CourseRoles('MODERATOR')
  async editLesson(
    @Body() body,
    @Request() { user },
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
  ) {}

  @Delete(':id/lesson/:lessonId')
  @CourseRoles('MODERATOR')
  async deleteLesson(
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
  ) {}

  //------------------------------------------------------
  //Comment-Lesson
  @Post(':id/lesson/:lessonId/comment')
  @CourseRoles('MODERATOR', 'USER')
  async createLessonComment(
    @Body() body,
    @Request() { user },
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
  ) {}

  @Put(':id/lesson/:lessonId/comment/:commentId')
  @CourseRoles('MODERATOR', 'USER')
  async editLessonComment(
    @Body() body,
    @Request() { user },
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
    @Param('commentId') commentId: string,
  ) {}

  @Delete(':id/lesson/:lessonId/comment/:commentId')
  @CourseRoles('MODERATOR', 'USER')
  async deleteLessonComment(
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
    @Param('commentId') commentId: string,
  ) {}
}
