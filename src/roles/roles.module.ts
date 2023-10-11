import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';

import { User } from 'src/users/entities/user.entity';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesResolver } from './resolvers/roles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [RolesService, RolesResolver],
  exports: [RolesService],
})
export class RolesModule {}
