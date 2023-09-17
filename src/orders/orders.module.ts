import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';

import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],

  providers: [OrdersService],
})
export class OrdersModule {}
