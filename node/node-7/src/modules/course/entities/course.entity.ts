import { Photo, User } from '../../user/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseDto } from '../dto';
import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { Lesson, Comment } from '.';

@Entity('course')
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  public id: string;

  @ManyToOne(() => User, (user) => user.courseAdmin)
  @Field((type) => User, { nullable: true })
  public author: User;

  @ManyToMany(() => User, (user) => user.courseAccess)
  @Field((type) => [User])
  public access: User[]; //Список разрешенных пользователей

  @Column({ unique: true, nullable: false }) //Уникальное имя курса и обязательное поле
  @Field({ nullable: false })
  public title: string;

  @Column({ unsigned: false, default: ' ', nullable: true })
  @Field({ nullable: true })
  public description: string;

  @OneToMany((type) => Photo, (photo) => photo.courseTitle)
  @Field((type) => Photo, { nullable: true })
  public photoTitle: Photo;

  @OneToMany((type) => Photo, (photo) => photo.courseMiniTitle)
  @Field((type) => Photo, { nullable: true })
  public photoMiniTitle: Photo;

  @OneToMany((type) => Lesson, (lesson) => lesson.courseId)
  @Field((type) => [Lesson], { nullable: true })
  public lesson: Lesson[];

  @OneToMany((type) => Comment, (com) => com.courseId)
  @Field((type) => [Comment], { nullable: true })
  public comment: Comment[];

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  dtoClass = CourseDto;
}

@InputType()
export class CourseInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;
}
