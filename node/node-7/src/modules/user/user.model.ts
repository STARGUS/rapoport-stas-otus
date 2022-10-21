import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import Role from './role.model';

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar', { length: 80 })
  public firstname?: string;

  @Column('varchar', { length: 80 })
  public lastname?: string;

  @Column('varchar', { length: 80, unique: true }) //Уникальная почта
  public email: string;

  @Column('varchar', { length: 80 })
  public password: string;

  @Column('varchar', { unique: true }) //Уникальный номер
  public phone_number?: string;

  @JoinColumn()
  @OneToMany(() => Role, (role) => role.role)
  public role!: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
