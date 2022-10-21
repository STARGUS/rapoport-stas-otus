import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.model';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', default: () => 'USER', unique: true })
  public role!: string;
}
