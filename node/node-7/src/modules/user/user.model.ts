import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import Role from './role.model';
import Photo from './photo.model';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ nullable: false, default: '' })
  public firstname: string;

  @Column({ nullable: false, default: '' })
  public lastname: string;

  @IsEmail()
  @Column({ unique: true })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  @Column()
  public password: string;

  @IsPhoneNumber()
  @Column({ nullable: false, default: '' })
  @IsDefined()
  public phone_number: string;

  @IsDate()
  @Column({ nullable: false, default: () => 'now()' })
  @IsDefined()
  public birthdate: Date;

  @Column({ nullable: false, default: '' })
  @IsDefined()
  public country: string;

  @Column({ nullable: false, default: '' })
  @IsDefined()
  public city: string;

  @OneToMany((type) => Photo, (photo) => photo.user)
  public photos: Photo[];

  @ManyToMany(() => Role, (role) => role.userRole)
  @JoinTable()
  public role: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
