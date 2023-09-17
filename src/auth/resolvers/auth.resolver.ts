import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { LoginAuthDto } from '../dto/login-auth.dto';
import { AuthService } from '../services/auth.service';
import { SigninResponse } from '../models/auth.model';
import { Request } from 'express';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SigninResponse)
  async login(@Args('args') args: LoginAuthDto, @Context('req') req: Request) {
    const { access_token, refresh_token, role } =
      await this.authService.login(args);

    console.log('access_token', access_token);

    req.res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',

      expires: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
    });

    req.res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',

      expires: new Date(Date.now() + 1000 * 60 * 60 * 10), // 10 hours
    });

    req.res.cookie('is_logged_in', 'true', {
      httpOnly: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
    });

    return {
      status: 'ok',
      role,
    };
  }
}
