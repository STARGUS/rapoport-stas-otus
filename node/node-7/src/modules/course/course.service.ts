/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo, User } from '../user/entities';
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

  findAll() {
    return this.courseRepository.find({
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
}
