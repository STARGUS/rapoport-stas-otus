import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../entities';
import { PhotoDto, RoleDto } from '.';
import { Course } from 'src/modules/course/entities';

export class UserDto {
  firstName: string;

  lastName?: string;

  phoneNumber?: string;

  birthday?: Date;

  country?: string;

  city?: string;

  password: string;

  @IsOptional()
  role?: Array<RoleDto>;

  email: string;

  @IsOptional()
  avatar?: PhotoDto;

  @IsOptional()
  userAdmin?: Array<Course>;

  @IsOptional()
  userAccess?: Array<Course>;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatar = user.avatar;
    this.userAdmin = user.courseAdmin;
    this.userAccess = user.courseAccess;
    this.role = user.role;
    this.country = user.country;
    this.city = user.city;
    this.birthday = user.birthday;
    this.phoneNumber = user.phoneNumber;
    this.password = user.password;
  }
}
