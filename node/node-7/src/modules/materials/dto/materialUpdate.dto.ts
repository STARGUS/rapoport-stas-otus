import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Materail } from '../../course/entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MaterialUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  lesson?: { id: string };

  constructor(material: Materail) {
    this.title = material.title;
    this.description = material.description;
    this.url = material.url;
    this.lesson = material.lesson;
  }
}
