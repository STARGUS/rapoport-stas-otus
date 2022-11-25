import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Photo, User, Role } from './entities';
import { hash } from 'bcrypt';
import { RoleDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // Получение всезх данныхз о пользователе
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

  // Поиск по email для входа
  async findOneByEmail(email: string) {
    try {
      return this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true, firstName: true },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  // Создание новой роли
  async createRole(_roleDto: RoleDto) {
    try {
      const role = await this.roleRepository.save(_roleDto);
      return role;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  // Получение списка ролей
  async findRole() {
    try {
      const data = await this.roleRepository.find();
      return data;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  // 8 голов из РК в РФ
  // на медете 8 голов 13:35 участковый из Алаколя ищет знакомых с медета чтобы посмотреть коней и снять их.

  // Создание нового пользователя
  async createUser(_userDto: UserDto): Promise<User> {
    const newPassword = await hash(_userDto.password, 10);
    _userDto.password = newPassword;
    console.log(_userDto.role);
    const roles = _userDto.role && _userDto.role.map((el) => el.name);
    _userDto.role = await this.roleRepository.find({
      where: { name: !!roles ? In(roles) : 'USER' }, // приходит массив. нужно его обработать и выдать тоолько сущестующие рооли
    });
    return this.userRepository.save(_userDto);
  }

  // Поиск по id с отображением ролей
  async findOneById(id: string) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: { role: true },
    });
  }

  // Данные для мидлвара
  async findOneByIdMidleware(id: string) {
    return this.userRepository.findOne({
      where: { id: id },
      select: {
        id: true,
        role: true,
      },
      relations: { role: true, courseAccess: true, courseAdmin: true },
    });
  }

  async getUser(access: User[]) {
    console.log(`Getting user with id ${access}...`);
    return access;
  }
  findCourse(id) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
