import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PhotoDto, UserDto } from '../../user/dto';
import { Photo, User } from '../../user/entities';
import { Lesson } from '../../course/entities';

export class LessonDto {
  readonly title: string;

  readonly description?: string;

  constructor(lesson: Lesson) {
    this.title = lesson.title;
    this.description = lesson.description;
  }
}
