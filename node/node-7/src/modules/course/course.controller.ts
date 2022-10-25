/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}

  @Get()
  findAll() {
    return this._courseService.findAll();
  }

  @Post('create')
  async createCourse(@Body() body, @Request() { user }) {
    return await this._courseService.createCourse({ body, user });
  }

  @Post('createLesson')
  createLesson() {}
}
