import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this._reflector.get<string[]>('roles', context.getHandler());

    const req = context.switchToHttp().getRequest();
    if (!!req.user) {
      const user = req.user;
      console.log(user);
      console.log(user.role?.name);
      //Тут прописываем логику что у пользоателя достаточно прав делаем ссылку на админку и поиск по юзеру и правам пользователя
      return user.role?.name == roles;
    } else {
      return false;
    }
  }
}
