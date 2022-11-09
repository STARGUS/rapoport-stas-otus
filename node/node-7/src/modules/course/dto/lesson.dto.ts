import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PhotoDto, UserDto } from 'src/modules/user/dto';
import { Photo, User } from 'src/modules/user/entities';
import { Lesson } from '../entities';

export class LessonDto {
  readonly title: string;

  readonly description?: string;

  constructor(lesson: Lesson) {
    this.title = lesson.title;
    this.description = lesson.description;
  }
}
