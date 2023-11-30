import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SigninResponse {
  @Field(() => String)
  status: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  profilePicture: string;

  @Field(() => String)
  lastLogin: Date;
}
