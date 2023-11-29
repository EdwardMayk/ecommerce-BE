import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mercadopago from 'mercadopago';
import { Payment } from '../entities/payment.entity';
import { ProductPayment } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MercadoPagoService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(ProductPayment)
    private readonly productRepository: Repository<ProductPayment>,
  ) {
    mercadopago.configure({
      access_token:
        'TEST-7487196310077424-112822-9d76914cfb10dadba530363cba61f375-1569137489',
    });
  }
  async crearPreferenciaDePago(products: any[]) {
    console.log(products);
    const preferencia = await mercadopago.preferences.create({
      items: products,
      back_urls: {
        success: 'http://localhost:3000/mercado/success',
        failure: 'http://localhost:3000/mercado/failure',
        pending: 'http://localhost:3000/mercado/pending',
      },
      notification_url:
        'https://05db-2803-a3e0-1402-6910-6553-8847-678d-94fd.ngrok-free.app/mercado/receiveWebhook',
    });

    console.log(preferencia);
    return preferencia.body;
  }

  async receiveWebhook(body: any) {
    const mercadoPagoResponse = body.mercadopagoResponse;

    try {
      if (
        mercadoPagoResponse.status === 200 &&
        mercadoPagoResponse.body.status === 'approved'
      ) {
        const data = mercadoPagoResponse.body;

        // Guardar el pago en la base de datos
        const newPayment = this.paymentRepository.create({
          externalPaymentId: data.id.toString(),
          status: data.status,
          // Otros campos que desees almacenar
        });
        const savedPayment = await this.paymentRepository.save(newPayment);

        // Guardar los productos asociados al pago
        const products = data.additional_info.items.map((item) => ({
          name: item.title,
          price: item.unit_price,
          payment: savedPayment,
        }));
        const savedProducts = await this.productRepository.save(products);

        savedPayment.products = savedProducts;
        await this.paymentRepository.save(savedPayment);

        return { success: true, paymentInfo: data };
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
