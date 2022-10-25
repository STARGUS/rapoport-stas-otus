import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}
  async findRole(arr, user) {
    return user.role?.map((el) => el.name).some((el) => arr.includes(el));
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this._reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    if (!!req.user) {
      const user = req.user;
      return await this.findRole(roles, user);
    } else {
      return false;
    }
  }
}
