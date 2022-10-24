import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.model';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ type: 'varchar', unique: true, default: () => "USER" })
  public name: string;

  // @Column({ type: 'varchar', unique: true })
  @ManyToMany(() => User, (user) => user.role)
  public userRole: User[];
}
