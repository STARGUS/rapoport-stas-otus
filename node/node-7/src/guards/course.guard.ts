import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class CourseGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  //Создание гарда по доступу к конкретному курсу и его модерация
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    //Получение данных с декоратора SetMetadata(key, value);
    const access = this._reflector.get<string[]>(
      'course_access',
      context.getHandler(),
    );
    if (!!req.user) {
        
      return true;
    } else {
      return false;
    }
  }
}
