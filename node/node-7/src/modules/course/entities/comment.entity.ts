import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Lesson, Course } from './';

@Entity('comment')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne((type) => Lesson, (lesson) => lesson.comment)
  @Field((type) => Lesson, { nullable: true })
  lessonId: Lesson;

  @ManyToOne((type) => Course, (course) => course.comment)
  @Field((type) => Course, { nullable: true })
  courseId: Course;

  @Column({ default: ' ', nullable: true })
  @Field({ nullable: true })
  text: string;

  @ManyToOne(() => User, (user) => user.comment)
  @Field((type) => User, { nullable: true })
  author: User;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;
}
