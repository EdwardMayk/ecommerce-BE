import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from '../dto/create-category.input';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    try {
      const category = this.categoryRepository.create({
        ...createCategoryInput,
        uuid: uuidv4(),
      });

      return this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }

  async findByUuid(uuid: string) {
    return await this.categoryRepository.findOneBy({ uuid });
  }

  findAll() {
    return this.categoryRepository.find();
  }
}
