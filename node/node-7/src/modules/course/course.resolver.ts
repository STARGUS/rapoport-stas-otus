import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Course, CourseInput, Lesson } from './entities';
import { CourseService } from './course.service';
import { UserService } from '../user/user.service';

@Resolver((of) => Course)
export class CourseResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly userService: UserService,
  ) {}

  @Query((returns) => [Course], { name: 'courses', nullable: true })
  async getCourses() {
    return await this.courseService.findAll();
  }

  @Query((returns) => Course, { name: 'course', nullable: true })
  async getCourseById(@Args({ name: 'id' }) id: string) {
    return await this.courseService.getCourse(id);
  }

  @Mutation(() => Course, { name: 'createCourse' })
  async createCourse(
    @Args('data') data: CourseInput,
    @Args('user') id: string,
  ): Promise<Course> {
    return this.courseService.createCourse({ body: data, userId: id });
  }
}

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly userService: UserService,
  ) {}

  @Query((returns) => Lesson, { name: 'lesson', nullable: true })
  async getLessonById(@Args({ name: 'id' }) id: string) {
    return await this.courseService.getLesson(id);
  }

  @Query((returns) => [Lesson], { name: 'lessons', nullable: true })
  async getLessons(@Args({ name: 'id' }) id: string) {
    return await this.courseService.getLessons(id);
  }
}
