/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from '../../decorators';
import { extname, join } from 'path';
import { PhotoService } from './photo.service';

@Controller('api/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('create')
  @Roles('USER')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'photo'),
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async editPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() photoData,
    @Request() req,
  ) {
    const photo = {
      name: file['originalname'],
      filename: file['path'],
      views: file['size'],
      ...photoData,
    };
    const resPhoto = await this.photoService.editPhoto({
      photo,
      id: req.user.id,
    });
    return { photo: resPhoto };
  }

  @Delete('delete/:id')
  @Roles('USER')
  async removePhoto(@Request() req, @Param('id') id: string) {
    return await this.photoService.deletePhoto({
      photoId: id,
      userId: req.user.id,
    });
  }
}
