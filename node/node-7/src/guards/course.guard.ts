import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userInfo } from 'os';
import { Observable } from 'rxjs';

// Если Декоратор пустой то доступ только Администратору курса
@Injectable()
export class CourseGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  //Создание гарда по доступу к конкретному курсу и его модерация
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    //Получение данных с декоратора SetMetadata(key, value);
    const { user, params } = req;
    const access = this._reflector.get<string[]>(
      'courseAccess',
      context.getHandler(),
    );
    access.push('ADMIN');
    const type = this._reflector.get<string[]>('type', context.getHandler());
    const accessData = (arr, role) => {
      if (access.includes(role)) {
        return arr?.filter((el) => el.id === params.id).length > 0;
      }
      return false;
    };
    if (!!user) {
      if (accessData(user.courseAdmin, 'ADMIN')) return true;
      if (!!params.lessonId) {
        return (
          accessData(user.courseAdmin, 'MODERATOR') ||
          accessData(user.courseAccess, 'USER')
        );
      }
    } else {
      return false;
    }
  }
}
