import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { LoginAuthDto } from '../dto/login-auth.dto';
import { AuthService } from '../services/auth.service';
import { SigninResponse } from '../models/auth.model';
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  @Mutation(() => SigninResponse)
  async login(@Args('args') args: LoginAuthDto, @Context('req') req: Request) {
    const { access_token, refresh_token, role } =
      await this.authService.login(args);

    console.log('access_token', access_token);
    console.log('refresh_token', refresh_token);
    console.log('roles', role);

    req.res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain: this.configService.frontend.url,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });

    req.res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain: this.configService.frontend.url,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });

    req.res.cookie('is_logged_in', 'true', {
      httpOnly: false,
      sameSite: 'lax',
      domain: this.configService.frontend.url,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });

    return {
      status: 'ok',
      role,
    };
  }
}
