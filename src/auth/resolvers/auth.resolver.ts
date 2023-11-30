import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { LoginAuthDto } from '../dto/login-auth.dto';
import { AuthService } from '../services/auth.service';
import { SigninResponse } from '../models/auth.model';
import { Response } from 'express';
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
  async login(@Args('args') args: LoginAuthDto, @Context('res') res: Response) {
    const { access_token, refresh_token, role, user } =
      await this.authService.login(args);

    console.log('access_token', access_token);
    console.log('refresh_token', refresh_token);
    console.log('roles', role);

    res.cookie('access_token', access_token, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      domain: this.configService.frontend.url,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      domain: this.configService.frontend.url,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });

    res.cookie('is_logged_in', 'true', {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      domain: this.configService.frontend.url,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });

    console.log('user', user);

    return {
      status: 'ok',
      role,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      lastLogin: user.lastLogin,
      uuid: user.uuid,
    };
  }
}
