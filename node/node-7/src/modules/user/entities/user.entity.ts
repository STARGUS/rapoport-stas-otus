import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';
import { Photo } from './photo.entity';
import { Course } from 'src/modules/course/entities';
import { UserDto } from '../dto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ nullable: false, default: '' })
  public firstName: string;

  @Column({ nullable: false, default: '' })
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: false, default: '' })
  public phoneNumber: string;

  @Column({ nullable: false, default: () => 'now()' })
  public birthday: Date;

  @Column({ nullable: false, default: '' })
  public country: string;

  @Column({ nullable: false, default: '' })
  public city: string;

  @OneToMany((type) => Photo, (photo) => photo.user)
  public avatar: Photo;

  @ManyToMany(() => Role, (role) => role.userRole)
  @JoinTable()
  public role: Role[];

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  //Course
  @ManyToMany(() => Course, (course) => course.access)
  @JoinTable()
  public courseAccess: Course[]; //Список доступных курсов

  @OneToMany(() => Course, (course) => course.author)
  @JoinTable()
  public courseAdmin: Course[]; //Список Созданных курсов

  dtoClass = UserDto;
}
