import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
@Entity()
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field({ nullable: false })
  public id: string;

  @Column({ type: 'varchar', unique: true, default: () => 'USER' })
  @Field({ nullable: false })
  public name: string;

  // @Column({ type: 'varchar', unique: true })
  @ManyToMany(() => User, (user) => user.role)
  @Field((type) => [User], { nullable: true })
  public userRole: User[];
}

@InputType()
export class RoleInput {
  @Field({ nullable: false })
  name: string;
}
