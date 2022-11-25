/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../user/entities';
import { PhotoDto } from './dto/photoUpdate.dto';
import * as fs from 'fs';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  // Добавляем фото в базу
  async editPhoto({ photo, id }): Promise<PhotoDto> {
    const photos = await this.photoRepository.save({ ...photo, user: { id } });
    // await this.userRepository.update(id, { avatar: photos });
    return photos;
  }

  // Удаление фото
  async deletePhoto({ photoId, userId }: { photoId: string; userId: string }) {
    const photo = await this.photoRepository.findOne({
      where: { id: photoId },
      relations: { user: true },
    });
    if (photo.user.id === userId) {
      await fs.unlinkSync(photo.filename);
      return await this.photoRepository.delete({ id: photo.id });
    } else {
      throw new HttpException('Фиг тебе', HttpStatus.FORBIDDEN);
    }
  }
}
