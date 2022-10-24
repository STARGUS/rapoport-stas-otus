/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  Response,
  Request,
  Body,
} from '@nestjs/common';
import { UserDto } from '../user/user.service.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Request() req, @Response() res) {
    return await this.authService.login({ req, res });
  }

  @Post('/registration')
  async reg(@Request() req, @Response() res, @Body() data: UserDto) {
    return await this.authService.reg({ res, data });
  }
}
