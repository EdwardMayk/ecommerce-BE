import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepo: Repository<Role>,
  ) {}

  findAll() {
    return `This action returns all roles`;
  }

  findOne(value: string) {
    return this.rolesRepo.findOne({ where: { value: value } });
  }
}
