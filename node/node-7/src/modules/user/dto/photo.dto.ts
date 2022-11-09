import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Photo, Role } from '../entities';

export class PhotoDto {
  readonly name: string;

  @IsOptional()
  readonly description?: string;

  readonly filename: string;

  readonly views: number;

  readonly isPublished?: boolean;

  constructor(photo: Photo) {
    this.name = photo.name;
    this.description = photo.description;
    this.views = photo.views;
    this.isPublished = photo.isPublished;
    this.filename = photo.filename;
  }
}
