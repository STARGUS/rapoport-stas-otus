import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { keyJWT } from '../config/config.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: Function) {
    try {
      const auth = req.cookies['authorization'] || req.headers.authorization;
      if (!!auth) {
        let token = auth.split(' ')[1];
        await jwt.verify(token, keyJWT, async (err, payload) => {
          if (payload) {
            let user = await this.userService.findOneByIdMidleware(payload.id); // получаем id пользователя
            if (!!user) {
              req.user = user;
            }
            if (!req.user) next();
          } else if (err) {
            console.log(err);
            next();
          }
        });
      }
    } catch (error) {
      next();
    }
    next();
  }
}
