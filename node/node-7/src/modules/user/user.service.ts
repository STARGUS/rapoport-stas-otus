import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Photo, User, Role } from './entities';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: {
        role: true,
        photos: true,
        courseAccess: true,
        courseAdmin: true,
      },
    });
  }
  async findOneByEmail(email: string) {
    try {
      return this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true, firstname: true },
      });
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  async createRole(data) {
    const role = await this.roleRepository.save(data);
    return role;
  }
  async findRole() {
    const data = await this.roleRepository.find();
    console.log(data);
    return data;
  }
  async createUser(data) {
    const newPassword = await hash(data.password, 10);
    data.password = newPassword;
    data.role = await this.roleRepository.find({
      where: { name: !!data.role ? In(data.role) : 'USER' }, // приходит массив. нужно его обработать и выдать тоолько сущестующие рооли
    });
    return await this.userRepository.save(data);
  }

  async findOneById(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: { role: true },
    });
  }
  async findOneByIdMidleware(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      select: {
        id: true,
        role: true,
      },
      relations: { role: true },
    });
  }

  //Добавляем фото в базу
  async editPhoto({ photo, id }) {
    const dataUser = await this.userRepository.findOne({
      where: { id: id },
      relations: { photos: true },
    });
    const photos = await this.photoRepository.save(photo);
    dataUser.photos.push(photos);
    const user = await this.userRepository.save(dataUser);
    return user;
  }

  //Удаление фото
  async deletePhoto({ photo, id }) {
    return this.roleRepository.delete({ id: photo.id });
  }
}
