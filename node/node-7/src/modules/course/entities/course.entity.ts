import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @ManyToOne(
    () => User,
    (user) => {
      return { id: user.id, name: user.firstname + ' ' + user.lastname };
    },
  )
  author: User; // Автор его имя и id

  @ManyToMany(() => User, (user) => user.id)
  permit: User[]; //Список разрешенных пользователей

  @Column()
  title: string;

  @Column({ unsigned: false })
  description: string;

  @Column({ unsigned: false })
  photo: string; // Одна картинка, так что просто путь к ней

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
