import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Auth {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public tokenClose: string;
}
