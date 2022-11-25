import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Photo, Role, User } from '../entities';
import { Repository } from 'typeorm';
import * as bcryptHash from 'bcrypt';

describe('UserController', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let photoRepository: Repository<Photo>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const ROLE_REPOSITORY_TOKEN = getRepositoryToken(Role);
  const PHOTO_REPOSITORY_TOKEN = getRepositoryToken(Photo);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: ROLE_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn((x) => x),
          },
        },
        {
          provide: PHOTO_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
    userRepository = app.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    roleRepository = app.get<Repository<Role>>(ROLE_REPOSITORY_TOKEN);
    photoRepository = app.get<Repository<Photo>>(PHOTO_REPOSITORY_TOKEN);
  });

  it('userRepo should be defined', () => {
    // Проверка подключения репозитория
    expect(userRepository).toBeDefined();
  });
  it('roleRepo should be defined', () => {
    // Проверка подключения репозитория
    expect(roleRepository).toBeDefined();
  });
  it('photoRepo should be defined', () => {
    // Проверка подключения репозитория
    expect(photoRepository).toBeDefined();
  });
  it('userSer should be defined', async () => {
    // Проверка подключения Сервиса
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    jest.spyOn(bcryptHash, 'hash').mockRejectedValue('hash123456');
    it('should create a new user with encoded password', async () => {
      jest
        .spyOn(roleRepository, 'find')
        .mockRejectedValueOnce([{ id: '12', name: 'USER' }]); // Возвращает ответ от выполнения функции
      await userService.createUser({
        email: 'Stiven@ya.ru',
        password: '123456',
        firstName: 'Stiven',
        lastName: 'Romier',
        role: [{ name: 'USER' }],
      });
      expect(userService.createUser).toHaveBeenCalledWith({
        email: 'Stiven@ya.ru',
        password: 'hash123456',
        firstName: 'Stiven',
        lastName: 'Romier',
        role: [{ id: '12', name: 'USER' }],
      });
    });
    it('create new User', async () => {
      await userService.createUser({
        email: 'Stiven@ya.ru',
        password: '123456',
        firstName: 'Stiven',
        lastName: 'Romier',
        role: [{ name: 'USER' }],
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'Stiven@ya.ru',
        password: 'hash123456',
        firstName: 'Stiven',
        lastName: 'Romier',
        // role: [{ name: 'USER' }],
      });
      expect(jest.fn());
    });
  });
  // describe('root', () => {
  //   it('userRepo should be defined', async () => {
  //     const result = await userController.getAllUsers();

  //     //   expect(userController.getAllUsers()).toBe('Hello World!');
  //   });
  // });
});
