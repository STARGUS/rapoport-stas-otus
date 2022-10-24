import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { keyJWT } from 'src/config/config.service';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async reg({ data, res }) {
    const createUser = await this.userService.createUser(data);
    if (!!createUser.id) {
      const token = await jwt.sign(
        { id: createUser.id, role: createUser.role },
        keyJWT,
      );
      // Добавление куки пользователю, для этого нужно установить coockie-parser
      res.cookie('authorization', 'Bearer ' + token);
      return res.status(201).send({
        token,
        login: { name: createUser.firstname, email: createUser.email },
      });
    } else {
      return res.status(401).send({ message: 'Ошибка регистрации' });
    }
  }

  async login({ req, res }) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findOneByEmail(email);
      const passwordHash = await compare(password, user.password);
      if (!!user && email === user.email && passwordHash) {
        const token = await jwt.sign({ id: user.id }, keyJWT);
        if (!!user) {
          req.user = user;
          res.cookie('authorization', 'Bearer ' + token);
        }
        return res.status(201).send({
          token,
          login: { name: user.firstname, email: user.email },
        });
      } else {
        return res
          .status(401)
          .send({ message: 'Ошибка входа, неверный ввод данных.' });
      }
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }
}
