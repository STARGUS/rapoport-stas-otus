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
import { CourseDto } from '../dto';

@Entity()
export class Materail {
  @PrimaryGeneratedColumn('uuid')
  public id: number;
}
