import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async createUser(args: CreateUserInput) {
    try {
      const password = await bcrypt.hash(args.password, 10);

      console.log('password', password);
      const user = this.usersRepo.create({
        ...args,
        uuid: uuidv4(),
        password,
      });

      console.log('users', user);
      return this.usersRepo.save(user);
    } catch (error) {
      throw error;
    }
  }

  async updateLastLogin(uuid: string) {
    try {
      const user = await this.usersRepo.findOne({ where: { uuid } });

      if (!user) throw new NotFoundException('User not found');

      return this.usersRepo.update({ uuid }, { lastLoginAt: new Date() });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(uuid: string) {
    return this.usersRepo.findOneBy({ uuid });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({
      where: {
        email,
      },
    });
  }
}
