import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { UserActivityService } from 'src/user-activity/services/user-activity.service';
import { PayloadToken } from '../models/token';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,

    private readonly userService: UsersService,
    private userActivityService: UserActivityService,
  ) {}

  async register(args: RegisterAuthDto) {
    const newAuth = await this.userService.createUser({
      ...args,
    });
    return newAuth;
  }

  async login(args: LoginAuthDto) {
    const user = await this.userService.findByEmail(args?.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const valid = await bcrypt.compare(args?.password, user?.password);

    if (!valid) {
      throw new BadRequestException('Invalid password');
    }

    const response = await this.userActivityService.registerActivity(
      {
        user_uuid: user.uuid,
        startTime: new Date(),
        endTime: new Date(),
        platform: 'web',
      },
      'login',
    );

    const payload: PayloadToken = {
      role: user.role?.value,
      uuid: user.uuid,
      session_uuid: response.uuid,
    };

    await this.userService.updateLastLogin(user.uuid);

    return this.generateTokens(payload);
  }

  generateTokens(payload: PayloadToken) {
    return {
      access_token: this.generateAccessToken(payload),
      refresh_token: this.generateRefreshToken(payload),
      role: payload.role,
      uuid: payload.uuid,
    };
  }

  private generateAccessToken(payload: PayloadToken): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: PayloadToken): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.jwt.refreshSecret,
      expiresIn: this.configService.jwt.refreshExpiration,
    });
  }
}
