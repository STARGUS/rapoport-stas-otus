import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Render,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.service.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    console.log('hi');
    const users = await this.userService.findAll();
    return { users };
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }

  @Post('registration')
  //@Redirect('/', 301)
  async createUser(@Body() data: UserDto) {
    const user = await this.userService.createUser(data);
    return { url: '/' };
  }

  @Post('role')
  @Roles('ADMIN')
  async createRole(@Body() data: string) {
    const role = await this.userService.createRole(data);
    return { role };
  }

  @Get('role')
  async findRole() {
    console.log('kuku');
    const role = await this.userService.findRole();
    return role;
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  async editPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: ParseIntPipe,
    @Body() photodata,
  ) {
    const photo = {
      name: file['originalname'],
      filename: file['fieldname'],
      views: file['size'],
      ...photodata,
    };
    const user = await this.userService.editPhoto({ photo, id });
    return { user };
  }
}
