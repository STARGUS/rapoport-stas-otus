import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { keyJWT } from 'src/config/config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const auth = req.cookies['authorization'] || req.headers.authorization;
    if (!!auth) {
      let token = auth.split(' ')[1];
      await jwt.verify(token, keyJWT, async (err, payload) => {
        if (payload) {
          let user;
          //  let user = await controller.findOneById(payload.id); // получаем id пользователя
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
    next();
  }
}
