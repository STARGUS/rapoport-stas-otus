import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities';
import { CourseUpdateDto } from './dto';
import { Comment, Course, Lesson, LessonInput } from './entities';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // Course ----------------------------------------------
  async findAll() {
    return await this.courseRepository.find({
      relations: {
        photoMiniTitle: true,
        photoTitle: true,
        // access: true,
        author: true,
      },
    });
  }

  async getCourse(id: string) {
    return this.courseRepository.findOneBy({ id });
  }

  async createCourse({ body, userId }) {
    try {
      const data = { ...body, author: { id: userId } };
      return await this.courseRepository.save(data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async updateCourse(data: CourseUpdateDto, id: string) {
    try {
      const result = await this.courseRepository.update(id, data);
      if (!!result.affected) {
        return this.courseRepository.findOneBy({ id });
      } else {
        throw new Error('Error, data entered incorrectly. ');
      }
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async removeCourse(id: string) {
    try {
      return (
        !!(await this.courseRepository.delete(id))?.affected && {
          message: 'Выполнено! Курс удален.',
        }
      );
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  // Access ----------------------------------------------
  async getAccess(id: string): Promise<User[]> {
    try {
      return (
        await this.courseRepository.findOne({
          where: { id },
          relations: { access: true },
        })
      )?.access;
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async createAccessCourse(email: string, id: string): Promise<Course> {
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

  async removeAccessCourse(id: string, userId: string) {
    try {
      const data = await this.courseRepository.findOne({
        where: { id },
        relations: { access: true },
      });
      data.access = data.access
        .map((el) => el.id !== userId && el)
        .filter((el) => !!el);
      return await this.courseRepository.save(data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  // Comment ----------------------------------------------
  async getCourseComment({ courseId }) {
    try {
      return (
        await this.courseRepository.findOne({
          where: { id: courseId },
          select: { comment: true },
          relations: { comment: true },
        })
      )?.comment;
    } catch (err) {
      throw new Error('Method not implemented. ' + err);
    }
  }

  async createCourseComment(data: {
    id?;
    courseId?;
    author?;
    text?;
    lessonId?;
  }) {
    try {
      data = Object.entries(data).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {},
      );
      return this.commentRepository.save(data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async editCourseComment(data: { id?: string; text?: string }) {
    try {
      return this.commentRepository.update(data.id, { text: data.text });
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }
  async removeCourseComment({ id }) {
    try {
      return this.commentRepository.delete(id);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }
}
