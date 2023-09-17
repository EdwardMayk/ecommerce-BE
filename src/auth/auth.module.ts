import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';

import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './jwt.constants';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserActivityModule } from 'src/user-activity/user.activity.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20H' },
    }),
    UsersModule,
    UserActivityModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
