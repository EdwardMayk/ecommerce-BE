import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class ProductPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Payment, (payment) => payment.products)
  payment: Payment;
}
