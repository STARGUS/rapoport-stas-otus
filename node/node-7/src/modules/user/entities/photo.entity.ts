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

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('text', { default: ' ' })
  description: string;

  @Column()
  filename: string;

  @Column('bigint')
  views: number;

  @Column({ default: true })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.photos)
  user: User; // У одного пользователя 1 фотограция

  @ManyToOne(() => Course, (course) => course.photoMiniTitle)
  courseMiniTitle: Course; // У одного курса 1 фотограция маленького размера

  @ManyToOne(() => Course, (course) => course.photoTitle)
  courseTitle: Course; // У одного курса 1 фотограция

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
