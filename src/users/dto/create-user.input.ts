import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
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

  @IsUUID()
  @Field(() => String, { description: 'UUID of user creator', nullable: true })
  createdBy?: string;
}
