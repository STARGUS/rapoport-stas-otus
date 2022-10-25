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

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, (user) => user.courseAdmin)
  public author: User;

  @ManyToMany(() => User, (user) => user.courseAccess)
  public access: User[]; //Список разрешенных пользователей

  @Column({ unique: true, nullable: true }) //Уникальное имя курса и обязательное поле
  public title: string;

  @Column({ unsigned: false, default: ' ', nullable: false })
  public description: string;

  @OneToMany((type) => Photo, (photo) => photo.courseTitle)
  public photoTitle: Photo;

  @OneToMany((type) => Photo, (photo) => photo.courseMiniTitle)
  public photoMiniTitle: Photo;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  dtoClass = CourseDto;
}
