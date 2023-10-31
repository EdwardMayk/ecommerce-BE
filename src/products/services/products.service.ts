import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(args: CreateProductInput) {
    try {
      const product = this.productRepository.create({
        ...args,
        uuid: uuidv4(),
      });
      return this.productRepository.save(product);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} #${updateProductInput} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
