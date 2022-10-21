import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

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
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }

  @Post()
  async createUser(@Body() data: UserDto) {
    console.log(data);
    const user = await this.userService.createUser(data);
    return { user };
  }
  @Post('role')
  async createRole(@Body() data: string) {
    const role = await this.userService.createRole(data);
    return { role };
  }
}
