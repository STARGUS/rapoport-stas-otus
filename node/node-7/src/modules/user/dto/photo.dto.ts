import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../entities';

export class PhotoDto {
  readonly name: string;

  readonly description: string;

  readonly filename: string;

  readonly views: number;

  readonly isPublished: boolean;

  constructor(role: Role) {
    this.name = role.name;
  }
}
