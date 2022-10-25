/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo, User } from '../user/entities';
import { CourseUpdateDto } from './dto';
import { Course } from './entities';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll() {
    return await this.courseRepository.find({
      relations: {
        photoMiniTitle: true,
        photoTitle: true,
        access: true,
        author: true,
      },
    });
  }
  async createCourse({ body, user }) {
    try {
      const data = { ...body, author: { id: user.id } };
      return await this.courseRepository.save(data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }
  async updateCourse(data: CourseUpdateDto, id: string) {
    try {
      console.log({ ...data });
      return await this.courseRepository.update(id, data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async editAccessCourse(email: string, id: string) {
    try {
      const course: CourseUpdateDto = await this.courseRepository.findOne({
        where: { id },
        relations: { access: true },
      });
      // Добавление пользователя в права для просмотра контента
      course.access.push(
        await this.userRepository.findOne({
          where: { email },
          select: { id: true },
        }),
      );
      return await this.courseRepository.save(course);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }
}
