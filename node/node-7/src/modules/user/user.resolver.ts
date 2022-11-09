import { UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import {
  Int,
  Args,
  Parent,
  Query,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { Course, CourseInput } from '../course/entities';
import { Photo, User, UserInput } from './entities';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User], { name: 'users', nullable: true })
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query((returns) => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id' }) id: string) {
    return await this.userService.findOneById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return await this.userService.createUser(data);
  }
}
