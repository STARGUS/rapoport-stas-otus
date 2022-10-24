/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';

export function Roles(...roles: string[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RoleGuard));
}
