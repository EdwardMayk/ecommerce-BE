// mercadopago.module.ts
import { Module } from '@nestjs/common';
import { MercadoPagoService } from './services/mercadopago.service';
import { MercadoPagoController } from './controllers/mercadopago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPayment } from './entities/product.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, ProductPayment])],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
  exports: [MercadoPagoService],
})
export class MercadoPagoModule {}
