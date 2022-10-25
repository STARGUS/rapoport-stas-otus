import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../decorators/roles.decorator';
import { RoleDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @Roles('ADMIN')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get(':id')
  @Roles('USER')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user };
  }

  @Post('role')
  @Roles()
  async createRole(@Body() _role: RoleDto) {
    const role = await this.userService.createRole(_role);
    return { role };
  }

  @Get('role')
  @Roles()
  async findRole() {
    const role = await this.userService.findRole();
    return { role };
  }

  @Post('/editPhoto')
  @Roles('USER')
  @UseInterceptors(FileInterceptor('file'))
  async editPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() photodata,
    @Request() req,
  ) {
    const photo = {
      name: file['originalname'],
      filename: file['fieldname'],
      views: file['size'],
      ...photodata,
    };
    const user = await this.userService.editPhoto({ photo, id: req.user.id });
    return { user };
  }
}
