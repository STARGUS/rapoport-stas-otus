import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard, CourseGuard } from '../guards';

export function Roles(...roles: string[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RoleGuard));
}
type Roles = Array<string>;
interface CourseRole {
  role: Roles;
  type: string;
}

export function CourseRoles(...roles) {
  return applyDecorators(
    SetMetadata('courseAccess', roles),
    // SetMetadata('type', type),
    UseGuards(CourseGuard),
  );
}
