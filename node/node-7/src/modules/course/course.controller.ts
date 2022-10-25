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
  Param,
} from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { CourseService } from './course.service';

@Controller('api/course')
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}

  @Get()
  findAll() {
    console.log('test');
    return this._courseService.findAll();
  }

  @Post('create')
  async createCourse(@Body() body, @Request() { user }) {
    return await this._courseService.createCourse({ body, user });
  }

  @Post('createLesson')
  createLesson() {}

  @Post(':id/editAccess')
  editAccess(@Body('email') email: string, @Param('id') id: string) {
    return this._courseService.editAccessCourse(email, id);
  }
}
