import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/services/roles.service';
import { SES } from 'aws-sdk';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  private ses = new SES();

  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private readonly roleService: RolesService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    this.ses = new SES({
      region: this.configService.AWSS3.region,
      accessKeyId: this.configService.AWSS3.accessKeyId,
      secretAccessKey: this.configService.AWSS3.secretAccessKey,
    });
  }

  async createUserAdmin(args: CreateUserInput) {
    try {
      const password = await bcrypt.hash(args.password, 10);

      const role = await this.roleService.findOne('admin');

      const user = this.usersRepo.create({
        ...args,
        uuid: uuidv4(),
        password,
        role: role,
      });

      return this.usersRepo.save(user);
    } catch (error) {
      throw error;
    }
  }

  async createUser(args: CreateUserInput) {
    try {
      const password = await bcrypt.hash(args.password, 10);

      const role = await this.roleService.findOne('user');

      const user = this.usersRepo.create({
        ...args,
        uuid: uuidv4(),
        password,
        role: role,
      });

      const savedUser = await this.usersRepo.save(user);

      console.log('usuario registrado', savedUser);

      // Envía el correo de bienvenida
      await this.sendWelcomeEmail(savedUser.email);
      console.log('Correo de bienvenida enviado con éxito.');

      return savedUser;
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

  async deleteUser(uuid: string) {
    try {
      const user = await this.usersRepo.findOne({ where: { uuid } });

      if (!user) throw new NotFoundException('User not found');

      return this.usersRepo.delete({ uuid });
    } catch (error) {
      throw error;
    }
  }

  async generateResetPasswordCode(email: string): Promise<string> {
    try {
      const user = await this.usersRepo.findOne({ where: { email } });

      if (!user) throw new NotFoundException('User not found');

      const resetCode = this.generateUniqueCode();

      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 30);

      await this.usersRepo.update(
        { email },
        { resetPasswordCode: resetCode, resetPasswordExpires: expirationDate },
      );

      await this.sendResetPasswordEmail(email, resetCode);

      return resetCode;
    } catch (error) {
      throw error;
    }
  }

  async sendResetPasswordEmail(
    email: string,
    resetCode: string,
  ): Promise<void> {
    // Aquí puedes personalizar el formato del correo según tus necesidades
    const resetMessage = `Tu código de restablecimiento de contraseña es: ${resetCode}`;

    // Usa SES o cualquier servicio de correo para enviar el mensaje al usuario
    await this.ses
      .sendEmail({
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: resetMessage,
            },
          },
          Subject: {
            Data: 'Código de Restablecimiento de Contraseña',
          },
        },
        Source: 'edmayk.py@gmail.com',
      })
      .promise();
  }

  async resetPassword(
    email: string,
    resetCode: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const user = await this.usersRepo.findOne({ where: { email } });

      if (!user) throw new NotFoundException('User not found');

      if (user.resetPasswordCode !== resetCode)
        throw new Error('Invalid reset code');

      if (user.resetPasswordExpires < new Date())
        throw new Error('Expired reset code');

      const password = await bcrypt.hash(newPassword, 10);

      await this.usersRepo.update({ email }, { password });

      await this.usersRepo.update({ email }, { resetPasswordCode: null });

      await this.usersRepo.update({ email }, { resetPasswordExpires: null });
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
      relations: ['role'],
    });
  }

  private generateUniqueCode(): string {
    const hash = crypto.createHash('sha256');
    hash.update(Date.now().toString() + Math.random().toString());
    return hash.digest('hex').slice(0, 6);
  }

  private async sendWelcomeEmail(email: string) {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                <h1 style="color: #333;">¡Bienvenido a RAG!</h1>
                <p style="font-size: 16px; color: #666;">
                  Estamos encantados de tenerte a bordo. Gracias por registrarte y confiar en nosotros.
                </p>
                <p style="font-size: 16px; color: #666;">
                  Atentamente,<br/>Equipo RAG
                </p>
              </div>
            `,
          },
        },
        Subject: {
          Data: 'Bienvenido a RAG',
        },
      },
      Source: 'edmayk.py@gmail.com',
    };

    try {
      await this.ses.sendEmail(params).promise();
      console.log('Correo de bienvenida enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el correo de bienvenida:', error);
    }
  }
}
