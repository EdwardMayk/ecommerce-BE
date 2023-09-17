import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';

@Injectable()
export class OrdersService {
  create(createOrderInput: CreateOrderInput) {
    return `This action updates a #${createOrderInput} order`;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id}, #${updateOrderInput} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
