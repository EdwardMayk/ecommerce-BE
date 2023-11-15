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
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'products' })
@ObjectType()
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

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;

  //stock
  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  stock: number;

  //image
  @Column({ type: 'text' })
  @Field(() => String)
  image: string;

  //brand
  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  brand: string;

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

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  @Field(() => Category)
  category: Category;

  //orders
  @OneToMany(() => Order, (order) => order.product)
  @JoinColumn({ name: 'product_id' })
  @Field(() => Order)
  orders: Order[];
}
