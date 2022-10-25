import { Controller, Post, Response, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-registration.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Request() req, @Response() res) {
    return await this.authService.login({ req, res });
  }

  @Post('/registration')
  async reg(@Request() req, @Response() res, @Body() data: UserRegisterDto) {
    return await this.authService.reg({ res, data });
  }
}
