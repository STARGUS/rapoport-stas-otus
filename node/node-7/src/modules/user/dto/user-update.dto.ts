import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../entities';
import { PhotoDto, RoleDto } from '.';
import { CourseDto } from '../../course/dto';

export class UserUpdateDto {
  @IsOptional()
  @ApiProperty()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  birthday?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  city?: string;

  @IsOptional()
  @ApiProperty()
  password?: string;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  role?: Array<RoleDto>;

  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional({ type: PhotoDto })
  avatar?: PhotoDto;

  @IsOptional()
  @ApiPropertyOptional({ type: CourseDto })
  userAdmin?: Array<CourseDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: CourseDto })
  userAccess?: Array<CourseDto>;

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
