import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materail } from './entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materail])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService],
})
export class MaterialsModule {}
