import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../../course/entities';

@Entity('material')
@ObjectType()
export class Materail {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne((type) => Lesson, (lesson) => lesson.material)
  @Field((type) => Lesson, { nullable: true })
  lesson: Lesson;

  @Column({ unique: true, nullable: false }) //Уникальное имя курса и обязательное поле
  @Field({ nullable: false })
  public title: string;

  @Column({ default: ' ', nullable: true })
  @Field({ nullable: true })
  public description: string;

  @Column({ nullable: false })
  @Field({ nullable: true })
  url: string;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;
}
