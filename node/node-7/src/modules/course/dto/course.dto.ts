import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PhotoDto, UserDto } from 'src/modules/user/dto';
import { Photo, User } from 'src/modules/user/entities';
import { Course } from '../entities';


export class CourseDto {

  readonly title: string;

  readonly description?: string;

  readonly photoTitle?: PhotoDto;

  readonly photoMiniTitle?: PhotoDto;

  readonly access?: Array<User>;

  readonly author: User;

  constructor(course: Course) {
    this.title = course.title;
    this.description = course.description;
    this.photoMiniTitle = course.photoMiniTitle;
    this.photoTitle = course.photoTitle;
    this.access = course.access;
    this.author = course.author;
  }
}
