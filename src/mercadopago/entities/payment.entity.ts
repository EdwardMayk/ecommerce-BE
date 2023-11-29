import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductPayment } from './product.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalPaymentId: string;

  @Column()
  status: string;

  @OneToMany(() => ProductPayment, (product) => product.payment)
  products: ProductPayment[];
}
