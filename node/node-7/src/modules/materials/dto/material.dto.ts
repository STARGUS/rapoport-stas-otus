import { IsOptional, IsString } from 'class-validator';
import { Materail } from '../../course/entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LessonDto } from 'src/modules/course/dto';

export class MaterialDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiPropertyOptional({ type: LessonDto })
  @IsOptional()
  lesson?: LessonDto;

  constructor(material: Materail) {
    this.title = material.title;
    this.description = material.description;
    this.url = material.url;
  }
}
