import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from 'src/category/services/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async create(args: CreateProductInput) {
    try {
      const product = await this.productRepo.create({
        ...args,
        uuid: uuidv4(),
      });
      const newProduct = await this.productRepo.save(product);

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async findByUuid(uuid: string) {
    return await this.productRepo.findOneBy({ uuid });
  }
}
