import { Course } from 'src/modules/course/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Field, Int, ObjectType, InputType, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  @Field({ nullable: false })
  @Field((type) => ID)
  id: string;

  @Column({
    length: 100,
  })
  @Field({ nullable: false })
  name: string;

  @Column('text', { default: ' ' })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field({ nullable: false })
  filename: string;

  @Column('bigint')
  @Field(() => Int, { nullable: false })
  views: number;

  @Column({ default: true })
  @Field({ nullable: true })
  isPublished?: boolean;

  @ManyToOne(() => User, (user) => user.avatar)
  @Field((type) => User, { nullable: true })
  user: User; // У одного пользователя 1 фотограция

  @ManyToOne(() => Course, (course) => course.photoMiniTitle)
  @Field((type) => Course, { nullable: true })
  courseMiniTitle: Course; // У одного курса 1 фотограция маленького размера

  @ManyToOne(() => Course, (course) => course.photoTitle)
  @Field((type) => Course, { nullable: true })
  courseTitle: Course; // У одного курса 1 фотограция

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class PhotoInput {
  @Field({ nullable: false })
  name: string;
}
