import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import config from 'src/config';
import * as AWS from 'aws-sdk';
import { ConfigType } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { CreateFileInput, UploadedFile } from '../dto/create-file.dto';

@Injectable()
export class FilesService {
  private client: AWS.S3;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {
    this.client = new AWS.S3({
      accessKeyId: this.configService.AWSS3.accessKeyId,
      secretAccessKey: this.configService.AWSS3.secretAccessKey,
      region: this.configService.AWSS3.region,
    });
  }

  async uploadFile(file: UploadedFile) {
    const currentName = file.originalname.split(' ').join('_');
    const fileName = `${Date.now()}-${currentName}`;

    const params = {
      Bucket: this.configService.AWSS3.bucket,
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const { Location, Key } = await this.client.upload(params).promise();

    return {
      public_url: Location,
      path: Key,
    };
  }

  async removeFile(key: string) {
    const params = {
      Bucket: this.configService.AWSS3.bucket,
      Key: key,
    };

    const res = await this.client.deleteObject(params).promise();
    return res;
  }

  async create(queryRunner: QueryRunner, args: CreateFileInput) {
    try {
      const file = this.fileRepository.create({
        ...args,
        uuid: uuidv4(),
      });
      return queryRunner.manager.save(file);
    } catch (error) {
      throw error;
    }
  }
}
