import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Role from './role.model';
import User from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: { role: true },
      // select: {
      //   //Поиск по заданным параметрам
      //   firstname: true,
      //   lastname: true,
      //   email: true,
      //   phone_number: true,
      //   //role: true,
      // },
    });
  }
  async createRole(data) {
    const role = await this.roleRepository.save(
      this.roleRepository.create(data),
    );
    return role;
  }
  async createUser(data) {
    if (!!data.role == false) {
      data.role = [[{ role: 'USER' }]];
    }
    const user = await this.userRepository.save(
      data,
      // this.userRepository.create(data),
    );
    return user;
  }

  findById(id: number) {
    return this.userRepository.findOne({
      relations: { role: true },
    });
  }
}
