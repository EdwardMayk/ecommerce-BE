import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Name of product' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'Description of product' })
  @IsString()
  description: string;

  @Field(() => Number, { description: 'Price of product' })
  price: number;

  @Field(() => Number, { description: 'Stock of product' })
  stock: number;

  @Field(() => String, { description: 'Image of product' })
  @IsUrl()
  image: string;

  @Field(() => String, { description: 'Brand of product' })
  @IsString()
  brand: string;
}
