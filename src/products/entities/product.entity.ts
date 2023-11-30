import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'products' })
@ObjectType() // Decorador de GraphQL para generar automáticamente el esquema
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'uuid', nullable: false })
  @Field(() => String)
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  name: string;

  @Column({ type: 'text' })
  @Field(() => String)
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;

  //stock
  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  stock: number;

  //image
  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  image: string;

  //brand
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  brand?: string;

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

  @ManyToMany(() => Category, (category) => category.products, {
    nullable: true,
  })
  @JoinTable({ name: 'product_category' })
  @Field(() => [Category], { nullable: true })
  categories: Category[];

  //orders
  @OneToMany(() => Order, (order) => order.product)
  @JoinColumn({ name: 'product_id' })
  @Field(() => Order)
  orders: Order[];
}
