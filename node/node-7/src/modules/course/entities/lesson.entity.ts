import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course, Comment, Materail } from '.';

@Entity('lesson')
@ObjectType()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true, nullable: false }) //Уникальное имя курса и обязательное поле
  @Field({ nullable: false })
  public title: string;

  @Column({ default: ' ', nullable: true })
  @Field({ nullable: true })
  public description: string;

  @OneToMany((type) => Course, (course) => course.lesson)
  @Field((type) => Course, { nullable: true })
  public courseId: Course;

  @OneToMany((type) => Materail, (material) => material.lessonId)
  @Field((type) => [Materail], { nullable: true })
  public material: Materail[];

  @OneToMany((type) => Comment, (com) => com.lessonId)
  @Field((type) => [Comment], { nullable: true })
  public comment: Comment[];

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;
}


@InputType()
export class LessonInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: false })
  description: string;
}
