/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('course')
export class CourseController {

  @Post('createLesson')
  createLesson() {

  }
}
