import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Photo, Role } from '../entities';

export class PhotoDto {
  readonly name: string;

  readonly description: string;

  readonly filename: string;

  readonly views: number;

  readonly isPublished: boolean;

  constructor(photo: Photo) {
    this.name = photo.name;
  }
}
