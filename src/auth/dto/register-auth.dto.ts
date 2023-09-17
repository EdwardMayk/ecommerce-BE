import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { Field } from '@nestjs/graphql';

export class RegisterAuthDto extends LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Name of user' })
  firstname: string;

  @IsString()
  @Field(() => String, { description: 'LastName of user' })
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'Email of user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Password of user' })
  password: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => String, { description: 'UUID of user creator' })
  createdBy: string;
}
