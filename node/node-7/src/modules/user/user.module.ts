import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Photo from './photo.model';
import Role from './role.model';
import { UserController } from './user.controller';
import User from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Photo])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
