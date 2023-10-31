import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { FileType } from '../../utils/file_type';

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface FileBuffer {
  buffer: Buffer;
}

export interface FilePayload {
  resource: string;
}

@InputType()
export class CreateFileInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  url: string;

  @Field(() => FileType)
  @IsEnum(FileType)
  type: FileType;
}
