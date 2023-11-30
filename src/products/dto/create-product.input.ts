import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

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
  @IsString()
  image: string;

  @Field(() => String, { description: 'Brand of product' })
  @IsString()
  brand: string;

  //uuid category
  @Field(() => String, { description: 'Category of product', nullable: true })
  @IsString()
  category: string | null;
}
