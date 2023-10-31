import { registerEnumType } from '@nestjs/graphql';

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  PDF = 'pdf',
  AUDIO = 'audio',
}

registerEnumType(FileType, {
  name: 'FileType',
});
