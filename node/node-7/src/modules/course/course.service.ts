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
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
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
      return await this.courseRepository.update(id, data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  async removeCourse(id: string) {
    try {
      return this.courseRepository.delete(id);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  // Access ----------------------------------------------
  async getAccess(id: string): Promise<User[]> {
    try {
      return (await this.courseRepository.findOneBy({ id }))?.access;
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
      const data = await this.courseRepository.findOneBy({ id });
      data.access = data.access.filter((el) => el.id !== userId);
      return await this.courseRepository.save(data);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  // Comment ----------------------------------------------
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

  async editCourseComment(data: { id?; courseId?; author?; text?; lessonId? }) {
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
  async removeCourseComment({ id }) {
    try {
      return this.commentRepository.delete(id);
    } catch (error) {
      throw new Error('Method not implemented. ' + error);
    }
  }

  // Lesson ----------------------------------------------
  async getLesson(id: string): Promise<Lesson[]> {
    try {
      return this.lessonRepository.findBy({ id });
    } catch (err) {
      throw new Error('Method not implemented. ' + err);
    }
  }

  async getLessons(id: string): Promise<Lesson[]> {
    try {
      return (
        await this.courseRepository.findOne({
          where: { id },
          relations: { lesson: true },
        })
      )?.lesson;
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
}
