import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './role.model';
import { UserController } from './user.controller';
import User from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
