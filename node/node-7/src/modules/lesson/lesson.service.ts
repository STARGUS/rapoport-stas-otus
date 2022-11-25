/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson, LessonInput } from '../course/entities';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}
  // Lesson ----------------------------------------------
  async getLesson(id: string): Promise<Lesson> {
    try {
      return this.lessonRepository.findOne({
        where: { id },
        relations: { material: true },
      });
    } catch (err) {
      throw new Error('Method not implemented. ' + err);
    }
  }

  async getLessons(id: string): Promise<Lesson[]> {
    try {
      return await this.lessonRepository.find({ where: { courseId: { id } } });
    } catch (err) {
      throw new Error('Method not implemented. ' + err);
    }
  }

  async createLesson(lesson: { data: LessonInput; courseId: string }) {
    try {
      const { data, courseId } = lesson;
      return this.lessonRepository.save({
        ...data,
        courseId: { id: courseId },
      });
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async editLesson(id: string, data: LessonInput) {
    try {
      return this.lessonRepository.update(id, data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async removeLesson(id: { id: string }) {
    try {
      return this.lessonRepository.delete(id);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }
}
