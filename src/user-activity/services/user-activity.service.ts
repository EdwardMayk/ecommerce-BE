import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserActivity } from '../entities/user-activity.entity';
import { CreateUserActivityInput } from '../dto/create-user-activity.input';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly userActivityRepo: Repository<UserActivity>,
    private readonly userService: UsersService,
  ) {}

  async registerActivity(args: CreateUserActivityInput, type: string) {
    try {
      const user = await this.userService.findOne(args.user_uuid);

      const userActivity = this.userActivityRepo.create({
        ...args,
        user,
        type,
        uuid: uuidv4(),
      });

      await this.userActivityRepo.save(userActivity);

      return userActivity;
    } catch (error) {
      throw error;
    }
  }

  async findByUuid(uuid: string) {
    try {
      const userActivity = await this.userActivityRepo.findOne({
        where: { uuid },
      });

      return userActivity;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all userActivity`;
  }
  findOne(id: number) {
    return `This action returns a #${id} userActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} userActivity`;
  }
}
