import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import Auth from './auth.model';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
