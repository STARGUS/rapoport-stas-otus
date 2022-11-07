import { Photo } from 'src/modules/user/entities';
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
import { User } from '../../user/entities/user.entity';
import { CourseDto } from '../dto';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, (user) => user.courseAdmin)
  @Field((type) => User, { nullable: true })
  public author: User;

  @ManyToMany(() => User, (user) => user.courseAccess)
  @Field((type) => [User], { nullable: true })
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

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  dtoClass = CourseDto;
}

@InputType()
export class CpourseInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;
}
