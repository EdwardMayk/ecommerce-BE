import { Field, ObjectType } from '@nestjs/graphql';
import { FileType } from '../../utils/file_type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
@ObjectType()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Field(() => String)
  uuid: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  url: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'enum', enum: FileType })
  @Field(() => FileType)
  type: FileType;
}
