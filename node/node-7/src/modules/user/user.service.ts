import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Photo, User, Role } from './entities';
import { hash } from 'bcrypt';
import { RoleDto, UserDto } from './dto';
import { UserRegisterDto } from '../auth/dto/user-registration.dto';

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

  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: true,
        avatar: true,
        courseAccess: true,
        courseAdmin: true,
      },
    });
  }
  async findOneByEmail(email: string) {
    try {
      return this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true, firstName: true },
      });
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  async createRole(_roleDto: RoleDto) {
    const role = await this.roleRepository.save(_roleDto);
    return role;
  }
  async findRole() {
    const data = await this.roleRepository.find();
    console.log(data);
    return data;
  }
  async createUser(_userDto: UserDto): Promise<User> {
    const newPassword = await hash(_userDto.password, 10);
    _userDto.password = newPassword;
    _userDto.role = await this.roleRepository.find({
      where: { name: !!_userDto.role ? In(_userDto.role) : 'USER' }, // приходит массив. нужно его обработать и выдать тоолько сущестующие рооли
    });
    return this.userRepository.save(_userDto);
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
      relations: { avatar: true },
    });
    const photos = await this.photoRepository.save(photo);
    dataUser.avatar = photos;
    const user = await this.userRepository.save(dataUser);
    return user;
  }

  //Удаление фото
  async deletePhoto({ photo, id }) {
    return this.roleRepository.delete({ id: photo.id });
  }
}
