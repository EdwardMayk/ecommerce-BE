import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateUserActivityInput {
  @IsUUID()
  @IsString()
  @Field(() => String, { description: 'UUID of user' })
  user_uuid: string;

  @IsDate()
  @Field(() => Date, { description: 'Start Time' })
  startTime: Date;

  @IsDate()
  @Field(() => Date, { description: 'Start Time' })
  endTime: Date;

  @IsDate()
  @Field(() => String, { description: 'Platform' })
  platform: string;
}
