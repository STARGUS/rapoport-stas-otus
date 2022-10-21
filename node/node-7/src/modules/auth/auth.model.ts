import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Auth {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public tokenClose: string;
}
