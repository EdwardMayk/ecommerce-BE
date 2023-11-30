import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { enviroments } from './config/enviroments';

import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { ProvidersModule } from './providers/providers.module';
import { RolesModule } from './roles/roles.module';

import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UserActivityModule } from './user-activity/user.activity.module';
import { FilesModule } from './files/files.module';
import { SES } from 'aws-sdk';
import { MercadoPagoModule } from './mercadopago/mercadopago.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        context: ({ req, res }) => ({ req, res }),
        cors: { origin: true, credentials: true },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        GRAPHQL_PLAYGROUND: Joi.number(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    ProvidersModule,
    RolesModule,
    DatabaseModule,
    AuthModule,
    UserActivityModule,
    FilesModule,
    MercadoPagoModule,
  ],
  providers: [
    AppService,
    AppResolver,
    {
      provide: SES,
      useValue: new SES({
        accessKeyId: process.env.AWSS3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWSS3_SECRET_ACCESS_KEY,
        region: process.env.AWSS3_REGION,
      }),
    },
  ],
})
export class AppModule {}
