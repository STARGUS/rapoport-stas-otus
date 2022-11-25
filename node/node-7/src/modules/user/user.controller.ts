import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../../decorators/roles.decorator';
import { RoleDto } from './dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //------------------------------------------------------
  //User
  @Get()
  // @Roles('ADMIN')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get(':id')
  @Roles('USER')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user };
  }

  //------------------------------------------------------
  //Role
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
}
