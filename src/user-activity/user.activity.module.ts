import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserActivity } from './entities/user-activity.entity';
import { UserActivityService } from './services/user-activity.service';
import { UserActivityResolver } from './resolvers/user-activity.resolver';

import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivity, User]), UsersModule],
  providers: [UserActivityResolver, UserActivityService],
  exports: [UserActivityService],
})
export class UserActivityModule {}
