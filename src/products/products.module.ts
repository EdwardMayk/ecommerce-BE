import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],

  providers: [ProductsService],
})
export class ProductsModule {}
