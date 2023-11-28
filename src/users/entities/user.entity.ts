import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Field(() => String)
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  lastname: string;

  @Column({
    name: 'profile_picture',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  profilePicture: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field(() => String)
  refreshToken?: string;

  //resetPasswordCode
  @Column({
    name: 'reset_password_code',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field(() => String)
  resetPasswordCode?: string;

  //resetPasswordExpires
  @Column({
    name: 'reset_password_expires',
    type: 'timestamp',
    nullable: true,
  })
  @Field(() => Date)
  resetPasswordExpires?: Date;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  @Field(() => Date)
  lastLoginAt?: Date;

  @Field(() => String)
  sessionUuid?: string;

  @ManyToOne(() => Role, (role) => role.users)
  @Field(() => Role)
  role: Role;

  //orders
  @OneToMany(() => Order, (order) => order.user)
  @Field(() => Order)
  orders: Order[];
}
