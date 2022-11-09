import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', unique: true, default: () => 'USER' })
  public name: string;

  // @Column({ type: 'varchar', unique: true })
  @ManyToMany(() => User, (user) => user.role)
  public userRole: User[];
}
