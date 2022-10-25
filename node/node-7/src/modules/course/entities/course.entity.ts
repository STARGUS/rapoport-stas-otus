import { Photo } from 'src/modules/user/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
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
  public author: User; // Автор его имя и id

  @ManyToMany(() => User, (user) => user.id)
  public permit: User[]; //Список разрешенных пользователей

  @Column()
  public title: string;

  @Column({ unsigned: false })
  public description: string;

  @OneToMany((type) => Photo, (photo) => photo.courseTitle)
  public photoTitle: Photo;

  @OneToMany((type) => Photo, (photo) => photo.courseMiniTitle)
  public photoMiniTitle: Photo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
