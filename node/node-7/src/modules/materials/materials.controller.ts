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
import { CourseRoles, Roles } from '../../decorators';
import { extname, join } from 'path';
import { MaterialsService } from './materials.service';

@Controller('api/material')
export class MaterialsController {
  constructor(private readonly materialService: MaterialsService) {}

  @Post('lesson/:id/create')
  @CourseRoles('MODERATOR')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'material'),
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
  async createMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Body() materialData,
    @Param('id') id,
  ) {
    const material = {
      title: file['originalname'],
      url: file['path'],
      ...materialData,
    };
    const resPhoto = await this.materialService.createMaterial({
      material,
      id,
    });
    return { photo: resPhoto };
  }
}
