import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Role } from './role.entity';
import { Photo } from '../../photo/entities/photo.entity';
import { Course, Comment } from '../../course/entities';
import { UserDto } from '../dto';
import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field({ nullable: false })
  @Field((type) => ID)
  public id: string;

  @Column({ nullable: false, default: '' })
  @Field({ nullable: false })
  public firstName: string;

  @Column({ nullable: true, default: '' })
  @Field({ nullable: true })
  public lastName?: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  public email: string;

  @Column()
  @Field({ nullable: false })
  public password: string;

  @Column({ nullable: true, default: '' })
  @Field({ nullable: true })
  public phoneNumber?: string;

  @Column({ nullable: true, default: () => 'now()' })
  @Field({ nullable: true })
  public birthday?: Date;

  @Column({ nullable: true, default: '' })
  @Field({ nullable: true })
  public country?: string;

  @Column({ nullable: true, default: '' })
  @Field({ nullable: true })
  public city?: string;

  @OneToMany((type) => Photo, (photo) => photo.user)
  @Field((type) => Photo, { nullable: true })
  public avatar: Photo;

  @ManyToMany(() => Role, (role) => role.userRole)
  @JoinTable()
  @Field((type) => [Role], { nullable: true })
  public role: Role[];

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  //Course
  @ManyToMany(() => Course, (course) => course.access)
  @JoinTable()
  @Field((type) => [Course], { nullable: true })
  public courseAccess: Course[]; //Список доступных курсов

  @OneToMany(() => Course, (course) => course.author)
  @JoinTable()
  @Field((type) => [Course], { nullable: true })
  public courseAdmin: Course[]; //Список Созданных курсов

  @OneToMany(() => Comment, (com) => com.author)
  @Field((type) => [Comment], { nullable: true })
  @JoinTable()
  public comment: Comment[];

  dtoClass = UserDto;
}

@InputType()
export class UserInput {
  @Field({ nullable: false })
  public firstName: string;

  @Field({ nullable: true })
  public lastName?: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  public email: string;

  @Field({ nullable: false })
  public password: string;

  @Field({ nullable: true })
  public phoneNumber?: string;

  @Field({ nullable: true })
  public birthday?: Date;

  @Field({ nullable: true })
  public country?: string;

  @Field({ nullable: true })
  public city?: string;
}
