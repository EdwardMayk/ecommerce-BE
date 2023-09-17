import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'providers' })
@ObjectType()
export class Provider {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Field(() => String)
  uuid: string;

  //ruc
  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  ruc: string;

  //address
  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  address: string;

  //province
  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  province: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  contactName: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  phone?: string;

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

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  deletedAt?: Date;
}
