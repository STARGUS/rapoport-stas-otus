import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../entities';

export class RoleDto {
  readonly name: string;

  constructor(role: Role) {
    this.name = role.name;
  }
}
