import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.model';

@Entity()
export default class Photo {
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
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
