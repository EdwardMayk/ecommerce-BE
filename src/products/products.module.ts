import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './resolvers/products.resolver';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product]), CategoryModule],

  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
