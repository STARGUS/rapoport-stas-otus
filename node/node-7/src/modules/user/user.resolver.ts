import {
  Int,
  Args,
  Parent,
  Query,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { User, UserInput } from './entities';
import { forwardRef, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../decorators/roles.decorator';
import { RoleDto, UserDto } from './dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User], { name: 'users', nullable: true })
  async getUsers() {
    return this.userService.findAll();
  }

  @Query((returns) => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id' }) id: string) {
    return this.userService.findOneById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return this.userService.createUser(data);
  }
}
