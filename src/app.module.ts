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
import { ConfigModule } from '@nestjs/config';
import config from './config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UserActivityModule } from './user-activity/user.activity.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 5000,
      },
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
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
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
