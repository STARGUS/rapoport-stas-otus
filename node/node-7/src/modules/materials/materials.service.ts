/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialDto } from './dto/material.dto';
import { MaterialUpdateDto } from './dto/materialUpdate.dto';
import { Materail } from './entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Materail)
    private readonly materialRepository: Repository<Materail>,
  ) {}

  async createMaterial({
    material,
    id,
  }: {
    material: MaterialUpdateDto;
    id: string;
  }): Promise<MaterialUpdateDto> {
    const materialResponse = await this.materialRepository.save({
      ...material,
      lesson: { id },
    });
    return materialResponse;
  }
}
