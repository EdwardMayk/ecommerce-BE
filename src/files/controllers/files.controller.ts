import {
  Controller,
  UseInterceptors,
  Post,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../services/files.service';
import { FilePayload } from '../dto/create-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file) {
    const fileUploaded = await this.filesService.uploadFile(file);
    return fileUploaded;
  }

  @Post('delete')
  remove(@Body() payload: FilePayload) {
    return this.filesService.removeFile(payload.resource);
  }
}
