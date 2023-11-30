import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  //name
  @Field(() => String)
  name: string;

  //description
  @Field(() => String)
  description: string;
}
