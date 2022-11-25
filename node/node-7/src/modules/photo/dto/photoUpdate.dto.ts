import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Photo } from '../entities/photo.entity';

export class PhotoDto {
  readonly name: string;

  readonly description: string;

  readonly filename: string;

  readonly views: number;

  readonly isPublished: boolean;

  constructor(photo: Photo) {
    this.name = photo.name;
    this.description = photo.description;
    this.filename = photo.filename;
    this.views = photo.views;
    this.isPublished = photo.isPublished;
  }
}
