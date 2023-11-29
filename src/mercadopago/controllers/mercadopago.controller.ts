import { Body, Controller, Get, Post } from '@nestjs/common';
import { MercadoPagoService } from '../services/mercadopago.service';

@Controller('mercado')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create-order')
  async createOrder(@Body() body: any) {
    const { items } = body;
    const order = await this.mercadoPagoService.crearPreferenciaDePago(items);
    return order;
  }
  @Post('receiveWebhook')
  async receiveWebhook(@Body() body: any) {
    const receive = await this.mercadoPagoService.receiveWebhook(body);
    return receive;
  }

  @Get('success')
  async success() {
    return 'success';
  }

  @Get('failure')
  async failure() {
    return 'failure';
  }

  @Get('pending')
  async pending() {
    return 'pending';
  }
}
