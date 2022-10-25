import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PhotoDto, UserUpdateDto } from 'src/modules/user/dto';
import { Photo, User } from 'src/modules/user/entities';
import { Course } from '../entities';

export class CourseUpdateDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({ type: PhotoDto })
  readonly photoTitle?: PhotoDto;

  @ApiPropertyOptional({ type: PhotoDto })
  readonly photoMiniTitle?: PhotoDto;

  @ApiPropertyOptional({ type: Array<UserUpdateDto> })
  readonly access?: Array<UserUpdateDto>;

  constructor(course: Course) {
    this.title = course.title;
    this.description = course.description;
    this.photoMiniTitle = course.photoMiniTitle;
    this.photoTitle = course.photoTitle;
    this.access = course.access;
  }
}
